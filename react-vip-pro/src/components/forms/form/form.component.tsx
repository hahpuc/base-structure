import { Form, FormInstance } from "antd";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";

import { FormOption } from "./models/form.model";
import { Container } from "@/components/common/container-box";
import { UploadProgressDialog } from "./components/upload-progress-dialog";
import "@/styles/tiptap.less";

// Import custom hooks
import {
  useFormState,
  useSelectOptions,
  useFileUpload,
  useUploadProgress,
  useFormControlRenderer,
} from "./hooks";
import { useFormInitialization } from "./hooks/useFormInitialization";
import { useSelectOptionsLoader } from "./hooks/useSelectOptionsLoader";
import { useFormSubmit } from "./hooks/useFormSubmit";
import { useFormValuesChange } from "./hooks/useFormValuesChange";

// Import renderer components
import { FormActionsRenderer } from "./renderers/FormActionsRenderer";

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

    // Initialize all state using custom hooks
    const { formValues, setFormValues, loading, setLoading } = useFormState();

    const {
      selectOptionsState,
      setSelectOptionsState,
      childFilterOptions,
      setChildFilterOptions,
      loadingChildFilters,
      setLoadingChildFilters,
    } = useSelectOptions();

    const { fileListState, setFileListState } = useFileUpload();

    const {
      uploadProgressVisible,
      setUploadProgressVisible,
      uploadProgressFiles,
      setUploadProgressFiles,
    } = useUploadProgress();

    // Initialize form data
    useFormInitialization({
      form,
      formOptions,
      setFormValues,
      setFileListState,
    });

    // Load select options
    const { loadSelectOptions, loadChildFilterOptions } =
      useSelectOptionsLoader({
        formOptions,
        setSelectOptionsState,
        setChildFilterOptions,
        setLoadingChildFilters,
      });

    // Handle form value changes
    const { handleValuesChange } = useFormValuesChange({
      form,
      formOptions,
      setFormValues,
      setSelectOptionsState,
      setChildFilterOptions,
      loadSelectOptions,
      loadChildFilterOptions,
    });

    // Handle form submission
    const { handleSubmit, handleSubmitFailed } = useFormSubmit({
      formOptions,
      setLoading,
      setUploadProgressVisible,
      setUploadProgressFiles,
    });

    // Render form controls
    const { renderFormControl } = useFormControlRenderer({
      formValues,
      formOptions,
      form,
      selectOptionsState,
      childFilterOptions,
      loadingChildFilters,
      fileListState,
      setFileListState,
      loadSelectOptions,
    });

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

    // Generate grid classes
    const gridClasses = useMemo(
      () => formOptions.gridCols || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      [formOptions.gridCols]
    );

    const gapClasses = useMemo(
      () => formOptions.gridGap || "gap-4",
      [formOptions.gridGap]
    );

    // Render
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
            onFinishFailed={handleSubmitFailed}
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
                      validateTrigger={control.validateTrigger}
                    >
                      {/* Render control directly - Form.Item will inject value & onChange */}
                      {renderFormControl(control)}
                    </Form.Item>
                  </div>
                );
              })}
            </div>

            <FormActionsRenderer
              formOptions={formOptions}
              loading={loading}
              form={form}
              setFormValues={setFormValues}
            />
          </Form>
        </div>

        {/* Upload Progress Dialog */}
        <UploadProgressDialog
          visible={uploadProgressVisible}
          files={uploadProgressFiles}
          onClose={() => {
            setUploadProgressVisible(false);
            setUploadProgressFiles([]);
          }}
        />
      </Container>
    );
  }
);

FormComponent.displayName = "FormComponent";

export default FormComponent;
