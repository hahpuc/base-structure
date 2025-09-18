import { Observable } from "rxjs";

import { Dictionary, ListPaginate, BaseQuery } from "@shared/types/base";

export declare type TableColumnFilterType =
  | "text"
  | "select"
  | "date"
  | "number";

export type SelectOption = {
  label: string;
  value: unknown;
};

export type FilterValues = Dictionary;
export type FilterOptions = { [key: string]: SelectOption[] };
export type LoadingStates = { [key: string]: boolean };

export type ActiveFilter = {
  filter: TableFilter;
  value: unknown;
  displayValue: string;
};

// Use for paginated select options
export type PaginatedSelectOptions = {
  options: SelectOption[];
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
  loading: boolean;
  searchText?: string;
};

export type TableFilter = {
  type: TableColumnFilterType;
  name: string;
  label: string;
  options?:
    | SelectOption[] // Static options array
    | (() => Observable<SelectOption[]>) // getAll() API - no parameters
    | ((input: BaseQuery) => Observable<ListPaginate<unknown>>); // getByPaged() API - with query parameters

  // Configuration for select loading behavior
  usePagination?: boolean; // If true, use paginated API; if false/undefined, use getAll() API
  searchable?: boolean; // Whether this filter supports search
  pageSize?: number; // Page size for pagination (default: 20)

  note?: string;
  parent?: {
    filterName: string;
  };
};
