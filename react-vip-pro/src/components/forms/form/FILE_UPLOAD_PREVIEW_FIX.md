# File Upload Preview Fix

## Problem

When editing a record (e.g., blog post) with file upload fields (e.g., thumbnail), the image preview was not showing in the UI even though the S3 key was present in the API response data.

## Root Cause

The `useFormInitialization` hook was only processing date/time fields but **not file type fields**. When `initialData` contained an S3 key string (e.g., `"uploads/blog/thumbnail.jpg"`), it was:

1. ✅ Set to the form value correctly
2. ❌ NOT converted to `UploadFile` objects for the UI preview
3. ❌ NOT updating the `fileListState` which controls the upload component's preview

## Solution

Updated `useFormInitialization.ts` to:

### 1. Added File Processing Logic

```typescript
case "file":
  // Convert S3 key(s) to UploadFile objects for preview
  if (typeof value === "string") {
    const uploadFile = convertS3KeyToUploadFile(value, 0);
    fileListUpdates[control.name] = [uploadFile];
    processed[control.name] = value; // Keep S3 key in form value
  } else if (Array.isArray(value)) {
    const uploadFiles = value
      .filter((item) => typeof item === "string")
      .map((key, index) => convertS3KeyToUploadFile(key, index));
    fileListUpdates[control.name] = uploadFiles;
    processed[control.name] = value; // Keep array of S3 keys
  }
  break;
```

### 2. Added Helper Function

```typescript
const convertS3KeyToUploadFile = useCallback(
  (key: string, index: number = 0): UploadFile => {
    const fileName = key.split("/").pop() || key;
    return {
      uid: `${Date.now()}-${index}`,
      name: fileName,
      status: "done",
      url: getMediaUrl(key),
      thumbUrl: getMediaUrl(key),
    };
  },
  []
);
```

### 3. Update FileListState

```typescript
// Update fileListState with converted UploadFile objects
if (Object.keys(fileListUpdates).length > 0) {
  setFileListState((prev) => ({
    ...prev,
    ...fileListUpdates,
  }));
}
```

## Files Modified

1. **`hooks/useFormInitialization.ts`**

   - Added `setFileListState` parameter
   - Added `convertS3KeyToUploadFile` helper function
   - Added file processing in `processInitialData`
   - Import `UploadFile` from antd and `getMediaUrl` from utils

2. **`form.component.tsx`**
   - Passed `setFileListState` to `useFormInitialization` hook

## Result

Now when editing a record:

- ✅ S3 keys are converted to `UploadFile` objects with preview URLs
- ✅ Thumbnail images display correctly in the upload component
- ✅ Form value still contains the S3 key string (for submission)
- ✅ Supports both single file and multiple files
- ✅ Handles arrays of S3 keys correctly

## Testing

Test with `create-edit-blog-post.page.tsx`:

1. Create a new blog post with thumbnail → uploads work
2. Edit existing blog post → thumbnail preview now shows ✅
3. Replace thumbnail → new upload works
4. Submit form → S3 keys are submitted correctly
