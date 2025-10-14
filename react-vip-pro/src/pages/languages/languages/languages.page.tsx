import { AppTable, TableOption } from "@/components/forms/table";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon } from "@/icons";
import { languageService } from "@/services/language.service";
import { ListPaginate } from "@/types/base";
import { LanguageDto, QueryLanguage } from "@/types/language";
import { useNavigate } from "react-router";

const LanguagePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("Language Management", [
    {
      id: "create-language",
      title: "Create",
      icon: "plus",
      type: "primary",
      permission: "language_manage_create",
      handler: () => navigate("/language/create"),
    },
  ]);

  const fetchData = async (
    params: QueryLanguage
  ): Promise<ListPaginate<LanguageDto>> => {
    const response = await languageService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || "Failed to fetch blog posts");
  };

  const tableOption: TableOption<LanguageDto> = {
    title: "Language Management",
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
          navigate(`/language/edit/${row.id}`);
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
        title: "Code",
        name: "code",
        type: "text",
      },
      {
        title: "Name",
        name: "name",
        type: "text",
      },
      {
        title: "Native Name",
        name: "native_name",
        type: "text",
      },
      {
        title: "Flag",
        name: "flag_icon",
        type: "custom-render",
        customRender: (row) => {
          return (
            <img
              src={row.flag_icon}
              alt="flag"
              className="w-[48px] h-auto inline-block"
            />
          );
        },
      },
      {
        title: "Right to Left",
        name: "is_rtl",
        type: "boolean",
      },
      {
        title: "Status",
        name: "status",
        type: "status",
      },
    ],
    filters: [],
  };

  return <AppTable option={tableOption} />;
};

export default LanguagePage;
