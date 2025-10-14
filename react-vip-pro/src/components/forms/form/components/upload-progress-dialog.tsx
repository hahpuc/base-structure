import { CheckCircleIcon, ErrorIcon, LoaderIcon } from "@/icons";
import { Modal, Progress } from "antd";
import React from "react";

export type FileUploadStatus = "pending" | "uploading" | "success" | "error";

export interface FileUploadProgress {
  fileName: string;
  progress: number; // 0-100
  status: FileUploadStatus;
  error?: string;
}

export interface UploadProgressDialogProps {
  visible: boolean;
  files: FileUploadProgress[];
  onClose?: () => void;
  title?: string;
}

/**
 * Upload Progress Dialog Component
 * Displays a modal with file upload progress for multiple files
 */
export const UploadProgressDialog: React.FC<UploadProgressDialogProps> = ({
  visible,
  files,
  onClose,
  title = "Uploading Files",
}) => {
  const allCompleted = files.every(
    (file) => file.status === "success" || file.status === "error"
  );

  const successCount = files.filter((file) => file.status === "success").length;
  const errorCount = files.filter((file) => file.status === "error").length;
  const totalCount = files.length;

  const getStatusIcon = (status: FileUploadStatus) => {
    switch (status) {
      case "success":
        return <CheckCircleIcon />;
      case "error":
        return <ErrorIcon />;
      case "uploading":
        return <LoaderIcon className="animate-spin" />;
      default:
        return <LoaderIcon className="animate-spin" />;
    }
  };

  const getProgressColor = (status: FileUploadStatus) => {
    switch (status) {
      case "success":
        return "#52c41a";
      case "error":
        return "#ff4d4f";
      case "uploading":
        return "#1890ff";
      default:
        return "#d9d9d9";
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span>{title}</span>
          {allCompleted && (
            <span className="text-sm font-normal text-gray-500">
              ({successCount} succeeded, {errorCount} failed)
            </span>
          )}
        </div>
      }
      open={visible}
      onCancel={allCompleted ? onClose : undefined}
      footer={
        allCompleted
          ? [
              <button
                key="close"
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Close
              </button>,
            ]
          : null
      }
      closable={allCompleted}
      maskClosable={false}
      width={600}
      centered
    >
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {files.map((file, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-1">{getStatusIcon(file.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.fileName}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {file.progress}%
                  </span>
                </div>

                {file.status === "error" && file.error && (
                  <div className="text-xs text-red-500 mt-1">{file.error}</div>
                )}

                {file.status === "success" && (
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Upload completed successfully
                  </div>
                )}

                {file.status === "uploading" && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Uploading...
                  </div>
                )}
              </div>
            </div>

            <Progress
              percent={file.progress}
              strokeColor={getProgressColor(file.status)}
              status={
                file.status === "error"
                  ? "exception"
                  : file.status === "success"
                  ? "success"
                  : "active"
              }
              showInfo={false}
              size="small"
            />
          </div>
        ))}
      </div>

      {!allCompleted && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Please wait while files are being uploaded...
        </div>
      )}

      {allCompleted && (
        <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {errorCount === 0 ? (
              <span className="flex items-center gap-2">
                <CheckCircleIcon />
                All files uploaded successfully! ({totalCount} files)
              </span>
            ) : successCount === 0 ? (
              <span className="flex items-center gap-2">
                <ErrorIcon />
                All uploads failed. Please try again.
              </span>
            ) : (
              <span>
                Upload completed with {successCount} success and {errorCount}{" "}
                failed out of {totalCount} total files.
              </span>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
