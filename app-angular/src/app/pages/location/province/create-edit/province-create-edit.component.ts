import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { FormOption } from '@/app/shared/components/form/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { ProvinceService } from '@/app/shared/services/province.service';
import { CreateProvince, EditProvince, ProvinceDto } from '@/app/shared/types/province';

@Component({
  standalone: false,
  templateUrl: './province-create-edit.component.html',
})
export class ProvinceCreateEditComponent extends AppBaseComponent implements OnInit {
  formOptions!: FormOption<ProvinceDto>;

  constructor(
    injector: Injector,
    private provinceService: ProvinceService
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
    this.setHeaderButtons([]);

    this.setupFormOptions();

    if (this.isEdit) {
      this.loadProvinceData();
    }
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
          label: 'Province Name',
          type: 'text',
          required: true,
          placeholder: 'Enter province name',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
          errorMessages: {
            required: 'Province name is required',
            minlength: 'Province name must be at least 2 characters',
            maxlength: 'Province name cannot exceed 100 characters',
          },
          span: 12,
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: [
            { value: EStatus.active, label: 'Active' },
            { value: EStatus.inactive, label: 'Inactive' },
          ],
          validators: [Validators.required],
          errorMessages: {
            required: 'Status is required',
          },
          span: 12,
        },
      ],
      actions: [
        {
          type: 'submit',
          label: this.isEdit ? 'Update' : 'Create',
          icon: 'ki-outline ki-plus',
          color: 'primary',
          loading: false,
          handler: formValue => this.onSubmit(formValue),
        },
        {
          type: 'cancel',
          label: 'Cancel',
          icon: 'ki-outline ki-close',
          color: 'default',
          handler: () => this.onCancel(),
        },
      ],
    };
  }

  private async loadProvinceData(): Promise<void> {
    try {
      const province = await firstValueFrom(this.provinceService.getById(Number(this.id)));

      if (province) {
        this.formOptions = {
          ...this.formOptions,
          initialData: province,
        };
      }
    } catch (error) {
      this.msgService.error('Failed to load province data');
    }
  }

  private async onSubmit(formValue: Record<string, unknown>): Promise<void> {
    try {
      if (this.isEdit) {
        const updateData: EditProvince = {
          id: Number(this.id),
          name: formValue['name'] as string,
          status: formValue['status'] as EStatus,
        };

        await firstValueFrom(this.provinceService.update(updateData));
        this.msgService.success('Province updated successfully');
      } else {
        const createData: CreateProvince = {
          name: formValue['name'] as string,
          status: formValue['status'] as EStatus,
        };

        await firstValueFrom(this.provinceService.create(createData));
        this.msgService.success('Province created successfully');
      }

      this.redirect('/province');
    } catch (error) {
      this.msgService.error('Failed to save province');
      // Error already handled by displaying message to user
    }
  }

  private onCancel(): void {
    this.redirect('/province');
  }
}
