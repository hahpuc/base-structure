import type { GetProp, TablePaginationConfig } from "antd";
import { message, Table, TableProps } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { ListPaginate } from "../../../types/base";

import ActionColumn from "./action-column";
import {
  TableOption,
  TableQueryParams,
  TableRowData,
} from "./models/table.model";
import { TableFilter } from "./table-filter.component";
import { getNestedValue } from "./utils/table-utils";

type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;

interface AppTableProps<T extends TableRowData> {
  option: TableOption<T>;
  className?: string;
}

function AppTable<T extends TableRowData>({
  option,
  className,
}: AppTableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  // Memoize showTotal function to prevent recreation
  const showTotal = useCallback(
    (total: number, range: number[]) =>
      `${range[0]}-${range[1]} of ${total} items`,
    []
  );

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: option.pageSize || 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal,
    pageSizeOptions: option.pageSizeOptions || ["10", "20", "50", "100"],
  });

  // Parse URL params to query params - now handles all URL parameters dynamically
  const getQueryParamsFromUrl = useCallback((): TableQueryParams => {
    const params: TableQueryParams = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || `${option.pageSize || 10}`),
    };

    // Add all other parameters from URL dynamically
    searchParams.forEach((value, key) => {
      if (!["page", "limit"].includes(key) && value) {
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
      Object.keys(updatedParams).forEach((key) => {
        if (
          updatedParams[key] === undefined ||
          updatedParams[key] === null ||
          updatedParams[key] === ""
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
    if (typeof option.data === "function") {
      setLoading(true);
      try {
        const queryParams = getQueryParamsFromUrl();
        const response = (await option.data(queryParams)) as ListPaginate<T>;

        setData(response.data || []);
        setPagination((prev) => ({
          ...prev,
          current: response.page || 1,
          total: response.total_records || 0,
          pageSize: response.limit || prev.pageSize,
        }));
      } catch (error) {
        // Handle error appropriately in production
        const errorMessage = error || "An error occurred";
        message.error(String(errorMessage));
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
  const handleTableChange = useCallback(
    (
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
          newParams.sorting = `${sorterObj.field} ${
            sorterObj.order === "ascend" ? "asc" : "desc"
          }`;
        } else {
          newParams.sorting = undefined;
        }
      }

      updateUrlParams(newParams);
    },
    [updateUrlParams]
  );

  // Handle search
  const handleSearch = useCallback(
    (searchText: string) => {
      updateUrlParams({
        filter: searchText || undefined,
        page: 1, // Reset to first page when searching
      });
    },
    [updateUrlParams]
  );

  // Handle filter change
  const handleFilterChange = useCallback(
    (filterParams: Record<string, unknown>) => {
      const systemParams: Record<string, unknown> = {};

      // Preserve sorting if it exists
      const sortValue = searchParams.get("sorting");
      if (sortValue) systemParams.sorting = sortValue;

      // Combine system params with new filter params and replace all
      updateUrlParams(
        {
          ...systemParams,
          ...filterParams,
        },
        true
      );
    },
    [searchParams, updateUrlParams]
  );

  // Action column (if actions are provided)
  const actionColumn = useMemo<ColumnsType<T>[number] | null>(() => {
    if (option.actions && option.actions.length > 0) {
      return {
        title: "Actions",
        key: "actions",
        dataIndex: "actions",
        width: Math.max(100, option.actions.length * 48),
        fixed: "left",
        align: "center",
        render: (_: unknown, record: T) => (
          <ActionColumn actions={option.actions} record={record} />
        ),
      };
    }
    return null;
  }, [option.actions]);

  // Convert columns to Ant Design format
  const antdColumns = useMemo<ColumnsType<T>>(() => {
    const columns: ColumnsType<T> = option.columns.map((col) => {
      const column: Record<string, unknown> = {
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

          const fieldValue = getNestedValue(record, col.name);

          switch (col.type) {
            case "date":
              return fieldValue
                ? new Date(fieldValue as string).toLocaleDateString()
                : "";
            case "datetime":
              return fieldValue
                ? new Date(fieldValue as string).toLocaleString()
                : "";
            case "boolean":
              return fieldValue ? "Yes" : "No";
            case "number":
              return typeof fieldValue === "number"
                ? fieldValue.toLocaleString()
                : String(fieldValue || "");
            case "image":
              return (
                <img
                  className="max-w-[150px]"
                  src={fieldValue as string}
                  alt="Thumbnail"
                />
              );
            default:
              return String(fieldValue || "");
          }
        },
      };

      // Handle sorting state from URL
      if (col.sortable) {
        const sortingParam = searchParams.get("sorting");
        if (sortingParam) {
          const [sortField, sortOrder] = sortingParam.split(" ");
          if (sortField === col.name) {
            column.sortOrder =
              sortOrder === "asc"
                ? "ascend"
                : sortOrder === "desc"
                ? "descend"
                : null;
          }
        }
      }
      return column;
    }) as ColumnsType<T>;

    // Insert action column at the left if present
    if (actionColumn) {
      return [actionColumn, ...columns];
    }
    return columns;
  }, [option.columns, searchParams, actionColumn]);

  // Memoize rowSelection
  const rowSelection = useMemo(
    () =>
      option.selectable
        ? {
            type: "checkbox" as const,
            onChange: (_selectedRowKeys: React.Key[], _selectedRows: T[]) => {
              // Handle selection change - implement as needed
            },
          }
        : undefined,
    [option.selectable]
  );

  // Memoize expandable configuration
  const expandable = useMemo(
    () =>
      option.selectable
        ? {
            expandedRowRender: (record: T) => (
              <div style={{ margin: 0 }}>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </div>
            ),
          }
        : undefined,
    [option.selectable]
  );

  // Memoize scroll configuration
  const scroll = useMemo(
    () => ({
      x: "max-content" as const,
      y: option.resizable ? 500 : undefined,
    }),
    [option.resizable]
  );

  // Memoize table props
  const tableProps: TableProps<T> = useMemo(
    () => ({
      columns: antdColumns,
      dataSource: data,
      loading: loading || option.loading,
      pagination: {
        ...pagination,
        position: ["bottomRight"] as const,
      },
      onChange: handleTableChange,
      rowKey: "id",
      bordered: true,
      scroll,
      showHeader: true,
      size: "middle" as const,
      rowSelection,
      expandable,
    }),
    [
      antdColumns,
      data,
      loading,
      option.loading,
      pagination,
      handleTableChange,
      scroll,
      rowSelection,
      expandable,
    ]
  );

  return (
    <div
      className={`rounded-2xl p-6 bg-white dark:bg-white/[0.03] ` + className}
    >
      {/* Title */}
      {/* {option.title && (
        <div style={{ marginBottom: 16 }}>
          <h2>{option.title}</h2>
        </div>
      )} */}

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
