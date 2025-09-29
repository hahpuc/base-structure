# Translation Import Modal - Frontend Implementation

This document describes the updated Angular implementation for the Translation Import/Export modal component.

## Overview

The `ImportModalTranslationComponent` now provides a complete workflow for:

1. **Exporting** translations to Excel format
2. **Uploading** Excel files to S3
3. **Importing** translations with validation and error handling
4. **Downloading** error reports when validation fails

## Component Architecture

### Updated Template Structure

```html
<!-- Language Selection -->
<nz-select formControlName="languageId" nzPlaceHolder="Select a language">
  <!-- Language options -->
</nz-select>

<!-- Action Buttons -->
<button nz-button nzType="default" [nzLoading]="isExporting" (click)="handleExport()">
  Export Translations
</button>

<button nz-button nzType="primary" [nzLoading]="isImporting" (click)="handleImport()">
  {{ isImporting ? 'Importing...' : 'Import Translations' }}
</button>

<!-- File Upload Component -->
<app-file-upload
  #fileUpload
  [accept]="uploadAcceptType"
  [type]="uploadFileType"
  [maxSize]="maxFileSize"
  [nzListType]="'text'"
></app-file-upload>

<!-- Import Result Display -->
<div *ngIf="importResult" class="result-section">
  <!-- Success/Error message with download link for errors -->
</div>
```

### TypeScript Implementation

```typescript
export class ImportModalTranslationComponent extends AppBaseComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: UploadComponent;

  // Loading states
  isExporting = false;
  isImporting = false;

  // Upload configuration
  uploadAcceptType = EUploadType.document;
  uploadFileType = EUploadType.document;
  maxFileSize = 10 * 1024; // 10MB in KB

  // Import result
  importResult: {
    success: boolean;
    message: string;
    errorKey?: string;
  } | null = null;
}
```

## Key Features

### 1. **Integrated Upload Component**

- Uses the existing `UploadComponent` instead of custom drag-and-drop
- Supports Excel file validation (.xlsx, .xls)
- File size limits (10MB default)
- Proper file type validation

### 2. **Complete Import Workflow**

#### Step 1: File Upload to S3

```typescript
// Upload file to S3 first
const s3Key = await this.fileUpload.uploadImage();
```

#### Step 2: Call Import API

```typescript
// Use S3 key to import translations
const importResponse = await this.translationService.import({ key: s3Key }).toPromise();
```

#### Step 3: Handle Response

```typescript
// Process success/error response
this.importResult = {
  success: true,
  message: importResponse.message,
  errorKey: importResponse.error_key || undefined,
};
```

### 3. **Error Handling & Downloads**

#### Validation Errors

- Displays validation errors in the UI
- Provides download link for error Excel file
- Clear success/failure messaging

```typescript
downloadErrorFile(errorKey: string): void {
  this.s3Service.downloadS3File(errorKey, 'import_errors.xlsx');
  this.msgService.info('Downloading error file...');
}
```

### 4. **User Experience Improvements**

#### Loading States

- Export button shows loading spinner
- Import button shows loading spinner with text change
- Loading messages during upload and processing

#### Visual Feedback

- Success messages in green
- Error messages in red
- Clear instructions panel
- Disabled states for invalid conditions

## Usage Flow

### Export Process

1. User selects a language from dropdown
2. User clicks "Export Translations" button
3. File is generated and downloaded automatically
4. User can edit the downloaded Excel file

### Import Process

1. User selects a language from dropdown
2. User uploads Excel file using the upload component
3. User clicks "Import Translations" button
4. System uploads file to S3 and gets key
5. System calls import API with S3 key
6. System displays results:
   - **Success**: Shows success message
   - **Partial Success**: Shows warning with error file download
   - **Failure**: Shows error message with error file download (if available)

## Component Properties

### Form Controls

- `languageId`: Selected language for export/import

### State Management

- `isVisible`: Modal visibility state
- `isExporting`: Export operation loading state
- `isImporting`: Import operation loading state
- `importResult`: Import operation result with success/error details

### Configuration

- `uploadAcceptType`: File types accepted for upload
- `uploadFileType`: Upload component file type configuration
- `maxFileSize`: Maximum file size limit (10MB)

### Computed Properties

- `isLanguageSelected`: Validates language selection
- `hasFileSelected`: Checks if file is selected in upload component

## API Integration

### Export API Call

```typescript
this.translationService.export(queryParams).subscribe({
  next: exportData => {
    if (exportData.key) {
      this.s3Service.downloadS3File(exportData.key, 'translations_data.xlsx');
    }
  },
});
```

### Import API Call

```typescript
const importResponse = await this.translationService.import({ key: s3Key }).toPromise();
```

### Response Handling

```typescript
// Success response
{
  error_key: "", // Empty if no errors
  message: "Import completed successfully. Created: 5, Updated: 10, Errors: 0"
}

// Error response with validation failures
{
  error_key: "path/to/error/file.xlsx", // S3 key for error file
  message: "Import completed with errors. Created: 3, Updated: 7, Errors: 2"
}
```

## Error Scenarios

### 1. **File Upload Errors**

- Invalid file type
- File size too large
- S3 upload failure

### 2. **Import API Errors**

- Invalid S3 key
- File processing errors
- Server errors

### 3. **Validation Errors**

- Invalid Excel format
- Missing required fields
- Invalid language codes
- Duplicate entries

## Styling & UI

### CSS Classes

```scss
// Success styling
.bg-green-50.border.border-green-200 {
  background: #f0f9f0;
  border-color: #4caf50;
}

// Error styling
.bg-red-50.border.border-red-200 {
  background: #fdf2f2;
  border-color: #f44336;
}

// Loading states
.ant-btn-loading {
  opacity: 0.6;
  pointer-events: none;
}
```

### Responsive Design

- Modal width: 600px
- Flexible button layout
- Mobile-friendly upload component
- Proper spacing and alignment

## Testing Considerations

### Unit Tests

```typescript
describe('ImportModalTranslationComponent', () => {
  it('should upload file and call import API', async () => {
    // Mock file upload
    spyOn(component.fileUpload, 'uploadImage').and.returnValue(Promise.resolve('s3-key'));

    // Mock import API
    spyOn(translationService, 'import').and.returnValue(of(mockResponse));

    await component.handleImport();

    expect(translationService.import).toHaveBeenCalledWith({ key: 's3-key' });
  });
});
```

### Integration Tests

- File upload to S3 flow
- Import API error handling
- UI state management
- Error file download functionality

## Security Considerations

### File Validation

- File type validation (Excel only)
- File size limits (10MB max)
- Content type verification

### API Security

- Authentication headers
- CSRF protection
- Input sanitization

### S3 Security

- Signed URLs for uploads
- Temporary access tokens
- Secure file handling

## Performance Optimizations

### Lazy Loading

- Upload component loaded on demand
- Modal content loaded when visible

### Memory Management

- File cleanup after upload
- Component cleanup on destroy
- Observable unsubscription

### User Feedback

- Progress indicators
- Loading states
- Clear error messages

## Future Enhancements

### Planned Features

1. **Progress Tracking**: Real-time upload/import progress
2. **Bulk Operations**: Multiple file uploads
3. **Preview**: Excel file preview before import
4. **History**: Import/export history tracking
5. **Templates**: Downloadable Excel templates

### Performance Improvements

1. **Chunked Upload**: Large file support
2. **Background Processing**: Async import processing
3. **Caching**: Language options caching
4. **Optimization**: Bundle size reduction

This completes the comprehensive frontend implementation for the Translation Import/Export functionality!
