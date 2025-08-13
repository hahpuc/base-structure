import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.model';
import { BlogPostService } from '@/app/shared/services/blog-post.service';
import { CategoryService } from '@/app/shared/services/category.service';
import { BaseQuery } from '@/app/shared/types/base';
import { BlogPostDto, QueryBlogPost } from '@/app/shared/types/blog-post';

@Component({
  standalone: false,
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  constructor(
    injector: Injector,
    private readonly blogPostService: BlogPostService,
    private readonly categoryService: CategoryService
  ) {
    super(injector);
  }

  tableOptions: TableOption<BlogPostDto> = {
    title: 'Blog Post List',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryBlogPost) => {
      return this.blogPostService.getByPaged(input);
    },
    filters: [
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        options: [
          { label: 'Active', value: 1 },
          { label: 'Inactive', value: 0 },
        ],
        usePagination: false, // Static options don't need pagination
      },
      // Example of paginated select (loads data from API with pagination)
      {
        type: 'select',
        options: (query: BaseQuery) => this.categoryService.getByPaged(query),
        name: 'category_id',
        label: 'Category (Paginated)',
        note: 'Select a category for the blog post (loads with pagination)',
        usePagination: true, // Enable pagination for this select
        searchable: true, // Enable search functionality
        pageSize: 10, // Custom page size (default is 20)
      },
      // Example of non-paginated select that loads all data at once
      {
        type: 'select',
        options: () =>
          this.categoryService
            .getAll()
            .pipe(map(categories => categories.map(c => ({ label: c.name, value: c.id })))),
        name: 'category_type',
        label: 'Category (All at once)',
        note: 'This loads all categories at once using getAll() API',
        usePagination: false, // Explicitly disable pagination (default behavior)
      },
    ],
    columns: [
      {
        title: 'ID',
        name: '',
        type: 'custom-render',
        customRender: row => {
          return `<span class="text-blue-500 font-semibold">#${row.id}</span>`;
        },
      },
      {
        title: 'Title',
        name: 'title',
        type: 'text',
        width: '200px',
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'text',
        width: '200px',
      },
      {
        title: 'Category',
        name: 'category.name',
        type: 'text',
        width: '200px',
      },
      {
        title: 'Description',
        name: 'description',
        type: 'text',
        width: '200px',
      },
      {
        title: 'Content',
        name: 'content',
        type: 'text',
        width: '200px',
      },
      {
        title: 'Thumbnail',
        name: 'thumbnail',
        type: 'image',
        width: '200px',
        align: 'center',
      },
      {
        title: 'Published At',
        name: 'published_at',
        type: 'datetime',
        width: '200px',
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        width: '200px',
        click: row => {
          this.blogPostService.toggleStatus(+row.id).subscribe(() => {
            this.ftTable.refresh();
            this.msgService.success('Status updated successfully');
          });
        },
      },
    ],
    actions: [
      {
        label: 'Edit',
        iconClass: 'ki-filled ki-pencil',
        color: 'primary',
        handler: row => {
          this.redirect(`edit/${row.id}`);
        },
        visible: () => true,
        permission: 'blog_post_manage_update',
      },
    ],
  };

  ngOnInit(): void {
    this.setPageTitle('Blog Post');
    this.setHeaderButtons([
      {
        title: 'Create',
        icon: 'ki-outline ki-plus',
        type: 'primary',
        permission: 'blog_post_manage_create',
        visible: true,
        click: () => {
          this.redirect('create');
        },
      },
    ]);
  }
}
