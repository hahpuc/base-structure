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
      type: "primary",
      disable: loading,
      handler: () => {
        formRef.current?.submitForm();
      },
    },
    {
      id: "check-errors",
      title: "Check Errors",
      color: "danger",
      variant: "solid",
      disable: loading,
      handler: () => {
        const errors = formRef.current?.getErrorField();
        if (errors && Object.keys(errors).length > 0) {
          console.log("Form errors:", errors);
          message.error(
            `Found ${Object.keys(errors).length} field(s) with errors`
          );
        } else {
          message.success("No errors found!");
        }
      },
    },
  ]);

  const formOptions: FormOption = {
    layout: "vertical",

    // Tailwind CSS responsive grid configuration
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    gridGap: "gap-x-6",
    loading,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      message.success("Form submitted successfully!");
    },
    showDefaultActions: false,
    controls: [
      // ========== TEXT INPUTS ==========
      {
        name: "name",
        label: "Name (Text Input)",
        type: "text",
        required: true,
        placeholder: "Enter your name",
        rules: [createValidationRules.required()],
        className: "col-span-1",
        maxLength: 50,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        rules: [
          createValidationRules.required(),
          createValidationRules.email(),
        ],
        className: "col-span-1",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Enter your password",
        rules: [
          createValidationRules.required(),
          createValidationRules.minLength(6),
        ],
        className: "col-span-1",
      },

      // ========== NUMBER INPUT ==========
      {
        name: "age",
        label: "Age (Number Input)",
        type: "number",
        placeholder: "Enter your age",
        className: "col-span-1",
        min: 0,
        max: 150,
        step: 1,
      },
      {
        name: "price",
        label: "Price (Number with Precision)",
        type: "number",
        placeholder: "Enter price",
        className: "col-span-1",
        min: 0,
        precision: 2,
        step: 0.01,
      },

      // ========== TEXTAREA ==========
      {
        name: "description",
        label: "Description (Textarea)",
        type: "textarea",
        placeholder: "Enter description",
        required: true,
        rules: [createValidationRules.required()],
        className: "col-span-1 md:col-span-2 lg:col-span-3 description",
        rows: 4,
        maxLength: 500,
      },
      {
        name: "bio",
        label: "Bio (Auto-resize Textarea)",
        type: "textarea",
        placeholder: "Tell us about yourself",
        className: "col-span-1 md:col-span-2 lg:col-span-3 bio",
        readonly: true,
        defaultValue: "Read only default value for testing",
        autoSize: { minRows: 2, maxRows: 6 },
      },

      // ========== SWITCH ==========
      {
        name: "status",
        label: "Active Status (Switch)",
        type: "switch",
        className: "col-span-1",
        defaultValue: false,
      },
      {
        name: "is_featured",
        label: "Featured - Show Gender / Notification Preference",
        type: "switch",
        className: "col-span-1",
        defaultValue: true,
      },

      // ========== RADIO ==========
      {
        name: "gender",
        label: "Gender (Radio)",
        type: "radio",
        required: true,
        rules: [createValidationRules.required()],
        showWhen: (form) => {
          return form.is_featured === true;
        },
        className: "col-span-1",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other", disabled: true },
        ],
      },
      {
        name: "notification_preference",
        label: "Notification Preference",
        type: "radio",
        className: "col-span-1 md:col-span-2",
        showWhen: (form) => {
          return form.is_featured === true;
        },
        options: [
          { label: "Email Only", value: "email" },
          { label: "SMS Only", value: "sms" },
          { label: "Both", value: "both" },
          { label: "None", value: "none", disabled: true },
        ],
      },

      // ========== CHECKBOX ==========
      {
        name: "interests",
        label: "Interests (Checkbox Group)",
        type: "checkbox",
        className: "col-span-1 md:col-span-2 lg:col-span-3 interests",
        options: [
          { label: "Sports", value: "sports" },
          { label: "Music", value: "music" },
          { label: "Reading", value: "reading" },
          { label: "Travel", value: "travel" },
          { label: "Technology", value: "technology" },
          { label: "Cooking", value: "cooking", disabled: true },
        ],
      },

      // ========== DATE & TIME ==========
      {
        name: "birth_date",
        label: "Birth Date (Date Picker)",
        type: "date",
        placeholder: "Select date",
        required: true,
        rules: [createValidationRules.required()],
        className: "col-span-1",
        format: "YYYY-MM-DD",
      },
      {
        name: "appointment_datetime",
        label: "Appointment (DateTime Picker)",
        type: "datetime",
        placeholder: "Select date and time",
        className: "col-span-1",
        format: "YYYY-MM-DD HH:mm:ss",
        showTime: true,
      },
      {
        name: "meeting_time",
        label: "Meeting Time (Time Picker)",
        type: "time",
        placeholder: "Select time",
        className: "col-span-1",
        format: "HH:mm:ss",
      },

      // ========== SELECT (Simple) ==========
      {
        name: "category_id",
        label: "Category (Simple Select)",
        type: "select",
        placeholder: "Select category",
        className: "col-span-1",
        showSearch: true,
        allowClear: true,
        showWhen: (form) => {
          return !!form.name;
        },
        enableWhen: (form) => {
          return !!form.status;
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

      // ========== SELECT (Parent-Child) ==========
      {
        name: "province_id",
        label: "Province (Parent Select - Enable when Status: Active)",
        type: "select",
        placeholder: "Select province",
        className: "col-span-1",
        showSearch: true,
        allowClear: true,
        enableWhen: (form) => {
          return form.status === true;
        },
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
        label: "Ward (Child Select)",
        type: "select",
        placeholder: "Select ward",
        className: "col-span-1",
        showSearch: true,
        allowClear: true,
        enableWhen: (form) => {
          return !!form.province_id;
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

      // ========== SELECT (Multiple) ==========
      {
        name: "tags",
        label: "Tags (Multiple Select)",
        type: "select",
        placeholder: "Select tags",
        className: "col-span-1",
        mode: "multiple",
        allowClear: true,
        options: [
          { label: "JavaScript", value: "javascript" },
          { label: "TypeScript", value: "typescript" },
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Angular", value: "angular" },
          { label: "Node.js", value: "nodejs" },
        ],
      },
      {
        name: "skills",
        label: "Skills (Tags Mode)",
        type: "select",
        placeholder: "Add skills",
        className: "col-span-1",
        mode: "tags",
        required: true,
        rules: [createValidationRules.required()],
        allowClear: true,
        options: [
          { label: "Frontend", value: "frontend" },
          { label: "Backend", value: "backend" },
          { label: "DevOps", value: "devops" },
          { label: "Design", value: "design" },
        ],
      },

      // ========== SELECT (Pagination) ==========
      {
        name: "province_pagination_id",
        label: "Province (Pagination + Multiple)",
        type: "select",
        placeholder: "Select provinces",
        className: "col-span-1",
        usePagination: true,
        pageSize: 10,
        showSearch: true,
        allowClear: true,
        mode: "multiple",
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
        label: "Ward (Pagination + Parent Dependency)",
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
          if (!province_ids) return { isSuccess: false, data: null };

          const provinceIdsArray = Array.isArray(province_ids)
            ? province_ids.map((id) => +id)
            : [+province_ids];

          const wardQuery: QueryWard = {
            page: query.page,
            limit: query.limit,
            filter: query.filter,
            province_ids: provinceIdsArray,
          };
          return await wardService.getByPaged(wardQuery);
        }) as (
          input: BaseQuery,
          parentValue?: string | number
        ) => Promise<ApiResult<ListPaginate<unknown>>>,
      },

      // ========== AUTOCOMPLETE ==========
      {
        name: "city",
        label: "City (Autocomplete)",
        type: "autocomplete",
        placeholder: "Search city",
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        showSearch: true,
        options: [
          { label: "New York", value: "new_york" },
          { label: "Los Angeles", value: "los_angeles" },
          { label: "Chicago", value: "chicago" },
          { label: "Houston", value: "houston" },
          { label: "Phoenix", value: "phoenix" },
          { label: "Philadelphia", value: "philadelphia" },
        ],
      },

      // ========== FILE UPLOAD ==========
      {
        name: "Image",
        label: "Image (File Upload)",
        type: "file",
        className: "col-span-3 md:col-span-2 lg:col-span-1",
        required: true,
        rules: [createValidationRules.required()],
      },
      {
        name: "documents",
        label: "Documents (Exels, PDF, Word, PPTX,...)",
        type: "file",
        className: "col-span-3 md:col-span-2 lg:col-span-1",
      },
      {
        name: "video",
        label: "Video (File Upload)",
        type: "file",
        className: "col-span-3 md:col-span-2 lg:col-span-1",
      },

      // ========== RICH TEXT ==========
      {
        name: "content",
        label: "Content (Rich Text Editor)",
        type: "richtext",
        placeholder: "Enter content here...",
        className: "col-span-1 md:col-span-2 lg:col-span-3 content",
        rows: 8,
      },
      // ========== CUSTOM RENDER ==========
      {
        name: "rating",
        label: "Rating (Custom Component)",
        type: "custom",
        className: "col-span-1",
        render: (value, onChange) => (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onChange(star)}
                className={`text-2xl ${
                  (value as number) >= star
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-gray-600">
              {value ? `${value}/5` : "No rating"}
            </span>
          </div>
        ),
      },

      // ========== HIDDEN ==========
      {
        name: "hidden_field_id",
        label: "",
        type: "hidden",
        className: "col-span-1 md:col-span-2 lg:col-span-3 hidden",
        defaultValue: "this_is_a_hidden_value_use_for_submit_data_only",
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

  return (
    <div>
      <FormComponent ref={formRef} formOptions={formOptions} />;
    </div>
  );
};

export default DynamicFormPage;
