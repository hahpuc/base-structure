import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Observable,
  Subject,
  takeUntil,
  map,
} from 'rxjs';

import { BaseQuery, ListPaginate } from '../../types/base';

import {
  CheckboxOption,
  FormAction,
  FormOption,
  FtFormControl,
  PaginatedFormSelectOptions,
  RadioOption,
  SelectOption,
} from './form.model';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormComponent),
      multi: true,
    },
  ],
})
export class FormComponent<T = Record<string, unknown>>
  implements OnInit, OnDestroy, OnChanges, ControlValueAccessor
{
  @Input() option!: FormOption<T>;

  form!: FormGroup;
  isLoading = false;
  private destroy$ = new Subject<void>();
  private onChange = (value: Record<string, unknown>) => {};
  private onTouched = () => {};
  private controlOptionsCache = new Map<string, SelectOption[]>();

  // Pagination for select options
  paginatedOptions: { [key: string]: PaginatedFormSelectOptions } = {};
  searchSubjects: { [key: string]: Subject<string> } = {};

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  // MARK: - Lifecycle Hooks
  ngOnInit(): void {
    this.buildForm();
    this.setupFormValueChanges();
    this.loadDynamicOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['option'] && !changes['option'].firstChange) {
      this.buildForm();
      this.setupFormValueChanges();
      this.loadDynamicOptions();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // MARK: - ControlValueAccessor Implementation
  writeValue(value: Record<string, unknown>): void {
    if (value && this.form) {
      // Ensure multiple select fields have array values
      const processedValue = { ...value };
      this.option.controls.forEach(control => {
        if (
          control.type === 'select' &&
          control.multiple &&
          processedValue[control.name] !== undefined
        ) {
          if (!Array.isArray(processedValue[control.name])) {
            processedValue[control.name] = processedValue[control.name]
              ? [processedValue[control.name]]
              : [];
          }
        }
      });

      this.form.patchValue(processedValue, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: Record<string, unknown>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.form) {
      if (isDisabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  // MARK: - Form Building and Setup
  private buildForm(): void {
    const formControls: { [key: string]: unknown[] } = {};

    this.option.controls.forEach(control => {
      const validators = control.validators || [];
      const asyncValidators = control.asyncValidators || [];

      let defaultValue = control.defaultValue;
      if (
        this.option.initialData &&
        (this.option.initialData as Record<string, unknown>)[control.name] !== undefined
      ) {
        defaultValue = (this.option.initialData as Record<string, unknown>)[control.name];
      }

      // Ensure proper default values based on control type
      if (defaultValue === undefined || defaultValue === null) {
        if (control.type === 'select' && control.multiple) {
          defaultValue = [];
        } else if (control.type === 'multipleChoice') {
          defaultValue = [];
        } else if (control.type === 'switch') {
          defaultValue = control.value !== undefined ? control.value : false;
        } else {
          defaultValue = control.value || '';
        }
      }

      // Additional safety check for multiple selects
      if (control.type === 'select' && control.multiple && !Array.isArray(defaultValue)) {
        defaultValue = defaultValue ? [defaultValue] : [];
      }

      formControls[control.name] = [
        {
          value: defaultValue,
          disabled: control.disabled || this.option.disabled || false,
        },
        validators,
        asyncValidators,
      ];
    });

    this.form = this.fb.group(formControls);

    // Apply initial data if provided
    if (this.option.initialData) {
      this.form.patchValue(this.option.initialData, { emitEvent: false });
    }
  }

  private setupFormValueChanges(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        this.onChange(value);
        this.handleConditionalLogic();
      });

    // Handle individual control changes
    this.option.controls.forEach(control => {
      if (control.onChange) {
        const formControl = this.form.get(control.name);
        if (formControl) {
          formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
            if (control.onChange) {
              control.onChange(value, this.form.value);
            }
          });
        }
      }
    });
  }

  // MARK: - Conditional Logic
  private handleConditionalLogic(): void {
    const formValue = this.form.value;

    this.option.controls.forEach(control => {
      const formControl = this.form.get(control.name);
      if (!formControl) return;

      // Handle showWhen condition
      if (control.showWhen) {
        const shouldShow = control.showWhen(formValue);
        // You can implement show/hide logic here if needed
      }

      // Handle enableWhen condition
      if (control.enableWhen) {
        const shouldEnable = control.enableWhen(formValue);
        if (shouldEnable && formControl.disabled) {
          formControl.enable({ emitEvent: false });
        } else if (!shouldEnable && formControl.enabled) {
          formControl.disable({ emitEvent: false });
        }
      }
    });
  }

  // MARK: - Action Handlers
  async onAction(action: FormAction): Promise<void> {
    if (action.disabled || action.loading) {
      return;
    }

    switch (action.type) {
      case 'submit':
        await this.handleSubmit(action);
        break;
      case 'reset':
        this.handleReset();
        break;
      case 'cancel':
        this.handleCancel();
        break;
      case 'custom':
        if (action.handler) {
          await this.executeHandler(action.handler);
        }
        break;
    }
  }

  private async handleSubmit(action: FormAction): Promise<void> {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    if (action.handler) {
      await this.executeHandler(action.handler);
    } else if (this.option.onSubmit) {
      await this.executeHandler(this.option.onSubmit);
    }
  }

  private handleReset(): void {
    this.form.reset();
    if (this.option.onReset) {
      this.option.onReset();
    }
  }

  private handleCancel(): void {
    if (this.option.onCancel) {
      this.option.onCancel();
    }
  }

  private async executeHandler(handler: Function): Promise<void> {
    try {
      this.isLoading = true;
      const result = handler(this.form.value);

      if (result instanceof Promise) {
        await result;
      } else if (result instanceof Observable) {
        await firstValueFrom(result);
      }
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  // MARK: - Form Utilities
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    });
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  getErrorMessage(control: FtFormControl): string {
    const formControl = this.getControl(control.name);
    if (!formControl?.errors || !formControl.touched) {
      return '';
    }

    const errors = formControl.errors;
    const errorMessages = control.errorMessages || {};

    // Check for custom error messages first
    for (const errorKey in errors) {
      if (errorMessages[errorKey]) {
        return errorMessages[errorKey];
      }
    }

    // Default error messages
    const defaultMessages: { [key: string]: string } = {
      required: `${control.label} is required`,
      email: `${control.label} must be a valid email`,
      minlength: `${control.label} must be at least ${errors['minlength']?.requiredLength} characters`,
      maxlength: `${control.label} cannot exceed ${errors['maxlength']?.requiredLength} characters`,
      min: `${control.label} must be at least ${errors['min']?.min}`,
      max: `${control.label} cannot exceed ${errors['max']?.max}`,
      pattern: `${control.label} format is invalid`,
    };

    for (const errorKey in errors) {
      if (defaultMessages[errorKey]) {
        return defaultMessages[errorKey];
      }
    }

    return `${control.label} is invalid`;
  }

  isControlVisible(control: FtFormControl): boolean {
    if (control.hidden) {
      return false;
    }

    if (control.showWhen) {
      return control.showWhen(this.form.value);
    }

    return true;
  }

  // MARK: - Dynamic Options Loading
  private async loadDynamicOptions(): Promise<void> {
    const promises: Promise<void>[] = [];

    for (const control of this.option.controls) {
      if (control.options && typeof control.options === 'function') {
        const promise = this.loadOptionsForControl(control);
        promises.push(promise);
      }
    }

    await Promise.all(promises);
    this.cdr.detectChanges();
  }

  private async loadOptionsForControl(control: FtFormControl): Promise<void> {
    if (!control.options || typeof control.options !== 'function') {
      return;
    }

    try {
      // Set empty options initially to prevent errors
      this.controlOptionsCache.set(control.name, []);

      // Check if this control uses pagination
      if (control.usePagination) {
        // Use paginated API
        this.loadPaginatedOptions(control, '', 1).subscribe();
      } else {
        // Use getAll() API - no parameters required
        const getAllFunction = control.options as () => Observable<SelectOption[]>;
        const result = getAllFunction();

        if (result instanceof Promise) {
          const options = await result;
          this.controlOptionsCache.set(control.name, options);
        } else if (result instanceof Observable) {
          result.pipe(takeUntil(this.destroy$)).subscribe(options => {
            this.controlOptionsCache.set(control.name, options);
            this.cdr.detectChanges();
          });
        } else if (Array.isArray(result)) {
          this.controlOptionsCache.set(control.name, result);
        }
      }
    } catch (error) {
      // Log error for debugging but don't throw to prevent form from breaking
      this.controlOptionsCache.set(control.name, []);
    }
  }

  private loadPaginatedOptions(
    control: FtFormControl,
    searchText = '',
    page = 1
  ): Observable<SelectOption[]> {
    if (typeof control.options !== 'function') {
      return new Observable(observer => observer.next([]));
    }

    const query: BaseQuery = {
      page,
      limit: control.pageSize || 20,
      ...(searchText ? { filter: searchText } : {}),
    };

    // Initialize pagination state if not exists
    if (!this.paginatedOptions[control.name]) {
      this.paginatedOptions[control.name] = {
        options: [],
        hasMore: true,
        currentPage: 0,
        pageSize: control.pageSize || 20,
        total: 0,
        loading: false,
        searchText: '',
      };
    }

    const paginatedState = this.paginatedOptions[control.name];
    paginatedState.loading = true;

    return (control.options(query) as Observable<ListPaginate<unknown>>).pipe(
      takeUntil(this.destroy$),
      map((response: ListPaginate<unknown>) => {
        // Convert paginated response to SelectOption[]
        const newOptions = response.data.map(item => {
          const record = item as Record<string, unknown>;
          return {
            label: (record['name'] || record['title'] || record['label'] || String(item)) as string,
            value: record['id'] || item,
          };
        });

        // Update pagination state
        if (page === 1) {
          // First page or new search - replace options
          paginatedState.options = newOptions;
        } else {
          // Subsequent pages - append options
          paginatedState.options = [...paginatedState.options, ...newOptions];
        }

        paginatedState.currentPage = page;
        paginatedState.total = response.total_records;
        paginatedState.hasMore = page < response.total_pages;
        paginatedState.loading = false;
        paginatedState.searchText = searchText;

        // Update cache for the component
        this.controlOptionsCache.set(control.name, paginatedState.options);
        this.cdr.detectChanges();

        return paginatedState.options;
      })
    );
  }

  // MARK: - Pagination Methods for Ant Design Select
  onSelectSearch(controlName: string, searchText: string): void {
    const control = this.option.controls.find(c => c.name === controlName);
    if (!control?.usePagination) {
      return;
    }

    // Debounce search
    if (!this.searchSubjects[controlName]) {
      this.searchSubjects[controlName] = new Subject<string>();
      this.searchSubjects[controlName]
        .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe(search => {
          this.loadPaginatedOptions(control, search, 1).subscribe();
        });
    }

    this.searchSubjects[controlName].next(searchText);
  }

  onSelectScrollToBottom(controlName: string): void {
    const control = this.option.controls.find(c => c.name === controlName);
    if (!control?.usePagination) {
      return;
    }

    const paginatedState = this.paginatedOptions[controlName];
    if (!paginatedState || paginatedState.loading || !paginatedState.hasMore) {
      return;
    }

    // Load next page
    const nextPage = paginatedState.currentPage + 1;
    this.loadPaginatedOptions(control, paginatedState.searchText || '', nextPage).subscribe();
  }

  // Check if a control uses pagination
  isPaginatedControl(controlName: string): boolean {
    const control = this.option.controls.find(c => c.name === controlName);
    return control?.usePagination === true;
  }

  // Get loading state for paginated controls
  isPaginatedLoading(controlName: string): boolean {
    return this.paginatedOptions[controlName]?.loading || false;
  }

  // MARK: - Options Getters
  getSelectOptions(control: FtFormControl): SelectOption[] {
    // Return cached options if available
    if (this.controlOptionsCache.has(control.name)) {
      return this.controlOptionsCache.get(control.name) || [];
    }

    if (!control.options) {
      return [];
    }

    if (Array.isArray(control.options)) {
      return control.options as SelectOption[];
    }

    // Handle Observable options
    if (control.options instanceof Observable) {
      control.options.pipe(takeUntil(this.destroy$)).subscribe(options => {
        this.controlOptionsCache.set(control.name, options);
        this.cdr.detectChanges();
      });
      return [];
    }

    // For function-based options, they should be loaded by loadDynamicOptions
    return [];
  }

  getRadioOptions(control: FtFormControl): RadioOption[] {
    if (!control.options || !Array.isArray(control.options)) {
      return [];
    }
    return control.options as RadioOption[];
  }

  getCheckboxOptions(control: FtFormControl): CheckboxOption[] {
    if (!control.options || !Array.isArray(control.options)) {
      return [];
    }
    return control.options as CheckboxOption[];
  }

  getColSpan(control: FtFormControl): number {
    return control.span || 24;
  }

  getColOffset(control: FtFormControl): number {
    return control.offset || 0;
  }

  // MARK: - Default Actions
  get hasDefaultActions(): boolean {
    return this.option.showDefaultActions !== false;
  }

  get defaultActions(): FormAction[] {
    if (!this.hasDefaultActions) {
      return [];
    }

    return [
      {
        type: 'submit',
        label: 'Submit',
        color: 'primary',
        icon: 'check',
        handler: (formValue: Record<string, unknown>) => {
          if (this.option.onSubmit) {
            this.option.onSubmit(formValue as T);
          }
        },
      },
      {
        type: 'cancel',
        label: 'Cancel',
        color: 'default',
        icon: 'close',
        handler: () => {
          if (this.option.onCancel) {
            this.option.onCancel();
          }
        },
      },
    ];
  }

  get allActions(): FormAction[] {
    const customActions = this.option.actions || [];
    const defaultActions = this.hasDefaultActions ? this.defaultActions : [];
    return [...customActions, ...defaultActions];
  }

  // MARK: - Public Methods
  getFormValue(): Record<string, unknown> {
    return this.form.value;
  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  validateForm(): boolean {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return false;
    }
    return true;
  }

  submitForm(): void {
    if (this.validateForm()) {
      this.handleSubmit({
        type: 'submit',
        label: 'Submit',
        handler: this.option.onSubmit,
      } as FormAction);
    }
  }

  // Method to refresh options for a specific control
  async refreshControlOptions(controlName: string): Promise<void> {
    const control = this.option.controls.find(c => c.name === controlName);
    if (control) {
      await this.loadOptionsForControl(control);
      this.cdr.detectChanges();
    }
  }

  // Method to get current options for a control
  getCurrentOptions(controlName: string): SelectOption[] {
    return this.controlOptionsCache.get(controlName) || [];
  }

  // MARK: - TrackBy Functions
  trackByControlName(index: number, control: FtFormControl): string {
    return control.name;
  }

  trackByOptionValue(index: number, option: SelectOption | RadioOption | CheckboxOption): unknown {
    return option.value;
  }

  trackByActionType(index: number, action: FormAction): string {
    return `${action.type}-${action.label}`;
  }
}
