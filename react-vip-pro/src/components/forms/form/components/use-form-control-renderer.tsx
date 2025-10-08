import { useCallback, useRef } from "react";
import {
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FormInstance } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import {
  FtFormControl,
  RadioOption,
  CheckboxOption,
  SelectOption,
  PaginatedFormSelectOptions,
} from "../models/form.model";
import { SimpleEditor } from "@/tiptap/components/tiptap-templates/simple/simple-editor";
import {
  getAcceptString,
  isValidFileSize,
  isValidFileType,
  formatFileSize,
} from "../consts/file.const";

const { TextArea } = Input;
const { Option } = Select;

interface UseFormControlRendererProps {
  formValues: Record<string, unknown>;
  formOptions: { disabled?: boolean };
  form: FormInstance;
  selectOptionsState: Record<string, PaginatedFormSelectOptions>;
  childFilterOptions: Record<string, SelectOption[]>;
  loadingChildFilters: Record<string, boolean>;
  fileListState: Record<string, UploadFile[]>;
  setFileListState: React.Dispatch<
    React.SetStateAction<Record<string, UploadFile[]>>
  >;
  loadSelectOptions: (
    control: FtFormControl,
    searchText?: string,
    page?: number,
    parentValue?: string | number
  ) => Promise<void>;
}

interface UseFormControlRendererReturn {
  renderFormControl: (control: FtFormControl) => React.ReactElement | null;
}

export const useFormControlRenderer = ({
  formValues,
  formOptions,
  form,
  selectOptionsState,
  childFilterOptions,
  loadingChildFilters,
  fileListState,
  setFileListState,
  loadSelectOptions,
}: UseFormControlRendererProps): UseFormControlRendererReturn => {
  // Debounce timer reference for search input
  const searchDebounceTimers = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  // Debounced search handler
  const handleDebouncedSearch = useCallback(
    (
      control: FtFormControl,
      searchValue: string,
      parentValue?: string | number
    ) => {
      const key =
        control.parent && parentValue !== undefined
          ? `${control.name}_${parentValue}`
          : control.name;

      // Clear existing timer
      if (searchDebounceTimers.current[key]) {
        clearTimeout(searchDebounceTimers.current[key]);
      }

      // Set new timer
      searchDebounceTimers.current[key] = setTimeout(() => {
        loadSelectOptions(control, searchValue, 1, parentValue);
      }, 500); // 500ms debounce delay
    },
    [loadSelectOptions]
  );

  // Memoize file upload handlers to prevent recreation on every render
  const createFileUploadHandlers = useCallback(
    (control: FtFormControl) => {
      const beforeUpload = (file: RcFile) => {
        // Validate file type
        if (control.accept && !isValidFileType(file, control.accept)) {
          const acceptedTypes = Object.values(control.accept).flat().join(", ");
          message.error(
            `File type not accepted. Allowed types: ${acceptedTypes}`
          );
          return Upload.LIST_IGNORE;
        }

        // Validate file size
        const maxFileSize = control.maxFileSize;
        if (maxFileSize && !isValidFileSize(file, maxFileSize)) {
          message.error(
            `File size exceeds maximum ${formatFileSize(maxFileSize)}`
          );
          return Upload.LIST_IGNORE;
        }

        // Prevent auto upload - we'll handle it on form submit
        return false;
      };

      const onChange = ({ fileList }: { fileList: UploadFile[] }) => {
        // Update file list state
        setFileListState((prev) => ({
          ...prev,
          [control.name]: fileList,
        }));

        // Store file objects in form value (will be replaced with S3 keys on submit)
        const files = fileList
          .map((f) => f.originFileObj)
          .filter((f): f is RcFile => f !== undefined);

        form.setFieldValue(control.name, control.multiple ? files : files[0]);
      };

      const onRemove = (file: UploadFile) => {
        // Remove file from list
        const newFileList = (fileListState[control.name] || []).filter(
          (item) => item.uid !== file.uid
        );
        setFileListState((prev) => ({
          ...prev,
          [control.name]: newFileList,
        }));

        // Update form value
        const files = newFileList
          .map((f) => f.originFileObj)
          .filter((f): f is RcFile => f !== undefined);

        form.setFieldValue(
          control.name,
          control.multiple ? files : files[0] || null
        );
      };

      return { beforeUpload, onChange, onRemove };
    },
    [form, fileListState, setFileListState]
  );

  const renderFormControl = useCallback(
    (control: FtFormControl) => {
      // Check visibility conditions
      if (control.hidden) return null;
      if (control.showWhen && !control.showWhen(formValues)) return null;

      // Check enable conditions
      const isDisabled =
        control.disabled ||
        (control.enableWhen && !control.enableWhen(formValues)) ||
        formOptions.disabled;

      const commonProps = {
        placeholder: control.placeholder,
        readOnly: control.readonly,
        disabled: isDisabled,
      };

      switch (control.type) {
        case "text":
        case "email":
        case "password": {
          return (
            <Input
              {...commonProps}
              type={control.type}
              maxLength={control.maxLength}
              showCount={!!control.maxLength}
            />
          );
        }

        case "number": {
          return (
            <InputNumber
              {...commonProps}
              min={control.min}
              max={control.max}
              step={control.step}
              precision={control.precision}
              style={{ width: "100%" }}
            />
          );
        }

        case "textarea": {
          return (
            <TextArea
              {...commonProps}
              rows={control.rows || 4}
              autoSize={control.autoSize}
              maxLength={control.maxLength}
              showCount={!!control.maxLength}
            />
          );
        }

        case "select":
        case "autocomplete": {
          const mode = control.mode === "default" ? undefined : control.mode;
          let optionsToRender: SelectOption[] = [];
          let isLoadingOptions = false;
          let isDisabledDueToParent = false;
          let selectState: PaginatedFormSelectOptions | undefined;
          let currentParentValue: string | number | undefined;

          // Handle child filters with parent dependency
          if (control.parent) {
            const parentValue = formValues[control.parent.filterName];
            currentParentValue = parentValue as string | number;

            if (
              parentValue !== undefined &&
              parentValue !== null &&
              parentValue !== ""
            ) {
              const filterKey = `${control.name}_${parentValue}`;

              if (control.usePagination) {
                // Paginated child filter
                selectState = selectOptionsState[filterKey];
                optionsToRender = selectState?.options || [];
                isLoadingOptions = selectState?.loading || false;
              } else {
                // Non-paginated child filter
                optionsToRender = childFilterOptions[filterKey] || [];
                isLoadingOptions = loadingChildFilters[filterKey] || false;
              }
            } else {
              isDisabledDueToParent = true;
            }
          } else {
            // Parent or independent filters
            selectState = selectOptionsState[control.name];
            if (selectState) {
              optionsToRender = selectState.options || [];
              isLoadingOptions = selectState.loading || false;
            } else if (
              !control.usePagination &&
              !Array.isArray(control.options)
            ) {
              // For non-paginated dynamic options, use childFilterOptions
              optionsToRender = childFilterOptions[control.name] || [];
              isLoadingOptions = loadingChildFilters[control.name] || false;
            }
          }

          return (
            <Select
              {...commonProps}
              mode={mode}
              placeholder={
                isDisabledDueToParent
                  ? `Select ${control.parent?.filterName} first`
                  : control.placeholder
              }
              allowClear={control.allowClear}
              showSearch={control.showSearch || control.searchable}
              disabled={isDisabled || isDisabledDueToParent}
              loading={isLoadingOptions}
              optionFilterProp="label"
              filterOption={!control.usePagination}
              onSearch={
                control.usePagination &&
                (control.showSearch || control.searchable)
                  ? (value) =>
                      handleDebouncedSearch(control, value, currentParentValue)
                  : undefined
              }
              onPopupScroll={
                control.usePagination
                  ? (e) => {
                      const target = e.target as HTMLElement;
                      if (
                        target.scrollTop + target.offsetHeight ===
                          target.scrollHeight &&
                        selectState?.hasMore
                      ) {
                        loadSelectOptions(
                          control,
                          selectState.searchText,
                          selectState.currentPage + 1,
                          currentParentValue
                        );
                      }
                    }
                  : undefined
              }
            >
              {optionsToRender.map((option) => (
                <Option
                  key={String(option.value)}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </Option>
              ))}
            </Select>
          );
        }

        case "radio": {
          const radioOptions = control.options as RadioOption[];
          return (
            <Radio.Group {...commonProps}>
              {radioOptions?.map((option) => (
                <Radio
                  key={String(option.value)}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          );
        }

        case "checkbox": {
          const checkboxOptions = control.options as CheckboxOption[];
          return (
            <Checkbox.Group {...commonProps}>
              {checkboxOptions?.map((option) => (
                <Checkbox
                  key={String(option.value)}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          );
        }

        case "switch": {
          return <Switch {...commonProps} />;
        }

        case "date": {
          return (
            <DatePicker
              {...commonProps}
              format={control.format || "YYYY-MM-DD"}
              style={{ width: "100%" }}
            />
          );
        }

        case "datetime": {
          return (
            <DatePicker
              {...commonProps}
              showTime={control.showTime !== false}
              format={control.format || "YYYY-MM-DD HH:mm:ss"}
              style={{ width: "100%" }}
            />
          );
        }

        case "time": {
          return (
            <TimePicker
              {...commonProps}
              format={control.format || "HH:mm:ss"}
              style={{ width: "100%" }}
            />
          );
        }

        case "file": {
          const maxCount = control.maxCount || (control.multiple ? 10 : 1);
          const accept = control.accept
            ? getAcceptString(control.accept)
            : undefined;
          const listType = control.listType || "text";

          // Get optimized upload handlers
          const { beforeUpload, onChange, onRemove } =
            createFileUploadHandlers(control);

          const uploadProps: UploadProps = {
            accept,
            listType,
            maxCount,
            multiple: control.multiple,
            fileList: fileListState[control.name] || [],
            beforeUpload,
            onChange,
            onRemove,
          };

          return (
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} disabled={isDisabled}>
                Click to Upload
              </Button>
            </Upload>
          );
        }

        case "richtext": {
          return (
            <SimpleEditor
              placeholder={control.placeholder}
              disabled={isDisabled}
              readOnly={control.readonly}
              onChange={(value) => {
                form.setFieldValue(control.name, value);
              }}
            />
          );
        }

        case "custom": {
          if (control.render) {
            return (
              <div {...commonProps}>
                {control.render(
                  form.getFieldValue(control.name),
                  (value) => form.setFieldValue(control.name, value),
                  formValues
                )}
              </div>
            );
          }
          return (
            <div className="hidden">
              <Input {...commonProps} type="hidden" />
            </div>
          );
        }

        case "hidden": {
          return (
            <div className="hidden">
              <Input {...commonProps} type="hidden" />
            </div>
          );
        }

        default: {
          return <Input {...commonProps} />;
        }
      }
    },
    [
      formValues,
      formOptions.disabled,
      selectOptionsState,
      childFilterOptions,
      loadingChildFilters,
      loadSelectOptions,
      form,
      fileListState,
      createFileUploadHandlers,
      handleDebouncedSearch,
    ]
  );

  return { renderFormControl };
};
