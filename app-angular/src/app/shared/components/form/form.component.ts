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
import { Subject } from 'rxjs';

import { FormOption, FtFormControl, FormAction, SelectOption } from './form.model';
import { FormActionsService } from './services/form-actions.service';
import { FormBuilderService } from './services/form-builder.service';
import { FormOptionsService } from './services/form-options.service';
import { FormValidationService } from './services/form-validation.service';

@Component({
  standalone: false,
  selector: 'app-form',
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
    private cdr: ChangeDetectorRef,
    private formBuilderService: FormBuilderService,
    private formValidationService: FormValidationService,
    private formOptionsService: FormOptionsService,
    private formActionsService: FormActionsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['option'] && !changes['option'].firstChange) {
      this.initializeForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.formOptionsService.cleanup();
  }

  // MARK: ControlValue
  writeValue(value: Record<string, unknown>): void {
    if (value && this.form) {
      const processedValue = this.formBuilderService.processWriteValue(value, this.option.controls);
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
      isDisabled ? this.form.disable() : this.form.enable();
    }
  }

  private async initializeForm(): Promise<void> {
    // Setup services
    this.formOptionsService.setCdr(this.cdr);

    // Build form
    this.form = this.formBuilderService.buildForm(this.option);

    // Setup value changes
    this.formBuilderService.setupFormValueChanges(
      this.form,
      this.option,
      this.onChange,
      this.destroy$
    );

    // Load dynamic options
    await this.formOptionsService.loadDynamicOptions(this.option.controls);
    this.cdr.detectChanges();
  }

  // MARK: Public Methods
  async onAction(action: FormAction): Promise<void> {
    if (action.disabled || action.loading) return;

    this.isLoading = true;
    try {
      await this.formActionsService.executeAction(action, this.form, this.option);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  getErrorMessage(control: FtFormControl): string {
    return this.formValidationService.getErrorMessage(control, this.form);
  }

  isControlVisible(control: FtFormControl): boolean {
    return this.formValidationService.isControlVisible(control, this.form);
  }

  // MARK: Options methods
  getSelectOptions(control: FtFormControl) {
    return this.formOptionsService.getSelectOptions(control);
  }

  getRadioOptions(control: FtFormControl) {
    return this.formOptionsService.getRadioOptions(control);
  }

  getCheckboxOptions(control: FtFormControl) {
    return this.formOptionsService.getCheckboxOptions(control);
  }

  onSelectSearch(controlName: string, searchText: string): void {
    this.formOptionsService.onSelectSearch(controlName, searchText);
  }

  onSelectScrollToBottom(controlName: string): void {
    this.formOptionsService.onSelectScrollToBottom(controlName);
  }

  isPaginatedControl(controlName: string): boolean {
    return this.formOptionsService.isPaginatedControl(controlName);
  }

  isPaginatedLoading(controlName: string): boolean {
    return this.formOptionsService.isPaginatedLoading(controlName);
  }

  // MARK: Layout methods
  getColSpan(control: FtFormControl): number {
    return control.span || 24;
  }

  getColOffset(control: FtFormControl): number {
    return control.offset || 0;
  }

  trackByActionType(index: number, action: FormAction): string {
    return `${action.type}-${action.label}`;
  }

  // MARK: Public API methods
  getFormValue(): Record<string, unknown> {
    return this.form.value;
  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  validateForm(): boolean {
    return this.formValidationService.validateForm(this.form);
  }

  async submitForm(): Promise<void> {
    if (this.validateForm()) {
      await this.onAction({
        type: 'submit',
        label: 'Submit',
        handler: this.option.onSubmit,
      } as FormAction);
    }
  }

  async refreshControlOptions(controlName: string): Promise<void> {
    await this.formOptionsService.refreshControlOptions(controlName);
    this.cdr.detectChanges();
  }

  getCurrentOptions(controlName: string) {
    return this.formOptionsService.getCurrentOptions(controlName);
  }

  // MARK: Utils
  get allActions(): FormAction[] {
    return this.formActionsService.getAllActions(this.option);
  }

  trackByControlName(index: number, control: FtFormControl): string {
    return control.name;
  }

  trackByOptionValue(index: number, option: SelectOption): unknown {
    return option.value;
  }
}
