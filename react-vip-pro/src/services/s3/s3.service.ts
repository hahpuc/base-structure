import {
  AbortMultipartUploadCommand,
  CompletedPart,
  CompleteMultipartUploadCommand,
  CompleteMultipartUploadOutput,
  CompleteMultipartUploadRequest,
  CreateMultipartUploadCommand,
  CreateMultipartUploadRequest,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  UploadPartCommand,
  UploadPartRequest,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dayjs from "dayjs";
import slugify from "slugify";

import { env } from "../env.service";

/**
 * S3 Client instance configured with credentials and region from environment
 * Used for all S3 operations throughout the application
 */
const s3Client = new S3Client({
  region: env.s3.region,
  endpoint: env.s3.endpoint,
  credentials: {
    accessKeyId: env.s3.accessKeyId,
    secretAccessKey: env.s3.secretAccessKey,
  },
  requestChecksumCalculation: "WHEN_REQUIRED",
});

/**
 * S3 Service for handling file operations with AWS S3 or S3-compatible storage
 * Supports both single-part and multipart uploads for efficient handling of large files
 */
export const S3Service = {
  /**
   * Chunk size for multipart uploads (5MB)
   * Files larger than this will be uploaded in chunks
   * AWS requires minimum 5MB per part (except the last part)
   */
  chunkSize: 5 * 1024 * 1024, // 5MB

  /**
   * Uploads a file to S3 synchronously
   * Automatically chooses between single-part or multipart upload based on file size
   *
   * @param file - The File object to upload
   * @param isPublic - Whether the file should be publicly accessible (default: true)
   * @returns Promise<string> - The S3 key (path) of the uploaded file
   * @throws Error if upload fails
   *
   * @example
   * const file = document.getElementById('fileInput').files[0];
   * const key = await S3Service.uploadFileSync(file, true);
   * const url = S3Service.getFileUrl(key);
   */
  async uploadFileSync(file: File, isPublic = true): Promise<string> {
    let uploadId: string | undefined;
    const key = this._getFileKey(file);

    try {
      // Use simple upload for small files (under chunk size)
      if (file.size <= this.chunkSize) {
        await this._uploadFile(file, key, isPublic);
      } else {
        // Use multipart upload for large files
        const params: CreateMultipartUploadRequest = {
          Bucket: env.s3.bucketName,
          Key: key,
          ContentType: file.type,
        };

        if (isPublic) {
          params.ACL = "public-read";
        }

        uploadId = await this.createMultipartUpload(params);

        const parts = await this.uploadMultipartChunks(
          key,
          file,
          uploadId,
          this.chunkSize
        );
        await this.completeMultipartUpload(key, uploadId, parts);
      }

      return key;
    } catch (error) {
      // Cleanup: Abort multipart upload if it was initiated
      if (uploadId) {
        try {
          await this.abortMultipartUpload(key, uploadId);
        } catch (abortError) {
          console.error("Failed to abort multipart upload:", abortError);
        }
      }

      console.error("Error uploading file to S3:", error);
      throw error;
    }
  },

  /**
   * Internal method: Uploads a file using single-part upload
   * Suitable for files smaller than the chunk size (5MB)
   *
   * @param file - The File object to upload
   * @param key - The S3 key (path) where the file will be stored
   * @param isPublic - Whether to set public-read ACL
   * @private
   */
  async _uploadFile(file: File, key: string, isPublic: boolean): Promise<void> {
    const params: PutObjectCommandInput = {
      Bucket: env.s3.bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
    };

    if (isPublic) {
      params.ACL = "public-read";
    }

    await s3Client.send(new PutObjectCommand(params));
  },

  /**
   * Internal method: Generates a unique S3 key (path) for a file
   * Format: {fileType}s/YYYY/MM/DD/{timestamp}_{slugified-filename}
   *
   * @param file - The File object to generate key for
   * @returns string - The generated S3 key
   * @private
   *
   * @example
   * Input: myPhoto.jpg (image/jpeg)
   * Output: images/2025/10/07/1728307200000_my-photo.jpg
   */
  _getFileKey(file: File): string {
    // Extract file type category (e.g., "image" from "image/jpeg")
    const folder = file.type.split("/")[0] + "s";

    // Slugify filename to remove special characters and spaces
    const fileName = slugify(file.name, {
      remove: /[*+~()'"!:@]/g,
    });

    const now = Date.now();

    // Create organized path: images/2025/10/07/timestamp_filename.jpg
    return `${folder}/${dayjs().format("YYYY/MM/DD")}/${now}_${fileName}`;
  },

  /**
   * Initiates a multipart upload session in S3
   * Required for uploading large files in chunks
   *
   * @param params - CreateMultipartUploadRequest containing Bucket, Key, ContentType, etc.
   * @returns Promise<string> - The Upload ID to use for uploading parts
   * @throws Error if multipart upload cannot be initiated
   */
  async createMultipartUpload(
    params: CreateMultipartUploadRequest
  ): Promise<string> {
    const response = await s3Client.send(
      new CreateMultipartUploadCommand(params)
    );

    return response.UploadId!;
  },

  /**
   * Uploads all chunks of a file in a multipart upload
   * Splits the file into chunks and uploads them sequentially
   *
   * @param key - The S3 key (path) for the file
   * @param file - The File object to upload
   * @param uploadId - The Upload ID from createMultipartUpload
   * @param chunkSize - Size of each chunk in bytes (5MB)
   * @returns Promise<CompletedPart[]> - Array of completed parts with ETags and part numbers
   *
   * Note: For better performance, consider implementing parallel uploads
   * Currently uploads sequentially to avoid overwhelming the connection
   */
  async uploadMultipartChunks(
    key: string,
    file: File,
    uploadId: string,
    chunkSize: number
  ): Promise<CompletedPart[]> {
    const parts: CompletedPart[] = [];
    let startPosition = 0;
    let partNumber = 1;

    while (startPosition < file.size) {
      // Slice file into chunks using the Blob.slice() method
      const chunk = file.slice(startPosition, startPosition + chunkSize);
      const part = await this.uploadMultipartChunk(
        key,
        chunk,
        uploadId,
        partNumber
      );

      parts.push(part);
      startPosition += chunkSize;
      partNumber++;
    }

    return parts;
  },

  /**
   * Uploads a single chunk (part) in a multipart upload
   *
   * @param key - The S3 key (path) for the file
   * @param chunk - The Blob chunk to upload
   * @param uploadId - The Upload ID from createMultipartUpload
   * @param partNumber - The sequential part number (starts at 1)
   * @returns Promise<CompletedPart> - Contains ETag and PartNumber for completion
   *
   * The ETag is essential for completing the multipart upload
   */
  async uploadMultipartChunk(
    key: string,
    chunk: Blob,
    uploadId: string,
    partNumber: number
  ): Promise<CompletedPart> {
    const params: UploadPartRequest = {
      Bucket: env.s3.bucketName,
      Key: key,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: chunk,
    };

    const response = await s3Client.send(new UploadPartCommand(params));

    return { ETag: response.ETag, PartNumber: partNumber };
  },

  /**
   * Completes a multipart upload by combining all uploaded parts
   * This finalizes the upload and makes the file available in S3
   *
   * @param key - The S3 key (path) for the file
   * @param uploadId - The Upload ID from createMultipartUpload
   * @param parts - Array of completed parts with ETags and part numbers
   * @returns Promise<CompleteMultipartUploadOutput> - Response from S3 with upload details
   * @throws Error if completion fails (e.g., missing parts, invalid ETags)
   */
  async completeMultipartUpload(
    key: string,
    uploadId: string,
    parts: CompletedPart[]
  ): Promise<CompleteMultipartUploadOutput> {
    const params: CompleteMultipartUploadRequest = {
      Bucket: env.s3.bucketName,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    };

    return await s3Client.send(new CompleteMultipartUploadCommand(params));
  },

  /**
   * Aborts a multipart upload and removes all uploaded parts
   * Important for cleanup when an upload fails to prevent orphaned parts
   *
   * @param key - The S3 key (path) for the file
   * @param uploadId - The Upload ID to abort
   * @returns Promise<void>
   */
  async abortMultipartUpload(key: string, uploadId: string): Promise<void> {
    const params = {
      Bucket: env.s3.bucketName,
      Key: key,
      UploadId: uploadId,
    };

    await s3Client.send(new AbortMultipartUploadCommand(params));
  },

  /**
   * Deletes a file from S3
   *
   * @param key - The S3 key (path) of the file to delete
   * @returns Promise<void>
   * @throws Error if deletion fails
   *
   * @example
   * await S3Service.deleteFile('images/2025/10/07/1728307200000_photo.jpg');
   */
  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: env.s3.bucketName,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(params));
  },

  /**
   * Generates a public URL for accessing a file
   * Works only if the file has public-read ACL or bucket policy allows public access
   *
   * @param key - The S3 key (path) of the file
   * @returns string - The full public URL
   *
   * @example
   * const url = S3Service.getFileUrl('images/2025/10/07/1728307200000_photo.jpg');
   * // Returns: https://your-bucket.s3.region.amazonaws.com/images/2025/10/07/1728307200000_photo.jpg
   */
  getFileUrl(key: string): string {
    // If custom public URL is configured, use it
    if (env.s3.publicUrl) {
      return `${env.s3.publicUrl}/${key}`;
    }

    // Otherwise, construct standard S3 URL
    return `${env.s3.endpoint}/${env.s3.bucketName}/${key}`;
  },

  /**
   * Generates a pre-signed URL for temporary access to a private file
   * Useful for sharing files without making them publicly accessible
   *
   * @param key - The S3 key (path) of the file
   * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
   * @returns Promise<string> - The pre-signed URL
   *
   * @example
   * const url = await S3Service.getSignedUrl('private/document.pdf', 300);
   * // URL valid for 5 minutes
   *
   * Note: Requires @aws-sdk/s3-request-presigner package
   */
  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: env.s3.bucketName,
      Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  },

  /**
   * Validates a file before upload
   * Checks file size and type against configured limits
   *
   * @param file - The File object to validate
   * @param maxSize - Maximum allowed file size in bytes (default: from env config)
   * @param allowedTypes - Array of allowed MIME types (default: from env config)
   * @returns { valid: boolean; error?: string }
   *
   * @example
   * const validation = S3Service.validateFile(file);
   * if (!validation.valid) {
   *   alert(validation.error);
   *   return;
   * }
   */
  validateFile(
    file: File,
    maxSize: number = env.fileUpload.maxFileSize,
    allowedTypes: string[] = env.fileUpload.allowedFileTypes
  ): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      return {
        valid: false,
        error: `File size exceeds maximum allowed size of ${maxSizeMB}MB`,
      };
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type "${
          file.type
        }" is not allowed. Allowed types: ${allowedTypes.join(", ")}`,
      };
    }

    return { valid: true };
  },
};
