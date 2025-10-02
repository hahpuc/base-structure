import { AppTable, TableOption } from "@/components/forms/table";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { EyeIcon, PencilIcon, TrashBinIcon } from "@/icons";
import { provinceService } from "@/services/province.service";
import { ListPaginate } from "@/types/base";
import { ProvinceDto, QueryProvince } from "@/types/province";
import { message } from "antd";
import { useNavigate } from "react-router";

const ProvincePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("Province Management", [
    {
      id: "create-province",
      title: "Create",
      icon: "plus",
      type: "primary",
      handler: () => {
        navigate("/province/create");
      },
    },
    {
      id: "export-province",
      title: "Export",
      icon: "export",
      type: "default",
      handler: () => {},
    },
    {
      id: "import-province",
      title: "Import",
      icon: "import",
      type: "default",
      handler: () => {},
    },
  ]);

  const fetchProvinces = async (
    params: QueryProvince
  ): Promise<ListPaginate<ProvinceDto>> => {
    const response = await provinceService.getByPaged(params);
    if (response.isSuccess && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || "Failed to fetch provinces");
  };

  const tableOption: TableOption<ProvinceDto> = {
    title: "Province Management",
    data: fetchProvinces,
    filterable: true,
    selectable: true,
    resizable: false,
    pageSize: 10,
    actions: [
      {
        label: "edit",
        icon: <PencilIcon />,
        color: "danger",
        handler: (row) => {
          navigate(`/province/edit/${row.id}`);
        },
      },
      {
        label: "View",
        icon: <EyeIcon />,
        handler: (row) => {
          message.info(`View province: ${row.name}`);
        },
      },
      {
        label: "Delete",
        icon: <TrashBinIcon />,
        color: "danger",
        handler: (row) => {
          message.info(`Delete province: ${row.name}`);
        },
      },
    ],
    columns: [
      {
        title: "ID",
        name: "id",
        type: "number",
        width: 80,
        sortable: false,
      },
      {
        title: "Name",
        name: "name",
        type: "text",
        sortable: true,
        filterable: true,
      },
      {
        title: "Created At",
        name: "created_at",
        type: "datetime",
        sortable: false,
      },
      {
        title: "Updated At",
        name: "updated_at",
        type: "datetime",
        sortable: false,
      },
      {
        title: "Status",
        name: "status",
        type: "custom-render",
        sortable: false,
        filterable: true,
        customRender: (row) => (
          <span
            style={{
              color: row.status === EStatus.active ? "green" : "red",
            }}
          >
            {row.status === EStatus.active ? "Active" : "Inactive"}
          </span>
        ),
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
    ],
  };

  return <AppTable option={tableOption} />;
};

export default ProvincePage;
