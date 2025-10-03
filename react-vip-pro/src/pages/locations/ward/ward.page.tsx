import { AppTable, TableOption } from "@/components/forms/table";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon, TrashBinIcon } from "@/icons";
import { provinceService } from "@/services/province.service";
import { wardService } from "@/services/ward.service";
import { ListPaginate } from "@/types/base";
import { QueryWard, WardDto } from "@/types/ward";
import { message } from "antd";
import { useNavigate } from "react-router";

const WardPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("Ward Management", [
    {
      id: "create-ward",
      title: "Create",
      icon: "plus",
      type: "primary",
      permission: "ward_manage_create",
      handler: () => {
        navigate("/ward/create");
      },
    },
    {
      id: "export-ward",
      title: "Export",
      icon: "export",
      type: "default",
      handler: () => {},
    },
    {
      id: "import-ward",
      title: "Import",
      icon: "import",
      type: "default",
      handler: () => {},
    },
  ]);

  const fetchWards = async (
    params: QueryWard
  ): Promise<ListPaginate<WardDto>> => {
    const response = await wardService.getByPaged(params);
    if (response.isSuccess && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || "Failed to fetch wards");
  };

  const tableOption: TableOption<WardDto> = {
    title: "Ward Management",
    data: fetchWards,
    filterable: true,
    selectable: true,
    resizable: false,
    pageSize: 10,
    actions: [
      {
        label: "edit",
        icon: <PencilIcon />,
        color: "danger",
        permission: "ward_manage_update",
        handler: (row) => {
          navigate(`/ward/edit/${row.id}`);
        },
      },
      {
        label: "Delete",
        icon: <TrashBinIcon />,
        color: "danger",
        permission: "ward_manage_delete",
        handler: (row) => {
          message.info(`Delete ward: ${row.name}`);
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
        title: "Province",
        name: "province.name",
        type: "text",
      },
      {
        title: "Created At",
        name: "created_at",
        type: "datetime",
        sortable: false,
        permission: "ward_manage_read",
      },
      {
        title: "Updated At",
        name: "updated_at",
        type: "datetime",
        sortable: false,
        permission: "ward_manage_read",
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
      {
        type: "select",
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
        name: "province_id",
        label: "Province",
      },
      {
        type: "select",
        name: "ward_id",
        label: "Ward",
        parent: {
          filterName: "province_id",
        },
        options: async (province_id: unknown) => {
          if (!province_id) return [];

          const result = await wardService.getAll(province_id as number);

          if (result.isSuccess && result.data) {
            return result.data.map((ward) => ({
              label: ward.name,
              value: ward.id,
            }));
          }
          return [];
        },
      },
    ],
  };

  return <AppTable option={tableOption} />;
};

export default WardPage;
