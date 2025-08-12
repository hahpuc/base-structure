import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseQuery, Dictionary, ListPaginate } from '../../types/base';
import { TableFilter } from '../table-filter/table-filter.model';

// Type definitions for table component
export type TableRowData = {
  id: string | number;
  [key: string]: unknown;
};

export type FilterParams = Dictionary & {
  filter?: string;
};

export type TableQueryParams = BaseQuery & FilterParams;

export type CheckedIdMap = {
  [key: string]: boolean;
};

export declare type TableDataType<T> = ((input: BaseQuery) => Observable<ListPaginate<T>>) | T[];
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
  | 'custom-render'
  | TemplateRef<unknown>;

export type TableColumn<T = TableRowData> = {
  title: string;
  name: string;
  type?: TableColumnType;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  fixed?: 'left' | 'right';
  customRender?: (row: T) => string;
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
