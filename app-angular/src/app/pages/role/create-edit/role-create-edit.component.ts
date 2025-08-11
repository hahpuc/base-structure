import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { FormComponent } from '@/app/shared/components/form/form.component';
import { FormOption } from '@/app/shared/components/form/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { RoleService } from '@/app/shared/services/role.service';
import { RoleDto } from '@/app/shared/types/role';

@Component({
  standalone: false,
  templateUrl: './role-create-edit.component.html',
})
export class RoleCreateEditComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<RoleDto>;

  constructor(
    injector: Injector,
    private roleService: RoleService
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
    this.setPageTitle(this.id ? 'Edit Role' : 'Create Role');
    this.setHeaderButtons([
      {
        title: 'Cancel',
        icon: 'ki-outline ki-arrow-left',
        type: 'danger',
        visible: true,

        click: () => {
          this.redirect('/role');
        },
      },
      {
        title: 'Save',
        icon: () => 'ki-outline ki-check',
        type: 'primary',
        visible: true,
        click: () => {},
      },
    ]);

    this.setupFormOptions();

    if (this.isEdit) {
      this.loadRoleData();
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
          label: 'Role Name',
          type: 'text',
          required: true,
          placeholder: 'Enter role name',
          validators: [Validators.required],
          errorMessages: {
            required: 'Role name is required',
          },
          span: 8,
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          required: true,
          placeholder: 'Enter role slug',
          validators: [Validators.required],
          errorMessages: {
            required: 'Role slug is required',
          },
          span: 8,
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
          span: 8,
        },
      ],
    };
  }

  private async handleSubmit(): Promise<void> {
    // Check if form component is available and form is valid
    if (!this.ftForm?.validateForm()) {
      return;
    }

    // Get form values from the form component
    const formValue = this.ftForm.getFormValue();
  }

  private async loadRoleData(): Promise<void> {}

  private async onSubmit(formValue: Record<string, unknown>): Promise<void> {}
}
