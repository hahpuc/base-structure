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
} from 'rxjs';

import {
  CheckboxOption,
  FormAction,
  FormOption,
  FtFormControl,
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

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setupFormValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['option'] && !changes['option'].firstChange) {
      this.buildForm();
      this.setupFormValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor implementation
  writeValue(value: Record<string, unknown>): void {
    if (value && this.form) {
      this.form.patchValue(value, { emitEvent: false });
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

      formControls[control.name] = [
        {
          value: defaultValue || control.value || '',
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

  // Utility methods for template
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

  getSelectOptions(control: FtFormControl): SelectOption[] {
    if (!control.options) {
      return [];
    }

    if (Array.isArray(control.options)) {
      return control.options as SelectOption[];
    }

    // Handle Observable options
    if (control.options instanceof Observable) {
      // You might want to handle this with async pipe in template
      return [];
    }

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

  // Public methods for external access
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

  // TrackBy functions for performance
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
