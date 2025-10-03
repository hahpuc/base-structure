import { AppTable, TableOption } from "@/components/forms/table";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon } from "@/icons";
import { roleService } from "@/services/role.service";
import { ListPaginate } from "@/types/base";
import { QueryRole, RoleDto } from "@/types/role";
import { message } from "antd";
import { useNavigate } from "react-router";

const RolePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("Role Management", [
    {
      id: "create-role",
      title: "Create",
      icon: "plus",
      type: "primary",
      handler: () => {
        navigate("/role/create");
      },
    },
  ]);

  const fetchData = async (
    params: QueryRole
  ): Promise<ListPaginate<RoleDto>> => {
    const result = await roleService.getByPaged(params);

    if (result.isSuccess && result.data) {
      return result.data;
    }

    message.error(result.error?.message || "Failed to fetch roles");
    throw new Error(result.error?.message || "Failed to fetch roles");
  };

  const tableOption: TableOption<RoleDto> = {
    title: "Role Management",
    data: fetchData,
    filterable: true,
    pageSize: 10,
    actions: [
      {
        label: "edit",
        icon: <PencilIcon />,
        color: "danger",
        handler: (row) => {
          navigate(`/role/edit/${row.id}`);
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
        title: "Slug",
        name: "slug",
        type: "text",
        sortable: true,
        filterable: true,
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

export default RolePage;
