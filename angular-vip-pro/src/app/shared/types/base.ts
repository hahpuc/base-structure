import { EStatus } from '../constants/enum';

export type BaseModel = {
  id: string | number;
  created_at?: Date | string;
  updated_at?: Date | string;
};

export type BaseQuery = {
  filter?: string;
  page: number;
  limit: number;
  sorting?: string;
};

export type ListPaginate<T> = {
  data: T[];
  total_records: number;
  limit: number;
  page: number;
  total_pages: number;
};

export type Dictionary = {
  [key: string]: unknown;
};

export type BaseOption = {
  label: string;
  value: number | string | boolean;
  status?: EStatus;
};
