import createValidationRules, {
  FormComponent,
  FormComponentRef,
  FormOption,
  FormSubmitResult,
} from "@/components/forms/form";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { provinceService } from "@/services/province.service";
import { CreateProvince, EditProvince } from "@/types/province";
import { message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CreateEditProvincePage: React.FunctionComponent = () => {
  const formRef = useRef<FormComponentRef>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<
    Record<string, unknown> | undefined
  >();

  const isEdit = !!id;

  useHeader("Create Province", [
    {
      id: "back-province",
      title: "Back",
      icon: "back",
      type: "default",
      handler: () => navigate("/province"),
    },
    {
      id: "save-province",
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
    const resultApi = await provinceService.getById(Number(id));
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

    message.error(resultApi.error?.message || "Failed to load province");
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

      status: (formValue.status as boolean) ? EStatus.active : EStatus.inactive,
    };

    let resultApi;
    if (isEdit && id) {
      const updateData: EditProvince = {
        id: Number(id),
        ...commonData,
      };
      resultApi = await provinceService.update(updateData);
    } else {
      const createData: CreateProvince = { ...commonData };
      resultApi = await provinceService.create(createData);
    }

    setLoading(false);

    if (resultApi.isSuccess) {
      message.success(isEdit ? "Updated successfully" : "Created successfully");
      navigate("/province");
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
    layout: "horizontal",
    size: "large",
    gutter: 16,
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
        defaultValue: "test defaut value",
        span: 12,
      },

      {
        name: "status",
        label: "Status",
        type: "switch",
        required: true,
        span: 24,
        defaultValue: true,
      },
    ],
    actions: [],
  };

  return <FormComponent ref={formRef} formOptions={formOptions} />;
};

export default CreateEditProvincePage;
