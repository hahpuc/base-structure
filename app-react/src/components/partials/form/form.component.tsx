import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  TimePicker,
  Upload,
} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import dayjs from 'dayjs';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import {
  BaseQuery,
  CheckboxOption,
  FormOption,
  FtFormControl,
  ListPaginate,
  PaginatedFormSelectOptions,
  RadioOption,
  SelectOption,
} from './models/form.model';

const { TextArea } = Input;
const { Option } = Select;

export interface FormComponentRef {
  validateForm: () => Promise<boolean>;
  getFormValue: () => Record<string, unknown>;
  setFormValue: (values: Record<string, unknown>) => void;
  resetForm: () => void;
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
      form,
    }));

    // Process initial data for special field types
    const processInitialData = useCallback(
      (data: Record<string, unknown>): Record<string, unknown> => {
        const processed = { ...data };

        formOptions.controls.forEach(control => {
          const value = processed[control.name];
          if (value !== undefined && value !== null) {
            switch (control.type) {
              case 'date':
              case 'datetime':
                if (typeof value === 'string' || typeof value === 'number') {
                  processed[control.name] = dayjs(value);
                }
                break;
              case 'time':
                if (typeof value === 'string') {
                  processed[control.name] = dayjs(value, control.format || 'HH:mm:ss');
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
      if (formOptions.initialData) {
        const processedData = processInitialData(formOptions.initialData);
        form.setFieldsValue(processedData);
        setFormValues(processedData);
      }
    }, [formOptions.initialData, form, processInitialData]);

    // Load select options
    const loadSelectOptions = async (control: FtFormControl, searchText = '', page = 1) => {
      if (!control.options) return;

      const key = control.name;
      setSelectOptionsState(prev => ({
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
        } else if (typeof control.options === 'function') {
          if (control.usePagination) {
            // Paginated API
            const query: BaseQuery = {
              page,
              size: control.pageSize || 20,
              search: searchText,
            };
            const result = await (
              control.options as (input: BaseQuery) => Promise<ListPaginate<unknown>>
            )(query);
            options = result.data.map((item: unknown) => {
              const typedItem = item as Record<string, unknown>;
              return {
                label: (typedItem.name || typedItem.label || typedItem.title) as string,
                value: typedItem.id || typedItem.value,
              };
            });
            hasMore = result.hasMore;
            total = result.total;
          } else {
            // Non-paginated API
            const result = await (control.options as () => Promise<SelectOption[]>)();
            options = result;
            total = options.length;
          }
        }

        setSelectOptionsState(prev => ({
          ...prev,
          [key]: {
            options: page === 1 ? options : [...(prev[key]?.options || []), ...options],
            hasMore,
            currentPage: page,
            pageSize: control.pageSize || 20,
            total,
            loading: false,
            searchText,
          },
        }));
      } catch {
        setSelectOptionsState(prev => ({
          ...prev,
          [key]: { ...prev[key], loading: false },
        }));
      }
    };

    // Initialize select options
    useEffect(() => {
      formOptions.controls.forEach(control => {
        if (control.type === 'select' || control.type === 'autocomplete') {
          loadSelectOptions(control);
        }
      });
    }, [formOptions.controls]);

    // Handle form value changes
    const handleValuesChange = (
      changedValues: Record<string, unknown>,
      allValues: Record<string, unknown>
    ) => {
      setFormValues(allValues);

      // Handle control-specific onChange events
      Object.keys(changedValues).forEach(fieldName => {
        const control = formOptions.controls.find(c => c.name === fieldName);
        if (control?.onChange) {
          control.onChange(changedValues[fieldName], allValues);
        }
      });
    };

    // Handle form submission
    const handleSubmit = async (values: Record<string, unknown>) => {
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
    };

    // Render form control based on type
    const renderFormControl = (control: FtFormControl) => {
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
        disabled: isDisabled,
      };

      switch (control.type) {
        case 'text':
        case 'email':
        case 'password': {
          return (
            <Input
              {...commonProps}
              type={control.type}
              maxLength={control.maxLength}
              showCount={!!control.maxLength}
            />
          );
        }

        case 'number': {
          return (
            <InputNumber
              {...commonProps}
              min={control.min}
              max={control.max}
              step={control.step}
              precision={control.precision}
              style={{ width: '100%' }}
            />
          );
        }

        case 'textarea': {
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

        case 'select':
        case 'autocomplete': {
          const selectState = selectOptionsState[control.name];
          const mode = control.mode === 'default' ? undefined : control.mode;

          return (
            <Select
              {...commonProps}
              mode={mode}
              allowClear={control.allowClear}
              showSearch={control.showSearch || control.searchable}
              loading={selectState?.loading}
              onSearch={control.searchable ? value => loadSelectOptions(control, value) : undefined}
            >
              {selectState?.options?.map(option => (
                <Option key={String(option.value)} value={option.value} disabled={option.disabled}>
                  {option.label}
                </Option>
              ))}
            </Select>
          );
        }

        case 'radio': {
          const radioOptions = control.options as RadioOption[];
          return (
            <Radio.Group {...commonProps}>
              {radioOptions?.map(option => (
                <Radio key={String(option.value)} value={option.value} disabled={option.disabled}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          );
        }

        case 'checkbox': {
          const checkboxOptions = control.options as CheckboxOption[];
          return (
            <Checkbox.Group {...commonProps}>
              {checkboxOptions?.map(option => (
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

        case 'switch': {
          return <Switch {...commonProps} />;
        }

        case 'date': {
          return (
            <DatePicker
              {...commonProps}
              format={control.format || 'YYYY-MM-DD'}
              style={{ width: '100%' }}
            />
          );
        }

        case 'datetime': {
          return (
            <DatePicker
              {...commonProps}
              showTime={control.showTime !== false}
              format={control.format || 'YYYY-MM-DD HH:mm:ss'}
              style={{ width: '100%' }}
            />
          );
        }

        case 'time': {
          return (
            <TimePicker
              {...commonProps}
              format={control.format || 'HH:mm:ss'}
              style={{ width: '100%' }}
            />
          );
        }

        case 'file': {
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

        case 'richtext': {
          // This would typically use a rich text editor like React Quill
          return (
            <TextArea
              {...commonProps}
              rows={control.rows || 8}
              placeholder="Rich text editor would be implemented here"
            />
          );
        }

        case 'custom': {
          if (control.render) {
            return control.render(
              form.getFieldValue(control.name),
              value => form.setFieldValue(control.name, value),
              formValues
            );
          }
          return null;
        }

        case 'hidden': {
          return <Input type="hidden" />;
        }

        default: {
          return <Input {...commonProps} />;
        }
      }
    };

    // Render form actions
    const renderActions = () => {
      if (!formOptions.showDefaultActions && !formOptions.actions?.length) {
        return null;
      }

      const defaultActions = formOptions.showDefaultActions
        ? [
            {
              type: 'submit' as const,
              label: 'Submit',
              color: 'primary' as const,
              loading: loading,
              visible: true,
              disabled: false,
              icon: undefined,
            },
            {
              type: 'reset' as const,
              label: 'Reset',
              color: 'default' as const,
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
        <div className="flex gap-2 pt-4">
          {allActions.map((action, index) => {
            if (action.visible === false) return null;

            const handleClick = () => {
              if (action.type === 'submit') {
                form.submit();
              } else if (action.handler) {
                action.handler(form.getFieldsValue());
              }
            };

            return (
              <Button
                key={index}
                type={action.color === 'primary' ? 'primary' : 'default'}
                danger={action.color === 'danger'}
                loading={action.loading}
                disabled={action.disabled}
                onClick={handleClick}
                icon={action.icon}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      );
    };

    return (
      <div className={className} style={style}>
        <Form
          form={form}
          layout={formOptions.layout || 'vertical'}
          size={formOptions.size === 'default' ? 'middle' : formOptions.size}
          disabled={formOptions.disabled}
          labelCol={formOptions.labelCol}
          wrapperCol={formOptions.wrapperCol}
          onValuesChange={handleValuesChange}
          onFinish={handleSubmit}
          validateTrigger={formOptions.validateTrigger || 'onChange'}
        >
          <Row gutter={formOptions.gutter || 16}>
            {formOptions.controls.map(control => {
              if (control.hidden || (control.showWhen && !control.showWhen(formValues))) {
                return null;
              }

              return (
                <Col key={control.name} span={control.span || 24} offset={control.offset || 0}>
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
                </Col>
              );
            })}
          </Row>

          {renderActions()}
        </Form>
      </div>
    );
  }
);

FormComponent.displayName = 'FormComponent';

export default FormComponent;
