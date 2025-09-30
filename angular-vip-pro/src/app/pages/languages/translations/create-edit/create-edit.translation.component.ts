import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstValueFrom, map } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { FormComponent } from '@/app/shared/components/forms/form.component';
import { FormOption } from '@/app/shared/components/forms/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { LanguageService } from '@/app/shared/services/language.service';
import { TranslationNamespaceService } from '@/app/shared/services/translation-namespace.service';
import { TranslationService } from '@/app/shared/services/translation.service';
import {
  CreateTranslation,
  TranslationDto,
  UpdateTranslation,
} from '@/app/shared/types/translation';

@Component({
  imports: [CommonModule, FormComponent],
  template: `<div class="container-fluid">
    <app-form #ftForm [option]="formOptions"></app-form>
  </div> `,
})
export class CreateEditTranslationsComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<TranslationDto>;
  isSubmitting = false;

  constructor(
    injector: Injector,
    private service: TranslationService,
    private languageService: LanguageService,
    private namespaceService: TranslationNamespaceService
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
    this.setPageTitle(
      this.id
        ? `${this.t('EDIT')} ${this.tNs('admin', 'MENU_TRANSLATION')}`
        : `${this.t('CREATE')} ${this.tNs('admin', 'MENU_TRANSLATION')}`
    );
    this.setHeaderButtons([
      {
        title: this.t('CANCEL'),
        type: 'back',
        click: () => {
          this.redirect('/translations');
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

      this.redirect('/translations');
    } catch (error) {
      this.msgService.error(this.tNs('validation', 'SAVE_FAILED'));
    } finally {
      this.isSubmitting = false;
    }
  }

  private async createSubmit(formValue: Record<string, unknown>): Promise<void> {
    const createData: CreateTranslation = {
      language_id: Number(formValue['language_id']),
      namespace_id: Number(formValue['namespace_id']),
      key: formValue['key'] as string,
      value: formValue['value'] as string,
      description: formValue['description'] as string,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    await firstValueFrom(this.service.create(createData));
    this.msgService.success(this.t('SUCCESS'));
  }

  private async updateSubmit(formValue: Record<string, unknown>): Promise<void> {
    if (!this.id) return;

    const updateData: UpdateTranslation = {
      id: Number(this.id),
      language_id: Number(formValue['language_id']),
      namespace_id: Number(formValue['namespace_id']),
      key: formValue['key'] as string,
      value: formValue['value'] as string,
      description: formValue['description'] as string,
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
          name: 'language_id',
          label: this.tNs('admin', 'LANGUAGE'),
          type: 'select',
          required: true,
          placeholder: this.t('SELECT') + ' ' + this.tNs('admin', 'LANGUAGE'),
          span: 12,
          validators: [Validators.required],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
          },
          options: () =>
            this.languageService
              .getOptions()
              .pipe(map(options => options.map(opt => ({ label: opt.label, value: opt.value })))),
        },
        {
          name: 'namespace_id',
          label: this.tNs('admin', 'NAMESPACE'),
          type: 'select',
          required: true,
          placeholder: this.t('SELECT') + ' ' + this.tNs('admin', 'NAMESPACE'),
          span: 12,
          validators: [Validators.required],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
          },
          options: () =>
            this.namespaceService
              .getOptions()
              .pipe(map(options => options.map(opt => ({ label: opt.label, value: opt.value })))),
        },
        {
          name: 'key',
          label: this.tNs('admin', 'LANGUAGE_KEY'),
          type: 'text',
          required: true,
          onChange: (value: unknown, formValue: Record<string, unknown>) => {
            return this.ftForm.form.patchValue(
              {
                key: (value as string).toUpperCase(),
              },
              { emitEvent: false }
            );
          },
          placeholder: this.t('ENTER') + ' ' + this.tNs('admin', 'LANGUAGE_KEY'),
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
            minlength: this.tNs('validation', 'TOO_SHORT', { min: 2 }),
            maxlength: this.tNs('validation', 'TOO_LONG', { max: 100 }),
          },
          span: 12,
        },
        {
          name: 'value',
          label: this.tNs('admin', 'LANGUAGE_VALUE'),
          type: 'text',
          required: true,
          placeholder: this.t('ENTER') + ' ' + this.tNs('admin', 'LANGUAGE_VALUE'),
          validators: [Validators.required, Validators.minLength(1)],
          errorMessages: {
            required: this.tNs('validation', 'REQUIRED'),
            minlength: this.tNs('validation', 'TOO_SHORT', { min: 1 }),
          },
          span: 12,
        },
        {
          name: 'description',
          label: this.tNs('admin', 'DESCRIPTION'),
          type: 'textarea',
          required: false,
          placeholder: this.t('ENTER') + ' ' + this.tNs('admin', 'DESCRIPTION'),
          span: 12,
        },
        {
          name: 'status',
          label: this.t('STATUS'),
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
