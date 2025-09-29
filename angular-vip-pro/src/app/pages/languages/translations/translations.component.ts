import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { TableComponent } from '@/app/shared/components/tables/table/table.component';
import { TableOption } from '@/app/shared/components/tables/table/table.model';
import { LanguageService } from '@/app/shared/services/language.service';
import { TranslationNamespaceService } from '@/app/shared/services/translation-namespace.service';
import { TranslationService } from '@/app/shared/services/translation.service';
import { QueryTranslation, TranslationDto } from '@/app/shared/types/translation';

import { ImportModalTranslationComponent } from './import/import-modal.translation.component';

@Component({
  imports: [TableComponent, ImportModalTranslationComponent],
  template: `
    <div class="container-fluid">
      <app-table #ftTable [option]="tableOptions"></app-table>
      <app-import-modal-translation
        [isVisible]="isImportModalVisible"
        (visibleChange)="isImportModalVisible = $event"
      ></app-import-modal-translation>
    </div>
  `,
})
export class TranslationsComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  isImportModalVisible = false;

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
      {
        type: 'select',
        options: () =>
          this.languageService
            .getOptions()
            .pipe(map(opt => opt.map(c => ({ label: c.label, value: c.value })))),
        name: 'language_id',
        label: 'Language',
      },
      {
        type: 'select',
        options: () =>
          this.namespaceService
            .getOptions()
            .pipe(map(opt => opt.map(c => ({ label: c.label, value: c.value })))),
        name: 'namespace_id',
        label: 'Namespace',
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
    private readonly service: TranslationService,
    private readonly languageService: LanguageService,
    private readonly namespaceService: TranslationNamespaceService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Translations');
    this.setHeaderButtons([
      {
        title: this.t('CREATE'),
        type: 'create',
        click: () => {
          this.redirect('create');
        },
        permission: 'language_manage_create',
      },
      {
        title: this.t('IMPORT'),
        type: 'import',
        click: () => {
          this.isImportModalVisible = true;
        },
        permission: 'language_manage_create',
      },
    ]);
  }
}
