import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { FormComponent } from '@/app/shared/components/form/form.component';
import { FormOption } from '@/app/shared/components/form/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { RoleService } from '@/app/shared/services/role.service';
import { UserService } from '@/app/shared/services/user.service';
import { RoleDto } from '@/app/shared/types/role';
import { CreateUser, EditUser } from '@/app/shared/types/user';

@Component({
  standalone: false,
  templateUrl: './user-create-edit.component.html',
})
export class UserCreateEditComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<Record<string, unknown>>;
  isSubmitting = false;

  constructor(
    injector: Injector,
    private userService: UserService,
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
    this.setPageTitle(this.id ? 'Edit User' : 'Create User');
    this.setHeaderButtons([
      {
        title: 'Cancel',
        icon: 'ki-outline ki-arrow-left',
        type: 'danger',
        visible: true,
        disable: () => this.isSubmitting,
        click: () => {
          this.redirect('/user');
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
      this.loadUserData();
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
          name: 'username',
          label: 'Username',
          type: 'text',
          required: true,
          placeholder: 'Enter username',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(/^\S+$/),
          ],
          errorMessages: {
            required: 'Username is required',
            minlength: 'Username must be at least 3 characters',
            maxlength: 'Username cannot exceed 50 characters',
            pattern: 'Username cannot contain spaces',
          },
          span: 12,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter email address',
          validators: [Validators.required, Validators.email],
          errorMessages: {
            required: 'Email is required',
            email: 'Please enter a valid email address',
          },
          span: 12,
        },
        {
          name: 'full_name',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Enter full name',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
          errorMessages: {
            required: 'Full name is required',
            minlength: 'Full name must be at least 2 characters',
            maxlength: 'Full name cannot exceed 100 characters',
          },
          span: 12,
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          required: false,
          placeholder: 'Enter phone number',
          validators: [Validators.pattern(/^[+]?[0-9\s\-()]+$/)],
          errorMessages: {
            pattern: 'Please enter a valid phone number',
          },
          span: 12,
        },
        {
          name: 'role_ids',
          label: 'Roles',
          type: 'select',
          required: true,
          placeholder: 'Select roles',
          multiple: true,
          mode: 'multiple',
          allowClear: true,
          options: () =>
            this.roleService.getAll().pipe(
              map((roles: RoleDto[]) =>
                roles.map((role: RoleDto) => ({
                  label: role.name,
                  value: role.id,
                }))
              )
            ),
          validators: [Validators.required],
          errorMessages: {
            required: 'At least one role is required',
          },
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
            required: 'Status is required',
          },
          span: 12,
        },
      ],
    };
  }

  private async loadUserData(): Promise<void> {
    if (!this.id) return;

    try {
      const user = await firstValueFrom(this.userService.getById(this.id));

      if (user) {
        // Prepare initial data for the form
        const initialData = {
          username: user.username,
          email: user.email,
          full_name: user.profile?.full_name || '',
          phone: user.profile?.phone || '',
          role_ids: user.user_roles?.map(ur => ur.role.id) || [],
          status: user.status === EStatus.active,
        };

        this.formOptions = {
          ...this.formOptions,
          initialData,
        };
      }
    } catch (error) {
      this.msgService.error('Failed to load user data');
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
        await this.updateUser(formValue);
      } else {
        await this.createUser(formValue);
      }

      this.redirect('/user');
    } catch (error) {
      this.msgService.error('Failed to save user');
    } finally {
      this.isSubmitting = false;
    }
  }

  private async createUser(formValue: Record<string, unknown>): Promise<void> {
    const createData: CreateUser = {
      username: formValue['username'] as string,
      email: formValue['email'] as string,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
      role_ids: formValue['role_ids'] as number[],
      profile: {
        full_name: formValue['full_name'] as string,
        phone: formValue['phone'] as string,
      },
    };

    await firstValueFrom(this.userService.create(createData));
    this.msgService.success('User created successfully');
  }

  private async updateUser(formValue: Record<string, unknown>): Promise<void> {
    if (!this.id) return;

    const updateData: EditUser = {
      id: this.id,
      username: formValue['username'] as string,
      email: formValue['email'] as string,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
      role_ids: formValue['role_ids'] as number[],
      profile: {
        full_name: formValue['full_name'] as string,
        phone: formValue['phone'] as string,
      },
    };

    await firstValueFrom(this.userService.update(updateData));
    this.msgService.success('User updated successfully');
  }
}
