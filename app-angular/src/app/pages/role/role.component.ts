import { AppBaseComponent } from '@/app/shared/app.base.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { TableOption } from '@/app/shared/components/table/table.modle';
import {
  ExampleData,
  ExampleDataService,
} from '@/app/shared/services/example-data.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';

@Component({
  standalone: false,
  templateUrl: './role.component.html',
})
export class RoleComponent extends AppBaseComponent {
  @ViewChild('ftTable') ftTable!: TableComponent;

  tableOption: TableOption<ExampleData> = {
    title: 'Example Data Table',
    sortable: true,
    filterable: true,
    selectable: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    data: (input: any) => {
      input.sorting ||= 'createdAt desc';
      return this.exampleDataService.getByPaged(input);
    },
    columns: [
      {
        title: 'Name',
        name: 'name',
        sortable: true,
      },
      {
        title: 'Email',
        name: 'email',
        type: 'text',
      },
      {
        title: 'Category',
        name: 'category',
        sortable: true,
      },
      {
        title: 'Created Date',
        name: 'createdAt',
        type: 'date',
        sortable: true,
      },
      {
        title: 'Status',
        name: 'status',
        type: 'status',
        click: (row) => {
          this.exampleDataService.toggleStatus(row.id).subscribe(() => {
            this.ftTable.refresh();
            this.showSuccessMessage('Status updated successfully');
          });
        },
      },
    ],
    actions: [
      {
        label: 'Edit',
        iconClass: 'bi bi-pencil-fill',
        color: 'primary',
        handler: (row) => this.editItem(row),
      },
      {
        label: 'Delete',
        iconClass: 'bi bi-trash-fill',
        color: 'danger',
        handler: (row) => this.deleteItem(row),
      },
    ],
    filters: [
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        note: 'Search by name',
      },
      {
        type: 'select',
        name: 'category',
        label: 'Category',
        options: [
          { label: 'Premium', value: 'Premium' },
          { label: 'Standard', value: 'Standard' },
          { label: 'Basic', value: 'Basic' },
        ],
      },
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        options: [
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ],
      },
    ],
  };

  constructor(
    injector: Injector,
    private readonly exampleDataService: ExampleDataService
  ) {
    super(injector);
  }

  editItem(row: ExampleData) {
    this.showInfoMessage(`Edit item: ${row.name}`);
    // Implement edit logic here
  }

  deleteItem(row: ExampleData) {
    this.showConfirm(
      'Delete Confirmation',
      `Are you sure you want to delete "${row.name}"?`,
      () => {
        this.exampleDataService.delete(row.id).subscribe(() => {
          this.ftTable.refresh();
          this.showSuccessMessage('Item deleted successfully');
        });
      }
    );
  }

  bulkAction() {
    const selectedItems = this.ftTable.getSelectedItems();
    this.showInfoMessage(`Bulk action on ${selectedItems.length} items`);
  }

  deleteSelected() {
    const selectedItems = this.ftTable.getSelectedItems();
    if (selectedItems.length === 0) {
      this.showWarningMessage('No items selected');
      return;
    }

    this.showConfirm(
      'Delete Confirmation',
      `Are you sure you want to delete ${selectedItems.length} items?`,
      () => {
        // Delete each selected item
        const deletePromises = selectedItems.map((item) =>
          this.exampleDataService.delete(item.id)
        );

        // Wait for all deletions to complete
        Promise.all(deletePromises).then(() => {
          this.ftTable.refresh();
          this.showSuccessMessage(
            `${selectedItems.length} items deleted successfully`
          );
        });
      }
    );
  }

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
