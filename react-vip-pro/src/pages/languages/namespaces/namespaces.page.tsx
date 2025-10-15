import { AppTable, TableOption } from "@/components/forms/table";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon } from "@/icons";
import { translationNamespaceService } from "@/services/translation-namespace.service";
import { ListPaginate } from "@/types/base";
import {
  QueryTranslationNamespace,
  TranslationNamespaceDto,
} from "@/types/translation";
import { useNavigate } from "react-router";

const NamespacePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("Namespace Management", [
    {
      id: "create-namespace",
      title: "Create",
      icon: "plus",
      type: "primary",
      permission: "language_manage_create",
      handler: () => navigate("/namespace/create"),
    },
  ]);

  const fetchData = async (
    params: QueryTranslationNamespace
  ): Promise<ListPaginate<TranslationNamespaceDto>> => {
    const response = await translationNamespaceService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || "Failed to fetch blog posts");
  };

  const tableOption: TableOption<TranslationNamespaceDto> = {
    title: "Namespace Management",
    data: fetchData,
    filterable: false,
    pageSize: 10,
    actions: [
      {
        label: "edit",
        icon: <PencilIcon />,
        color: "danger",
        permission: "language_manage_update",
        handler: (row) => {
          navigate(`/namespace/edit/${row.id}`);
        },
      },
    ],
    columns: [
      {
        title: "ID",
        name: "id",
        type: "number",
      },
      {
        title: "Name",
        name: "name",
        type: "text",
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
        click: (row) => {
          translationNamespaceService.toggleStatus(+row.id);
        },
      },
    ],
    filters: [],
  };

  return <AppTable option={tableOption} />;
};

export default NamespacePage;
