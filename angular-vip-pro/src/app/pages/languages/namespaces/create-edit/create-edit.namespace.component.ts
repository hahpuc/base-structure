import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { FormComponent } from '@/app/shared/components/forms/form.component';
import { FormOption } from '@/app/shared/components/forms/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { TranslationNamespaceService } from '@/app/shared/services/translation-namespace.service';
import {
  CreateTranslationNamespace,
  EditTranslationNamespace,
  TranslationNamespaceDto,
} from '@/app/shared/types/translation';

@Component({
  imports: [CommonModule, FormComponent],
  template: `<div class="container-fluid">
    <app-form #ftForm [option]="formOptions"></app-form>
  </div> `,
})
export class CreateEditNamespaceComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<TranslationNamespaceDto>;
  isSubmitting = false;

  constructor(
    injector: Injector,
    private service: TranslationNamespaceService
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
    this.setPageTitle(this.id ? `${this.t('EDIT')} Namespace` : `${this.t('CREATE')} Namespace`);
    this.setHeaderButtons([
      {
        title: this.t('CANCEL'),
        type: 'back',
        click: () => {
          this.redirect('/namespaces');
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

      this.redirect('/namespaces');
    } catch (error) {
      this.msgService.error(this.tNs('validation', 'SAVE_FAILED'));
    } finally {
      this.isSubmitting = false;
    }
  }

  private async createSubmit(formValue: Record<string, unknown>): Promise<void> {
    const createData: CreateTranslationNamespace = {
      name: formValue['name'] as string,
      description: formValue['description'] as string,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    await firstValueFrom(this.service.create(createData));
    this.msgService.success(this.t('SUCCESS'));
  }

  private async updateSubmit(formValue: Record<string, unknown>): Promise<void> {
    if (!this.id) return;

    const updateData: EditTranslationNamespace = {
      id: Number(this.id),
      name: formValue['name'] as string,
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
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: false,
          placeholder: 'Enter description',
          span: 12,
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
