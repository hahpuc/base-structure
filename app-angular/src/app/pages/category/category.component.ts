import { Component, Injector, ViewChild } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.model';
import { CategoryService } from '@/app/shared/services/category.service';
import { CategoryDto, QueryCategory } from '@/app/shared/types/category';

@Component({
  standalone: false,
  templateUrl: './category.component.html',
})
export class CategoryComponent extends AppBaseComponent {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<CategoryDto> = {
    title: 'Category List',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryCategory) => {
      return this.categoryService.getByPaged(input);
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
        title: 'Name',
        name: 'name',
        type: 'text',
        sortable: true,
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'text',
        sortable: true,
      },
      {
        title: 'Description',
        name: 'description',
        type: 'text',
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        click: row => {
          this.categoryService.toggleStatus(+row.id).subscribe(() => {
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
        permission: 'category_manage_update',
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly categoryService: CategoryService
  ) {
    super(injector);

    this.setPageTitle('Category');
    this.setHeaderButtons([
      {
        title: 'Create',
        icon: 'ki-outline ki-plus',
        type: 'primary',
        visible: true,
        click: () => {
          this.redirect('create');
        },
        permission: 'category_manage_create',
      },
    ]);
  }
}
