import { Dictionary } from "@/types/base";

export declare type TableColumnFilterType =
  | "text"
  | "select"
  | "date"
  | "number";

export type SelectOption = {
  label: string;
  value: string | number;
};

export type FilterValues = Dictionary;

// Simplified options type - either static array or async function
export type FilterOptionsType =
  | SelectOption[] // Static options
  | (() => Promise<SelectOption[]>) // Load all options (for parent filters)
  | ((parentValue: string | number) => Promise<SelectOption[]>); // Load options based on parent value (for child filters)

export type TableFilter = {
  type: TableColumnFilterType;
  name: string;
  label: string;
  options?: FilterOptionsType;
  note?: string;

  // For child filters that depend on a parent filter
  parent?: {
    filterName: string; // The name of the parent filter
  };
};
