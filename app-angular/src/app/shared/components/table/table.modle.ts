import { Observable } from 'rxjs';
import { ListPaginate } from '../../types/base';
import { TemplateRef } from '@angular/core';

export declare type TableDataType<T> =
  | ((input: any) => Observable<ListPaginate<T>>)
  | T[];
export declare type TableClickHandler<T> = (row: T) => void;
export declare type TableActionVisible<T> = (row: T) => boolean;
export declare type TableColumnDisable<T> = (row: T) => boolean;
export declare type TableActionColor =
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'secondary';

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
  | TemplateRef<any>;

export declare type TableColumnFilterType =
  | 'text'
  | 'select'
  | 'date'
  | 'number';

export type SelectOption = {
  label: string;
  value: any;
};

export type TableFilter = {
  type: TableColumnFilterType;
  name: string;
  label: string;
  options?: SelectOption[] | ((input: any) => Observable<SelectOption[]>);
  note?: string;
  parent?: {
    filterName: string;
  };
};

export type TableColumn<T = any> = {
  title: string;
  name: string;
  type?: TableColumnType;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  fixed?: 'left' | 'right';
  customRender?: (row: T) => string;
  click?: TableClickHandler<T>;
  visible?: TableActionVisible<T>;
  disable?: TableColumnDisable<T>;
  permission?: string;
};

export type TableAction<T = any> = {
  label: string;
  iconClass?: string;
  color?: TableActionColor;
  handler: TableClickHandler<T>;
  visible?: TableActionVisible<T>;
  permission?: string;
};

export type TableOption<T = any> = {
  title?: string;
  data: TableDataType<T>;
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  filters?: TableFilter[];
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showTotal?: boolean;
  loading?: boolean;
};
