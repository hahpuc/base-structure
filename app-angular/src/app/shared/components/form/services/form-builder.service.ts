import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil, Subject } from 'rxjs';

import { FormOption, FtFormControl } from '../form.model';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  buildForm<T>(option: FormOption<T>): FormGroup {
    const formControls: { [key: string]: unknown[] } = {};

    option.controls.forEach(control => {
      const validators = control.validators || [];
      const asyncValidators = control.asyncValidators || [];
      let defaultValue = this.getDefaultValue(control, option.initialData);
      defaultValue = this.processDefaultValue(control, defaultValue);

      formControls[control.name] = [
        {
          value: defaultValue,
          disabled: control.disabled || option.disabled || false,
        },
        validators,
        asyncValidators,
      ];
    });

    const form = this.fb.group(formControls);
    if (option.initialData) {
      form.patchValue(option.initialData, { emitEvent: false });
    }
    return form;
  }

  processWriteValue(
    value: Record<string, unknown>,
    controls: FtFormControl[]
  ): Record<string, unknown> {
    const processedValue = { ...value };
    controls.forEach(control => {
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
    return processedValue;
  }

  setupFormValueChanges<T>(
    form: FormGroup,
    option: FormOption<T>,
    onChange: (value: Record<string, unknown>) => void,
    destroy$: Subject<void>
  ): void {
    form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(destroy$))
      .subscribe(value => {
        onChange(value);
        this.handleConditionalLogic(form, option.controls);
      });

    option.controls.forEach(control => {
      if (control.onChange) {
        const formControl = form.get(control.name);
        if (formControl) {
          formControl.valueChanges.pipe(takeUntil(destroy$)).subscribe(value => {
            if (control.onChange) {
              control.onChange(value, form.value);
            }
          });
        }
      }
    });
  }

  private getDefaultValue<T>(control: FtFormControl, initialData?: Partial<T>): unknown {
    const initialValue = initialData?.[control.name as keyof T];
    return initialValue !== undefined ? initialValue : control.defaultValue;
  }

  private processDefaultValue(control: FtFormControl, defaultValue: unknown): unknown {
    if (defaultValue === undefined || defaultValue === null) {
      if (control.type === 'select' && control.multiple) return [];
      if (control.type === 'multipleChoice') return [];
      if (control.type === 'switch') return control.value !== undefined ? control.value : false;
      return control.value || '';
    }
    if (control.type === 'select' && control.multiple && !Array.isArray(defaultValue)) {
      return defaultValue ? [defaultValue] : [];
    }
    return defaultValue;
  }

  private handleConditionalLogic(form: FormGroup, controls: FtFormControl[]): void {
    const formValue = form.value;
    controls.forEach(control => {
      const formControl = form.get(control.name);
      if (!formControl) return;

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
}
