import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { AppTable, TableOption } from '@/components/base/table';
import { EStatus } from '@/constants/enum';
import { blogPostService } from '@/services/blog-post.service';
import { ListPaginate } from '@/types/base';
import { BlogPostDto, QueryBlogPost } from '@/types/blog-post';

const BlogPostPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const fetchBlogPosts = async (params: QueryBlogPost): Promise<ListPaginate<BlogPostDto>> => {
    const response = await blogPostService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch categories');
  };

  const tableOption: TableOption<BlogPostDto> = {
    title: 'Blog Post Management',
    data: fetchBlogPosts,
    filterable: true,
    selectable: true,
    resizable: false,
    pageSize: 10,
    actions: [
      {
        label: 'Edit',
        icon: <EditOutlined />,
        color: 'danger',
        handler: row => {
          navigate(`/blog-post/edit/${row.id}`);
        },
      },
    ],
    columns: [
      {
        title: 'ID',
        name: 'id',
        type: 'number',
        width: 80,
      },
      {
        title: 'Title',
        name: 'title',
        type: 'text',
        width: 300,
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'text',
        width: 200,
      },
      {
        title: 'Order Index',
        name: 'order_index',
        type: 'number',
      },
      {
        title: 'Description',
        name: 'description',
        type: 'text',
        width: 300,
      },
      {
        title: 'Thumbnail',
        name: 'thumbnail',
        type: 'image',
      },
      {
        title: 'Published At',
        name: 'published_at',
        type: 'date',
        width: 150,
      },
      {
        title: 'Status',
        name: 'status',
        type: 'custom-render',
        sortable: true,
        filterable: true,
        width: 150,
        customRender: row => (
          <span
            style={{
              color: row.status === EStatus.active ? 'green' : 'red',
            }}
          >
            {row.status === EStatus.active ? 'Active' : 'Inactive'}
          </span>
        ),
      },
      {
        title: 'Category',
        name: 'category.name',
        type: 'text',
        width: 200,
      },
    ],
    filters: [],
  };

  return <AppTable option={tableOption} />;
};

export default BlogPostPage;
