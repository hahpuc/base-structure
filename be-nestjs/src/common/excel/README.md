# Excel Module Documentation

The Excel Module provides comprehensive functionality for importing, validating, processing, and exporting Excel files in NestJS applications. It integrates with AWS S3 for file storage and includes advanced validation capabilities.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
- [Validation System](#validation-system)
- [Export Functionality](#export-functionality)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Best Practices](#best-practices)

## Overview

The Excel Module consists of:

- **ExcelService**: Core service for Excel operations
- **ExcelModule**: Global module for dependency injection
- **Type definitions**: TypeScript interfaces for configuration

## Features

- ✅ **Import Excel files** from AWS S3
- ✅ **Header validation** with customizable mapping
- ✅ **Data extraction** with class transformation
- ✅ **Advanced validation** including async validation
- ✅ **Unique constraint** checking
- ✅ **Error reporting** with internationalization
- ✅ **Export to Excel** with pagination support
- ✅ **S3 integration** for file storage
- ✅ **HTTP streaming** for direct downloads
- ✅ **Styling support** for exported data

## Installation

The module is already configured as a global module. Import it in your feature modules:

```typescript
import { ExcelService } from '@common/excel/services/excel.service';

@Injectable()
export class YourService {
  constructor(private readonly excelService: ExcelService) {}
}
```

## Basic Usage

### Importing Excel Data

```typescript
// Define your DTO class
class UserImportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  department: string;
}

// Import and validate data
const worksheet = await this.excelService.getWorkSheet(s3Key, {
  name: 'Name',
  email: 'Email',
  department: 'Department',
});

const [validData, errorData, validationDict] =
  await this.excelService.extractExcelData(
    UserImportDto,
    worksheet,
    ['name', 'email', 'department'],
    {
      uniqueHeader: { email: [] }, // Ensure unique emails
      asyncValidValues: {
        department: {
          dataSource: async (values) =>
            await this.departmentService.findByNames(values),
          prop: 'name',
        },
      },
    },
  );
```

### Exporting Excel Data

```typescript
// Simple export
const workbook = await this.excelService.exportDataToExcel(
  async (page, limit) => await this.userService.findPaginated(page, limit),
  { name: 'Full Name', email: 'Email Address', createdAt: 'Created Date' },
  'Users Export',
  { createdAt: 'date', name: 'uppercase' }, // Apply styling
);

// Upload to S3
const s3Key = await this.excelService.uploadWorkBookToS3(
  workbook,
  'users_export',
);

// Or stream to response
this.excelService.streamWorkBookToResponse(workbook, response);
```

## API Reference

### ExcelService Methods

#### Import Methods

##### `getWorkSheet(key: string, validHeaders: StringDict): Promise<Worksheet>`

Retrieves and validates an Excel worksheet from S3.

**Parameters:**

- `key`: S3 object key for the Excel file
- `validHeaders`: Object mapping internal field names to Excel headers

**Returns:** ExcelJS Worksheet object

**Throws:** CustomError if file not found or headers invalid

**Example:**

```typescript
const worksheet = await this.excelService.getWorkSheet(
  'uploads/import-file.xlsx',
  { userId: 'User ID', userName: 'User Name' },
);
```

##### `extractExcelData<T>(cls, worksheet, headers, validateOptions?): Promise<[T[], ErrorData[], ValidationDict]>`

Extracts and validates data from Excel worksheet.

**Parameters:**

- `cls`: Class constructor for data transformation
- `worksheet`: ExcelJS Worksheet object
- `headers`: Array of column headers in order
- `validateOptions`: Optional validation configuration

**Returns:** Tuple containing:

- `T[]`: Array of valid, transformed data objects
- `ErrorData[]`: Array of invalid rows with error messages
- `ValidationDict`: Dictionary of validation reference data

**Validation Options:**

```typescript
interface ExcelGetDataOptions {
  uniqueHeader?: StringArrDict; // Fields that must be unique
  asyncValidValues?: AsyncValidationDict; // Async validation rules
}
```

#### Export Methods

##### `exportDataToExcel<T>(dataSource, header, workSheetName, styles?): Promise<Workbook>`

Exports large datasets to Excel with automatic pagination.

**Parameters:**

- `dataSource`: Function that returns paginated data `(page: number, limit: number) => Promise<[T[], number]>`
- `header`: Object mapping data properties to Excel headers
- `workSheetName`: Name for the Excel worksheet
- `styles`: Optional styling configuration

**Returns:** Complete Excel Workbook

**Styling Options:**

- `date`: Format as Vietnamese date
- `uppercase`: Convert to uppercase
- `lowercase`: Convert to lowercase

##### `writeDataToExcel<T>(data, header, workSheetName, styles?, workbook?, count?): Workbook`

Writes data array to Excel worksheet.

**Parameters:**

- `data`: Array of data objects to write
- `header`: Column header mappings
- `workSheetName`: Worksheet name
- `styles`: Optional formatting rules
- `workbook`: Existing workbook (creates new if not provided)
- `count`: Starting row number offset

**Returns:** Excel Workbook

#### Storage Methods

##### `uploadWorkBookToS3(workbook: Workbook, name?: string): Promise<string>`

Uploads Excel workbook to AWS S3.

**Parameters:**

- `workbook`: Excel workbook to upload
- `name`: Optional custom filename (defaults to timestamp + worksheet name)

**Returns:** S3 object key/URL

##### `streamWorkBookToResponse(workbook: Workbook, res: Response): void`

Streams Excel file directly to HTTP response for download.

**Parameters:**

- `workbook`: Excel workbook to stream
- `res`: Express Response object

**Side Effects:** Sets appropriate headers and streams file to client

#### Utility Methods

##### `validateExcelHeader(header: string[], validHeader: string[]): void`

Validates Excel headers match expected format.

**Parameters:**

- `header`: Actual headers from Excel file
- `validHeader`: Expected headers

**Throws:** CustomError if headers don't match (case-insensitive)

##### `getExcelHeaders(worksheet: Worksheet): string[]`

Extracts headers from first row of worksheet.

**Parameters:**

- `worksheet`: ExcelJS Worksheet object

**Returns:** Array of header strings

## Validation System

The Excel module includes a sophisticated validation system:

### Class Validator Integration

Uses `class-validator` decorators for standard validation:

```typescript
class ImportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  age: number;
}
```

### Unique Constraints

Ensures field uniqueness within the import:

```typescript
const options = {
  uniqueHeader: {
    email: [], // Will be populated during validation
    phoneNumber: [], // Multiple fields can be unique
  },
};
```

### Async Validation

Validates against database or external data sources:

```typescript
const options = {
  asyncValidValues: {
    departmentCode: {
      dataSource: async (codes) =>
        await this.departmentService.findByCodes(codes),
      prop: 'code', // Property to match against
      customValidate: (data, departments) => {
        // Optional custom validation logic
        return departments.some(
          (dept) => dept.code === data.departmentCode && dept.active,
        );
      },
      errorConstraints: 'isInactiveDepartment', // Custom error constraint
    },
  },
};
```

### Error Messages

Errors are internationalized and formatted:

```typescript
// Error output example
{
  name: "John Doe",
  email: "invalid-email",
  errors: "Email must be a valid email address, Department code is invalid"
}
```

## Export Functionality

### Large Dataset Export

Handles large datasets efficiently with pagination:

```typescript
const dataSource = async (page: number, limit: number) => {
  const [data, total] = await this.userService.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });
  return [data, total];
};

const workbook = await this.excelService.exportDataToExcel(
  dataSource,
  { id: 'ID', name: 'Name', email: 'Email' },
  'Users',
);
```

### Styling Support

Apply formatting to exported data:

```typescript
const styles = {
  createdAt: 'date', // Format as Vietnamese date
  status: 'uppercase', // Convert to uppercase
  email: 'lowercase', // Convert to lowercase
};
```

### Multiple Export Options

1. **S3 Upload**: For background processing
2. **HTTP Streaming**: For immediate download
3. **Return Workbook**: For further processing

## Error Handling

The module throws `CustomError` exceptions with:

- HTTP status codes
- Error codes for client handling
- Internationalized messages

Common error scenarios:

- File not found in S3
- Invalid Excel format
- Header mismatch
- Validation failures

## Examples

### Complete Import Example

```typescript
@Controller('users')
export class UserController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('import')
  async importUsers(@Body() { s3Key }: ImportRequestDto) {
    try {
      // Get worksheet with header validation
      const worksheet = await this.excelService.getWorkSheet(s3Key, {
        name: 'Full Name',
        email: 'Email Address',
        departmentCode: 'Department',
      });

      // Extract and validate data
      const [validUsers, errorUsers, validationDict] =
        await this.excelService.extractExcelData(
          UserImportDto,
          worksheet,
          ['name', 'email', 'departmentCode'],
          {
            uniqueHeader: { email: [] },
            asyncValidValues: {
              departmentCode: {
                dataSource: async (codes) =>
                  await this.departmentService.findByCodes(codes),
                prop: 'code',
              },
            },
          },
        );

      // Process valid data
      if (validUsers.length > 0) {
        await this.userService.createMany(
          validUsers.map((user) => ({
            ...user,
            department: validationDict.departmentCode[user.departmentCode],
          })),
        );
      }

      // Handle errors
      if (errorUsers.length > 0) {
        const errorWorkbook = this.excelService.writeDataToExcel(
          errorUsers,
          { name: 'Name', email: 'Email', errors: 'Errors' },
          'Import Errors',
        );

        const errorFileKey = await this.excelService.uploadWorkBookToS3(
          errorWorkbook,
          'import_errors',
        );

        return {
          success: true,
          imported: validUsers.length,
          errors: errorUsers.length,
          errorFileKey,
        };
      }

      return {
        success: true,
        imported: validUsers.length,
        errors: 0,
      };
    } catch (error) {
      throw error;
    }
  }
}
```

### Complete Export Example

```typescript
@Controller('users')
export class UserController {
  @Get('export')
  async exportUsers(@Res() res: Response) {
    const workbook = await this.excelService.exportDataToExcel(
      async (page, limit) => {
        const [users, total] = await this.userService.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
          relations: ['department'],
        });

        return [
          users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            department: user.department?.name,
            createdAt: user.createdAt,
            status: user.status,
          })),
          total,
        ];
      },
      {
        id: 'ID',
        name: 'Full Name',
        email: 'Email Address',
        department: 'Department',
        createdAt: 'Created Date',
        status: 'Status',
      },
      'Users Export',
      {
        createdAt: 'date',
        status: 'uppercase',
        email: 'lowercase',
      },
    );

    this.excelService.streamWorkBookToResponse(workbook, res);
  }
}
```

## Best Practices

### 1. DTO Design

- Use class-validator decorators
- Include proper type definitions
- Add optional fields where appropriate

### 2. Header Mapping

- Use descriptive Excel headers
- Keep internal field names consistent
- Consider internationalization

### 3. Validation Strategy

- Validate critical fields synchronously
- Use async validation for reference data
- Implement proper error handling

### 4. Performance Optimization

- Use pagination for large exports
- Limit async validation queries
- Consider caching reference data

### 5. Error Handling

- Provide clear error messages
- Include row numbers in errors
- Offer error file downloads

### 6. Security

- Validate file types and sizes
- Sanitize input data
- Implement proper access controls

### 7. Memory Management

- Process large files in chunks
- Clean up temporary resources
- Monitor memory usage

## Type Definitions

### Core Types

```typescript
// Basic types
type StringDict = { [key: string]: string };
type StringArrDict = { [key: string]: string[] };
type AnyDict = { [key: string]: any };

// Validation types
interface ExcelGetDataOptions {
  uniqueHeader?: StringArrDict;
  asyncValidValues?: ExcelAsyncValidValueOptionsDict;
}

interface ExcelAsyncValidValueOptions {
  dataSource: (rawValues: string[]) => Promise<any[]>;
  prop: string;
  customValidate?: (value: any, dataSource: any[]) => boolean;
  errorConstraints?: string;
}

type ExcelAsyncValidData =
  | string[]
  | {
      dataSource: any[];
      customValidate?: (data: any, dataSource: any[]) => boolean;
      errorConstraints?: string;
    };
```

This documentation covers all aspects of the Excel module, providing comprehensive guidance for implementation and usage.
