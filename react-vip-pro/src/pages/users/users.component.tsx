import { AppTable, TableOption } from "@/components/forms/table";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon } from "@/icons";
import { roleService } from "@/services/role.service";
import { userService } from "@/services/user.service";
import { ListPaginate } from "@/types/base";
import { QueryUser, UserDto } from "@/types/user";
import { useNavigate } from "react-router";

const UsersPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("User Management", [
    {
      id: "create-user",
      title: "Create",
      icon: "plus",
      type: "primary",
      permission: "user_manage_create",
      handler: () => {
        navigate("/user/create");
      },
    },
  ]);

  const fetchData = async (
    params: QueryUser
  ): Promise<ListPaginate<UserDto>> => {
    const response = await userService.getByPaged(params);
    if (response.isSuccess && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || "Failed to fetch data");
  };

  const tableOption: TableOption<UserDto> = {
    data: fetchData,
    filterable: true,
    selectable: true,
    resizable: false,
    pageSize: 10,
    actions: [
      {
        label: "edit",
        icon: <PencilIcon />,
        color: "danger",
        permission: "user_manage_update",
        handler: (row) => {
          navigate(`/user/edit/${row.id}`);
        },
      },
    ],
    columns: [
      {
        title: "Initial",
        name: "profile.upi",
        type: "text",
      },
      {
        title: "Created Time",
        name: "created_at",
        type: "datetime",
        sortable: true,
      },
      {
        title: "Username",
        name: "username",
        type: "text",
      },
      {
        title: "Full name",
        name: "profile.full_name",
        type: "text",
      },
      {
        title: "Phone Number",
        name: "profile.phone",
        type: "text",
        sortable: true,
      },
      {
        title: "Email",
        name: "email",
        type: "text",
      },
      {
        title: "Role",
        name: "user_roles.role.name",
        type: "custom-render",
        customRender: (row) =>
          row.user_roles.map((r) => r.role.name).join(", "),
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
        name: "roles",
        label: "Role",
        multiple: true,
        options: async () => {
          const response = await roleService.getAll();
          if (response.isSuccess && response.data) {
            return response.data.map((role) => ({
              label: role.name,
              value: role.slug,
            }));
          }
          return [];
        },
      },
    ],
  };

  return <AppTable option={tableOption} />;
};

export default UsersPage;
