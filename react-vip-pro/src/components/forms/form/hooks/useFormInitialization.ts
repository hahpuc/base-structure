import { useEffect, useCallback } from "react";
import { FormInstance, UploadFile } from "antd";
import dayjs from "dayjs";
import { FormOption } from "../models/form.model";
import { getMediaUrl } from "@/utils/media.util";

interface UseFormInitializationProps {
  form: FormInstance;
  formOptions: FormOption;
  setFormValues: (values: Record<string, unknown>) => void;
  setFileListState: (
    updater:
      | Record<string, UploadFile[]>
      | ((prev: Record<string, UploadFile[]>) => Record<string, UploadFile[]>)
  ) => void;
}

export const useFormInitialization = ({
  form,
  formOptions,
  setFormValues,
  setFileListState,
}: UseFormInitializationProps) => {
  // Helper function to convert S3 key to UploadFile object
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

  // Process initial data for special field types (date, datetime, time, file)
  const processInitialData = useCallback(
    (data: Record<string, unknown>): Record<string, unknown> => {
      const processed = { ...data };
      const fileListUpdates: Record<string, UploadFile[]> = {};

      formOptions.controls.forEach((control) => {
        const value = processed[control.name];
        if (value !== undefined && value !== null) {
          switch (control.type) {
            case "date":
            case "datetime":
              if (typeof value === "string" || typeof value === "number") {
                processed[control.name] = dayjs(value);
              }
              break;
            case "time":
              if (typeof value === "string") {
                processed[control.name] = dayjs(
                  value,
                  control.format || "HH:mm:ss"
                );
              }
              break;
            case "file":
              // Convert S3 key(s) to UploadFile objects for preview
              if (typeof value === "string") {
                const uploadFile = convertS3KeyToUploadFile(value, 0);
                fileListUpdates[control.name] = [uploadFile];
                // Keep the form value as the S3 key string
                processed[control.name] = value;
              } else if (Array.isArray(value)) {
                const uploadFiles = value
                  .filter((item) => typeof item === "string")
                  .map((key, index) => convertS3KeyToUploadFile(key, index));
                fileListUpdates[control.name] = uploadFiles;
                // Keep the form value as array of S3 key strings
                processed[control.name] = value;
              }
              break;
          }
        }
      });

      // Update fileListState with converted UploadFile objects
      if (Object.keys(fileListUpdates).length > 0) {
        setFileListState((prev) => ({
          ...prev,
          ...fileListUpdates,
        }));
      }

      return processed;
    },
    [formOptions.controls, convertS3KeyToUploadFile, setFileListState]
  );

  // Initialize form data with default values and initial data
  useEffect(() => {
    // Get Default Values from controls
    const defaultValues: Record<string, unknown> = {};
    formOptions.controls.forEach((control) => {
      if (control.defaultValue !== undefined) {
        defaultValues[control.name] = control.defaultValue;
      }
    });

    // Merge initialData with defaultValues (initialData takes precedence)
    const mergedData = {
      ...defaultValues,
      ...(formOptions.initialData || {}),
    };

    // Always process and set form values, even if mergedData is empty
    // This handles the case where initialData arrives after component mount
    const processedData = processInitialData(mergedData);

    // Use Ant Design's setFieldsValue to properly set form values
    form.setFieldsValue(processedData);
    setFormValues(processedData);
  }, [
    formOptions.initialData,
    formOptions.controls,
    form,
    processInitialData,
    setFormValues,
  ]);

  return { processInitialData };
};
