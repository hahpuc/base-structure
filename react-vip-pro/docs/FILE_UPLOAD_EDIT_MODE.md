# File Upload in Edit Mode - Implementation Guide

## 🎯 Overview

The Form Component now fully supports **file upload in edit mode**, displaying existing images/files loaded from S3 when editing records. This guide explains how the system handles both new file uploads and existing S3 files.

---

## 🚀 Features

### ✅ Edit Mode Support

1. **Load Existing Files** - Display file previews from S3 keys when editing
2. **Mixed Values** - Handle both existing S3 files and new uploads
3. **Preserve Existing Files** - Keep unchanged files during updates
4. **Replace Files** - Upload new files to replace old ones
5. **Multiple Files** - Support editing with multiple files (add/remove/replace)

---

## 🔧 How It Works

### 1. Loading Existing Files (Edit Mode)

When the form loads with initial data containing S3 keys:

```typescript
// Example API response
{
  id: 3,
  title: "My Blog Post",
  thumbnail: "images/2025/10/07/1759828152443_photo.png", // S3 key
  attachments: [
    "docs/2025/10/07/file1.pdf",
    "docs/2025/10/07/file2.docx"
  ]
}
```

**The form component automatically:**

1. **Detects S3 keys** - Identifies string values in file fields
2. **Converts to UploadFile objects** - Creates preview-ready objects:
   ```typescript
   {
     uid: "unique-id",
     name: "photo.png",
     status: "done",
     url: "https://your-s3-bucket.com/images/2025/10/07/1759828152443_photo.png",
     thumbUrl: "https://your-s3-bucket.com/images/2025/10/07/1759828152443_photo.png"
   }
   ```
3. **Displays previews** - Shows images/files in the upload component
4. **Preserves S3 keys** - Maintains original keys in form values

### 2. Helper Function: `convertS3KeyToUploadFile`

```typescript
const convertS3KeyToUploadFile = useCallback(
  (key: string, index: number = 0): UploadFile => {
    const fileName = key.split("/").pop() || key;
    return {
      uid: `${Date.now()}-${index}`,
      name: fileName,
      status: "done",
      url: getMediaUrl(key), // Converts key to full URL
      thumbUrl: getMediaUrl(key),
    };
  },
  []
);
```

**Usage:**

- Input: `"images/2025/10/07/photo.png"` (S3 key)
- Output: UploadFile object with full preview URL

### 3. Processing Initial Data

The `processInitialData` function handles file fields:

```typescript
case "file":
  if (typeof value === "string") {
    // Single file - convert S3 key to UploadFile
    const uploadFile = convertS3KeyToUploadFile(value, 0);
    setFileListState((prev) => ({
      ...prev,
      [control.name]: [uploadFile],
    }));
    processed[control.name] = value; // Keep S3 key in form
  } else if (Array.isArray(value)) {
    // Multiple files - convert each S3 key
    const uploadFiles = value
      .filter((v): v is string => typeof v === "string")
      .map((key, index) => convertS3KeyToUploadFile(key, index));
    setFileListState((prev) => ({
      ...prev,
      [control.name]: uploadFiles,
    }));
    processed[control.name] = value; // Keep S3 keys array
  }
  break;
```

### 4. Handling User Actions (onChange/onRemove)

When users interact with the upload component:

**Adding a new file:**

```typescript
onChange: ({ fileList }) => {
  const values = fileList
    .map((f) => {
      if (f.originFileObj) {
        return f.originFileObj; // New File object
      }
      if (f.url) {
        // Existing S3 file - extract key from URL
        const url = f.url;
        if (url.includes(env.s3.publicUrl)) {
          return url.replace(env.s3.publicUrl + "/", ""); // S3 key
        }
        return url;
      }
      return null;
    })
    .filter((v): v is RcFile | string => v !== null);

  form.setFieldValue(control.name, control.multiple ? values : values[0]);
};
```

**Result:** Form value contains mix of File objects and S3 keys:

```typescript
{
  thumbnail: "images/2025/10/07/old-photo.png", // Existing (unchanged)
  attachments: [
    "docs/2025/10/07/old-file1.pdf", // Existing (unchanged)
    File { name: "new-file.pdf", ... } // New upload
  ]
}
```

### 5. Form Submission with Mixed Values

When submitting the form:

```typescript
// Step 1: Separate existing S3 keys from new File objects
const filesToUpload = []; // Only File objects
const existingKeys = {}; // Only S3 key strings

// Step 2: Upload only new files to S3
for (const file of filesToUpload) {
  const key = await S3Service.uploadFileSync(file, isPublic, onProgress);
  uploadResults[control.name] = key;
}

// Step 3: Merge existing keys with new keys
Object.keys(uploadResults).forEach((controlName) => {
  const control = fileControls.find((c) => c.name === controlName);
  const newKeys = uploadResults[controlName];
  const existing = existingKeys[controlName];

  if (control?.multiple) {
    // Combine existing and new keys
    const existingArray = Array.isArray(existing) ? existing : [];
    const newArray = Array.isArray(newKeys) ? newKeys : [newKeys];
    processedValues[controlName] = [...existingArray, ...newArray];
  } else {
    // Replace old key with new key
    processedValues[controlName] = newKeys;
  }
});

// Step 4: Preserve controls with only existing keys
Object.keys(existingKeys).forEach((controlName) => {
  if (!uploadResults[controlName]) {
    processedValues[controlName] = existingKeys[controlName];
  }
});
```

**Final form values sent to API:**

```typescript
{
  title: "Updated Blog Post",
  thumbnail: "images/2025/10/07/NEW_photo.png", // Replaced with new upload
  attachments: [
    "docs/2025/10/07/old-file1.pdf", // Kept existing
    "docs/2025/10/07/NEW_file.pdf" // Added new upload
  ]
}
```

---

## 📝 Example Usage

### Single File Upload (Replace Existing)

```typescript
{
  name: "thumbnail",
  label: "Thumbnail",
  type: "file",
  accept: IMAGE_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.IMAGE,
  listType: "picture",
  maxCount: 1,
}
```

**Edit Mode Behavior:**

1. Loads existing thumbnail from S3 key
2. Shows preview image
3. User can upload new file to replace it
4. New file uploads to S3
5. Form submits with new S3 key (old file remains in S3)

### Multiple Files Upload (Add/Remove/Replace)

```typescript
{
  name: "attachments",
  label: "Documents",
  type: "file",
  accept: DOCUMENT_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.DOCUMENT,
  multiple: true,
  maxCount: 10,
  listType: "text",
}
```

**Edit Mode Behavior:**

1. Loads all existing files from S3 keys array
2. Shows list of file names with previews
3. User can:
   - Remove existing files
   - Add new files
   - Keep some, replace others
4. Only new files upload to S3
5. Form submits with array of S3 keys (existing + new)

---

## 🎨 User Experience

### Loading Existing Files

**Before (old behavior):**

- ❌ No preview shown in edit mode
- ❌ Upload component appears empty
- ❌ User doesn't know what file is currently set

**After (new behavior):**

- ✅ Preview shown automatically
- ✅ File name displayed
- ✅ User can see existing file
- ✅ Can download/view existing file
- ✅ Can remove or replace it

### Uploading New Files

**Single file:**

1. Click "Remove" to delete existing file
2. Click "Upload" to add new file
3. New file replaces old one

**Multiple files:**

1. Existing files shown in list
2. Click "X" to remove any file
3. Click "Upload" to add more files
4. Submit combines existing + new

---

## 🔍 Technical Details

### Key Functions

1. **`convertS3KeyToUploadFile(key, index)`**

   - Converts S3 key string to UploadFile object
   - Generates full URL using `getMediaUrl()`
   - Creates unique UID for React key

2. **`processInitialData(data)`**

   - Processes file fields in initial form data
   - Converts S3 keys to UploadFile objects
   - Initializes fileListState for previews

3. **`onChange` handler**

   - Handles both File objects and S3 keys
   - Extracts S3 keys from URLs when needed
   - Updates form values with mixed types

4. **`handleSubmit`**
   - Separates existing keys from new files
   - Uploads only new File objects
   - Merges existing and new S3 keys
   - Preserves unchanged files

### State Management

```typescript
// File list for Upload component display
const [fileListState, setFileListState] = useState<
  Record<string, UploadFile[]>
>({});

// Form values (mix of File and string)
formValues = {
  thumbnail: "images/old.png" | File,
  attachments: ["docs/file1.pdf", File, "docs/file2.pdf"],
};
```

---

## ✨ Summary

### What You Get:

✅ **Edit Mode Support** - Load and display existing files from S3  
✅ **Preview Display** - Show images/files in edit mode  
✅ **Mixed Values** - Handle both existing S3 keys and new uploads  
✅ **Smart Upload** - Only upload new files, keep existing ones  
✅ **Replace/Add/Remove** - Full control over file management  
✅ **Progress Tracking** - Visual progress for new uploads only

### Form Submission Flow:

```
Edit Mode
  ↓
Load S3 keys → Convert to UploadFile → Show previews
  ↓
User edits (add/remove/replace files)
  ↓
Submit form
  ↓
Separate: Existing keys | New files
  ↓
Upload only new files → Get new S3 keys
  ↓
Merge: Existing keys + New keys
  ↓
Send to API (all S3 keys, no File objects)
```

---

## 🎯 Best Practices

1. **Always use `getMediaUrl()`** - Convert S3 keys to full URLs for display
2. **Preserve existing files** - Don't delete unless user explicitly removes
3. **Upload only new files** - Don't re-upload existing files
4. **Handle both types** - File objects (new) and strings (existing)
5. **Show clear previews** - Let users see what's currently uploaded

---

**Need help? Check the example in `/src/pages/articles/blog-post/create-edit/create-edit-blog-post.page.tsx`** 🚀
