import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import slugify from 'slugify';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { FormComponent } from '@/app/shared/components/form/form.component';
import { FormOption } from '@/app/shared/components/form/form.model';
import { EStatus } from '@/app/shared/constants/enum';
import { BlogPostService } from '@/app/shared/services/blog-post.service';
import { CategoryService } from '@/app/shared/services/category.service';
import { BaseQuery } from '@/app/shared/types/base';
import { BlogPostDto, CreateBlogPost, EditBlogPost } from '@/app/shared/types/blog-post';

@Component({
  standalone: false,
  templateUrl: './blog-post-create-edit.component.html',
})
export class BlogPostCreateEditComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftForm') ftForm!: FormComponent;

  formOptions!: FormOption<BlogPostDto>;
  isSubmitting = false;

  constructor(
    injector: Injector,
    private categoryService: CategoryService,
    private blogPostService: BlogPostService
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
    this.setPageTitle(this.id ? 'Edit Blog Post' : 'Create Blog Post');
    this.setHeaderButtons([
      {
        title: 'Cancel',
        icon: 'ki-outline ki-arrow-left',
        type: 'danger',
        visible: true,
        disable: () => this.isSubmitting,
        click: () => {
          this.redirect('/blog-post');
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

    this.blogPostService.getById(+this.id).subscribe({
      next: blogPost => {
        this.formOptions = {
          ...this.formOptions,
          initialData: blogPost,
        };
      },
      error: () => {
        this.msgService.error('Failed to load blog post data');
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
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          placeholder: 'Enter title',
          validators: [Validators.required],
          errorMessages: {
            required: 'Title is required',
          },
          span: 8,
          onChange: (value: string | unknown) => {
            this._updateSlugFromName(value as string);
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
          name: 'order_index',
          label: 'Order Index',
          type: 'number',
          required: true,
          placeholder: 'Enter order index',
          validators: [Validators.required],
          errorMessages: {
            required: 'Order index is required',
          },
          span: 8,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          placeholder: 'Enter description',
          validators: [Validators.required],
          errorMessages: {
            required: 'Description is required',
          },
          span: 24,
        },
        {
          name: 'thumbnail',
          label: 'Thumbnail',
          type: 'file',
          required: true,
          placeholder: '',
          validators: [Validators.required],
          errorMessages: {
            required: 'Thumbnail is required',
          },
          span: 8,
        },
        {
          name: 'published_at',
          label: 'Published At',
          type: 'datetime',
          required: true,
          placeholder: 'Select published date',
          validators: [Validators.required],
          errorMessages: {
            required: 'Published date is required',
          },
          span: 8,
        },
        {
          name: 'category_id',
          label: 'Category',
          type: 'select',
          required: true,
          placeholder: 'Select category',
          // Example 1: Non-paginated approach (loads all categories at once)
          // options: () =>
          //   this.categoryService
          //     .getAll()
          //     .pipe(map(categories => categories.map(p => ({ label: p.name, value: p.id })))),
          //   usePagination: false, // Default behavior
          // Example 2: Paginated approach (loads categories with pagination)
          // options: (query: BaseQuery) => this.categoryService.getByPaged(query),
          // usePagination: true,
          options: () =>
            this.categoryService
              .getAll()
              .pipe(map(categories => categories.map(p => ({ label: p.name, value: p.id })))),
          usePagination: false, // Enable pagination
          searchable: true, // Enable search functionality
          pageSize: 10, // Custom page size (default is 20)

          validators: [Validators.required],
          errorMessages: {
            required: 'Category is required',
          },
          span: 8,
        },
        {
          name: 'status',
          label: 'Status',
          type: 'switch',
          required: true,
          placeholder: 'Select status',
          validators: [Validators.required],
          errorMessages: {
            required: 'Status is required',
          },
          span: 8,
        },
        {
          name: 'content',
          label: 'Content',
          type: 'richtext',
          required: true,
          placeholder: 'Enter content',
          span: 24,
        },
      ],
    };
  }

  private _updateSlugFromName(name: string): void {
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

  private handleSubmit(): void {
    if (!this.ftForm?.validateForm()) {
      return;
    }

    const formValue = this.ftForm.getFormValue();
    this.isSubmitting = true;

    const submition = this.isEdit && this.id ? this._update(formValue) : this._create(formValue);

    submition.subscribe({
      next: () => {
        const message = this.isEdit
          ? 'Blog post updated successfully'
          : 'Blog post created successfully';
        this.msgService.success(message);
        this.redirect('/blog-post');
      },
      error: () => {
        const message = this.isEdit ? 'Failed to update blog post' : 'Failed to create blog post';
        this.msgService.error(message);
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  private _create(formValue: Record<string, unknown>) {
    const createData: CreateBlogPost = {
      title: formValue['title'] as string,
      slug: formValue['slug'] as string,
      order_index: formValue['order_index'] as number,
      description: formValue['description'] as string,
      content: formValue['content'] as string,
      thumbnail: formValue['thumbnail'] as string,
      published_at: formValue['published_at'] as Date,
      category_id: formValue['category_id'] as number,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    return this.blogPostService.create(createData);
  }

  private _update(formValue: Record<string, unknown>) {
    const updateData: EditBlogPost = {
      id: Number(this.id),
      title: formValue['title'] as string,
      slug: formValue['slug'] as string,
      order_index: formValue['order_index'] as number,
      description: formValue['description'] as string,
      content: formValue['content'] as string,
      thumbnail: formValue['thumbnail'] as string,
      published_at: formValue['published_at'] as Date,
      category_id: formValue['category_id'] as number,
      status: (formValue['status'] as boolean) ? EStatus.active : EStatus.inactive,
    };

    return this.blogPostService.update(updateData);
  }
}
