# File Upload - Quick Reference

## 📦 Import Constants

```typescript
import {
  IMAGE_ACCEPT,
  DOCUMENT_ACCEPT,
  VIDEO_ACCEPT,
  AUDIO_ACCEPT,
  FILE_MAX_SIZE,
} from "@/components/forms/form/consts/file.const";
```

---

## 🎯 Common Patterns

### Single Image

```typescript
{
  name: "image",
  type: "file",
  accept: IMAGE_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.IMAGE,
  listType: "picture-card",
  maxCount: 1,
}
```

### Multiple Documents

```typescript
{
  name: "docs",
  type: "file",
  accept: DOCUMENT_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.DOCUMENT,
  multiple: true,
  maxCount: 5,
  listType: "text",
}
```

### Video

```typescript
{
  name: "video",
  type: "file",
  accept: VIDEO_ACCEPT,
  maxFileSize: FILE_MAX_SIZE.VIDEO,
  listType: "picture",
}
```

---

## 🔧 All Properties

```typescript
{
  type: "file",
  accept: IMAGE_ACCEPT,              // File types
  maxFileSize: FILE_MAX_SIZE.IMAGE,  // Size limit
  multiple: true,                    // Multiple files
  maxCount: 5,                       // Max files
  listType: "picture-card",          // Display style
  uploadToS3: true,                  // Upload to S3 (default: true)
  isPublicFile: true,                // Public file (default: true)
}
```

---

## 📋 List Types

- `"text"` - Simple list
- `"picture"` - With thumbnail
- `"picture-card"` - Card style
- `"picture-circle"` - Avatar style

---

## 💾 File Size Limits

```typescript
FILE_MAX_SIZE.IMAGE; // 5MB
FILE_MAX_SIZE.DOCUMENT; // 10MB
FILE_MAX_SIZE.VIDEO; // 100MB
FILE_MAX_SIZE.AUDIO; // 10MB
```

---

## 🎯 Result Format

### Single File

```javascript
{
  image: "images/2025/10/07/123_photo.jpg";
}
```

### Multiple Files

```javascript
{
  docs: ["docs/.../file1.pdf", "docs/.../file2.docx"];
}
```

---

## 🔍 Upload Flow

1. User selects files → Validated
2. User fills form → Clicks submit
3. Files upload to S3 → Progress shown
4. S3 keys replace files → Console logged
5. Your `onSubmit()` called with keys

---

## ⚡ Quick Start

```typescript
import {
  IMAGE_ACCEPT,
  FILE_MAX_SIZE,
} from "@/components/forms/form/consts/file.const";

const formOptions = {
  controls: [
    {
      name: "avatar",
      label: "Avatar",
      type: "file",
      accept: IMAGE_ACCEPT,
      maxFileSize: FILE_MAX_SIZE.IMAGE,
      listType: "picture-card",
      required: true,
    },
  ],
  onSubmit: (values) => {
    console.log(values);
    // { avatar: "images/2025/10/07/123_avatar.jpg" }
  },
};
```

Done! ✅
