import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { FormComponent } from '@/app/shared/components/forms/form.component';
import { FormOption } from '@/app/shared/components/forms/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { LanguageService } from '@/app/shared/services/language.service';
import { CreateLanguage, EditLanguage, LanguageDto } from '@/app/shared/types/language';

@Component({
  imports: [CommonModule, FormComponent],
  template: `<div class="container-fluid">
    <app-form #ftForm [option]="formOptions"></app-form>
  </div> `,
})
export class CreateEditLanguageComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<LanguageDto>;
  isSubmitting = false;

  constructor(
    injector: Injector,
    private service: LanguageService
  ) {
    super(injector);
  }

  get id(): string | null {
    return this.getRouteParam('id');
  }

  get isEdit(): boolean {
    return !!this.id;
  }

  ngOnInit(): void {
    this.setPageTitle(this.id ? `${this.t('EDIT')} Language` : `${this.t('CREATE')} Language`);
    this.setHeaderButtons([
      {
        title: this.t('CANCEL'),
        type: 'back',
        click: () => {
          this.redirect('/languages');
        },
      },
      {
        title: () => (this.isSubmitting ? this.t('LOADING') : this.t('SAVE')),
        type: 'create',
        disable: () => this.isSubmitting,
        click: () => {
          this.handleSubmit();
        },
        permission: 'language_manage_create',
      },
    ]);

    this.setupFormOptions();

    if (this.isEdit) {
      this.loadData();
    }
  }

  private async handleSubmit(): Promise<void> {
    // Check if form component is available and form is valid
    if (!this.ftForm?.validateForm()) {
      return;
    }

    // Get form values from the form component
    const formValue = this.ftForm.getFormValue();

    this.isSubmitting = true;

    try {
      if (this.isEdit && this.id) {
        await this.updateSubmit(formValue);
      } else {
        await this.createSubmit(formValue);
      }

      this.redirect('/languages');
    } catch (error) {
      this.msgService.error(this.tNs('validation', 'SAVE_FAILED'));
    } finally {
      this.isSubmitting = false;
    }
  }

  private async createSubmit(formValue: Record<string, unknown>): Promise<void> {
    const createData: CreateLanguage = {
      name: formValue['name'] as string,
      code: formValue['code'] as string,
      native_name: formValue['native_name'] as string,
      flag_code: formValue['flag_code'] as string,
      flag_icon: formValue['flag_icon'] as string,
      is_rtl: formValue['is_rtl'] as boolean,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    await firstValueFrom(this.service.create(createData));
    this.msgService.success(this.t('SUCCESS'));
  }

  private async updateSubmit(formValue: Record<string, unknown>): Promise<void> {
    if (!this.id) return;

    const updateData: EditLanguage = {
      id: Number(this.id),
      name: formValue['name'] as string,
      native_name: formValue['native_name'] as string,
      flag_code: formValue['flag_code'] as string,
      flag_icon: formValue['flag_icon'] as string,
      is_rtl: formValue['is_rtl'] as boolean,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    await firstValueFrom(this.service.update(updateData));
    this.msgService.success(this.t('SUCCESS'));
  }

  private setupFormOptions(): void {
    this.formOptions = {
      layout: 'vertical',
      size: 'large',
      gutter: 16,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      showDefaultActions: false,
      controls: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          placeholder: 'Enter name',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
            minlength: this.tNs('validation', 'TOO_SHORT', { min: 2 }),
            maxlength: this.tNs('validation', 'TOO_LONG', { max: 100 }),
          },
          span: 12,
        },
        {
          name: 'code',
          label: 'Code',
          type: 'text',
          required: true,
          placeholder: 'Enter code',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
            minlength: this.tNs('validation', 'TOO_SHORT', { min: 2 }),
            maxlength: this.tNs('validation', 'TOO_LONG', { max: 10 }),
          },
          span: 12,
        },
        {
          name: 'native_name',
          label: 'Native Name',
          type: 'text',
          required: true,
          placeholder: 'Enter native name',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
            minlength: this.tNs('validation', 'TOO_SHORT', { min: 2 }),
            maxlength: this.tNs('validation', 'TOO_LONG', { max: 100 }),
          },
          span: 12,
        },
        {
          name: 'flag_code',
          label: 'Flag Code',
          type: 'text',
          required: true,
          placeholder: 'Enter flag code (e.g., us, fr, de)',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
            minlength: this.tNs('validation', 'TOO_SHORT', { min: 2 }),
            maxlength: this.tNs('validation', 'TOO_LONG', { max: 10 }),
          },
          span: 12,
        },
        {
          name: 'flag_icon',
          label: 'Flag Icon',
          type: 'text',
          required: true,
          validators: [Validators.required],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
          },
          span: 12,
        },
        {
          name: 'is_rtl',
          label: 'Right to Left',
          type: 'switch',
          required: true,
          defaultValue: false,
          validators: [Validators.required],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
          },
          span: 8,
        },

        {
          name: 'status',
          label: 'Status',
          type: 'switch',
          required: true,
          defaultValue: true,
          validators: [Validators.required],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
          },
          span: 8,
        },
      ],
    };
  }

  private async loadData(): Promise<void> {
    try {
      const data = await firstValueFrom(this.service.getById(Number(this.id)));

      if (data) {
        this.formOptions = {
          ...this.formOptions,
          initialData: data,
        };
      }
    } catch (error) {
      this.msgService.error(this.tNs('validation', 'LOAD_FAILED'));
    }
  }
}
