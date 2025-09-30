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
    fixHeader: false,
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
        type: 'custom-render',
        customRender: row => {
          return `<img src="${row.flag_icon}" alt="flag" class="w-[48px] h-auto inline-block" />`;
        },
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
    actions: [
      {
        label: 'Edit',
        color: 'primary',
        handler: row => {
          this.redirect(`edit/${row.id}`);
        },
        visible: () => true,
        permission: 'language_manage_update',
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly languageService: LanguageService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle(this.tNs('admin', 'MENU_LANGUAGE'));
    this.setHeaderButtons([
      {
        title: this.t('CREATE'),
        type: 'create',
        click: () => {
          this.redirect('create');
        },
        permission: 'language_manage_create',
      },
    ]);
  }
}
