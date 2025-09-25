import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { TableComponent } from '@/app/shared/components/tables/table/table.component';
import { TableOption } from '@/app/shared/components/tables/table/table.model';
import { LanguageService } from '@/app/shared/services/language.service';
import { LanguageDto, QueryLanguage } from '@/app/shared/types/language';

@Component({
  imports: [TableComponent],
  template: `
    <div class="container-fluid">
      <app-table #ftTable [option]="tableOptions"></app-table>
    </div>
  `,
})
export class LanguagesComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<LanguageDto> = {
    title: 'Language List',
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryLanguage) => {
      return this.languageService.getByPaged(input);
    },

    columns: [
      {
        title: 'ID',
        name: 'id',
        type: 'number',
      },
      {
        title: 'Code',
        name: 'code',
        type: 'text',
      },
      {
        title: 'Name',
        name: 'name',
        type: 'text',
      },
      {
        title: 'Native Name',
        name: 'native_name',
        type: 'text',
      },
      {
        title: 'Flag',
        name: 'flag_icon',
        type: 'image',
      },
      {
        title: 'Right to Left',
        name: 'is_rtl',
        type: 'boolean',
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
    private readonly languageService: LanguageService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Languages');
  }
}
