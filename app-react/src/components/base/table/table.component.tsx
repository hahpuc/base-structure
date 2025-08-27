import type { GetProp, TablePaginationConfig } from 'antd';
import { Table, TableProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ListPaginate } from '../../../types/base';

import { TableOption, TableQueryParams, TableRowData } from './models/table.model';
import { TableFilter } from './table-filter.component';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface AppTableProps<T extends TableRowData> {
  option: TableOption<T>;
  className?: string;
}

function AppTable<T extends TableRowData>({ option, className }: AppTableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: option.pageSize || 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: option.pageSizeOptions || ['10', '20', '50', '100'],
  });

  // Parse URL params to query params
  const getQueryParamsFromUrl = useCallback((): TableQueryParams => {
    const params: TableQueryParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || `${option.pageSize || 10}`),
      sort: searchParams.get('sort') || undefined,
      order: searchParams.get('order') as 'asc' | 'desc' | undefined,
      search: searchParams.get('search') || undefined,
    };

    // Add custom filter params
    searchParams.forEach((value, key) => {
      if (!['page', 'limit', 'sort', 'order', 'search'].includes(key)) {
        params[key] = value;
      }
    });

    return params;
  }, [searchParams, option.pageSize]);

  // Update URL params
  const updateUrlParams = useCallback(
    (newParams: Partial<TableQueryParams>, replaceAll: boolean = false) => {
      let updatedParams: Record<string, unknown>;

      if (replaceAll) {
        // Replace all params with new ones
        updatedParams = { ...newParams };
      } else {
        // Merge with existing params
        const currentParams = Object.fromEntries(searchParams);
        updatedParams = { ...currentParams, ...newParams };
      }

      // Remove empty/undefined values
      Object.keys(updatedParams).forEach(key => {
        if (
          updatedParams[key] === undefined ||
          updatedParams[key] === null ||
          updatedParams[key] === ''
        ) {
          delete updatedParams[key];
        }
      });

      // Convert to string values for URLSearchParams
      const stringParams = Object.entries(updatedParams).reduce(
        (acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        },
        {} as Record<string, string>
      );

      setSearchParams(stringParams);
    },
    [searchParams, setSearchParams]
  );

  // Fetch data
  const fetchData = useCallback(async () => {
    if (typeof option.data === 'function') {
      setLoading(true);
      try {
        const queryParams = getQueryParamsFromUrl();
        const response = (await option.data(queryParams)) as ListPaginate<T>;

        setData(response.data || []);
        setPagination(prev => ({
          ...prev,
          current: response.page || 1,
          total: response.total_records || 0,
          pageSize: response.limit || prev.pageSize,
        }));
      } catch (error) {
        // Handle error appropriately in production
        setData([]);
      } finally {
        setLoading(false);
      }
    } else {
      setData(option.data || []);
    }
  }, [option, getQueryParamsFromUrl]);

  // Effect to fetch data when URL params change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle table change (pagination, sorting, filtering)
  const handleTableChange = (
    paginationConfig: TablePaginationConfig,
    _filters: Record<string, unknown>,
    sorter: unknown
  ) => {
    const newParams: Partial<TableQueryParams> = {
      page: paginationConfig.current,
      limit: paginationConfig.pageSize,
    };

    // Handle sorting
    if (sorter && !Array.isArray(sorter)) {
      const sorterObj = sorter as Record<string, unknown>;
      if (sorterObj.order) {
        newParams.sort = sorterObj.field as string;
        newParams.order = sorterObj.order === 'ascend' ? 'asc' : 'desc';
      } else {
        newParams.sort = undefined;
        newParams.order = undefined;
      }
    }

    updateUrlParams(newParams);
  };

  // Handle search
  const handleSearch = (searchText: string) => {
    updateUrlParams({
      search: searchText || undefined,
      page: 1, // Reset to first page when searching
    });
  };

  // Handle filter change
  const handleFilterChange = (filterParams: Record<string, unknown>) => {
    // Get current system params (pagination, sorting, search)
    const systemParams: Record<string, unknown> = {
      page: 1, // Reset to first page when filtering
    };

    // Preserve search, sort, and order if they exist
    const searchValue = searchParams.get('search');
    const sortValue = searchParams.get('sort');
    const orderValue = searchParams.get('order');

    if (searchValue) systemParams.search = searchValue;
    if (sortValue) systemParams.sort = sortValue;
    if (orderValue) systemParams.order = orderValue;

    // Combine system params with new filter params and replace all
    updateUrlParams(
      {
        ...systemParams,
        ...filterParams,
      },
      true
    );
  };

  // Convert columns to Ant Design format
  const antdColumns: ColumnsType<T> = option.columns.map(col => ({
    title: col.title,
    dataIndex: col.name,
    key: col.name,
    width: col.width,
    fixed: col.fixed,
    align: col.align,
    sorter: col.sortable,
    ellipsis: true,
    render: (value: unknown, record: T): React.ReactNode => {
      if (col.customRender) {
        return col.customRender(record);
      }

      switch (col.type) {
        case 'date':
          return value ? new Date(value as string).toLocaleDateString() : '';
        case 'datetime':
          return value ? new Date(value as string).toLocaleString() : '';
        case 'boolean':
          return value ? 'Yes' : 'No';
        case 'number':
          return typeof value === 'number' ? value.toLocaleString() : String(value || '');
        default:
          return String(value || '');
      }
    },
  }));

  // Table props configuration
  const tableProps: TableProps<T> = {
    columns: antdColumns,
    dataSource: data,
    loading: loading || option.loading,
    pagination: {
      ...pagination,
      position: ['bottomRight'],
    },
    onChange: handleTableChange,
    rowKey: 'id',
    bordered: true,
    scroll: { x: 'max-content', y: option.resizable ? 400 : undefined },
    showHeader: true,
    size: 'middle',
    rowSelection: option.selectable
      ? {
          type: 'checkbox',
          onChange: (_selectedRowKeys, _selectedRows) => {
            // Handle selection change - implement as needed
          },
        }
      : undefined,
    expandable: option.selectable
      ? {
          expandedRowRender: record => (
            <div style={{ margin: 0 }}>
              <pre>{JSON.stringify(record, null, 2)}</pre>
            </div>
          ),
        }
      : undefined,
  };

  return (
    <div className={className}>
      {/* Title */}
      {option.title && (
        <div style={{ marginBottom: 16 }}>
          <h2>{option.title}</h2>
        </div>
      )}

      {/* Table Filter */}
      {(option.filterable || option.filters) && (
        <TableFilter
          filters={option.filters || []}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          searchParams={searchParams}
        />
      )}

      {/* Table */}
      <Table<T> {...tableProps} />
    </div>
  );
}

export default AppTable;
