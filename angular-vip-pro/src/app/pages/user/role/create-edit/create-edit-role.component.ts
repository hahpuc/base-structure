/* eslint-disable import/no-extraneous-dependencies */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { lastValueFrom, Subject } from 'rxjs';
import slugify from 'slugify';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { FormComponent } from '@/app/shared/components/forms/form.component';
import { FormOption } from '@/app/shared/components/forms/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { RoleService } from '@/app/shared/services/role.service';
import { PermissionItem } from '@/app/shared/types/permission';
import { CreateRole, EditRole, RoleDto } from '@/app/shared/types/role';

interface PermissionModule {
  name: string;
  permissions: PermissionItem[];
}

@Component({
  imports: [CommonModule, FormComponent, ReactiveFormsModule, NzCheckboxModule, NzSpinModule],
  templateUrl: './create-edit-role.component.html',
})
export class CreateEditRoleComponent
  extends AppBaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('ftForm') ftForm!: FormComponent<RoleDto>;

  formOptions!: FormOption<RoleDto>;
  permissionModules: PermissionModule[] = [];
  selectedPermissionIds: number[] = [];
  isLoading = false;
  currentRole: RoleDto | null = null;

  private destroy$ = new Subject<void>();
  private formReady = false;

  constructor(
    injector: Injector,
    private roleService: RoleService
  ) {
    super(injector);
  }

  get id(): number | null {
    const idParam = this.getRouteParam('id');
    return idParam ? Number(idParam) : null;
  }

  get isEdit(): boolean {
    return !!this.id;
  }

  ngOnInit(): void {
    this.setPageTitle(this.id ? 'Edit Role' : 'Create Role');
    this.setHeaderButtons([
      {
        title: 'Cancel',
        type: 'back',
        visible: true,
        click: () => {
          this.redirect('/role');
        },
      },
      {
        title: 'Save',
        type: 'create',
        visible: true,
        click: () => {
          this.handleSubmit();
        },
      },
    ]);

    this.setupFormOptions();
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.formReady = true;
    this.patchFormIfReady();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchFormIfReady(): void {
    if (this.formReady && this.currentRole && this.ftForm) {
      this.ftForm.form.patchValue({
        name: this.currentRole.name,
        slug: this.currentRole.slug,
        status: this.currentRole.status == EStatus.active ? true : false,
      });
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
          onChange: (value: string | unknown) => {
            this.updateSlugFromName(value as string);
          },
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          required: true,
          disabled: this.isEdit,
          placeholder: 'Auto-generated from role name',
          validators: [Validators.required],
          errorMessages: {
            required: 'Role slug is required',
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

  changeSlug(): void {
    const formValue = this.ftForm?.getFormValue();
    this.updateSlugFromName(formValue ? (formValue['name'] as string) : '');
  }

  updateSlugFromName(name: string): void {
    if (this.isEdit) return;

    if (!name || !this.ftForm) return;

    const slug = slugify(name, {
      replacement: '-',
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    });

    this.ftForm.form.patchValue({ slug }, { emitEvent: false });
  }

  private async handleSubmit(): Promise<void> {
    if (!this.ftForm?.validateForm()) {
      return;
    }

    // Get form values from the form component
    const formValue = this.ftForm.getFormValue();

    await this.onSubmit({
      ...formValue,
      permission_ids: this.selectedPermissionIds,
    });
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;

      if (this.isEdit && this.id) {
        // EDIT Mode: Load both role data and permissions
        const [role, permissionList] = await Promise.all([
          lastValueFrom(this.roleService.getById(this.id)),
          lastValueFrom(this.permissionService.getList()),
        ]);

        this.currentRole = role;
        this.buildPermissionModules(permissionList);

        // Set form initial data
        this.formOptions.initialData = {
          name: role?.name,
          slug: role?.slug,
          status: role?.status,
        };

        // Try to patch form immediately if form is ready
        this.patchFormIfReady();

        // Set selected permissions based on role permissions
        if (role?.permissions) {
          this.selectedPermissionIds = Object.values(role.permissions)
            .flat()
            .map(p => p.id);
        }
      } else {
        // CREATE Mode

        const permissionList = await lastValueFrom(this.permissionService.getList());
        this.buildPermissionModules(permissionList);
        this.selectedPermissionIds = [];
      }
    } catch (error) {
      this.msgService.error('Failed to load data');
    } finally {
      this.isLoading = false;
    }
  }

  private buildPermissionModules(permissionList: Record<string, PermissionItem[]>): void {
    this.permissionModules = [];

    Object.keys(permissionList).forEach(moduleKey => {
      this.permissionModules.push({
        name: moduleKey,
        permissions: permissionList[moduleKey],
      });
    });
  }

  // Checkbox event handlers
  isPermissionChecked(permissionId: number): boolean {
    return this.selectedPermissionIds.includes(permissionId);
  }

  onPermissionCheckChange(permissionId: number, checked: boolean): void {
    if (checked) {
      if (!this.selectedPermissionIds.includes(permissionId)) {
        this.selectedPermissionIds.push(permissionId);
      }
    } else {
      this.selectedPermissionIds = this.selectedPermissionIds.filter(id => id !== permissionId);
    }
  }

  isModuleChecked(moduleName: string): boolean {
    const module = this.permissionModules.find(m => m.name === moduleName);
    if (!module) return false;

    return module.permissions.every(p => this.selectedPermissionIds.includes(p.id));
  }

  isModuleIndeterminate(moduleName: string): boolean {
    const module = this.permissionModules.find(m => m.name === moduleName);
    if (!module) return false;

    const checkedCount = module.permissions.filter(p =>
      this.selectedPermissionIds.includes(p.id)
    ).length;
    return checkedCount > 0 && checkedCount < module.permissions.length;
  }

  onModuleCheckChange(moduleName: string, checked: boolean): void {
    const module = this.permissionModules.find(m => m.name === moduleName);
    if (!module) return;

    if (checked) {
      // Add all permissions from this module
      module.permissions.forEach(permission => {
        if (!this.selectedPermissionIds.includes(permission.id)) {
          this.selectedPermissionIds.push(permission.id);
        }
      });
    } else {
      // Remove all permissions from this module
      const modulePermissionIds = module.permissions.map(p => p.id);
      this.selectedPermissionIds = this.selectedPermissionIds.filter(
        id => !modulePermissionIds.includes(id)
      );
    }
  }

  getPermissionName(permissionId: number): string {
    for (const module of this.permissionModules) {
      const permission = module.permissions.find(p => p.id === permissionId);
      if (permission) {
        return permission.name;
      }
    }
    return `Permission ${permissionId}`;
  }

  getLeftColumnModules(): PermissionModule[] {
    const totalModules = this.permissionModules.length;
    const leftCount = Math.ceil(totalModules / 2);
    return this.permissionModules.slice(0, leftCount);
  }

  getRightColumnModules(): PermissionModule[] {
    const totalModules = this.permissionModules.length;
    const leftCount = Math.ceil(totalModules / 2);
    return this.permissionModules.slice(leftCount);
  }

  private async onSubmit(formData: Record<string, unknown>): Promise<void> {
    try {
      this.isLoading = true;

      if (this.isEdit && this.id) {
        await this._updateRole(formData);
      } else {
        await this._createRole(formData);
      }

      this.redirect('/role');
    } catch (error) {
      this.msgService.error(this.isEdit ? 'Failed to update role' : 'Failed to create role');
    } finally {
      this.isLoading = false;
    }
  }

  private async _createRole(formData: Record<string, unknown>): Promise<void> {
    const createData: CreateRole = {
      name: formData['name'] as string,
      slug: formData['slug'] as string,
      status: (formData['status'] as boolean) ? EStatus.active : EStatus.inactive,
      permission_ids: formData['permission_ids'] as number[],
    };

    await lastValueFrom(this.roleService.create(createData));
    this.msgService.success('Role created successfully');
  }

  private async _updateRole(formData: Record<string, unknown>): Promise<void> {
    if (!this.id) return;

    const editData: EditRole = {
      id: this.id,
      name: formData['name'] as string,
      slug: formData['slug'] as string,
      status: (formData['status'] as boolean) ? EStatus.active : EStatus.inactive,
      permission_ids: formData['permission_ids'] as number[],
    };

    await lastValueFrom(this.roleService.update(editData));
    this.msgService.success('Role updated successfully');
  }
}
