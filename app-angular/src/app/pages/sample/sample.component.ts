import { Component, Injector, ViewChild } from '@angular/core';
import { map } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.model';
import { CategoryService } from '@/app/shared/services/category.service';
import { ProvinceService } from '@/app/shared/services/province.service';
import { SampleService } from '@/app/shared/services/sample.service';
import { WardService } from '@/app/shared/services/ward.service';
import { ESampleType, QuerySample, SampleDto } from '@/app/shared/types/sample';

@Component({
  standalone: false,
  templateUrl: './sample.component.html',
})
export class SampleComponent extends AppBaseComponent {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<SampleDto> = {
    title: 'Sample List',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QuerySample) => {
      return this.sampleService.getByPaged(input);
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
        name: 'type',
        label: 'Type',
        options: [
          { label: 'Event', value: ESampleType.event },
          { label: 'Promotion', value: ESampleType.promotion },
          { label: 'News', value: ESampleType.news },
          { label: 'Announcement', value: ESampleType.announcement },
        ],
      },
      {
        type: 'select',
        options: () =>
          this.categoryService
            .getAll()
            .pipe(map(categories => categories.map(c => ({ label: c.name, value: c.id })))),
        name: 'category_id',
        label: 'Category',
      },
      {
        type: 'select',
        name: 'province_id',
        label: 'Province',
        options: [],
      },
      {
        type: 'select',
        name: 'ward_id',
        label: 'Ward',
        options: [],
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
        title: 'Type',
        name: 'type',
        type: 'custom-render',
        customRender: row => {
          const typeLabels = {
            [ESampleType.event]: 'Event',
            [ESampleType.promotion]: 'Promotion',
            [ESampleType.news]: 'News',
            [ESampleType.announcement]: 'Announcement',
          };
          return `<span class="badge badge-primary">${typeLabels[row.type as ESampleType] || 'Unknown'}</span>`;
        },
      },
      {
        title: 'Category',
        name: 'category.name',
        type: 'text',
      },
      {
        title: 'Ward',
        name: 'ward.name',
        type: 'text',
      },
      {
        title: 'Start Time',
        name: 'start_time',
        type: 'date',
        sortable: true,
      },
      {
        title: 'End Time',
        name: 'end_time',
        type: 'date',
        sortable: true,
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        click: row => {
          this.sampleService.toggleStatus(+row.id).subscribe(() => {
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
        permission: 'sample_manage_update',
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly sampleService: SampleService,
    private readonly categoryService: CategoryService,
    private readonly wardService: WardService,
    private readonly provinceService: ProvinceService
  ) {
    super(injector);

    this.setPageTitle('Sample');
    this.setHeaderButtons([
      {
        title: 'Create',
        icon: 'ki-outline ki-plus',
        type: 'primary',
        visible: true,
        click: () => {
          this.redirect('create');
        },
        permission: 'sample_manage_create',
      },
    ]);
  }
}
