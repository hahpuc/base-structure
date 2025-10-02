import { EditOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { AppTable, TableOption } from '@/components/partials/table';
import useHeader from '@/hooks/use-header.hook';
import { categoryService } from '@/services/category.service';
import { ListPaginate } from '@/types/base';
import { CategoryDto, QueryCategory } from '@/types/category';

const CategoryPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useHeader('Category Management', [
    {
      id: 'create-category',
      title: 'Create',
      icon: 'plus',
      color: 'lime',
      variant: 'solid',
      type: 'default',
      handler: () => navigate('/category/create'),
    },
  ]);

  const fetchCategories = async (params: QueryCategory): Promise<ListPaginate<CategoryDto>> => {
    const response = await categoryService.getByPaged(params);

    if (response.isSuccess && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch categories');
  };

  const tableOption: TableOption<CategoryDto> = {
    title: 'Category Management',
    data: fetchCategories,
    filterable: true,
    selectable: true,
    resizable: false,
    pageSize: 10,
    actions: [
      {
        label: 'Edit',
        icon: <EditOutlined />,
        color: 'danger',
        handler: () => {
          message.info('Edit action clicked');
        },
      },
    ],
    columns: [
      {
        title: 'ID',
        name: 'id',
        type: 'number',
        width: 80,
        sortable: false,
      },
      {
        title: 'Name',
        name: 'name',
        type: 'text',
        sortable: false,
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'text',
        sortable: false,
      },
    ],
    filters: [],
  };

  return <AppTable option={tableOption} />;
};

export default CategoryPage;
