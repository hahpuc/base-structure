import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';

import { FormAction, FormOption } from '../form.model';

@Injectable({
  providedIn: 'root',
})
export class FormActionsService {
  async executeAction<T>(
    action: FormAction,
    form: FormGroup,
    option: FormOption<T>
  ): Promise<void> {
    switch (action.type) {
      case 'submit':
        await this.handleSubmit(action, form, option);
        break;
      case 'reset':
        this.handleReset(form, option);
        break;
      case 'cancel':
        this.handleCancel(option);
        break;
      case 'custom':
        if (action.handler) {
          await this.executeHandler(action.handler, form.value);
        }
        break;
    }
  }

  getAllActions<T>(option: FormOption<T>): FormAction[] {
    const customActions = option.actions || [];
    const defaultActions = this.shouldShowDefaultActions(option)
      ? this.getDefaultActions(option)
      : [];
    return [...customActions, ...defaultActions];
  }

  private async handleSubmit<T>(
    action: FormAction,
    form: FormGroup,
    option: FormOption<T>
  ): Promise<void> {
    if (form.invalid) {
      this.markFormGroupTouched(form);
      return;
    }

    if (action.handler) {
      await this.executeHandler(action.handler, form.value);
    } else if (option.onSubmit) {
      await this.executeHandler(option.onSubmit, form.value);
    }
  }

  private handleReset<T>(form: FormGroup, option: FormOption<T>): void {
    form.reset();
    if (option.onReset) {
      option.onReset();
    }
  }

  private handleCancel<T>(option: FormOption<T>): void {
    if (option.onCancel) {
      option.onCancel();
    }
  }

  private async executeHandler(
    handler: Function,
    formValue: Record<string, unknown>
  ): Promise<void> {
    const result = handler(formValue);
    if (result instanceof Promise) {
      await result;
    } else if (result instanceof Observable) {
      await firstValueFrom(result);
    }
  }

  private shouldShowDefaultActions<T>(option: FormOption<T>): boolean {
    return option.showDefaultActions !== false;
  }

  private getDefaultActions<T>(option: FormOption<T>): FormAction[] {
    return [
      {
        type: 'submit',
        label: 'Submit',
        color: 'primary',
        icon: 'check',
        handler: (formValue: Record<string, unknown>) => {
          if (option.onSubmit) {
            option.onSubmit(formValue as T);
          }
        },
      },
      {
        type: 'cancel',
        label: 'Cancel',
        color: 'default',
        icon: 'close',
        handler: () => {
          if (option.onCancel) {
            option.onCancel();
          }
        },
      },
    ];
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
