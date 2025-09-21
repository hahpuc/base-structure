import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { TableComponent } from '@/app/shared/components/tables/table/table.component';
import { TableOption } from '@/app/shared/components/tables/table/table.model';
import { ProvinceService } from '@/app/shared/services/province.service';
import { ProvinceDto, QueryProvince } from '@/app/shared/types/province';

@Component({
  imports: [TableComponent, NzModalModule],
  templateUrl: './province.component.html',
})
export class ProvinceComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<ProvinceDto> = {
    title: 'Province List',
    sortable: true,
    filterable: true,
    selectable: true,
    expandable: true, // Set to true if you want to test expandable rows
    fixHeader: false, // Default is false now
    resizable: true,
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
        width: '200px',
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
        color: 'primary',
        handler: row => {
          this.redirect(`edit/${row.id}`);
        },
        visible: () => true,
        permission: 'province_manage_update',
      },
      {
        label: 'Delete',
        color: 'danger',
        handler: row => {
          this.deleteProvince(row);
        },
        visible: row => true,
        permission: 'province_manage_delete',
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
    this.setPageTitle('Province Management');
    this.setHeaderButtons([
      {
        title: 'Create',
        type: 'create',
        click: () => {
          this.redirect('create');
        },
        permission: 'province_manage_create',
      },
      {
        title: 'Export',
        type: 'export',
        click: async () => {
          this.showInfoMessage('Exporting province data...');
          // Add your export logic here
        },
        permission: 'province_manage_read',
      },
      {
        title: 'Import',
        type: 'import',
        click: async () => {
          this.showInfoMessage('Opening import dialog...');
          // Add your import logic here
        },
        permission: 'province_manage_read',
      },
    ]);
  }

  // Action handlers
  editProvince(province: ProvinceDto): void {
    // Navigate to edit page or open modal
    this.showInfoMessage(`Edit province: ${province.name}`);

    this.msgService.warning(`You are editing province: ${province.name}`);
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
