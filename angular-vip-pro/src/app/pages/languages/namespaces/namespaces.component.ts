import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { TableComponent } from '@/app/shared/components/tables/table/table.component';
import { TableOption } from '@/app/shared/components/tables/table/table.model';
import { TranslationNamespaceService } from '@/app/shared/services/translation-namespace.service';
import { QueryTranslationNamespace, TranslationNamespaceDto } from '@/app/shared/types/translation';

@Component({
  imports: [TableComponent],
  template: `
    <div class="container-fluid">
      <app-table #ftTable [option]="tableOptions"></app-table>
    </div>
  `,
})
export class NamespacesComponent extends AppBaseComponent implements OnInit {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOptions: TableOption<TranslationNamespaceDto> = {
    title: 'Namespace List',
    fixHeader: false,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    data: (input: QueryTranslationNamespace) => {
      return this.service.getByPaged(input);
    },
    columns: [
      {
        title: 'ID',
        name: 'id',
        type: 'number',
      },
      {
        title: 'Name',
        name: 'name',
        type: 'text',
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
    private readonly service: TranslationNamespaceService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle(this.tNs('admin', 'MENU_NAMESPACE'));
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
