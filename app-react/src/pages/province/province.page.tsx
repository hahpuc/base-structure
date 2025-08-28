import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { AppTable, TableOption } from '@/components/base/table';
import { EStatus } from '@/constants/enum';
import { provinceService } from '@/services/province.service';
import { ListPaginate } from '@/types/base';
import { ProvinceDto, QueryProvince } from '@/types/province';

const ProvincePage: React.FunctionComponent = () => {
  const fetchProvinces = async (params: QueryProvince): Promise<ListPaginate<ProvinceDto>> => {
    const response = await provinceService.getByPaged(params);
    if (response.isSuccess && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to fetch provinces');
  };

  const tableOption: TableOption<ProvinceDto> = {
    title: 'Province Management',
    data: fetchProvinces,
    filterable: true,
    selectable: true,
    resizable: false,
    pageSize: 10,
    actions: [
      {
        label: 'edit',
        icon: <EditOutlined />,
        color: 'danger',
        handler: () => {
          message.info('Edit action clicked');
        },
      },
      {
        label: 'View',
        icon: <EyeOutlined />,
        handler: row => {
          message.info(`View province: ${row.name}`);
        },
      },
      {
        label: 'Delete',
        icon: <DeleteOutlined />,
        color: 'danger',
        handler: row => {
          message.info(`Delete province: ${row.name}`);
        },
      },
      {
        label: 'Toggle Status',
        icon: <CheckOutlined />,
        disable: true,
        handler: row => {
          message.info(
            `Toggle status for province: ${row.name} (current: ${row.status === EStatus.active ? 'Active' : 'Inactive'})`
          );
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
        sortable: true,
        filterable: true,
      },
      {
        title: 'Created At',
        name: 'created_at',
        type: 'datetime',
        sortable: false,
      },
      {
        title: 'Updated At',
        name: 'updated_at',
        type: 'datetime',
        sortable: false,
      },
      {
        title: 'Status',
        name: 'status',
        type: 'custom-render',
        sortable: false,
        filterable: true,
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

export default ProvincePage;
