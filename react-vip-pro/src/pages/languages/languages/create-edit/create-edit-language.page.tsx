import createValidationRules, {
  FormComponent,
  FormComponentRef,
  FormOption,
  FormSubmitResult,
} from "@/components/forms/form";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { languageService } from "@/services/language.service";
import { CreateLanguage, EditLanguage } from "@/types/language";
import { message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CreateEditLanguagePage: React.FunctionComponent = () => {
  const formRef = useRef<FormComponentRef>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<
    Record<string, unknown> | undefined
  >();

  const isEdit = !!id;

  useHeader(isEdit ? "Edit Language" : "Create Language", [
    {
      id: "back-language",
      title: "Back",
      icon: "back",
      type: "default",
      handler: () => navigate("/language"),
    },
    {
      id: "save-language",
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
    const resultApi = await languageService.getById(Number(id));
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
      code: formValue.code as string,
      native_name: formValue.native_name as string,
      flag_code: formValue.flag_code as string,
      flag_icon: formValue.flag_icon as string | undefined,
      is_rtl: formValue.is_rtl as boolean,
      status: (formValue.status as boolean) ? EStatus.active : EStatus.inactive,
    };

    let resultApi;
    if (isEdit && id) {
      const updateData: EditLanguage = {
        id: Number(id),
        ...commonData,
      };
      resultApi = await languageService.update(updateData);
    } else {
      const createData: CreateLanguage = { ...commonData };
      resultApi = await languageService.createDefaultTranslations(createData);
    }

    setLoading(false);

    if (resultApi.isSuccess) {
      message.success(isEdit ? "Updated successfully" : "Created successfully");
      navigate("/language");
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
        name: "code",
        label: "Code",
        type: "text",
        required: true,
        placeholder: "Enter language code (e.g., en, fr, de)",
        rules: [createValidationRules.required()],
      },
      {
        name: "native_name",
        label: "Native Name",
        type: "text",
        required: true,
        placeholder: "Enter native name",
        rules: [createValidationRules.required()],
      },
      {
        name: "flag_code",
        label: "Flag Code",
        type: "text",
        required: true,
        placeholder: "Enter flag code (e.g., us, fr, de)",
        rules: [createValidationRules.required()],
      },
      {
        name: "flag_icon",
        label: "Flag Icon",
        type: "text",
        placeholder: "Enter flag icon URL",
      },
      {
        name: "is_rtl",
        label: "Right to Left",
        type: "switch",
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

export default CreateEditLanguagePage;
