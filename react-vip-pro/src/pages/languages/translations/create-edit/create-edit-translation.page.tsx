import {
  FormComponent,
  FormComponentRef,
  FormOption,
  FormSubmitResult,
} from "@/components/forms/form";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { languageService } from "@/services/language.service";
import { translationNamespaceService } from "@/services/translation-namespace.service";
import { translationService } from "@/services/translation.service";
import { CreateTranslation, UpdateTranslation } from "@/types/translation";
import { message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CreateEditTranslationPage: React.FunctionComponent = () => {
  const formRef = useRef<FormComponentRef>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<
    Record<string, unknown> | undefined
  >();

  const isEdit = !!id;

  useHeader(isEdit ? "Edit Translation" : "Create Translation", [
    {
      id: "back-translation",
      title: "Back",
      icon: "back",
      type: "default",
      handler: () => navigate("/translation"),
    },
    {
      id: "save-translation",
      title: "Save",
      icon: "edit",
      type: "primary",
      disable: loading,
      handler: () => formRef.current?.submitForm(),
    },
  ]);

  const loadData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    const resultApi = await translationService.getById(Number(id));
    setLoading(false);

    if (resultApi.isSuccess && resultApi.data) {
      const data = resultApi.data;

      // Process the data for form initial values
      const processedData = {
        ...data,
        status: data.status === EStatus.active,
      };

      setInitialData(processedData);
      return;
    }

    message.error(resultApi.error?.message || "Failed to load blog post");
  }, [id]);

  useEffect(() => {
    if (isEdit && id) {
      loadData();
    }
  }, [isEdit, id, loadData]);

  const handleSubmit = async (
    formValue: Record<string, unknown>
  ): Promise<FormSubmitResult> => {
    setLoading(true);

    const commonData = {
      language_id: Number(formValue["language_id"]),
      namespace_id: Number(formValue["namespace_id"]),
      key: formValue["key"] as string,
      value: formValue["value"] as string,
      description: formValue["description"] as string,
      status: (formValue["status"] as boolean)
        ? EStatus.active
        : EStatus.inactive,
    };

    let resultApi;
    if (isEdit && id) {
      const updateData: UpdateTranslation = {
        id: Number(id),
        ...commonData,
      };
      resultApi = await translationService.update(updateData);
    } else {
      const createData: CreateTranslation = { ...commonData };
      resultApi = await translationService.create(createData);
    }

    setLoading(false);

    if (resultApi.isSuccess) {
      message.success(isEdit ? "Updated successfully" : "Created successfully");
      navigate("/translation");
      return { success: true };
    } else {
      message.error(
        resultApi.error?.message ||
          `Failed to ${isEdit ? "update" : "create"} data`
      );
      return {
        success: false,
        error: resultApi.error?.message || "Submission failed",
      };
    }
  };

  const formOptions: FormOption = {
    layout: "vertical",

    initialData,
    loading,
    onSubmit: handleSubmit,
    showDefaultActions: false,
    controls: [
      {
        name: "language_id",
        label: "Language",
        type: "select",
        required: true,
        placeholder: "Select Language",

        options: async () => {
          const result = await languageService.getOptions();

          if (result.isSuccess && result.data) {
            return result.data.map((lang) => ({
              label: lang.label,
              value: lang.value,
            }));
          }

          return [];
        },
      },
      {
        name: "namespace_id",
        label: "Namespace",
        type: "select",
        required: true,
        placeholder: "Select Namespace",

        options: async () => {
          const result = await translationNamespaceService.getOptions();

          if (result.isSuccess && result.data) {
            return result.data.map((ns) => ({
              label: ns.label,
              value: ns.value,
            }));
          }

          return [];
        },
      },
      {
        name: "key",
        label: "Key",
        type: "text",
        required: true,
        onChange: (value: unknown, formValue: Record<string, unknown>) => {
          return formRef.current?.setFormValue({
            key: (value as string).toUpperCase(),
          });
        },
        placeholder: "Enter Key",
      },
      {
        name: "value",
        label: "Value",
        type: "text",
        required: true,
        placeholder: "Enter Value",
      },
      {
        name: "status",
        label: "Status",
        type: "switch",
        required: true,
        defaultValue: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        required: false,
        placeholder: "Enter Description",
      },
    ],
    actions: [],
  };

  return <FormComponent ref={formRef} formOptions={formOptions} />;
};

export default CreateEditTranslationPage;
