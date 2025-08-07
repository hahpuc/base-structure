import { Observable } from 'rxjs';

import { Dictionary } from '../../types/base';

export declare type TableColumnFilterType = 'text' | 'select' | 'date' | 'number';

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

export type TableFilter = {
  type: TableColumnFilterType;
  name: string;
  label: string;
  options?: SelectOption[] | ((input: Dictionary) => Observable<SelectOption[]>);
  note?: string;
  parent?: {
    filterName: string;
  };
};
