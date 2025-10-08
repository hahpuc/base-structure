import { useCallback } from "react";
import { message } from "antd";
import { FormOption, FtFormControl } from "../models/form.model";
import { S3Service } from "@/services/s3/s3.service";
import { FileUploadProgress } from "../components/upload-progress-dialog";

interface UseFormSubmitProps {
  formOptions: FormOption;
  setLoading: (loading: boolean) => void;
  setUploadProgressVisible: (visible: boolean) => void;
  setUploadProgressFiles: React.Dispatch<
    React.SetStateAction<FileUploadProgress[]>
  >;
}

export const useFormSubmit = ({
  formOptions,
  setLoading,
  setUploadProgressVisible,
  setUploadProgressFiles,
}: UseFormSubmitProps) => {
  // Handle form submission with file upload to S3
  const handleSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      if (!formOptions.onSubmit) return;

      setLoading(true);
      try {
        // Step 1: Upload files to S3 and replace File objects with S3 keys
        const processedValues = { ...values };
        const fileControls = formOptions.controls.filter(
          (control) => control.type === "file"
        );

        // Collect all files that need to be uploaded
        const filesToUpload: Array<{
          control: FtFormControl;
          file: File;
        }> = [];

        for (const control of fileControls) {
          const fieldValue = processedValues[control.name];

          if (!fieldValue) continue;

          const uploadToS3 = control.uploadToS3 !== false;
          if (!uploadToS3) continue;

          if (Array.isArray(fieldValue)) {
            fieldValue.forEach((file) => {
              if (file instanceof File) {
                filesToUpload.push({ control, file });
              }
            });
          } else if (fieldValue instanceof File) {
            filesToUpload.push({ control, file: fieldValue });
          }
        }

        // If there are files to upload, show progress dialog
        if (filesToUpload.length > 0) {
          // Initialize progress state
          const initialProgress: FileUploadProgress[] = filesToUpload.map(
            ({ file }) => ({
              fileName: file.name,
              progress: 0,
              status: "pending" as const,
            })
          );

          setUploadProgressFiles(initialProgress);
          setUploadProgressVisible(true);

          // Upload files with progress tracking
          const uploadResults: Record<string, string | string[]> = {};

          for (let i = 0; i < filesToUpload.length; i++) {
            const { control, file } = filesToUpload[i];
            const isPublic = control.isPublicFile !== false;

            // Update status to uploading
            setUploadProgressFiles((prev) =>
              prev.map((item, index) =>
                index === i ? { ...item, status: "uploading" as const } : item
              )
            );

            try {
              const key = await S3Service.uploadFileSync(
                file,
                isPublic,
                (progress) => {
                  // Update progress
                  setUploadProgressFiles((prev) =>
                    prev.map((item, index) =>
                      index === i ? { ...item, progress } : item
                    )
                  );
                }
              );

              // Update status to success
              setUploadProgressFiles((prev) =>
                prev.map((item, index) =>
                  index === i
                    ? { ...item, status: "success" as const, progress: 100 }
                    : item
                )
              );

              // Store the result
              if (!uploadResults[control.name]) {
                uploadResults[control.name] = control.multiple ? [] : "";
              }

              if (control.multiple) {
                (uploadResults[control.name] as string[]).push(key);
              } else {
                uploadResults[control.name] = key;
              }
            } catch (error) {
              // Update status to error
              setUploadProgressFiles((prev) =>
                prev.map((item, index) =>
                  index === i
                    ? {
                        ...item,
                        status: "error" as const,
                        error:
                          error instanceof Error
                            ? error.message
                            : "Upload failed",
                      }
                    : item
                )
              );

              console.error(`Failed to upload file ${file.name}:`, error);
              message.error(
                `Failed to upload ${file.name}: ${
                  error instanceof Error ? error.message : "Unknown error"
                }`
              );

              // Don't close dialog on error, let user see what failed
              setLoading(false);
              return;
            }
          }

          // Replace file values with S3 keys
          Object.keys(uploadResults).forEach((controlName) => {
            processedValues[controlName] = uploadResults[controlName];
          });

          // Keep dialog open for a moment to show completion
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Step 2: Log the processed form values with S3 keys
        console.log("=== FORM SUBMISSION ===");
        console.log("Form values (validated):", processedValues);
        console.log("======================");

        // Step 3: Call the original onSubmit handler
        await formOptions.onSubmit(processedValues);
      } catch (error) {
        console.error("Form submission error:", error);
        message.error("Form submission failed");
      } finally {
        setLoading(false);
      }
    },
    [formOptions, setLoading, setUploadProgressVisible, setUploadProgressFiles]
  );

  // Handle validation errors
  const handleSubmitFailed = useCallback((errorInfo: unknown) => {
    console.log("Validation failed:", errorInfo);
  }, []);

  return {
    handleSubmit,
    handleSubmitFailed,
  };
};
