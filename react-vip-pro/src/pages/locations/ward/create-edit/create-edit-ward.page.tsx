import createValidationRules, {
  FormComponent,
  FormComponentRef,
  FormOption,
  FormSubmitResult,
} from "@/components/forms/form";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { provinceService } from "@/services/province.service";
import { wardService } from "@/services/ward.service";
import { CreateWard, EditWard } from "@/types/ward";
import { message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CreateEditWardPage: React.FunctionComponent = () => {
  const formRef = useRef<FormComponentRef>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<
    Record<string, unknown> | undefined
  >();

  const isEdit = !!id;

  useHeader("Create Ward", [
    {
      id: "back-ward",
      title: "Back",
      icon: "back",
      type: "default",
      handler: () => navigate("/ward"),
    },
    {
      id: "save-ward",
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
    const resultApi = await wardService.getById(Number(id));
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

    message.error(resultApi.error?.message || "Failed to load ward");
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
      province_id: formValue.province_id as number,
      status: (formValue.status as boolean) ? EStatus.active : EStatus.inactive,
    };

    let resultApi;
    if (isEdit && id) {
      const updateData: EditWard = {
        id: Number(id),
        ...commonData,
      };
      resultApi = await wardService.update(updateData);
    } else {
      const createData: CreateWard = { ...commonData };
      resultApi = await wardService.create(createData);
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
    layout: "vertical",
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
        name: "province_id",
        label: "Province",
        type: "select",
        required: true,
        placeholder: "Select province",
        rules: [createValidationRules.required()],
        showWhen: (form) => {
          return form.name ? true : false;
        },
        enableWhen: (form) => {
          return form.status ? true : false;
        },
        span: 12,
        options: async () => {
          const result = await provinceService.getAll();
          if (result.isSuccess && result.data) {
            return result.data.map((province) => ({
              label: province.name,
              value: province.id,
            }));
          }
          return [];
        },
      },
      {
        name: "ward_id",
        label: "Ward",
        type: "select",
        required: true,
        placeholder: "Select ward",
        rules: [createValidationRules.required()],
        span: 12,
        enableWhen: (form) => {
          return form.province_id ? true : false;
        },
        parent: {
          filterName: "province_id",
        },
        options: async (province_id: string | number) => {
          if (!province_id) return [];

          const result = await wardService.getAll(+province_id);

          if (result.isSuccess && result.data) {
            return result.data.map((ward) => ({
              label: ward.name,
              value: ward.id,
            }));
          }
          return [];
        },
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

export default CreateEditWardPage;
