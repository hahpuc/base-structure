import { TemplateRef } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

import { BaseQuery, ListPaginate } from '../../types/base';

export declare type FormControlType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'date'
  | 'time'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'richtext'
  | 'datetime'
  | 'separate'
  | 'priorityOrder'
  | 'multipleChoice'
  | 'switch'
  | 'file'
  | 'hidden'
  | 'autocomplete'
  | 'tag'
  | 'color'
  | 'range'
  | 'rate'
  | TemplateRef<unknown>;

export declare type FtFormControlValidatorFn = (
  control: AbstractControl
) => ValidationErrors | null;

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

export type FormActionType = 'submit' | 'reset' | 'cancel' | 'custom';

export type FormAction = {
  type: FormActionType;
  label: string;
  icon?: string;
  color?: 'primary' | 'default' | 'success' | 'warning' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  visible?: boolean;
  handler?: (formValue: Record<string, unknown>) => void | Promise<void> | Observable<unknown>;
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
  validators?: ValidatorFn[];
  asyncValidators?: ((control: AbstractControl) => Observable<ValidationErrors | null>)[];
  errorMessages?: { [key: string]: string };

  // Display properties
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  span?: number; // Grid span (1-24)
  offset?: number; // Grid offset

  // Type-specific properties
  options?:
    | SelectOption[] // Static options array
    | RadioOption[] // Static radio options
    | CheckboxOption[] // Static checkbox options
    | Observable<SelectOption[]> // Direct observable
    | (() => Observable<SelectOption[]>) // getAll() API - no parameters
    | ((input: BaseQuery) => Observable<ListPaginate<unknown>>) // getByPaged() API - with pagination
    | ((input?: BaseQuery) => Promise<SelectOption[]>) // Promise-based API
    | ((input?: BaseQuery) => SelectOption[]) // Synchronous function
    | string; // String identifier
  multiple?: boolean; // For select
  allowClear?: boolean; // For select/input
  showSearch?: boolean; // For select
  mode?: 'default' | 'multiple' | 'tags'; // For select

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
  template?: TemplateRef<{ $implicit: unknown; control: AbstractControl }>;

  // Layout
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };

  // Conditional display/enabling
  dependsOn?: string | string[]; // Field names this control depends on
  showWhen?: (formValue: Record<string, unknown>) => boolean;
  enableWhen?: (formValue: Record<string, unknown>) => boolean;

  // Events
  onChange?: (value: unknown, formValue: Record<string, unknown>) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

export type FormOption<T = Record<string, unknown>> = {
  // Form configuration
  layout?: FormLayout;
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;

  // Controls
  controls: FtFormControl[];

  // Actions
  actions?: FormAction[];
  showDefaultActions?: boolean; // Show default Submit/Cancel buttons

  // Layout
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  gutter?: number; // Grid gutter

  // Data handling
  initialData?: Partial<T>;
  onSubmit?: (formValue: T) => void | Promise<FormSubmitResult> | Observable<FormSubmitResult>;
  onReset?: () => void;
  onCancel?: () => void;

  // Validation
  validateOn?: 'change' | 'blur' | 'submit';
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
