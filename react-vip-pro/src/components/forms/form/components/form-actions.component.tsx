import React, { useMemo, useCallback } from "react";
import { Button } from "antd";
import { FormInstance } from "antd";
import { FormOption } from "../models/form.model";

interface FormActionsRendererProps {
  formOptions: FormOption;
  loading: boolean;
  form: FormInstance;
  setFormValues: (values: Record<string, unknown>) => void;
}

export const FormActionsRenderer: React.FC<FormActionsRendererProps> =
  React.memo(({ formOptions, loading, form, setFormValues }) => {
    // Memoize reset handler to prevent recreating on every render
    const handleReset = useCallback(() => {
      form.resetFields();
      setFormValues({});
      formOptions.onReset?.();
    }, [form, setFormValues, formOptions]);

    // Memoize action arrays to prevent unnecessary re-renders
    const allActions = useMemo(() => {
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
              handler: handleReset,
            },
          ]
        : [];

      return [...defaultActions, ...(formOptions.actions || [])];
    }, [
      formOptions.showDefaultActions,
      formOptions.actions,
      loading,
      handleReset,
    ]);

    if (!formOptions.showDefaultActions && !formOptions.actions?.length) {
      return null;
    }

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
  });

FormActionsRenderer.displayName = "FormActionsRenderer";
