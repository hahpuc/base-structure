import { useState } from "react";
import { UploadFile } from "antd/es/upload";
import { PaginatedFormSelectOptions, SelectOption } from "../models/form.model";
import { FileUploadProgress } from "../components/upload-progress-dialog";

export const useFormState = () => {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);

  return {
    formValues,
    setFormValues,
    loading,
    setLoading,
  };
};

export const useSelectOptions = () => {
  const [selectOptionsState, setSelectOptionsState] = useState<
    Record<string, PaginatedFormSelectOptions>
  >({});
  const [childFilterOptions, setChildFilterOptions] = useState<
    Record<string, SelectOption[]>
  >({});
  const [loadingChildFilters, setLoadingChildFilters] = useState<
    Record<string, boolean>
  >({});

  return {
    selectOptionsState,
    setSelectOptionsState,
    childFilterOptions,
    setChildFilterOptions,
    loadingChildFilters,
    setLoadingChildFilters,
  };
};

export const useFileUpload = () => {
  const [fileListState, setFileListState] = useState<
    Record<string, UploadFile[]>
  >({});

  return {
    fileListState,
    setFileListState,
  };
};

export const useUploadProgress = () => {
  const [uploadProgressVisible, setUploadProgressVisible] = useState(false);
  const [uploadProgressFiles, setUploadProgressFiles] = useState<
    FileUploadProgress[]
  >([]);

  return {
    uploadProgressVisible,
    setUploadProgressVisible,
    uploadProgressFiles,
    setUploadProgressFiles,
  };
};
