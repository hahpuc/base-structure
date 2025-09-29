# Translation Import Error Troubleshooting

## Issue: S3 Upload Error - "readableStream.getReader is not a function"

### Problem Description

The error occurs when trying to upload an Excel file for translation import. The error message indicates:

```
Error uploading file to S3: TypeError: readableStream.getReader is not a function
```

### Root Cause Analysis

This error typically occurs when:

1. The file object passed to the S3 service is not a proper `File` object
2. The upload component returns a file-like object that doesn't have the expected File API methods
3. There's a mismatch between the expected file format and the actual object structure

### Solution Implemented

#### 1. **Enhanced File Validation**

Added comprehensive file validation before upload:

```typescript
// Validate that it's a proper File object
if (!(fileToUpload instanceof File)) {
  throw new Error('Invalid file object. Please try selecting the file again.');
}

// Validate file type with multiple checks
const isExcel =
  fileToUpload.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
  fileToUpload.type === 'application/vnd.ms-excel' ||
  fileToUpload.name.toLowerCase().endsWith('.xlsx') ||
  fileToUpload.name.toLowerCase().endsWith('.xls');

// Validate file size and content
if (fileToUpload.size === 0) {
  throw new Error('Selected file is empty. Please choose a valid Excel file.');
}
```

#### 2. **Robust File Extraction**

Enhanced the `getSelectedFile()` method to handle different file object formats:

```typescript
private getSelectedFile(): File | null {
  if (this.fileUpload?.fileList && this.fileUpload.fileList.length > 0) {
    const uploadFile = this.fileUpload.fileList[0];

    // Try to get the original file object
    if (uploadFile.originFileObj) {
      const file = uploadFile.originFileObj as File;

      // Ensure it's a proper File object
      if (file instanceof File) {
        return file;
      } else {
        // Try to create a new File object if needed
        try {
          const newFile = new File([file as Blob], uploadFile.name || 'upload.xlsx', {
            type: uploadFile.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          return newFile;
        } catch (error) {
          console.error('Failed to create File object:', error);
        }
      }
    }
  }

  return null;
}
```

#### 3. **Improved Error Handling**

Added specific error handling for different upload scenarios:

```typescript
try {
  s3Key = await this.s3Service.uploadFileSync(fileToUpload);
} catch (uploadError) {
  let uploadErrorMessage = 'Failed to upload file to S3. Please try again.';
  if (uploadError instanceof Error) {
    if (uploadError.message.includes('getReader')) {
      uploadErrorMessage =
        'File format issue detected. Please try selecting the file again or use a different Excel file.';
    } else {
      uploadErrorMessage = `Upload failed: ${uploadError.message}`;
    }
  }
  throw new Error(uploadErrorMessage);
}
```

#### 4. **Debug Logging**

Added comprehensive logging to help identify the issue:

```typescript
console.log('Upload file object:', uploadFile);
console.log('Has originFileObj:', !!uploadFile.originFileObj);
console.log('File instanceof File:', file instanceof File);
console.log('File constructor:', file.constructor.name);
```

### Testing Steps

#### 1. **Pre-Upload Validation**

- Check that the file is selected properly
- Verify file type and size
- Ensure File object integrity

#### 2. **Upload Process**

- Monitor console logs for file object details
- Track S3 upload progress
- Handle upload errors gracefully

#### 3. **Error Recovery**

- Provide clear error messages to users
- Suggest corrective actions
- Allow users to retry with different files

### Common Solutions

#### Solution 1: File Re-selection

If the error persists, ask the user to:

1. Remove the currently selected file
2. Select the Excel file again
3. Ensure the file is a valid Excel format (.xlsx or .xls)

#### Solution 2: File Format Validation

Ensure the Excel file is:

- Not corrupted
- Properly formatted Excel file
- Not empty or zero bytes
- Within size limits (10MB)

#### Solution 3: Browser Compatibility

Check for browser-specific issues:

- Try a different browser
- Clear browser cache
- Disable browser extensions that might interfere

### Prevention Measures

#### 1. **Upload Component Configuration**

```typescript
// Proper upload component configuration
uploadAcceptType = EUploadType.document;
uploadFileType = EUploadType.document;
maxFileSize = 10 * 1024; // 10MB in KB
```

#### 2. **File Type Restrictions**

```html
<!-- Template configuration -->
<app-file-upload
  [accept]="uploadAcceptType"
  [type]="uploadFileType"
  [maxSize]="maxFileSize"
  [nzListType]="'text'"
></app-file-upload>
```

#### 3. **User Guidelines**

Provide clear instructions to users:

- Only Excel files (.xlsx, .xls) are supported
- Maximum file size is 10MB
- File should not be empty or corrupted
- Use the latest version of supported browsers

### Alternative Approaches

If the issue persists, consider these alternatives:

#### 1. **Direct File Input**

Use a native HTML file input as fallback:

```html
<input type="file" accept=".xlsx,.xls" (change)="onFileSelected($event)" />
```

#### 2. **Base64 Upload**

Convert file to base64 and upload:

```typescript
const base64 = await this.convertFileToBase64(file);
// Upload base64 data instead of File object
```

#### 3. **FormData Upload**

Use FormData for file upload:

```typescript
const formData = new FormData();
formData.append('file', file);
// Upload using FormData
```

### Monitoring and Diagnostics

#### 1. **Console Logging**

Monitor these console logs:

- File object structure
- File validation results
- S3 upload attempts
- Error details

#### 2. **Error Tracking**

Track these error patterns:

- File object type mismatches
- S3 service errors
- Network connectivity issues
- Browser compatibility problems

#### 3. **Performance Metrics**

Monitor:

- File upload success rate
- Average upload time
- Error frequency by file type
- User retry attempts

This comprehensive approach should resolve the `readableStream.getReader is not a function` error and provide a more robust file upload experience.
