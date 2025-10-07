# S3 Service - Quick Reference Guide

## 📚 Available Methods

### Upload Operations

#### `uploadFileSync(file, isPublic?)`

Uploads a file to S3 (auto-detects single/multipart upload)

```typescript
const key = await S3Service.uploadFileSync(file, true);
```

---

### File Management

#### `deleteFile(key)`

Deletes a file from S3

```typescript
await S3Service.deleteFile("images/2025/10/07/123_photo.jpg");
```

---

### URL Generation

#### `getFileUrl(key)`

Gets public URL for a file

```typescript
const url = S3Service.getFileUrl(key);
// https://bucket.s3.region.amazonaws.com/images/.../photo.jpg
```

#### `getSignedUrl(key, expiresIn?)`

Gets temporary URL for private files (default: 1 hour)

```typescript
const url = await S3Service.getSignedUrl(key, 300); // 5 minutes
```

---

### Validation

#### `validateFile(file, maxSize?, allowedTypes?)`

Validates file before upload

```typescript
const { valid, error } = S3Service.validateFile(file);
if (!valid) alert(error);
```

---

### Advanced (Multipart Upload)

#### `createMultipartUpload(params)`

Initiates multipart upload session

```typescript
const uploadId = await S3Service.createMultipartUpload(params);
```

#### `uploadMultipartChunks(key, file, uploadId, chunkSize)`

Uploads all chunks

```typescript
const parts = await S3Service.uploadMultipartChunks(
  key,
  file,
  uploadId,
  5242880
);
```

#### `uploadMultipartChunk(key, chunk, uploadId, partNumber)`

Uploads single chunk

```typescript
const part = await S3Service.uploadMultipartChunk(key, chunk, uploadId, 1);
```

#### `completeMultipartUpload(key, uploadId, parts)`

Finalizes multipart upload

```typescript
await S3Service.completeMultipartUpload(key, uploadId, parts);
```

#### `abortMultipartUpload(key, uploadId)`

Cancels and cleans up failed multipart upload

```typescript
await S3Service.abortMultipartUpload(key, uploadId);
```

---

## 🎯 Common Patterns

### Basic Upload

```typescript
const key = await S3Service.uploadFileSync(file);
const url = S3Service.getFileUrl(key);
```

### Upload with Validation

```typescript
const validation = S3Service.validateFile(file);
if (!validation.valid) {
  toast.error(validation.error);
  return;
}
const key = await S3Service.uploadFileSync(file);
```

### Upload Private File

```typescript
const key = await S3Service.uploadFileSync(file, false);
const tempUrl = await S3Service.getSignedUrl(key, 600); // 10 min
```

### Replace File

```typescript
// Delete old file
await S3Service.deleteFile(oldKey);
// Upload new file
const newKey = await S3Service.uploadFileSync(newFile);
```

---

## ⚙️ Configuration

Configure via environment variables (`.env`):

```bash
VITE_S3_REGION=us-east-1
VITE_S3_ENDPOINT=https://s3.amazonaws.com
VITE_S3_ACCESS_KEY_ID=your-access-key
VITE_S3_SECRET_ACCESS_KEY=your-secret-key
VITE_S3_BUCKET_NAME=your-bucket-name
VITE_S3_PUBLIC_URL=https://cdn.example.com  # Optional CDN URL
```

---

## 🔧 Settings

- **Chunk Size**: 5MB (for multipart uploads)
- **Auto-multipart**: Files > 5MB
- **Public by default**: `isPublic = true`
- **File naming**: `{type}s/YYYY/MM/DD/{timestamp}_{filename}`

---

## 🚨 Error Handling

```typescript
try {
  const key = await S3Service.uploadFileSync(file);
} catch (error) {
  if (error.name === "NetworkError") {
    // Handle network issues
  } else if (error.name === "AccessDenied") {
    // Handle permission issues
  } else {
    // Handle other errors
  }
}
```

---

## 📦 Required Package

For pre-signed URLs:

```bash
yarn add @aws-sdk/s3-request-presigner
```
