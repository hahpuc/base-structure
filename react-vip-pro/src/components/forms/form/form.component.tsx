import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
  Upload,
} from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import dayjs from "dayjs";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import {
  CheckboxOption,
  FormOption,
  FtFormControl,
  PaginatedFormSelectOptions,
  RadioOption,
  SelectOption,
} from "./models/form.model";
import { Container } from "@/components/common/container-box";
import { BaseQuery, ListPaginate } from "@/types/base";
import { ApiResult } from "@/services/client/api-result";

const { TextArea } = Input;
const { Option } = Select;

export interface FormComponentRef {
  validateForm: () => Promise<boolean>;
  getFormValue: () => Record<string, unknown>;
  setFormValue: (values: Record<string, unknown>) => void;
  resetForm: () => void;
  submitForm: () => void;
  getErrorField: () => Record<string, string[]>;
  form: FormInstance;
}

export interface FormComponentProps<T = Record<string, unknown>> {
  formOptions: FormOption<T>;
  className?: string;
  style?: React.CSSProperties;
}

const FormComponent = forwardRef<FormComponentRef, FormComponentProps>(
  ({ formOptions, className, style }, ref) => {
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    const [selectOptionsState, setSelectOptionsState] = useState<
      Record<string, PaginatedFormSelectOptions>
    >({});
    const [loading, setLoading] = useState(false);

    // Options Value for child filters - depends on parent value (ex: province -> district -> ward)
    const [childFilterOptions, setChildFilterOptions] = useState<
      Record<string, SelectOption[]>
    >({});
    const [loadingChildFilters, setLoadingChildFilters] = useState<
      Record<string, boolean>
    >({});

    //MARK: Expose Ref
    // Expose methods through ref
    useImperativeHandle(ref, () => ({
      validateForm: async () => {
        try {
          await form.validateFields();
          return true;
        } catch {
          return false;
        }
      },
      getFormValue: () => form.getFieldsValue(),
      setFormValue: (values: Record<string, unknown>) => {
        form.setFieldsValue(values);
        setFormValues(values);
      },
      resetForm: () => {
        form.resetFields();
        setFormValues({});
      },
      submitForm: () => form.submit(),
      getErrorField: () => {
        const fieldsError = form.getFieldsError();
        const errors: Record<string, string[]> = {};
        fieldsError.forEach((field) => {
          if (field.errors && field.errors.length > 0) {
            errors[field.name[0] as string] = field.errors;
          }
        });
        return errors;
      },
      form,
    }));

    // MARK: Init Form
    // Process initial data for special field types
    const processInitialData = useCallback(
      (data: Record<string, unknown>): Record<string, unknown> => {
        const processed = { ...data };

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
            }
          }
        });

        return processed;
      },
      [formOptions.controls]
    );

    // Initialize form data
    useEffect(() => {
      // Get Default Values from controls
      const defaultValues: Record<string, unknown> = {};
      formOptions.controls.forEach((control) => {
        if (control.defaultValue !== undefined) {
          defaultValues[control.name] = control.defaultValue;
        }
      });

      // Merge initialData with defaultValues
      const mergedData = {
        ...defaultValues,
        ...(formOptions.initialData || {}),
      };

      if (Object.keys(mergedData).length > 0) {
        const processedData = processInitialData(mergedData);
        form.setFieldsValue(processedData);
        setFormValues(processedData);
      }
    }, [
      formOptions.initialData,
      formOptions.controls,
      form,
      processInitialData,
    ]);

    // MARK: Load Select Options
    // Load select options for child filters (with parent value)
    const loadChildFilterOptions = useCallback(
      async (control: FtFormControl, parentValue?: string | number) => {
        if (!control.options || Array.isArray(control.options)) return;

        const filterKey = control.parent
          ? `${control.name}_${parentValue}`
          : control.name;

        setLoadingChildFilters((prev) => ({ ...prev, [filterKey]: true }));

        try {
          if (typeof control.options === "function") {
            const result =
              control.parent && parentValue !== undefined
                ? await (
                    control.options as (
                      parentValue: string | number
                    ) => Promise<SelectOption[]>
                  )(parentValue)
                : await (control.options as () => Promise<SelectOption[]>)();

            setChildFilterOptions((prev) => ({
              ...prev,
              [filterKey]: result,
            }));
          }
        } catch (error) {
          console.error(`Failed to load options for ${control.name}:`, error);
          setChildFilterOptions((prev) => ({ ...prev, [filterKey]: [] }));
        } finally {
          setLoadingChildFilters((prev) => ({
            ...prev,
            [filterKey]: false,
          }));
        }
      },
      []
    );

    // Load select options
    const loadSelectOptions = useCallback(
      async (
        control: FtFormControl,
        searchText = "",
        page = 1,
        parentValue?: string | number
      ) => {
        if (!control.options) return;

        // Use different key for child filters with parent value
        const key =
          control.parent && parentValue !== undefined
            ? `${control.name}_${parentValue}`
            : control.name;

        setSelectOptionsState((prev) => ({
          ...prev,
          [key]: { ...prev[key], loading: true },
        }));

        try {
          let options: SelectOption[] = [];
          let hasMore = false;
          let total = 0;

          if (Array.isArray(control.options)) {
            // Static options
            options = control.options as SelectOption[];
            total = options.length;
          } else if (typeof control.options === "function") {
            if (control.usePagination) {
              // Paginated API
              const query: BaseQuery = {
                page,
                limit: control.pageSize || 20,
                filter: searchText,
              };

              // Check if this is a child filter with parent dependency
              if (control.parent && parentValue !== undefined) {
                const result = await (
                  control.options as (
                    input: BaseQuery,
                    parentValue: string | number
                  ) => Promise<ApiResult<ListPaginate<unknown>>>
                )(query, parentValue);

                options = (result.data?.data ?? []).map((item: unknown) => {
                  const typedItem = item as Record<string, unknown>;
                  return {
                    label: (typedItem.name ||
                      typedItem.label ||
                      typedItem.title) as string,
                    value: typedItem.id || typedItem.value,
                  };
                });
                const totalPages = result.data?.total_pages ?? 0;
                const totalRecords = result.data?.total_records ?? 0;
                hasMore =
                  totalPages > page ||
                  totalRecords > page * (control.pageSize || 20);
                total = totalRecords;
              } else {
                // Parent or independent filter
                const result = await (
                  control.options as (
                    input: BaseQuery
                  ) => Promise<ApiResult<ListPaginate<unknown>>>
                )(query);

                options = (result.data?.data ?? []).map((item: unknown) => {
                  const typedItem = item as Record<string, unknown>;
                  return {
                    label: (typedItem.name ||
                      typedItem.label ||
                      typedItem.title) as string,
                    value: typedItem.id || typedItem.value,
                  };
                });
                const totalPages = result.data?.total_pages ?? 0;
                const totalRecords = result.data?.total_records ?? 0;
                hasMore =
                  totalPages > page ||
                  totalRecords > page * (control.pageSize || 20);
                total = totalRecords;
              }
            } else {
              // Non-paginated API
              const result = await (
                control.options as () => Promise<SelectOption[]>
              )();
              options = result;
              total = options.length;
            }
          }

          setSelectOptionsState((prev) => ({
            ...prev,
            [key]: {
              options:
                page === 1
                  ? options
                  : [...(prev[key]?.options || []), ...options],
              hasMore,
              currentPage: page,
              pageSize: control.pageSize || 20,
              total,
              loading: false,
              searchText,
            },
          }));
        } catch {
          setSelectOptionsState((prev) => ({
            ...prev,
            [key]: { ...prev[key], loading: false },
          }));
        }
      },
      []
    );

    // Initialize select options
    useEffect(() => {
      const initialData = formOptions.initialData;
      const controls = formOptions.controls;

      const initializeOptions = async () => {
        for (const control of controls) {
          if (control.type === "select" || control.type === "autocomplete") {
            if (!control.parent) {
              // Load parent/independent filters immediately
              if (
                control.usePagination ||
                !control.options ||
                Array.isArray(control.options)
              ) {
                loadSelectOptions(control);
              } else {
                // For non-paginated dynamic options without parent
                await loadChildFilterOptions(control);
              }
            } else {
              // For child filters, load if parent value exists in initial data
              const parentValue = initialData?.[control.parent.filterName];
              if (
                parentValue !== undefined &&
                parentValue !== null &&
                parentValue !== ""
              ) {
                const normalizedValue =
                  typeof parentValue === "string" ||
                  typeof parentValue === "number"
                    ? parentValue
                    : String(parentValue);
                await loadChildFilterOptions(control, normalizedValue);
              }
            }
          }
        }
      };

      initializeOptions();
    }, [
      formOptions.controls,
      formOptions.initialData,
      loadSelectOptions,
      loadChildFilterOptions,
    ]);

    // MARK: Handle Actions
    // Handle form value changes
    const handleValuesChange = useCallback(
      (
        changedValues: Record<string, unknown>,
        allValues: Record<string, unknown>
      ) => {
        setFormValues(allValues);

        // Handle control-specific onChange events and parent-child relationships
        Object.keys(changedValues).forEach((fieldName) => {
          const control = formOptions.controls.find(
            (c) => c.name === fieldName
          );
          if (control?.onChange) {
            control.onChange(changedValues[fieldName], allValues);
          }

          // If this is a parent control, handle child controls
          const childControls = formOptions.controls.filter(
            (c) => c.parent?.filterName === fieldName
          );
          if (childControls.length > 0) {
            const parentValue = changedValues[fieldName];
            childControls.forEach((childControl) => {
              // Clear child field value
              form.setFieldValue(childControl.name, undefined);

              // Load options for child if parent has value
              if (
                parentValue !== undefined &&
                parentValue !== null &&
                parentValue !== ""
              ) {
                // Check if child uses pagination
                if (childControl.usePagination) {
                  // Load paginated options with parent value
                  loadSelectOptions(
                    childControl,
                    "",
                    1,
                    parentValue as string | number
                  );
                } else {
                  // Load non-paginated options
                  loadChildFilterOptions(
                    childControl,
                    parentValue as string | number
                  );
                }
              } else {
                // Clear child filter options when parent is cleared
                const filterKey = `${childControl.name}_${parentValue}`;
                if (childControl.usePagination) {
                  setSelectOptionsState((prev) => ({
                    ...prev,
                    [filterKey]: {
                      options: [],
                      hasMore: false,
                      currentPage: 1,
                      pageSize: childControl.pageSize || 20,
                      total: 0,
                      loading: false,
                      searchText: "",
                    },
                  }));
                } else {
                  setChildFilterOptions((prev) => ({
                    ...prev,
                    [filterKey]: [],
                  }));
                }
              }
            });
          }
        });
      },
      [
        formOptions.controls,
        form,
        loadChildFilterOptions,
        loadSelectOptions,
        setSelectOptionsState,
      ]
    );

    // Handle form submission
    const handleSubmit = useCallback(
      async (values: Record<string, unknown>) => {
        if (formOptions.onSubmit) {
          setLoading(true);
          try {
            await formOptions.onSubmit(values);
          } catch {
            // Handle error silently or through onSubmit callback
          } finally {
            setLoading(false);
          }
        }
      },
      [formOptions]
    );

    // MARK: Render Form Inputs
    // Render form control based on type
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
                        loadSelectOptions(control, value, 1, currentParentValue)
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
            const uploadProps: UploadProps = {
              beforeUpload: (_file: RcFile) => {
                // Handle file upload logic here
                return false; // Prevent auto upload
              },
            };

            return (
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            );
          }

          case "richtext": {
            // This would typically use a rich text editor like React Quill
            return (
              <TextArea
                {...commonProps}
                rows={control.rows || 8}
                placeholder="Rich text editor would be implemented here"
              />
            );
          }

          case "custom": {
            if (control.render) {
              return control.render(
                form.getFieldValue(control.name),
                (value) => form.setFieldValue(control.name, value),
                formValues
              );
            }
            return null;
          }

          case "hidden": {
            return <></>;
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
      ]
    );

    // Render form actions
    const renderActions = useCallback(() => {
      if (!formOptions.showDefaultActions && !formOptions.actions?.length) {
        return null;
      }

      const defaultActions = formOptions.showDefaultActions
        ? [
            {
              type: "submit" as const,
              label: "Submit",
              color: "primary" as const,
              loading: loading,
              visible: true,
              disabled: false,
              icon: undefined,
            },
            {
              type: "reset" as const,
              label: "Reset",
              color: "default" as const,
              loading: false,
              visible: true,
              disabled: false,
              icon: undefined,
              handler: () => {
                form.resetFields();
                setFormValues({});
                formOptions.onReset?.();
              },
            },
          ]
        : [];

      const allActions = [...defaultActions, ...(formOptions.actions || [])];

      return (
        <div className="flex flex-wrap gap-2 pt-4">
          {allActions.map((action, index) => {
            if (action.visible === false) return null;

            const handleClick = () => {
              if (action.type === "submit") {
                form.submit();
              } else if (action.handler) {
                action.handler(form.getFieldsValue());
              }
            };

            return (
              <Button
                key={index}
                type={action.color === "primary" ? "primary" : "default"}
                danger={action.color === "danger"}
                loading={action.loading}
                disabled={action.disabled}
                onClick={handleClick}
                icon={action.icon}
                className="min-w-[100px]"
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      );
    }, [formOptions, loading, form]);

    // MARK: Styles
    // Generate grid classes
    const gridClasses = useMemo(
      () => formOptions.gridCols || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      [formOptions.gridCols]
    );

    const gapClasses = useMemo(
      () => formOptions.gridGap || "gap-4",
      [formOptions.gridGap]
    );

    return (
      <Container>
        <div className={className} style={style}>
          <Form
            form={form}
            layout={formOptions.layout || "vertical"}
            size={formOptions.size === "default" ? "middle" : formOptions.size}
            disabled={formOptions.disabled}
            labelCol={formOptions.labelCol}
            wrapperCol={formOptions.wrapperCol}
            onValuesChange={handleValuesChange}
            onFinish={handleSubmit}
            validateTrigger={formOptions.validateTrigger || "onChange"}
          >
            <div className={`grid ${gridClasses} ${gapClasses}`}>
              {formOptions.controls.map((control) => {
                if (
                  control.hidden ||
                  (control.showWhen && !control.showWhen(formValues))
                ) {
                  return null;
                }

                // Generate responsive classes for the control
                const controlClasses = control.className || "col-span-1";

                return (
                  <div key={control.name} className={controlClasses}>
                    <Form.Item
                      name={control.name}
                      label={control.label}
                      rules={control.rules}
                      help={control.description}
                      labelCol={control.labelCol}
                      wrapperCol={control.wrapperCol}
                      required={control.required}
                      hidden={control.hidden}
                    >
                      {renderFormControl(control)}
                    </Form.Item>
                  </div>
                );
              })}
            </div>

            {renderActions()}
          </Form>
        </div>
      </Container>
    );
  }
);

FormComponent.displayName = "FormComponent";

export default FormComponent;
