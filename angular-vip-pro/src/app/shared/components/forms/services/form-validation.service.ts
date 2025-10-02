import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FtFormControl } from '../form.model';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  getErrorMessage(control: FtFormControl, form: FormGroup): string {
    const formControl = form.get(control.name);
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

  isControlVisible(control: FtFormControl, form: FormGroup): boolean {
    if (control.hidden) return false;
    if (control.showWhen) return control.showWhen(form.value);
    return true;
  }

  validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      this.markFormGroupTouched(form);
      return false;
    }
    return true;
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
}
