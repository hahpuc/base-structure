import { EditOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { AppTable, TableOption } from '@/components/partials/table';
import { EStatus } from '@/constants/enum';
import { useHeader } from '@/hooks/use-header.hook';
import { blogPostService } from '@/services/blog-post.service';
import { ListPaginate } from '@/types/base';
import { BlogPostDto, QueryBlogPost } from '@/types/blog-post';

const BlogPostPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader('Blog Post', [
    {
      id: 'add-blog-post',
      title: 'Create',
      icon: 'plus',
      color: 'geekblue',
      variant: 'outlined',
      type: 'default',
      handler: () => navigate('/blog-post/create'),
    },
    {
      id: 'import-blog-post',
      title: 'Import',
      icon: 'import',
      color: 'red',
      variant: 'dashed',
      handler: () => {
        message.info('Import clicked');
      },
    },
    {
      id: 'export-blog-post',
      title: 'Export',
      icon: 'export',
      type: 'primary',
      handler: () => {
        message.info('Export clicked');
      },
    },
    {
      id: 'delete-selected-blog-post',
      title: 'Delete ',
      icon: 'delete',
      variant: 'outlined',
      color: 'yellow',
      handler: () => {
        message.info('Delete clicked');
      },
    },
  ]);

  const fetchBlogPosts = async (params: QueryBlogPost): Promise<ListPaginate<BlogPostDto>> => {
    const response = await blogPostService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch categories');
  };

  const tableOption: TableOption<BlogPostDto> = {
    title: 'Blog Post',
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
        sortable: true,
        width: 150,
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
    filters: [
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        options: [
          { label: 'Active', value: EStatus.active },
          { label: 'Inactive', value: EStatus.inactive },
        ],
      },
    ],
  };

  return <AppTable option={tableOption} />;
};

export default BlogPostPage;
