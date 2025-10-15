import createValidationRules, {
  FormComponent,
  FormComponentRef,
  FormOption,
  FormSubmitResult,
} from "@/components/forms/form";
import { EStatus } from "@/constants/enum";
import { useHeader } from "@/hooks/use-header.hook";
import { translationNamespaceService } from "@/services/translation-namespace.service";
import {
  CreateTranslationNamespace,
  EditTranslationNamespace,
} from "@/types/translation";
import message from "antd/lib/message";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CreateEditNamespacePage: React.FunctionComponent = () => {
  const formRef = useRef<FormComponentRef>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<
    Record<string, unknown> | undefined
  >();

  const isEdit = !!id;

  useHeader(isEdit ? "Edit Namespace" : "Create Namespace", [
    {
      id: "back-namespace",
      title: "Back",
      icon: "back",
      type: "default",
      handler: () => navigate("/namespace"),
    },
    {
      id: "save-namespace",
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
    const resultApi = await translationNamespaceService.getById(Number(id));
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
      name: formValue.name as string,
      description: formValue.description as string,
      status: (formValue.status as boolean) ? EStatus.active : EStatus.inactive,
    };

    let resultApi;
    if (isEdit && id) {
      const updateData: EditTranslationNamespace = {
        id: Number(id),
        ...commonData,
      };
      resultApi = await translationNamespaceService.update(updateData);
    } else {
      const createData: CreateTranslationNamespace = { ...commonData };
      resultApi = await translationNamespaceService.create(createData);
    }

    setLoading(false);

    if (resultApi.isSuccess) {
      message.success(isEdit ? "Updated successfully" : "Created successfully");
      navigate("/namespace");
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
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "Enter province name",
        rules: [createValidationRules.required()],
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Enter description",
        type: "text",
      },
      {
        name: "status",
        label: "Status",
        type: "switch",
        required: true,
        defaultValue: true,
      },
    ],
    actions: [],
  };

  return <FormComponent ref={formRef} formOptions={formOptions} />;
};

export default CreateEditNamespacePage;
