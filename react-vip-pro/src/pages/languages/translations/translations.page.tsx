import { AppTable, SelectOption, TableOption } from "@/components/forms/table";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon } from "@/icons";
import { languageService } from "@/services/language.service";
import { translationNamespaceService } from "@/services/translation-namespace.service";
import { translationService } from "@/services/translation.service";
import { ListPaginate } from "@/types/base";
import { QueryTranslation, TranslationDto } from "@/types/translation";
import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import TranslationsImportDialog from "./components/translations-import.dialog";

const TranslationPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

  useHeader("Translation Management", [
    {
      id: "create-translation",
      title: "Create",
      icon: "plus",
      type: "primary",
      permission: "language_manage_create",
      handler: () => navigate("/translation/create"),
    },
    {
      id: "import-translation",
      title: "Import",
      icon: "import",
      type: "default",
      permission: "language_manage_create",
      handler: () => setIsImportModalVisible(true),
    },
  ]);

  const fetchData = async (
    params: QueryTranslation
  ): Promise<ListPaginate<TranslationDto>> => {
    const response = await translationService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || "Failed to fetch blog posts");
  };

  const tableOption: TableOption<TranslationDto> = {
    title: "Translation Management",
    data: fetchData,
    filterable: true,
    pageSize: 10,
    actions: [
      {
        label: "edit",
        icon: <PencilIcon />,
        color: "danger",
        permission: "language_manage_update",
        handler: (row) => {
          navigate(`/translation/edit/${row.id}`);
        },
      },
    ],
    columns: [
      {
        title: "ID",
        name: "",
        type: "custom-render",
        customRender: (row) => {
          return <span className="text-blue-500 font-semibold">#{row.id}</span>;
        },
      },
      {
        title: "Language",
        name: "language.code",
        type: "text",
      },
      {
        title: "Namespace",
        name: "namespace.name",
        type: "text",
      },
      {
        title: "Key",
        name: "key",
        type: "text",
        width: "250px",
      },
      {
        title: "Value",
        name: "value",
        type: "text",
        width: "300px",
      },
      {
        title: "Description",
        name: "description",
        type: "text",
      },
      {
        title: "Status",
        name: "status",
        type: "status",
      },
    ],
    filters: [
      {
        type: "select",
        name: "status",
        label: "Status",
        options: [
          { label: "Active", value: EStatus.active },
          { label: "Inactive", value: EStatus.inactive },
        ],
      },
      {
        type: "select",
        name: "language_id",
        label: "Language",
        options: async () => {
          const result = await languageService.getOptions();

          if (result.isSuccess && result.data) {
            return result.data.map((lang) => ({
              label: lang.label,
              value: lang.value,
            })) as SelectOption[];
          }
          return [];
        },
      },
      {
        type: "select",
        name: "namespace_id",
        label: "Namespace",
        options: async () => {
          const result = await translationNamespaceService.getOptions();

          if (result.isSuccess && result.data) {
            return result.data.map((ward) => ({
              label: ward.label,
              value: ward.value,
            })) as SelectOption[];
          }
          return [];
        },
      },
    ],
  };

  return (
    <>
      <AppTable option={tableOption} />
      <Modal
        title="Import/Export Translations"
        open={isImportModalVisible}
        onCancel={() => setIsImportModalVisible(false)}
        footer={null}
        width={600}
      >
        <TranslationsImportDialog />
      </Modal>
    </>
  );
};

export default TranslationPage;
