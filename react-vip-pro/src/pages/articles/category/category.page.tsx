import { AppTable, TableOption } from "@/components/forms/table";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon } from "@/icons";
import { categoryService } from "@/services/category.service";
import { ListPaginate } from "@/types/base";
import { CategoryDto, QueryCategory } from "@/types/category";
import { useNavigate } from "react-router";

const CategoryPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("Category Management", [
    // {
    //   id: "create-category",
    //   title: "Create",
    //   icon: "plus",
    //   type: "primary",
    //   permission: "category_manage_create",
    //   handler: () => navigate("/category/create"),
    // },
  ]);

  const fetchData = async (
    params: QueryCategory
  ): Promise<ListPaginate<CategoryDto>> => {
    const response = await categoryService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || "Failed to fetch categories");
  };

  const tableOption: TableOption<CategoryDto> = {
    title: "Card Management",
    data: fetchData,
    filterable: true,
    pageSize: 10,
    actions: [
      // {
      //   label: "edit",
      //   icon: <PencilIcon />,
      //   color: "danger",
      //   permission: "category_manage_update",
      //   handler: (row) => {
      //     navigate(`/category/edit/${row.id}`);
      //   },
      // },
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
        sortable: false,
      },
      {
        title: "Slug",
        name: "slug",
        type: "text",
        sortable: false,
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

export default CategoryPage;
