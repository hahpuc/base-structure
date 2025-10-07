/**
 * File upload constants for form file controls
 * Defines accepted file types, max sizes, and validation rules
 */

/**
 * Image file types
 */
export const IMAGE_ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
  "image/svg+xml": [".svg"],
};

/**
 * Document file types
 */
export const DOCUMENT_ACCEPT = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
  "text/plain": [".txt"],
  "text/csv": [".csv"],
};

/**
 * Video file types
 */
export const VIDEO_ACCEPT = {
  "video/mp4": [".mp4"],
  "video/mpeg": [".mpeg"],
  "video/quicktime": [".mov"],
  "video/x-msvideo": [".avi"],
  "video/x-ms-wmv": [".wmv"],
  "video/webm": [".webm"],
};

/**
 * Audio file types
 */
export const AUDIO_ACCEPT = {
  "audio/mpeg": [".mp3"],
  "audio/wav": [".wav"],
  "audio/ogg": [".ogg"],
  "audio/webm": [".weba"],
};

/**
 * All file types combined
 */
export const ALL_FILES_ACCEPT = {
  ...IMAGE_ACCEPT,
  ...DOCUMENT_ACCEPT,
  ...VIDEO_ACCEPT,
  ...AUDIO_ACCEPT,
};

/**
 * Default max file sizes (in bytes)
 */
export const FILE_MAX_SIZE = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  VIDEO: 100 * 1024 * 1024, // 500MB
  AUDIO: 10 * 1024 * 1024, // 10MB
  DEFAULT: 5 * 1024 * 1024, // 5MB
};

/**
 * File type categories for easy reference
 */
export const FILE_TYPE_CATEGORIES = {
  IMAGE: "image",
  DOCUMENT: "document",
  VIDEO: "video",
  AUDIO: "audio",
} as const;

/**
 * Helper function to get accept string for HTML input
 */
export const getAcceptString = (accept: Record<string, string[]>): string => {
  return Object.entries(accept)
    .flatMap(([mimeType, extensions]) => [mimeType, ...extensions])
    .join(",");
};

/**
 * Helper function to format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Helper function to validate file type
 */
export const isValidFileType = (
  file: File,
  accept: Record<string, string[]>
): boolean => {
  const acceptedTypes = Object.keys(accept);
  const acceptedExtensions = Object.values(accept).flat();

  // Check MIME type
  if (acceptedTypes.includes(file.type)) {
    return true;
  }

  // Check extension
  const fileName = file.name.toLowerCase();
  return acceptedExtensions.some((ext) => fileName.endsWith(ext.toLowerCase()));
};

/**
 * Helper function to validate file size
 */
export const isValidFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};
