# Debug Guide: Excel File Upload Issue

## Problem

You're getting the error: "File format issue detected. Please try selecting the file again or use a different Excel file." even with a valid Excel file named `translations_data.xlsx`.

## Root Cause Analysis

### 1. **File Object Validation Issue**

The error occurs because the upload component might not be returning a proper `File` object that the S3 service expects.

### 2. **Common Scenarios That Trigger This Error**

- The upload component wraps the file in a custom object
- The MIME type is not set correctly by the browser
- The file object doesn't have the expected properties for S3 upload

## Debug Steps

### Step 1: Check Console Logs

When you try to upload, check the browser console (F12 → Console) for these debug messages:

```
File to upload details: {
  name: "translations_data.xlsx",
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  size: 12345,
  instanceof: true,
  constructor: "File"
}
```

**What to look for:**

- `instanceof: false` - This means it's not a proper File object
- `type: ""` or wrong MIME type - Browser didn't detect Excel format
- `constructor: "Object"` instead of `"File"` - Wrong object type

### Step 2: Check Upload File Object

Look for this console output:

```
Upload file object: { name: "translations_data.xlsx", originFileObj: File, ... }
Has originFileObj: true
Upload file type: object
```

**What to look for:**

- `Has originFileObj: false` - The upload component didn't store the original file
- Missing `originFileObj` property

### Step 3: Check Origin File Details

```
Origin file obj: {
  name: "translations_data.xlsx",
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  size: 12345,
  instanceof: true,
  constructor: "File"
}
```

**What to look for:**

- `instanceof: false` - Not a proper File object
- Missing or wrong `type`
- `constructor` not being "File"

## Quick Fixes to Try

### Fix 1: Clear and Re-select File

1. Click the "×" to remove the currently selected file
2. Select your `translations_data.xlsx` file again
3. Try importing again

### Fix 2: Check File Properties

Make sure your Excel file:

- Has `.xlsx` or `.xls` extension
- Is not corrupted (can you open it in Excel?)
- Is not empty (size > 0 bytes)
- Is under 10MB

### Fix 3: Try Different Browser

Sometimes browser compatibility affects file handling:

- Try Chrome, Firefox, or Safari
- Clear browser cache
- Disable browser extensions temporarily

### Fix 4: Verify File MIME Type

Create a simple test:

1. Open browser console (F12)
2. Create a file input: `<input type="file" accept=".xlsx,.xls" />`
3. Select your file and check: `console.log(file.type, file.name, file.size)`

## Expected vs Actual Behavior

### Expected (Working):

```
File to upload details: {
  name: "translations_data.xlsx",
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  size: 12345,
  instanceof: true
}
```

### Problem Scenarios:

#### Scenario A: Missing MIME Type

```
File to upload details: {
  name: "translations_data.xlsx",
  type: "", // ← PROBLEM: Empty MIME type
  size: 12345,
  instanceof: true
}
```

**Solution:** The file validation now accepts files with `.xlsx` extension even with empty MIME type.

#### Scenario B: Wrong Object Type

```
Upload file object: { name: "translations_data.xlsx", originFileObj: Object }
Origin file obj: {
  instanceof: false, // ← PROBLEM: Not a File object
  constructor: "Object"
}
```

**Solution:** The code now creates a new File object from the data.

#### Scenario C: S3 Upload Error

```
S3 Upload Error: TypeError: readableStream.getReader is not a function
```

**Solution:** This happens when S3 service receives an object that doesn't have the File API methods.

## Advanced Debugging

If the basic fixes don't work, add this temporary code to your component:

```typescript
// Temporary debugging method - add this to your component
debugFileUpload(): void {
  const file = this.getSelectedFile();
  if (file) {
    console.log('=== FILE DEBUG INFO ===');
    console.log('File name:', file.name);
    console.log('File type:', file.type);
    console.log('File size:', file.size);
    console.log('File instanceof File:', file instanceof File);
    console.log('File constructor:', file.constructor.name);
    console.log('File has stream method:', typeof (file as any).stream === 'function');
    console.log('File has arrayBuffer method:', typeof file.arrayBuffer === 'function');
    console.log('=== END DEBUG INFO ===');
  } else {
    console.log('No file selected or file extraction failed');
  }
}
```

Call this method right before upload to see exactly what's wrong with the file object.

## Final Solution Applied

The updated code now:

1. **More Flexible MIME Type Validation**: Accepts files with empty MIME type if they have `.xlsx` extension
2. **Better File Object Handling**: Creates proper File objects from various input formats
3. **Detailed Error Messages**: Shows specific error messages for different scenarios
4. **Comprehensive Logging**: Helps identify exactly where the issue occurs

Try uploading your `translations_data.xlsx` file again and check the console for the debug output to see which scenario you're encountering.
