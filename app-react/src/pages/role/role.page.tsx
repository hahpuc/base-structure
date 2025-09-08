import React from 'react';

import { TableOption } from '@/components/partials/table';
import AppTable from '@/components/partials/table/table.component';
import { EStatus } from '@/constants/enum';
import useHeader from '@/hooks/use-header.hook';
import { roleService } from '@/services/role.service';
import { ListPaginate, BaseQuery } from '@/types/base';
import { RoleDto } from '@/types/role';

const RolePage: React.FunctionComponent = () => {
  useHeader('Role Management');

  // Wrapper function to extract data from ApiResult
  const fetchRoles = async (params: BaseQuery): Promise<ListPaginate<RoleDto>> => {
    const response = await roleService.getByPaged(params);
    if (response.isSuccess && response.data) {
      return response.data;
    }
    throw new Error(response.error?.message || 'Failed to fetch roles');
  };

  const tableOption: TableOption<RoleDto> = {
    title: 'Role Management',
    data: fetchRoles,
    filterable: true,
    selectable: true,
    resizable: true,
    pageSize: 10,
    columns: [
      {
        title: 'ID',
        name: 'id',
        type: 'number',
        width: 80,
        sortable: true,
      },
      {
        title: 'Name',
        name: 'name',
        type: 'text',
        sortable: true,
        filterable: true,
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'text',
        sortable: true,
      },
      {
        title: 'Status',
        name: 'status',
        type: 'custom-render',
        sortable: true,
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
        sortable: true,
      },
      {
        title: 'Updated At',
        name: 'updated_at',
        type: 'datetime',
        sortable: true,
      },
    ],
    filters: [
      {
        type: 'text',
        name: 'name',
        label: 'Role Name',
        note: 'Search by role name',
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

export default RolePage;
