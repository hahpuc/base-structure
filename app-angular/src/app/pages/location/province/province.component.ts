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
export class ProvinceComponent extends AppBaseComponent {
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
        width: '80px',
        customRender: row => {
          return `<span class="text-blue-500 font-semibold">#${row.id}</span>`;
        },
      },
      {
        title: 'ID',
        name: 'id',
        type: 'number',
        width: '100px',
      },
      {
        title: 'Name',
        name: 'name',
        type: 'text',
        sortable: true,
        width: '200px',
      },
      {
        title: 'Created Date',
        name: 'created_at',
        type: 'date',
        width: '150px',
      },
      {
        title: 'Updated Date',
        name: 'updated_at',
        type: 'datetime',
        width: '180px',
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        width: '80px',
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
        iconClass: 'edit',
        color: 'primary',
        handler: row => {
          this.editProvince(row);
        },
        visible: () => true,
        permission: 'province.edit',
      },
      // {
      //   label: 'Delete',
      //   iconClass: 'ki-filled ki-trash',
      //   color: 'danger',
      //   handler: (row) => {
      //     this.deleteProvince(row);
      //   },
      //   visible: (row) => true,
      //   permission: 'province.delete',
      // },
      // {
      //   label: 'View Details',
      //   iconClass: 'ki-filled ki-eye',
      //   color: 'secondary',
      //   handler: (row) => {
      //     this.viewProvince(row);
      //   },
      //   visible: (row) => true,
      // },
    ],
  };

  constructor(
    injector: Injector,
    private readonly provinceService: ProvinceService
  ) {
    super(injector);
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
