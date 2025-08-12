import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { FormComponent } from '@/app/shared/components/form/form.component';
import { FormOption } from '@/app/shared/components/form/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { ProvinceService } from '@/app/shared/services/province.service';
import { WardService } from '@/app/shared/services/ward.service';
import { CreateWard, EditWard, WardDto } from '@/app/shared/types/ward';

@Component({
  standalone: false,
  templateUrl: './ward-create-edit.component.html',
})
export class WardCreateEditComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<WardDto>;
  isSubmitting = false;

  constructor(
    injector: Injector,
    private provinceService: ProvinceService,
    private wardService: WardService
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
    this.setPageTitle(this.id ? 'Edit Province' : 'Create Province');
    this.setHeaderButtons([
      {
        title: 'Cancel',
        icon: 'ki-outline ki-arrow-left',
        type: 'danger',
        visible: true,
        disable: () => this.isSubmitting,
        click: () => {
          this.redirect('/province');
        },
      },
      {
        title: () => (this.isSubmitting ? 'Saving...' : 'Save'),
        icon: () => (this.isSubmitting ? 'ki-outline ki-loading' : 'ki-outline ki-check'),
        type: 'primary',
        visible: true,
        disable: () => this.isSubmitting,
        click: () => {
          this.handleSubmit();
        },
      },
    ]);

    this.setupFormOptions();

    if (this.isEdit) {
      this.loadData();
    }
  }

  private async loadData(): Promise<void> {
    if (!this.id) return;

    this.wardService.getById(+this.id).subscribe({
      next: ward => {
        this.formOptions = {
          ...this.formOptions,
          initialData: ward,
        };
      },
      error: () => {
        this.msgService.error('Failed to load ward data');
      },
    });
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
          label: 'Ward Name',
          type: 'text',
          required: true,
          placeholder: 'Enter ward name',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
          errorMessages: {
            required: 'Ward name is required',
            minlength: 'Ward name must be at least 2 characters',
            maxlength: 'Ward name cannot exceed 100 characters',
          },
          span: 8,
        },
        {
          name: 'province_id',
          label: 'Province',
          type: 'select',
          required: true,
          placeholder: 'Select province',
          options: () =>
            this.provinceService
              .getAll()
              .pipe(map(provinces => provinces.map(p => ({ label: p.name, value: p.id })))),
          validators: [Validators.required],
          errorMessages: {
            required: 'Province is required',
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
            required: 'Status is required',
          },
          span: 8,
        },
      ],
    };
  }

  private async handleSubmit(): Promise<void> {
    if (!this.ftForm?.validateForm()) {
      return;
    }

    // Get form values from the form component
    const formValue = this.ftForm.getFormValue();

    this.isSubmitting = true;

    try {
      if (this.isEdit && this.id) {
        await this.update(formValue);
      } else {
        await this.create(formValue);
      }

      this.redirect('/ward');
    } catch (error) {
      this.msgService.error('Failed to save ward');
    } finally {
      this.isSubmitting = false;
    }
  }

  private async create(formValue: Record<string, unknown>): Promise<void> {
    const createData: CreateWard = {
      name: formValue['name'] as string,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
      province_id: formValue['province_id'] as number,
    };

    this.wardService.create(createData).subscribe({
      next: () => {
        this.msgService.success('Ward created successfully');
      },
      error: () => {
        this.msgService.error('Failed to create ward');
      },
    });
  }

  private async update(formValue: Record<string, unknown>): Promise<void> {
    if (!this.id) return;

    const updateData: EditWard = {
      id: Number(this.id),
      name: formValue['name'] as string,
      province_id: formValue['province_id'] as number,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    this.wardService.update(updateData).subscribe({
      next: () => {
        this.msgService.success('Ward updated successfully');
      },
      error: () => {
        this.msgService.error('Failed to update ward');
      },
    });
  }
}
