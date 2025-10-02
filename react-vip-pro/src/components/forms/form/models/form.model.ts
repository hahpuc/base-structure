import { Rule } from "antd/es/form";
import { ReactNode, ReactElement } from "react";

export type FormControlType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "time"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "richtext"
  | "datetime"
  | "switch"
  | "file"
  | "hidden"
  | "autocomplete"
  | "tag"
  | "color"
  | "range"
  | "rate"
  | "custom";

export type SelectOption = {
  value: unknown;
  label: string;
  disabled?: boolean;
  children?: SelectOption[];
};

export type RadioOption = {
  value: unknown;
  label: string;
  disabled?: boolean;
};

export type CheckboxOption = {
  value: unknown;
  label: string;
  disabled?: boolean;
  checked?: boolean;
};

export type PaginatedFormSelectOptions = {
  options: SelectOption[];
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
  loading: boolean;
  searchText?: string;
};

export type FormSubmitResult = {
  success: boolean;
  data?: unknown;
  error?: string;
};

export type FormActionType = "submit" | "reset" | "cancel" | "custom";

export type FormAction = {
  type: FormActionType;
  label: string;
  icon?: ReactNode;
  color?: "primary" | "default" | "success" | "warning" | "danger";
  loading?: boolean;
  disabled?: boolean;
  visible?: boolean;
  handler?: (formValue: Record<string, unknown>) => void | Promise<void>;
};

export type BaseQuery = {
  page?: number;
  size?: number;
  search?: string;
  [key: string]: unknown;
};

export type ListPaginate<T> = {
  data: T[];
  total: number;
  page: number;
  size: number;
  hasMore: boolean;
};

export type FtFormControl = {
  name: string;
  label: string;
  description?: string;
  type: FormControlType;

  // Value and default
  value?: unknown;
  defaultValue?: unknown;

  // Validation
  required?: boolean;
  rules?: Rule[];
  errorMessages?: { [key: string]: string };

  // Display properties
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;

  // Tailwind CSS responsive grid classes
  // Example: "col-span-12 md:col-span-6 lg:col-span-4"
  className?: string;

  // Legacy Ant Design grid support (deprecated, use className instead)
  span?: number; // Grid span (1-24) - for backward compatibility
  offset?: number; // Grid offset - for backward compatibility

  // Type-specific properties
  options?:
    | SelectOption[] // Static options array
    | RadioOption[] // Static radio options
    | CheckboxOption[] // Static checkbox options
    | Promise<SelectOption[]> // Promise-based API
    | (() => Promise<SelectOption[]>) // getAll() API - no parameters
    | ((input: BaseQuery) => Promise<ListPaginate<unknown>>) // getByPaged() API - with pagination
    | ((input?: BaseQuery) => Promise<SelectOption[]>) // Promise-based API with optional params
    | ((input?: BaseQuery) => SelectOption[]) // Synchronous function
    | ((parentValue: string | number) => Promise<SelectOption[]>) // Load options based on parent value (for child filters)
    | string; // String identifier

  multiple?: boolean; // For select
  allowClear?: boolean; // For select/input
  showSearch?: boolean; // For select
  mode?: "default" | "multiple" | "tags"; // For select

  // Pagination configuration for select options
  usePagination?: boolean; // If true, use paginated API; if false/undefined, use getAll() API
  pageSize?: number; // Page size for pagination (default: 20)
  searchable?: boolean; // Whether this select supports search

  // Number input
  min?: number;
  max?: number;
  step?: number;
  precision?: number;

  // Text input
  maxLength?: number;
  minLength?: number;

  // Textarea
  rows?: number;
  autoSize?: boolean | { minRows?: number; maxRows?: number };

  // Date/Time
  format?: string;
  showTime?: boolean;
  disabledDate?: (current: Date) => boolean;

  // Custom template
  render?: (
    value: unknown,
    onChange: (value: unknown) => void,
    form: Record<string, unknown>
  ) => ReactElement;

  // Layout
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };

  // Conditional display/enabling
  showWhen?: (formValue: Record<string, unknown>) => boolean;
  enableWhen?: (formValue: Record<string, unknown>) => boolean;

  // For child filters that depend on a parent filter
  parent?: {
    filterName: string; // The name of the parent filter
  };

  // Events
  onChange?: (value: unknown, formValue: Record<string, unknown>) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
};

export type FormLayout = "horizontal" | "vertical" | "inline";

export type FormOption<T = Record<string, unknown>> = {
  // Form configuration
  layout?: FormLayout;
  size?: "small" | "default" | "large";
  disabled?: boolean;

  // Controls
  controls: FtFormControl[];

  // Actions
  actions?: FormAction[];
  showDefaultActions?: boolean; // Show default Submit/Cancel buttons

  // Layout
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };

  // Grid configuration
  gridCols?: string; // Tailwind grid-cols class (e.g., "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")
  gridGap?: string; // Tailwind gap class (e.g., "gap-4 md:gap-6")

  /**
   * @deprecated use gridCols and gridGap instead.
   * This from Grid, Row & Col from Ant Design grid support (deprecated)
   */
  gutter?: number; // Grid gutter - for backward compatibility

  // Data handling
  initialData?: Partial<T>;
  onSubmit?: (formValue: T) => void | Promise<FormSubmitResult>;
  onReset?: () => void;
  onCancel?: () => void;

  // Validation
  validateTrigger?: "onChange" | "onBlur" | "onSubmit";
  showValidationSummary?: boolean;

  // Loading state
  loading?: boolean;

  // Form sections/groups
  sections?: FormSection[];
};

export type FormSection = {
  title?: string;
  description?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  controls: string[]; // Names of controls in this section
  visible?: boolean | ((formValue: Record<string, unknown>) => boolean);
  span?: number; // Grid span for the section
};
