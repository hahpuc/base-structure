import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.modle';
import { ProvinceService } from '@/app/shared/services/province.service';
import { ProvinceDto } from '@/app/shared/types/province';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';

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
    data: (input: any) => {
      input.sorting = input.sorting;
      return this.provinceService.getByPaged(input);
    },
    filters: [
      {
        type: 'text',
        name: 'filter',
        label: 'Name',
        note: 'Search by name',
      },
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
        customRender: (row) => {
          return `<span class="text-blue-500 font-semibold">Province #${row.id}</span>`;
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
        click: (row) => {
          this.provinceService.toggleStatus(+row.id).subscribe(() => {
            this.ftTable.refresh();
            this.showSuccessMessage('Status updated successfully');
          });
        },
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly provinceService: ProvinceService
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  private showSuccessMessage(message: string) {
    this.msgService.success(message);
  }
}
