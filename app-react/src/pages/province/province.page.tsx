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
        filterable: true,
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
    ],
    filters: [
      {
        type: 'text',
        name: 'name',
        label: 'Province Name',
        note: 'Search by province name',
      },
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
