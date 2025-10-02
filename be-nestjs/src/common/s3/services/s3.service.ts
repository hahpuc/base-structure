import {
  AbortMultipartUploadCommand,
  CompletedPart,
  CompleteMultipartUploadCommand,
  CompleteMultipartUploadOutput,
  CompleteMultipartUploadRequest,
  CreateMultipartUploadCommand,
  CreateMultipartUploadRequest,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
  UploadPartRequest,
} from '@aws-sdk/client-s3';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import mime from 'mime-types';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class S3Service {
  private readonly chunkSize = 5 * 1024 * 1024;

  private readonly s3: S3Client;

  private readonly s3Message: MessageService;
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    i18nService: I18nService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get('s3.region'),
      endpoint: this.configService.get('s3.endpoint'),
      credentials: {
        accessKeyId: this.configService.get('s3.accessKeyId'),
        secretAccessKey: this.configService.get('s3.secretAccessKey'),
      },
    });

    this.s3Message = new MessageService(i18nService, 's3');
  }

  async getFile(key: string) {
    try {
      const item: GetObjectCommandOutput = await this.s3.send(
        new GetObjectCommand({
          Bucket: this.configService.get('s3.bucketName'),
          Key: key,
        }),
      );
      return item.Body.transformToByteArray();
    } catch (error) {
      this.logger.error(
        `Error while get file from S3 with key ${key}.`,
        error,
        'S3Service.getFile',
      );

      throw new CustomError(
        400,
        'FILE_NOT_FOUND',
        this.s3Message.get('FILE_NOT_FOUND'),
      );
    }
  }

  async uploadFile(file: Blob, filename: string): Promise<string> {
    const key = this._getFileKey(filename);

    let uploadId: string;
    try {
      if (file.size <= this.chunkSize) {
        await this._uploadFile(file, key);
      } else {
        const params: CreateMultipartUploadRequest = {
          Bucket: this.configService.get('s3.bucketName'),
          Key: key,
          ContentType: mime.lookup(filename).toString(),
        };

        const uploadId = await this.createMultipartUpload(params);

        const parts = await this.uploadMultipartChunks(
          key,
          file,
          uploadId,
          this.chunkSize,
        );
        await this.completeMultipartUpload(key, uploadId, parts);
      }

      return key;
    } catch (error) {
      this.logger.error(
        `Error uploading file with key ${key} to S3:`,
        error,
        'S3Service.uploadFile',
      );

      if (uploadId) {
        await this.s3.send(
          new AbortMultipartUploadCommand({
            Bucket: this.configService.get('s3.bucketName'),
            Key: key,
            UploadId: uploadId,
          }),
        );
      }
      throw error;
    }
  }

  private async createMultipartUpload(
    params: CreateMultipartUploadRequest,
  ): Promise<string> {
    const response = await this.s3.send(
      new CreateMultipartUploadCommand(params),
    );

    return response.UploadId;
  }

  private async uploadMultipartChunks(
    key: string,
    file: Blob,
    uploadId: string,
    chunkSize: number,
  ): Promise<CompletedPart[]> {
    const parts: CompletedPart[] = [];
    let startPosition = 0;
    let partNumber = 1;

    while (startPosition < file.size) {
      const chunk = file.slice(startPosition, startPosition + chunkSize);
      const part = await this.uploadMultipartChunk(
        key,
        chunk,
        uploadId,
        partNumber,
      );

      parts.push(part);
      startPosition += chunkSize;
      partNumber++;
    }

    return parts;
  }

  private async uploadMultipartChunk(
    key: string,
    chunk: Blob,
    uploadId: string,
    partNumber: number,
  ): Promise<CompletedPart> {
    const params: UploadPartRequest = {
      Bucket: this.configService.get('s3.bucketName'),
      Key: key,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: chunk,
    };

    const response = await this.s3.send(new UploadPartCommand(params));

    return { ETag: response.ETag, PartNumber: partNumber };
  }

  private async completeMultipartUpload(
    key: string,
    uploadId: string,
    parts: CompletedPart[],
  ): Promise<CompleteMultipartUploadOutput> {
    const params: CompleteMultipartUploadRequest = {
      Bucket: this.configService.get('s3.bucketName'),
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    };

    return await this.s3.send(new CompleteMultipartUploadCommand(params));
  }

  private async _uploadFile(file: Blob, key: string): Promise<void> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: this.configService.get('s3.bucketName'),
      Key: key,
      Body: buffer,
    });
    await this.s3.send(command);
  }

  private _getFileKey(fileName: string): string {
    const folder = mime.lookup(fileName).toString().split('/')[0] + 's';
    const now = Date.now();

    return `${folder}/${dayjs().format('YYYY/MM/DD')}/${now}_${fileName}`;
  }
}
