import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.model';
import { RoleService } from '@/app/shared/services/role.service';
import { QueryRole, RoleDto } from '@/app/shared/types/role';

@Component({
  standalone: false,
  templateUrl: './role.component.html',
})
export class RoleComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<RoleDto> = {
    title: 'Role List',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryRole) => {
      return this.roleService.getByPaged(input);
    },
    filters: [],
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
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        click: row => {
          this.roleService.toggleStatus(+row.id).subscribe(() => {
            this.ftTable.refresh();
            this.toastService.success('Success', 'Status updated successfully');
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
        permission: 'role_manage_update',
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly roleService: RoleService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Role Management');
    this.setHeaderButtons([
      {
        title: 'Create',
        icon: 'ki-outline ki-plus',
        type: 'primary',
        visible: true,
        click: () => {
          this.redirect('create');
        },
      },
    ]);
  }
}
