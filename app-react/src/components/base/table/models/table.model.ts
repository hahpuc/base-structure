import { BaseQuery, Dictionary, ListPaginate } from '@/types/base';

import { TableFilter } from './table-filter.model';

// Type definitions for table component
export type TableRowData = {
  id: string | number;
  [key: string]: unknown;
};

export type FilterParams = Dictionary & {
  filter?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
};

export type TableQueryParams = BaseQuery & FilterParams;

export type CheckedIdMap = {
  [key: string]: boolean;
};

export declare type TableDataType<T> =
  | ((input: TableQueryParams) => Promise<ListPaginate<T>>)
  | T[];
export declare type TableClickHandler<T> = (row: T) => void;
export declare type TableActionVisible<T> = (row: T) => boolean;
export declare type TableColumnDisable<T> = (row: T) => boolean;
export declare type TableActionColor = 'primary' | 'danger' | 'success' | 'warning' | 'secondary';

export declare type TableColumnType =
  | 'text'
  | 'date'
  | 'time'
  | 'image'
  | 'number'
  | 'datetime'
  | 'boolean'
  | 'status'
  | 'percent'
  | 'long-text'
  | 'switch'
  | 'button'
  | 'custom-render';

export declare type TableColumnAlign = 'left' | 'center' | 'right';

export type TableColumn<T = TableRowData> = {
  title: string;
  name: string;
  type?: TableColumnType;
  align?: TableColumnAlign;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fixed?: 'left' | 'right';
  customRender?: (row: T) => React.ReactNode;
  click?: TableClickHandler<T>;
  visible?: TableActionVisible<T>;
  disable?: TableColumnDisable<T>;
  permission?: string;
};

export type TableAction<T = TableRowData> = {
  label: string;
  iconClass?: string;
  color?: TableActionColor;
  handler: TableClickHandler<T>;
  visible?: TableActionVisible<T>;
  permission?: string;
};

export type TableOption<T = TableRowData> = {
  title?: string;
  data: TableDataType<T>;
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  filters?: TableFilter[];
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  resizable?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showTotal?: boolean;
  loading?: boolean;
};
