# Translation Import/Export Documentation

This document provides comprehensive information about the Translation Import/Export functionality in the Language Management system.

## Overview

The Translation Import/Export feature allows administrators to:

1. **Export** current translations to Excel format by language
2. **Edit** translations in Excel with custom values and descriptions
3. **Import** the modified Excel file to create new translations or update existing ones

## API Endpoints

### Export Translations

```http
GET /api/admin/translations/export?language_id={id}
```

**Parameters:**

- `language_id` (required): The ID of the language to export translations for

**Response:**

```json
{
  "key": "exports/2025/09/29/1727123456789_export_translation.xlsx"
}
```

### Import Translations

```http
POST /api/admin/translations/import
Content-Type: application/json

{
  "key": "uploads/2025/09/29/modified_translations.xlsx"
}
```

**Response:**

```json
{
  "error_key": "exports/2025/09/29/1727123456789_translation_import_errors.xlsx",
  "message": "Import completed successfully. Created: 5, Updated: 10, Errors: 2"
}
```

## Excel File Format

### Export Format

The exported Excel file contains the following columns:

| Column | Header        | Description                            | Example                   |
| ------ | ------------- | -------------------------------------- | ------------------------- |
| A      | ID            | Translation ID (empty for new entries) | 123                       |
| B      | Language Code | ISO language code                      | en, fr, es                |
| C      | Language Name | Full language name                     | English, French, Spanish  |
| D      | Key           | Translation key                        | user.name, app.title      |
| E      | Value         | Translation value                      | Name, Nom, Nombre         |
| F      | Description   | Optional description                   | Field label for user name |

### Import Requirements

#### Required Columns

- **Language Code**: Must be a valid, active language code in the system
- **Language Name**: Must match the language name for the given code
- **Key**: Translation key (max 255 characters)
- **Value**: Translation text (required, cannot be empty)

#### Optional Columns

- **ID**: If provided, updates existing translation; if empty, creates new translation
- **Description**: Optional description for the translation

## Workflow

### 1. Export Process

```typescript
// Frontend request
const response = await fetch('/api/admin/translations/export?language_id=1');
const { key } = await response.json();

// File is automatically generated and uploaded to S3
// Users can download the file using the returned key
```

### 2. Edit Process

Users edit the downloaded Excel file:

- Modify values in the "Value" column
- Add descriptions in the "Description" column
- Leave "ID" empty for new translations
- Keep "ID" filled for updates to existing translations

### 3. Import Process

```typescript
// Upload modified file and get S3 key
const uploadResponse = await uploadToS3(modifiedFile);
const { key } = uploadResponse;

// Import the translations
const importResponse = await fetch('/api/admin/translations/import', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key }),
});

const result = await importResponse.json();
// Handle success/error response
```

## Validation Rules

### Data Validation

1. **Language Code Validation**

   - Must exist in the system
   - Must be active (status = 1)
   - Case-sensitive matching

2. **Translation Key Validation**

   - Required field
   - Maximum 255 characters
   - Must be a valid string

3. **Translation Value Validation**

   - Required field
   - Cannot be empty or just whitespace
   - Automatically trimmed

4. **Description Validation**
   - Optional field
   - Automatically trimmed
   - Can be empty

### Business Logic

1. **Create New Translation**

   - Triggered when ID is empty
   - Checks for existing translation with same key + language
   - Skips creation if duplicate found

2. **Update Existing Translation**
   - Triggered when ID is provided
   - Validates that translation with given ID exists
   - Updates value and description only

## Error Handling

### Validation Errors

If validation errors occur during import:

1. Valid rows are processed successfully
2. Invalid rows are collected with error messages
3. Error report Excel file is generated and uploaded to S3
4. Error file key is returned in the response

### Error File Format

The error file contains all original columns plus:

- **Errors** column with detailed error messages

### Common Error Messages

- "Language Code is required"
- "Value is required"
- "Language Code must not exceed 10 characters"
- "Key must not exceed 255 characters"
- "Invalid language code"

## Implementation Details

### Service Methods

#### `export(params: FilterTranslationDto): Promise<ExportResponse>`

Exports translations for a specific language to Excel format.

```typescript
const result = await translationService.export({ language_id: 1 });
// Returns: { key: "s3-file-path" }
```

#### `import(input: BaseImportDto): Promise<BaseImportResponse>`

Imports translations from Excel file with validation and error handling.

```typescript
const result = await translationService.import({ key: 's3-file-path' });
// Returns: { error_key: "s3-error-file-path", message: "Status message" }
```

### Helper Methods

#### `_getLanguagesByCode(codes: string[]): Promise<Language[]>`

Validates and retrieves language entities by their codes.

#### `_processTranslationData(validData, validationDict): Promise<{created: number, updated: number}>`

Processes valid translation data to create or update records.

#### `_generateErrorReport(errorData, validHeaders): Promise<string>`

Generates Excel error report and uploads to S3.

## Performance Considerations

### Export Performance

- Uses pagination (500 records per batch) for large datasets
- Streams data directly to Excel workbook
- Efficient memory usage for large exports

### Import Performance

- Processes all rows in memory (suitable for typical Excel file sizes)
- Batch database operations where possible
- Async validation for language codes
- Single transaction per translation operation

### Memory Management

- Excel files processed using streaming where possible
- Temporary files cleaned up automatically
- S3 uploads use multipart for large files

## Security Considerations

### File Validation

- Only Excel files (.xlsx) are accepted
- File size limits enforced by S3 service
- Header validation prevents malicious data injection

### Access Control

- Requires `language_manage_read` permission for export
- Requires `language_manage_update` permission for import
- All operations are authenticated and authorized

### Data Validation

- Input sanitization for all text fields
- SQL injection prevention through parameterized queries
- XSS prevention through proper data encoding

## Usage Examples

### Complete Import/Export Workflow

```typescript
// 1. Export current translations
async function exportTranslations(languageId: number) {
  try {
    const response = await fetch(
      `/api/admin/translations/export?language_id=${languageId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) throw new Error('Export failed');

    const { key } = await response.json();

    // Download file from S3 using the key
    const downloadUrl = await getS3DownloadUrl(key);
    window.open(downloadUrl, '_blank');
  } catch (error) {
    console.error('Export error:', error);
  }
}

// 2. Import modified translations
async function importTranslations(file: File) {
  try {
    // Upload file to S3 first
    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    });

    const { key } = await uploadResponse.json();

    // Import translations
    const importResponse = await fetch('/api/admin/translations/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ key }),
    });

    const result = await importResponse.json();

    if (result.error_key) {
      // Handle errors - download error file
      const errorFileUrl = await getS3DownloadUrl(result.error_key);
      alert(
        `Import completed with errors. Download error report: ${errorFileUrl}`,
      );
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Import error:', error);
  }
}
```

### Frontend Component Example (React)

```typescript
import React, { useState } from 'react';

interface TranslationImportExportProps {
  languageId: number;
}

export const TranslationImportExport: React.FC<TranslationImportExportProps> = ({
  languageId
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<string>('');

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch(`/api/admin/translations/export?language_id=${languageId}`);
      const { key } = await response.json();

      // Trigger download
      const downloadUrl = await getS3DownloadUrl(key);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `translations_${languageId}.xlsx`;
      link.click();

    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      // Upload and import file
      const result = await importTranslations(file);
      setImportResult(result.message);

    } catch (error) {
      setImportResult(`Import failed: ${error.message}`);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="translation-import-export">
      <div className="export-section">
        <h3>Export Translations</h3>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="btn btn-primary"
        >
          {isExporting ? 'Exporting...' : 'Export to Excel'}
        </button>
      </div>

      <div className="import-section">
        <h3>Import Translations</h3>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleImport}
          disabled={isImporting}
          className="form-control"
        />
        {isImporting && <p>Importing...</p>}
        {importResult && (
          <div className={`alert ${importResult.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
            {importResult}
          </div>
        )}
      </div>
    </div>
  );
};
```

## Testing

### Unit Tests

```typescript
describe('TranslationService Import/Export', () => {
  let service: TranslationService;
  let excelService: jest.Mocked<ExcelService>;

  beforeEach(() => {
    // Setup test dependencies
  });

  describe('export', () => {
    it('should export translations for valid language_id', async () => {
      const params = { language_id: 1 };
      const result = await service.export(params);

      expect(result.key).toBeDefined();
      expect(excelService.exportDataToExcel).toHaveBeenCalled();
    });

    it('should throw error for missing language_id', async () => {
      const params = {};

      await expect(service.export(params)).rejects.toThrow('BAD_REQUEST');
    });
  });

  describe('import', () => {
    it('should import valid translation data', async () => {
      const input = { key: 'test-file.xlsx' };
      const result = await service.import(input);

      expect(result.message).toContain('Created:');
      expect(result.message).toContain('Updated:');
    });

    it('should handle validation errors', async () => {
      // Mock Excel service to return error data
      const input = { key: 'invalid-file.xlsx' };
      const result = await service.import(input);

      expect(result.error_key).toBeDefined();
    });
  });
});
```

### Integration Tests

```typescript
describe('Translation Import/Export Integration', () => {
  it('should complete full export-edit-import cycle', async () => {
    // 1. Export translations
    const exportResult = await request(app)
      .get('/api/admin/translations/export?language_id=1')
      .expect(200);

    // 2. Simulate file modification (create test Excel with changes)
    const modifiedFile = createTestExcelFile([
      { id: 1, value: 'Updated Value', description: 'Updated Description' },
      {
        id: '',
        key: 'new.key',
        value: 'New Value',
        description: 'New Description',
      },
    ]);

    // 3. Import modified file
    const importResult = await request(app)
      .post('/api/admin/translations/import')
      .send({ key: modifiedFile.s3Key })
      .expect(200);

    expect(importResult.body.message).toContain('Created: 1, Updated: 1');
  });
});
```

## Troubleshooting

### Common Issues

1. **"Header validation failed"**

   - Ensure Excel headers match exactly (case-sensitive)
   - Check for extra spaces or special characters

2. **"Language code not found"**

   - Verify language exists and is active in the system
   - Check for typos in language code

3. **"Import failed with database error"**

   - Check for unique constraint violations
   - Verify foreign key relationships

4. **"File not found in S3"**
   - Ensure file was uploaded successfully
   - Check S3 permissions and bucket configuration

### Debug Tips

1. Enable detailed logging for import operations
2. Check S3 access logs for upload/download issues
3. Monitor database query performance for large imports
4. Use error Excel files to identify specific validation failures

## Future Enhancements

### Planned Features

1. **Batch Operations**: Support for multiple language exports
2. **Progress Tracking**: Real-time import progress updates
3. **Template Generation**: Generate blank templates for new languages
4. **Validation Rules**: Custom validation rules per namespace
5. **History Tracking**: Track import/export history and changes

### Performance Improvements

1. **Streaming Import**: Process large files without loading entirely into memory
2. **Parallel Processing**: Process translations in parallel for better performance
3. **Caching**: Cache language validation data for repeated imports
4. **Database Optimization**: Optimize queries for large datasets

This completes the comprehensive documentation for the Translation Import/Export functionality!
