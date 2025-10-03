import createValidationRules, {
  FormComponent,
  FormComponentRef,
  FormOption,
  ListPaginate,
} from "@/components/forms/form";
import useHeader from "@/hooks/use-header.hook";
import { categoryService } from "@/services/category.service";
import { ApiResult } from "@/services/client/api-result";
import { provinceService } from "@/services/province.service";
import { wardService } from "@/services/ward.service";
import { BaseQuery } from "@/types/base";
import { QueryProvince } from "@/types/province";
import { QueryWard } from "@/types/ward";
import { message } from "antd";
import { useRef, useState } from "react";

const DynamicFormPage: React.FunctionComponent = () => {
  const formRef = useRef<FormComponentRef>(null);

  const [loading] = useState(false);

  useHeader("Dynamic Form", [
    {
      id: "save-ward",
      title: "Save",
      icon: "edit",
      type: "primary",
      disable: loading,
      handler: () => formRef.current?.submitForm(),
    },
  ]);

  const formOptions: FormOption = {
    layout: "vertical",

    // Tailwind CSS responsive grid configuration
    gridCols: "grid-cols-1 md:grid-cols-2",
    gridGap: "gap-x-6",
    loading,
    onSubmit: () => {},
    showDefaultActions: false,
    controls: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "Enter province name",
        rules: [createValidationRules.required()],
        className: "col-span-1",
      },
      {
        name: "status",
        label: "Status",
        type: "switch",
        required: true,
        className: "col-span-1",
        defaultValue: false,
      },
      {
        name: "category_id",
        label: "Category",
        type: "select",
        placeholder: "Select category",
        className: "col-span-1 md:col-span-2",
        showWhen: (form) => {
          console.log("Form value changed:", form);
          return form.name ? true : false;
        },
        enableWhen: (form) => {
          return form.status ? true : false;
        },
        options: async () => {
          const result = await categoryService.getAll();
          if (result.isSuccess && result.data) {
            return result.data.map((category) => ({
              label: category.name,
              value: category.id,
            }));
          }
          return [];
        },
      },
      {
        name: "province_id",
        label: "Province",
        type: "select",
        required: true,
        placeholder: "Select province",
        rules: [createValidationRules.required()],
        className: "col-span-1",
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
        className: "col-span-1",
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
        name: "province_pagination_id",
        label: "Province (with Pagination - Multiple)",
        type: "select",
        placeholder: "Select provinces",
        className: "col-span-1",
        usePagination: true,
        pageSize: 10,
        showSearch: true,
        allowClear: true,
        mode: "multiple", // Enable multiple selection
        options: (async (query: BaseQuery) => {
          const provinceQuery: QueryProvince = {
            page: query.page,
            limit: query.limit,
            filter: query.filter,
          };
          return await provinceService.getByPaged(provinceQuery);
        }) as (input: BaseQuery) => Promise<ApiResult<ListPaginate<unknown>>>,
      },
      {
        name: "ward_pagination_id",
        label: "Ward (with Pagination - depends on Provinces)",
        type: "select",
        placeholder: "Select ward",
        className: "col-span-1",
        usePagination: true,
        pageSize: 10,
        showSearch: true,
        allowClear: true,
        enableWhen: (form) => {
          return !!(
            form.province_pagination_id &&
            Array.isArray(form.province_pagination_id) &&
            form.province_pagination_id.length > 0
          );
        },
        parent: {
          filterName: "province_pagination_id",
        },
        options: (async (query: BaseQuery, province_ids?: string | number) => {
          // province_ids will be an array when parent is multiple select
          if (!province_ids) return { isSuccess: false, data: null };

          // Convert to array if it's a single value or already an array
          const provinceIdsArray = Array.isArray(province_ids)
            ? province_ids.map((id) => +id)
            : [+province_ids];

          const wardQuery: QueryWard = {
            page: query.page,
            limit: query.limit,
            filter: query.filter,
            province_ids: provinceIdsArray, // Use province_ids for multiple provinces
          };
          return await wardService.getByPaged(wardQuery);
        }) as (
          input: BaseQuery,
          parentValue?: string | number
        ) => Promise<ApiResult<ListPaginate<unknown>>>,
      },
    ],
    actions: [
      {
        type: "submit",
        label: "Submit",
        loading: loading,
        color: "primary",
        handler: () => formRef.current?.submitForm(),
      },
      {
        type: "reset",
        label: "Reset",
        color: "default",
        handler: () => formRef.current?.resetForm(),
      },
      {
        type: "cancel",
        label: "Cancel",
        color: "default",
        handler: () => {
          message.info("Cancel clicked");
        },
      },
      {
        type: "custom",
        label: "Custom Action",
        color: "primary",
        handler: () => {
          message.success("Custom action clicked");
        },
      },
    ],
  };

  return <FormComponent ref={formRef} formOptions={formOptions} />;
};

export default DynamicFormPage;
