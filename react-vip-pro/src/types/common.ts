export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dictionary<T = unknown> {
  [key: string]: T;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, record: unknown, index: number) => React.ReactNode;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}
