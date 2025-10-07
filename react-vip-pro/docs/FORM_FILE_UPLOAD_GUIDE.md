# Form File Upload with S3 Integration - Documentation

## 🎯 Overview

The Form Component now supports **automatic file uploads to S3** with built-in validation, progress tracking, and seamless integration. Files are uploaded to S3 when the form is submitted, and the S3 keys are automatically injected into the form values.

---

## 🚀 Features

### ✅ Implemented Features

1. **File Type Validation** - Restrict uploads by MIME type and file extension
2. **File Size Validation** - Set maximum file size limits
3. **Multiple File Upload** - Support single or multiple file selection
4. **S3 Integration** - Automatic upload to S3 on form submission
5. **Progress Feedback** - Loading messages during upload
6. **File Preview** - Visual preview with different list types (text, picture, picture-card)
7. **Pre-configured Constants** - Ready-to-use file type definitions

---

## 📁 File Structure

```
src/components/forms/form/
├── consts/
│   └── file.const.ts          # File type definitions and helpers
├── models/
│   └── form.model.ts          # Updated with file upload properties
└── form.component.tsx         # File upload implementation
```

---

## 🔧 Configuration

### 1. File Constants (file.const.ts)

Pre-defined file type constants:

```typescript
// Import available constants
import {
  IMAGE_ACCEPT,
  DOCUMENT_ACCEPT,
  VIDEO_ACCEPT,
  AUDIO_ACCEPT,
  ALL_FILES_ACCEPT,
  FILE_MAX_SIZE,
} from "@/components/forms/form/consts/file.const";

// Available file type constants:
IMAGE_ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
  "image/svg+xml": [".svg"],
};

DOCUMENT_ACCEPT = {
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

VIDEO_ACCEPT = {
  "video/mp4": [".mp4"],
  "video/mpeg": [".mpeg"],
  "video/quicktime": [".mov"],
  "video/x-msvideo": [".avi"],
  "video/x-ms-wmv": [".wmv"],
  "video/webm": [".webm"],
};

FILE_MAX_SIZE = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  AUDIO: 10 * 1024 * 1024, // 10MB
  DEFAULT: 5 * 1024 * 1024, // 5MB
};
```

### 2. Form Control Properties

New properties for file upload controls:

```typescript
{
  type: "file",
  accept?: Record<string, string[]>,  // File type restrictions
  maxFileSize?: number,                // Max size in bytes
  maxCount?: number,                   // Max number of files
  multiple?: boolean,                  // Allow multiple files
  listType?: "text" | "picture" | "picture-card" | "picture-circle",
  uploadToS3?: boolean,                // Upload to S3 (default: true)
  isPublicFile?: boolean,              // Make files public (default: true)
}
```

---

## 💡 Usage Examples

### Example 1: Single Image Upload

```typescript
{
  name: "profile_image",
  label: "Profile Image",
  type: "file",
  required: true,
  accept: IMAGE_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.IMAGE,
  listType: "picture-card",
  maxCount: 1,
  rules: [createValidationRules.required()],
}
```

**Result:**

- Only image files accepted (jpg, png, gif, webp, svg)
- Max 5MB per file
- Picture card preview
- Single file only
- Uploaded to S3 on form submit
- Form value will be: `{ profile_image: "images/2025/10/07/123456_photo.jpg" }`

### Example 2: Multiple Document Upload

```typescript
{
  name: "attachments",
  label: "Documents",
  type: "file",
  accept: DOCUMENT_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.DOCUMENT,
  multiple: true,
  maxCount: 5,
  listType: "text",
}
```

**Result:**

- PDF, Word, Excel, PowerPoint accepted
- Max 10MB per file
- Up to 5 files
- Text list display
- Form value will be: `{ attachments: ["docs/2025/10/07/123_file1.pdf", "docs/2025/10/07/124_file2.docx"] }`

### Example 3: Video Upload

```typescript
{
  name: "video",
  label: "Upload Video",
  type: "file",
  accept: VIDEO_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.VIDEO,
  listType: "picture",
  maxCount: 1,
}
```

**Result:**

- MP4, MOV, AVI, WebM accepted
- Max 100MB
- Picture preview with play icon
- Form value will be: `{ video: "videos/2025/10/07/123456_demo.mp4" }`

### Example 4: Custom File Types

```typescript
{
  name: "custom_files",
  label: "Custom Files",
  type: "file",
  accept: {
    "application/json": [".json"],
    "text/xml": [".xml"],
  },
  maxFileSize: 2 * 1024 * 1024, // 2MB
  multiple: true,
}
```

---

## 🔄 Upload Flow

### Automatic Upload Process

```
1. User selects file(s)
   ↓
2. Client-side validation (type & size)
   ↓
3. File stored in component state
   ↓
4. User fills other form fields
   ↓
5. User clicks Submit
   ↓
6. Form validation runs
   ↓
7. Files automatically uploaded to S3 (with progress messages)
   ↓
8. File objects replaced with S3 keys
   ↓
9. Form values logged to console
   ↓
10. onSubmit callback called with S3 keys
```

### Console Output Example

```javascript
=== FORM SUBMISSION ===
Form values (validated): {
  name: "John Doe",
  email: "john@example.com",
  profile_image: "images/2025/10/07/1728307200000_profile.jpg",
  documents: [
    "documents/2025/10/07/1728307201000_resume.pdf",
    "documents/2025/10/07/1728307202000_portfolio.docx"
  ],
  video: "videos/2025/10/07/1728307203000_intro.mp4"
}
======================
```

---

## ⚙️ Configuration Options

### Control S3 Upload Behavior

#### Disable S3 Upload (Manual Handling)

```typescript
{
  name: "temp_file",
  type: "file",
  uploadToS3: false,  // Keep as File object
}
```

#### Private File Upload

```typescript
{
  name: "private_document",
  type: "file",
  accept: DOCUMENT_ACCEPT,
  isPublicFile: false,  // Upload as private
}
```

---

## 📊 List Type Options

### 1. `listType: "text"` (Default)

- Simple text list with file names
- Best for: Documents, general files

### 2. `listType: "picture"`

- Shows thumbnail preview for images
- Best for: Images, videos

### 3. `listType: "picture-card"`

- Card-style preview with upload button
- Best for: Profile pictures, featured images

### 4. `listType: "picture-circle"`

- Circular preview (for avatars)
- Best for: User avatars

---

## 🚨 Validation & Error Handling

### Automatic Validations

1. **File Type Check**

   ```
   ❌ Error: "File type not accepted. Allowed types: .jpg, .jpeg, .png, .gif"
   ```

2. **File Size Check**

   ```
   ❌ Error: "File size exceeds maximum 5 MB"
   ```

3. **Upload Failure**
   ```
   ❌ Error: "Failed to upload file: Network error"
   ```

### Success Messages

```
✅ "profile.jpg uploaded successfully"
✅ "document.pdf uploaded successfully"
```

---

## 🎨 Customization

### Helper Functions Available

```typescript
import {
  getAcceptString,
  isValidFileType,
  isValidFileSize,
  formatFileSize,
} from "@/components/forms/form/consts/file.const";

// Get accept string for HTML input
const acceptStr = getAcceptString(IMAGE_ACCEPT);
// Result: "image/jpeg,.jpg,.jpeg,image/png,.png,image/gif,.gif"

// Validate file type
const isValid = isValidFileType(file, IMAGE_ACCEPT);

// Validate file size
const sizeOk = isValidFileSize(file, 5 * 1024 * 1024);

// Format file size for display
const sizeText = formatFileSize(5242880);
// Result: "5 MB"
```

---

## 🔐 Security Considerations

### Client-Side Validation

✅ File type checked by MIME type AND extension  
✅ File size validated before upload  
✅ Max file count enforced

### Server-Side Validation (Recommended)

⚠️ Always validate on server:

- Re-check file types
- Scan for viruses
- Verify file contents match extension
- Check user permissions

---

## 📝 Complete Example

```typescript
const formOptions: FormOption = {
  controls: [
    // Text field
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },

    // Single image upload
    {
      name: "thumbnail",
      label: "Thumbnail Image",
      type: "file",
      accept: IMAGE_ACCEPT,
      maxFileSize: FILE_MAX_SIZE.IMAGE,
      listType: "picture-card",
      maxCount: 1,
      required: true,
    },

    // Multiple document upload
    {
      name: "attachments",
      label: "Attachments",
      type: "file",
      accept: DOCUMENT_ACCEPT,
      maxFileSize: FILE_MAX_SIZE.DOCUMENT,
      multiple: true,
      maxCount: 5,
      listType: "text",
    },

    // Video upload
    {
      name: "demo_video",
      label: "Demo Video",
      type: "file",
      accept: VIDEO_ACCEPT,
      maxFileSize: FILE_MAX_SIZE.VIDEO,
      listType: "picture",
      maxCount: 1,
    },
  ],
  onSubmit: async (values) => {
    console.log("Submitted with S3 keys:", values);
    // values.thumbnail = "images/2025/10/07/123_thumb.jpg"
    // values.attachments = ["documents/2025/10/07/124_doc1.pdf", ...]
    // values.demo_video = "videos/2025/10/07/125_demo.mp4"
  },
};
```

---

## 🐛 Troubleshooting

### Issue: Files not uploading

**Check:**

1. S3 credentials configured in `.env`
2. `uploadToS3` not set to `false`
3. Network connectivity
4. S3 bucket permissions

### Issue: File type validation failing

**Check:**

1. File has correct extension
2. MIME type matches accept list
3. File is not corrupted

### Issue: Upload progress not showing

**Check:**

1. Form is in loading state
2. Console for upload messages
3. Network tab in DevTools

---

## ✨ Summary

### What You Get:

✅ **Automatic S3 Upload** - Files uploaded on form submit  
✅ **Built-in Validation** - Type & size checks  
✅ **Progress Feedback** - Loading & success messages  
✅ **Clean Integration** - S3 keys replace File objects  
✅ **Pre-configured** - Ready-to-use file type constants  
✅ **Flexible** - Single/multiple, public/private options

### Form Submission Result:

```javascript
{
  // Regular fields
  name: "John Doe",
  email: "john@example.com",

  // Files replaced with S3 keys
  profile_image: "images/2025/10/07/123_profile.jpg",
  documents: ["docs/2025/10/07/124_resume.pdf", "docs/2025/10/07/125_cover.pdf"],
  video: "videos/2025/10/07/126_intro.mp4"
}
```

All values are **validated** and logged to the console before calling your `onSubmit` handler! 🎉

---

## 📦 Next Steps

1. **Configure S3** - Set up `.env` with S3 credentials
2. **Test Upload** - Try the dynamic forms page
3. **Check Console** - See validated form values with S3 keys
4. **Customize** - Add your own file type combinations
5. **Backend Integration** - Use S3 keys in your API calls

---

**Need help? Check the example in `/src/pages/forms-antd/dynamic-forms.page.tsx`** 🚀
