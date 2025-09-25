import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { TableComponent } from '@/app/shared/components/tables/table/table.component';
import { TableOption } from '@/app/shared/components/tables/table/table.model';
import { TranslationService } from '@/app/shared/services/translation.service';
import { QueryTranslation, TranslationDto } from '@/app/shared/types/translation';

@Component({
  imports: [TableComponent],
  template: `
    <div class="container-fluid">
      <app-table #ftTable [option]="tableOptions"></app-table>
    </div>
  `,
})
export class TranslationsComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<TranslationDto> = {
    title: 'Translation List',
    resizable: true,
    filterable: true,
    fixHeader: false,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryTranslation) => {
      return this.service.getByPaged(input);
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
        title: 'Language',
        name: 'language.code',
        type: 'text',
      },
      {
        title: 'Namespace',
        name: 'namespace.name',
        type: 'text',
      },
      {
        title: 'Key',
        name: 'key',
        type: 'text',
        width: '250px',
      },
      {
        title: 'Value',
        name: 'value',
        type: 'text',
        width: '300px',
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
      },
    ],
    actions: [],
  };

  constructor(
    injector: Injector,
    private readonly service: TranslationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Translations');
  }
}
