import { Component, Injector, ViewChild } from '@angular/core';
import { map } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.model';
import { ProvinceService } from '@/app/shared/services/province.service';
import { WardService } from '@/app/shared/services/ward.service';
import { QueryWard, WardDto } from '@/app/shared/types/ward';

@Component({
  standalone: false,
  templateUrl: './ward.component.html',
})
export class WardComponent extends AppBaseComponent {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<WardDto> = {
    title: 'Ward List',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryWard) => {
      return this.wardService.getByPaged(input);
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
      {
        type: 'select',
        options: () =>
          this.provinceService
            .getAll()
            .pipe(map(provinces => provinces.map(p => ({ label: p.name, value: p.id })))),
        name: 'province_id',
        label: 'Province',
      },
    ],
    columns: [
      {
        title: 'ID',
        name: '',
        type: 'custom-render',
        width: '100px',
        customRender: row => {
          return `<span class="text-blue-500 font-semibold">#${row.id}</span>`;
        },
      },
      {
        title: 'Name',
        name: 'name',
        type: 'text',
        width: '150px',
        sortable: true,
      },
      {
        title: 'Province',
        name: 'province.name',
        type: 'text',
        width: '150px',
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        width: '100px',
        click: row => {
          this.wardService.toggleStatus(+row.id).subscribe(() => {
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
        permission: 'province_manage_update',
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly wardService: WardService,
    private readonly provinceService: ProvinceService
  ) {
    super(injector);

    this.setPageTitle('Ward');
    this.setHeaderButtons([
      {
        title: 'Create',
        icon: 'ki-outline ki-plus',
        type: 'primary',
        visible: true,
        click: () => {
          this.redirect('create');
        },
        permission: 'province_manage_create',
      },
    ]);
  }
}
