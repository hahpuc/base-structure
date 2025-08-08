import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.model';
import { ProvinceService } from '@/app/shared/services/province.service';
import { ProvinceDto, QueryProvince } from '@/app/shared/types/province';

@Component({
  standalone: false,
  templateUrl: './province.component.html',
})
export class ProvinceComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<ProvinceDto> = {
    title: 'Province List',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryProvince) => {
      return this.provinceService.getByPaged(input);
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
        title: '#',
        name: '',
        type: 'custom-render',
        customRender: row => {
          return `<span class="text-blue-500 font-semibold">#${row.id}</span>`;
        },
      },
      {
        title: 'ID',
        name: 'id',
        type: 'number',
      },
      {
        title: 'Name',
        name: 'name',
        type: 'text',
        sortable: true,
      },
      {
        title: 'Created Date',
        name: 'created_at',
        type: 'date',
      },
      {
        title: 'Updated Date',
        name: 'updated_at',
        type: 'datetime',
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        click: row => {
          this.provinceService.toggleStatus(+row.id).subscribe(() => {
            this.ftTable.refresh();
            this.showSuccessMessage('Status updated successfully');
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
        permission: 'province.edit',
      },
      {
        label: 'Delete',
        iconClass: 'ki-filled ki-trash',
        color: 'danger',
        handler: row => {
          this.deleteProvince(row);
        },
        visible: row => true,
        permission: 'province.delete',
      },
      {
        label: 'View Details',
        iconClass: 'ki-filled ki-eye',
        color: 'secondary',
        handler: row => {
          this.viewProvince(row);
        },
        visible: row => true,
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly provinceService: ProvinceService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Province');
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
      {
        title: 'Export',
        icon: 'ki-filled ki-exit-down',
        type: 'success',
        visible: true,
        click: () => {
          this.toastService.info('Export Data', 'You can implement export logic here');
        },
      },
      {
        title: 'Settings',
        icon: 'ki-filled ki-setting-3',
        type: 'warning',
        visible: () => true, // Dynamic visibility
        click: () => {
          this.toastService.warning('Settings', 'Settings functionality coming soon');
        },
      },
      {
        title: 'Delete all',
        icon: 'ki-filled ki-trash',
        type: 'danger',
        visible: true,
        click: () => {
          this.toastService.error('Delete All', 'This action is disabled');
        },
      },
    ]);
  }

  // Action handlers
  editProvince(province: ProvinceDto): void {
    // Navigate to edit page or open modal
    this.showInfoMessage(`Edit province: ${province.name}`);

    this.toastService.warning('Edit Province', `You are editing province: ${province.name}`, 3000);
  }

  deleteProvince(province: ProvinceDto): void {
    // Show confirmation dialog and delete
    this.showWarningMessage(`Delete province: ${province.name}`);
  }

  viewProvince(province: ProvinceDto): void {
    // Navigate to detail page or open modal
    this.showInfoMessage(`View province details: ${province.name}`);
  }

  // Private message methods
  private showSuccessMessage(message: string) {
    this.msgService.success(message);
  }

  private showInfoMessage(message: string) {
    this.msgService.info(message);
  }

  private showWarningMessage(message: string) {
    this.msgService.warning(message);
  }

  private showConfirm(title: string, content: string, onOk: () => void) {
    // You can implement a modal confirmation here
    // For now, just use window.confirm
    if (confirm(`${title}: ${content}`)) {
      onOk();
    }
  }
}
