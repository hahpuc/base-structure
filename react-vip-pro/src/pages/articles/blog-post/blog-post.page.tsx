import { AppTable, TableOption } from "@/components/forms/table";
import { EStatus } from "@/constants/enum";
import useHeader from "@/hooks/use-header.hook";
import { PencilIcon } from "@/icons";
import { blogPostService } from "@/services/blog-post.service";
import { ListPaginate } from "@/types/base";
import { BlogPostDto, QueryBlogPost } from "@/types/blog-post";
import { useNavigate } from "react-router";

const BlogPostPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader("Blog Post Management", [
    {
      id: "create-blog-post",
      title: "Create",
      icon: "plus",
      type: "primary",
      permission: "blog_post_manage_create",
      handler: () => navigate("/blog-post/create"),
    },
  ]);

  const fetchData = async (
    params: QueryBlogPost
  ): Promise<ListPaginate<BlogPostDto>> => {
    const response = await blogPostService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || "Failed to fetch blog posts");
  };

  const tableOption: TableOption<BlogPostDto> = {
    title: "Blog Post Management",
    data: fetchData,
    filterable: true,
    pageSize: 10,
    actions: [
      {
        label: "edit",
        icon: <PencilIcon />,
        color: "danger",
        permission: "blog_post_manage_update",
        handler: (row) => {
          navigate(`/blog-post/edit/${row.id}`);
        },
      },
    ],
    columns: [
      {
        title: "ID",
        name: "id",
        type: "number",
        width: 80,
      },
      {
        title: "Title",
        name: "title",
        type: "text",
        width: 300,
      },
      {
        title: "Slug",
        name: "slug",
        type: "text",
        width: 200,
      },
      {
        title: "Order Index",
        name: "order_index",
        type: "number",
        sortable: true,
        width: 150,
      },
      {
        title: "Description",
        name: "description",
        type: "text",
        width: 300,
      },
      {
        title: "Thumbnail",
        name: "thumbnail",
        type: "image",
      },
      {
        title: "Published At",
        name: "published_at",
        type: "date",
        width: 150,
      },
      {
        title: "Status",
        name: "status",
        type: "custom-render",
        filterable: true,
        width: 150,
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
      {
        title: "Category",
        name: "category.name",
        type: "text",
        width: 200,
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

export default BlogPostPage;
