import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.model';
import { UserService } from '@/app/shared/services/user.service';
import { QueryUser, UserDto } from '@/app/shared/types/user';

@Component({
  standalone: false,
  templateUrl: './user.component.html',
})
export class UserComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<UserDto> = {
    title: 'User List',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryUser) => {
      return this.userService.getByPaged(input);
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
          return `<span class="text-blue-500 font-semibold">${row.id}</span>`;
        },
      },
      {
        title: 'User Name',
        name: 'username',
        type: 'text',
      },

      {
        title: 'Full name',
        name: 'profile.full_name',
        type: 'text',
      },
      {
        title: 'Phone',
        name: 'profile.phone',
        type: 'text',
      },
      {
        title: 'Email',
        name: 'email',
        type: 'text',
      },
      {
        title: 'Role',
        name: 'user_roles',
        type: 'custom-render',
        customRender: row => {
          let roles = '';
          const userRoles = row.user_roles;

          if (userRoles && userRoles.length > 0) {
            roles = userRoles.map(userRole => userRole.role.name).join(', ');
          }
          return `<span class="text-gray-700">${roles}</span>`;
        },
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        click: row => {
          this.userService.toggleStatus(String(row.id)).subscribe(() => {
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
        permission: 'user_manage_update',
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly userService: UserService
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
        permission: 'user_manage_create',
        click: () => {
          this.redirect('create');
        },
      },
      {
        title: 'Export',
        icon: 'ki-filled ki-exit-down',
        type: 'success',
        permission: 'user_manage_read',
        visible: true,
        click: () => {
          this.toastService.info('Export Data', 'You can implement export logic here');
        },
      },
    ]);
  }
}
