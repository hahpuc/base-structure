# Translation Import/Export Implementation - React VIP Pro

## Overview

This document describes the implementation of the translation import/export functionality in the React VIP Pro project, following the same patterns and flows as the Angular VIP Pro implementation.

## Features Implemented

### 1. Translation Import Dialog Component

**File**: `src/pages/languages/translations/components/translations-import.dialog.tsx`

**Key Features**:

- Language selection dropdown with validation
- Export translations to Excel file
- Import translations from Excel file
- File upload with drag & drop support (using Ant Design Upload)
- Progress tracking during upload and processing
- Error handling with downloadable error reports
- Responsive UI with dark mode support
- Real-time validation and state management

### 2. Integration with Main Translation Page

**File**: `src/pages/languages/translations/translations.page.tsx`

**Updates**:

- Added import button in the header
- Modal integration for import dialog
- State management for modal visibility

### 3. Enhanced Enum Types

**File**: `src/constants/enum.ts`

**Updates**:

- Added `document` type to `EUploadType` enum for Excel file uploads

## Business Logic & Flow

### Rule & Flow Implementation:

1. **Initial State**: Both Export and Import buttons are disabled
2. **Language Selection**: When user selects a language → Export button becomes enabled
3. **File Upload**: After language selection → File upload area becomes visible
4. **File Selection**: After user selects Excel file → Import button becomes enabled
5. **Import Process**:
   - Upload file to S3 using `S3Service.uploadFileSync()`
   - Get S3 key from upload response
   - Call translation import API with the S3 key
   - Display success/error results with downloadable error reports

### Technical Implementation:

#### State Management:

```typescript
const [languageOptions, setLanguageOptions] = useState<BaseOption[]>([]);
const [isExporting, setIsExporting] = useState(false);
const [isImporting, setIsImporting] = useState(false);
const [fileList, setFileList] = useState<UploadFile[]>([]);
const [importResult, setImportResult] = useState<ImportResult | null>(null);
```

#### Validation Logic:

- **Language Selection**: Required for both export and import operations
- **File Type**: Only Excel files (.xlsx, .xls) are accepted
- **File Size**: Maximum 10MB limit
- **File Content**: Server-side validation with downloadable error reports

#### Export Process:

```typescript
const handleExport = async () => {
  // 1. Validate language selection
  // 2. Call translation.export() with query parameters
  // 3. Use S3Service to generate download URL
  // 4. Trigger file download
};
```

#### Import Process:

```typescript
const handleImport = async () => {
  // 1. Validate language and file selection
  // 2. Upload file to S3 using S3Service.uploadFileSync()
  // 3. Call translation.import() with S3 key
  // 4. Handle success/error responses
  // 5. Provide error file download if needed
};
```

## API Integration

### Services Used:

- `languageService.getOptions()` - Get available languages
- `translationService.export(params)` - Export translations
- `translationService.import({ key })` - Import translations
- `S3Service.uploadFileSync(file)` - Upload file to S3
- `S3Service.getFileUrl(key)` - Generate download URLs

### Expected API Responses:

```typescript
// Export Response
interface ExportResponse {
  key: string; // S3 key for download
}

// Import Response (Success)
interface ImportSuccessResponse {
  message: string;
}

// Import Response (Error)
interface ImportErrorResponse {
  error_key: string; // S3 key for error file
  message: string;
}
```

## UI/UX Features

### Responsive Design:

- Tailwind CSS classes for responsive layout
- Dark mode support with appropriate color schemes
- Mobile-friendly button layouts and spacing

### User Feedback:

- Loading states for export/import operations
- Success/error messages with Ant Design message component
- Progress indicators during file upload
- Clear instructions panel for users

### Accessibility:

- Proper form labels and ARIA attributes
- Keyboard navigation support
- Screen reader friendly messaging
- Focus management for modal interactions

## Error Handling

### Client-side Validation:

- Language selection requirement
- File type validation (Excel only)
- File size limits (10MB)
- Empty file detection

### Server-side Error Handling:

- Import validation errors with downloadable reports
- Network error handling
- S3 upload failure recovery
- API timeout handling

## Styling & Theming

### Ant Design Components Used:

- `Form` - Form layout and validation
- `Select` - Language dropdown
- `Button` - Action buttons with loading states
- `Upload` - File upload with drag & drop
- `Modal` - Dialog container
- `message` - Toast notifications

### Custom Styling:

- Tailwind CSS for layout and spacing
- Dark mode compatible colors
- Brand color integration
- Responsive grid layouts

## Files Modified/Created:

1. **Created**: `src/pages/languages/translations/components/translations-import.dialog.tsx`
2. **Modified**: `src/pages/languages/translations/translations.page.tsx`
3. **Modified**: `src/constants/enum.ts`
4. **Created**: `docs/TRANSLATION_IMPORT_IMPLEMENTATION.md`

## Dependencies:

- Ant Design components (already included)
- React hooks (useState, useEffect, Form.useWatch)
- S3Service (already implemented)
- Translation services (already implemented)
- Language service (already implemented)

## Testing Considerations:

- Test language selection enabling/disabling buttons
- Test file upload validation (type, size)
- Test export download functionality
- Test import success/error flows
- Test error file download
- Test modal open/close behavior
- Test responsive layout on different screen sizes
