import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { FormComponent } from '@/app/shared/components/form/form.component';
import { FormOption } from '@/app/shared/components/form/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { CategoryService } from '@/app/shared/services/category.service';
import { CategoryDto, CreateCategory, EditCategory } from '@/app/shared/types/category';

@Component({
  standalone: false,
  templateUrl: './category-create-edit.component.html',
})
export class CategoryCreateEditComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<CategoryDto>;
  isSubmitting = false;

  constructor(
    injector: Injector,
    private categoryService: CategoryService
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
    this.setPageTitle(this.id ? 'Edit Category' : 'Create Category');
    this.setHeaderButtons([
      {
        title: 'Cancel',
        icon: 'ki-outline ki-arrow-left',
        type: 'danger',
        visible: true,
        disable: () => this.isSubmitting,
        click: () => {
          this.redirect('/category');
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

    this.categoryService.getById(+this.id).subscribe({
      next: category => {
        this.formOptions = {
          ...this.formOptions,
          initialData: category,
        };
      },
      error: () => {
        this.msgService.error('Failed to load category data');
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
          label: 'Category Name',
          type: 'text',
          required: true,
          placeholder: 'Enter category name',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
          errorMessages: {
            required: 'Category name is required',
            minlength: 'Category name must be at least 2 characters',
            maxlength: 'Category name cannot exceed 255 characters',
          },
          span: 8,
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          required: true,
          placeholder: 'Enter category slug',
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
          errorMessages: {
            required: 'Slug is required',
            minlength: 'Slug must be at least 2 characters',
            maxlength: 'Slug cannot exceed 255 characters',
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
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: false,
          placeholder: 'Enter category description (optional)',
          validators: [Validators.maxLength(1000)],
          errorMessages: {
            maxlength: 'Description cannot exceed 1000 characters',
          },
          span: 24,
        },
      ],
    };
  }

  private handleSubmit(): void {
    if (!this.ftForm?.validateForm()) {
      return;
    }

    const formValue = this.ftForm.getFormValue();
    this.isSubmitting = true;

    const submition =
      this.isEdit && this.id ? this.updateCategory(formValue) : this.createCategory(formValue);

    submition.subscribe({
      next: () => {
        const message = this.isEdit
          ? 'Category updated successfully'
          : 'Category created successfully';
        this.msgService.success(message);
        this.redirect('/category');
      },
      error: () => {
        const message = this.isEdit ? 'Failed to update category' : 'Failed to create category';
        this.msgService.error(message);
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  private createCategory(formValue: Record<string, unknown>) {
    const createData: CreateCategory = {
      name: formValue['name'] as string,
      slug: formValue['slug'] as string,
      description: formValue['description'] as string,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    return this.categoryService.create(createData);
  }

  private updateCategory(formValue: Record<string, unknown>) {
    const updateData: EditCategory = {
      id: Number(this.id),
      name: formValue['name'] as string,
      slug: formValue['slug'] as string,
      description: formValue['description'] as string,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    return this.categoryService.update(updateData);
  }
}
