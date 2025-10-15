import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Select, Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload";
import React, { useState, useEffect } from "react";
import { BaseOption, BaseImportResponse } from "@/types/base";
import { languageService } from "@/services/language.service";
import { translationService } from "@/services/translation.service";
import { S3Service } from "@/services/s3/s3.service";

interface TranslationsImportDialogProps {
  title?: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  errorKey?: string;
}

const TranslationsImportDialog: React.FunctionComponent<
  TranslationsImportDialogProps
> = () => {
  const [form] = Form.useForm();
  const [languageOptions, setLanguageOptions] = useState<BaseOption[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  // Load language options on mount
  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const result = await languageService.getOptions();
        if (result.isSuccess && result.data) {
          setLanguageOptions(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch language options:", error);
      }
    };

    fetchLanguageOptions();
  }, []);

  // Get selected language
  const selectedLanguageId = Form.useWatch("languageId", form);

  // Check if language is selected
  const isLanguageSelected =
    selectedLanguageId && selectedLanguageId !== undefined;

  // Check if file is selected
  const hasFileSelected = fileList.length > 0;

  // Handle export
  const handleExport = async () => {
    if (!isLanguageSelected) {
      message.warning("Please select a language first");
      return;
    }

    try {
      setIsExporting(true);

      const queryParams = {
        language_id: selectedLanguageId,
        page: 1,
        limit: 100,
      };

      const result = await translationService.export(queryParams);

      if (result.isSuccess && result.data?.key) {
        // Use S3 service to download the file
        const downloadUrl = S3Service.getFileUrl(result.data.key);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `translations_${selectedLanguageId}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        message.success("Export completed successfully");
      } else {
        message.error("Export failed. Please try again.");
      }
    } catch (error) {
      console.error("Export error:", error);
      message.error("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Handle import
  const handleImport = async () => {
    if (!isLanguageSelected) {
      message.warning("Please select a language first");
      return;
    }

    if (!hasFileSelected) {
      message.warning("Please select a file to import");
      return;
    }

    try {
      setIsImporting(true);
      setImportResult(null);

      // Get the file from the upload component
      const file = fileList[0]?.originFileObj;
      if (!file) {
        message.error("No valid file found");
        return;
      }

      // Validate file type
      const fileName = file.name.toLowerCase();
      const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");

      if (!isExcel) {
        message.error("Please select an Excel file (.xlsx or .xls)");
        return;
      }

      // Validate file size (10MB limit)
      const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSizeInBytes) {
        message.error("File size must be less than 10MB");
        return;
      }

      message.loading("Uploading file...", 0);

      // Upload file to S3
      const s3Key = await S3Service.uploadFileSync(file, false, (progress) => {
        console.log(`Upload progress: ${progress}%`);
      });

      message.destroy();
      message.loading("Processing import...", 0);

      // Call import API with S3 key
      const importResponse = await translationService.import({ key: s3Key });

      message.destroy();

      if (importResponse.isSuccess) {
        setImportResult({
          success: true,
          message:
            importResponse.data?.message || "Import completed successfully",
        });
        message.success("Import completed successfully");

        // Clear the file list
        setFileList([]);
      } else {
        const errorKey = (importResponse.data as BaseImportResponse)?.error_key;
        setImportResult({
          success: false,
          message:
            importResponse.error?.message || "Import failed. Please try again.",
          errorKey: errorKey,
        });
        message.error(
          importResponse.error?.message || "Import failed. Please try again."
        );
      }
    } catch (error: unknown) {
      message.destroy();
      console.error("Import error:", error);

      let errorMessage = "Import failed. Please try again.";
      let errorKey: string | undefined;

      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string; error_key?: string } };
        };
        if (apiError.response?.data) {
          errorMessage = apiError.response.data.message || errorMessage;
          errorKey = apiError.response.data.error_key;
        }
      }

      setImportResult({
        success: false,
        message: errorMessage,
        errorKey: errorKey,
      });

      message.error(errorMessage);
    } finally {
      setIsImporting(false);
    }
  };

  // Handle file upload props
  const uploadProps: UploadProps = {
    fileList: fileList,
    beforeUpload: () => {
      // Prevent auto upload
      return false;
    },
    onChange: (info) => {
      setFileList(info.fileList);
      // Clear previous import result when file changes
      if (importResult) {
        setImportResult(null);
      }
    },
    accept: ".xlsx,.xls",
    maxCount: 1,
    onRemove: () => {
      setFileList([]);
      if (importResult) {
        setImportResult(null);
      }
    },
  };

  // Download error file
  const downloadErrorFile = (errorKey: string) => {
    if (errorKey && errorKey.trim() !== "") {
      const downloadUrl = S3Service.getFileUrl(errorKey);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "import_errors.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.info("Downloading error file...");
    }
  };

  return (
    <div className="space-y-6">
      <Form form={form} layout="vertical">
        {/* Language Selection */}
        <Form.Item
          label={<span className="text-sm font-medium">Language</span>}
          name="languageId"
          rules={[{ required: true, message: "Please select a language" }]}
        >
          <Select
            placeholder="Select a language"
            showSearch
            optionFilterProp="label"
            options={languageOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            className="w-full"
          />
        </Form.Item>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            type="default"
            loading={isExporting}
            disabled={!isLanguageSelected}
            onClick={handleExport}
            className="flex-1"
          >
            Export Translations
          </Button>

          <Button
            type="primary"
            loading={isImporting}
            disabled={!isLanguageSelected || !hasFileSelected}
            onClick={handleImport}
            className="flex-1"
          >
            {isImporting ? "Importing..." : "Import Translations"}
          </Button>
        </div>

        {/* File Upload Section */}
        {isLanguageSelected && (
          <Form.Item
            label={<span className="text-sm font-medium">Import File</span>}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} className="w-full">
                Click or drag Excel file to this area
              </Button>
            </Upload>
          </Form.Item>
        )}

        {/* Import Result Section */}
        {importResult && (
          <div
            className={`p-4 rounded-lg mb-4 border ${
              importResult.success
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50"
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4
                  className={`text-sm font-medium ${
                    importResult.success
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {importResult.success ? "Import Successful" : "Import Failed"}
                </h4>
                <p
                  className={`text-sm mt-1 ${
                    importResult.success
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {importResult.message}
                </p>
              </div>
              {!importResult.success && importResult.errorKey && (
                <Button
                  type="link"
                  size="small"
                  onClick={() => downloadErrorFile(importResult.errorKey!)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  Download Error File
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Instructions:
          </h4>
          <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>1. Select a language from the dropdown above</li>
            <li>
              2. Click "Export Translations" to download current translations
            </li>
            <li>3. Edit the downloaded Excel file with your translations</li>
            <li>4. Upload the modified file and click "Import Translations"</li>
          </ol>
        </div>
      </Form>
    </div>
  );
};

export default TranslationsImportDialog;
