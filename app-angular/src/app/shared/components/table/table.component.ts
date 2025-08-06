import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPaginate } from '../../types/base';
import {
  TableAction,
  TableActionColor,
  TableColumn,
  TableOption,
} from './table.modle';

@Component({
  standalone: false,
  selector: 'ft-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() option!: TableOption;

  tableData: any[] = [];
  loading = false;
  total = 0;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [10, 20, 50, 100];

  // Selection
  allChecked = false;
  indeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};

  // Current filters and sorting
  currentFilters: any = {};
  currentSort: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  protected getQueryParam(param: string): string | null {
    return this.activatedRoute.snapshot.queryParamMap.get(param);
  }

  // MARK: Initialization
  ngOnInit() {
    this.initializeTable();
  }

  ngAfterViewInit() {
    this.initializeFromQueryParams();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['option'] && !changes['option'].firstChange) {
      this.initializeTable();
    }
  }

  private initializeFromQueryParams() {
    // Get pagination parameters
    const pageParam = this.getQueryParam('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (page > 0) {
        this.currentPage = page;
      }
    }

    const limitParam = this.getQueryParam('limit');
    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (limit > 0 && this.pageSizeOptions.includes(limit)) {
        this.pageSize = limit;
      }
    }

    // Get sorting parameter
    const sortingParam = this.getQueryParam('sorting');
    if (sortingParam) {
      this.currentSort = sortingParam;
    }

    // Get filter parameters
    const filters: any = {};
    if (this.option.filters) {
      this.option.filters.forEach((filter) => {
        const filterValue = this.getQueryParam(filter.name);
        if (filterValue !== null && filterValue !== '') {
          filters[filter.name] = filterValue;
        }
      });
    }
    this.currentFilters = filters;

    // Load data with the initialized parameters
    this.loadData();
  }

  private initializeTable() {
    if (this.option) {
      this.pageSize = this.option.pageSize || 10;
      this.pageSizeOptions = this.option.pageSizeOptions || [10, 20, 50, 100];
      this.loadData();
    }
  }

  loadData() {
    if (!this.option.data) return;

    this.loading = true;

    const params = {
      page: this.currentPage,
      limit: this.pageSize,
      sorting: this.currentSort,
      ...this.currentFilters,
    };

    if (Array.isArray(this.option.data)) {
      this._loadStaticData();
      return;
    }

    // Get Dynamic data from API
    (this.option.data(params) as Observable<ListPaginate<any>>).subscribe({
      next: (response) => {
        this.tableData = response.data;
        this.total = response.total_records;
        this.loading = false;
        this.updateSelection();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  refresh() {
    this.loadData();
  }

  // MARK: Pagination handlers
  onPageChange(page: number) {
    this.currentPage = page;
    this.updateQueryParams();
    this.loadData();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadData();
  }

  // MARK: Filter handlers
  onFilterChange(filters: any) {
    this.currentFilters = filters;
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadData();
  }

  onClearFilter() {
    this.currentFilters = {};
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadData();
  }

  // Helper method to update query parameters
  private updateQueryParams() {
    const queryParams: any = {
      page: this.currentPage,
      limit: this.pageSize,
      ...this.currentFilters,
    };

    if (this.currentSort) {
      queryParams.sorting = this.currentSort;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      replaceUrl: true, // Don't add to browser history
    });
  }

  // MARK: Sorting
  onSort(column: TableColumn) {
    if (!column.sortable) return;

    const columnName = column.name;
    let newSort = '';

    if (this.currentSort === `${columnName} asc`) {
      newSort = `${columnName} desc`;
    } else if (this.currentSort === `${columnName} desc`) {
      newSort = '';
    } else {
      newSort = `${columnName} asc`;
    }

    this.currentSort = newSort;
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadData();
  }

  getSortDirection(column: TableColumn): 'ascend' | 'descend' | null {
    if (!column.sortable || !this.currentSort) return null;

    const columnName = column.name;
    if (this.currentSort === `${columnName} asc`) {
      return 'ascend';
    } else if (this.currentSort === `${columnName} desc`) {
      return 'descend';
    }
    return null;
  }

  getSortFn(column: TableColumn) {
    if (!column.sortable) return null;

    return (a: any, b: any) => {
      const aValue = this.getNestedValue(a, column.name);
      const bValue = this.getNestedValue(b, column.name);

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    };
  }

  onSortChange(column: TableColumn, sortOrder: string | null) {
    if (!column.sortable) return;

    const columnName = column.name;
    let newSort = '';

    if (sortOrder === 'ascend') {
      newSort = `${columnName} asc`;
    } else if (sortOrder === 'descend') {
      newSort = `${columnName} desc`;
    } else {
      newSort = '';
    }

    this.currentSort = newSort;
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadData();
  }

  // Selection methods
  onAllChecked(checked: boolean) {
    this.tableData.forEach((item) => {
      this.mapOfCheckedId[item.id] = checked;
    });
    this.updateSelection();
  }

  onItemChecked(id: string, checked: boolean) {
    this.mapOfCheckedId[id] = checked;
    this.updateSelection();
  }

  private updateSelection() {
    const checkedCount = this.tableData.filter(
      (item) => this.mapOfCheckedId[item.id]
    ).length;
    this.allChecked = checkedCount === this.tableData.length;
    this.indeterminate =
      checkedCount > 0 && checkedCount < this.tableData.length;
  }

  getSelectedItems() {
    return this.tableData.filter((item) => this.mapOfCheckedId[item.id]);
  }

  // MARK: Column methods
  getColumnType(column: TableColumn): string {
    if (column.customRender) {
      return 'custom-render';
    }
    // Check if column.type is a TemplateRef
    if (
      column.type &&
      typeof column.type === 'object' &&
      'createEmbeddedView' in column.type
    ) {
      return 'template';
    }
    return (column.type as string) || 'text';
  }

  getColumnTemplate(column: TableColumn): any {
    if (
      column.type &&
      typeof column.type === 'object' &&
      'createEmbeddedView' in column.type
    ) {
      return column.type;
    }
    return null;
  }

  getColumnValue(row: any, column: TableColumn): any {
    const value = this.getNestedValue(row, column.name);

    // For status and switch types, convert numeric values to boolean
    if (
      (column.type === 'status' || column.type === 'switch') &&
      typeof value === 'number'
    ) {
      return value === 1;
    }

    return value;
  }

  getCustomRender(row: any, column: TableColumn): string {
    if (column.customRender) {
      return column.customRender(row);
    }
    return this.getColumnValue(row, column);
  }

  isColumnDisabled(row: any, column: TableColumn): boolean {
    if (column.disable) {
      return column.disable(row);
    }
    return false;
  }

  onColumnClick(row: any, column: TableColumn) {
    if (column.click && !this.isColumnDisabled(row, column)) {
      column.click(row);
    }
  }

  onStatusChange(row: any, column: TableColumn, newValue: boolean) {
    // Update the row data
    this.setNestedValue(row, column.name, newValue ? 1 : 0);

    if (column.click) {
      column.click(row);
    }
  }

  // MARK: Action methods
  getVisibleActions(row: any): TableAction[] {
    if (!this.option.actions) return [];

    return this.option.actions.filter((action) => {
      if (action.visible) {
        return action.visible(row);
      }
      return true;
    });
  }

  onActionClick(row: any, action: TableAction) {
    if (action.handler) {
      action.handler(row);
    }
  }

  getActionType(
    color?: TableActionColor
  ): 'primary' | 'default' | 'dashed' | 'link' | 'text' {
    switch (color) {
      case 'primary':
        return 'primary';
      case 'danger':
        return 'primary';
      case 'success':
        return 'primary';
      case 'warning':
        return 'default';
      case 'secondary':
        return 'default';
      default:
        return 'default';
    }
  }

  // MARK: Utility methods
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => current[key], obj);
    target[lastKey] = value;
  }

  truncateText(text: string, length: number): string {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  // MARK: Static Data Utils

  private _loadStaticData() {
    if (Array.isArray(this.option.data)) {
      // Static data - apply client-side pagination
      let filteredData = [...this.option.data];

      // Apply filters for static data if needed
      if (Object.keys(this.currentFilters).length > 0) {
        filteredData = this._applyFiltersToStaticData(
          filteredData,
          this.currentFilters
        );
      }

      // Apply sorting for static data if needed
      if (this.currentSort) {
        filteredData = this._applySortingToStaticData(
          filteredData,
          this.currentSort
        );
      }

      this.total = filteredData.length;

      // Apply pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.tableData = filteredData.slice(startIndex, endIndex);

      this.loading = false;
    }
  }

  private _applyFiltersToStaticData(data: any[], filters: any): any[] {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        const itemValue = this.getNestedValue(item, key);

        if (
          filterValue === null ||
          filterValue === undefined ||
          filterValue === ''
        ) {
          return true;
        }

        if (typeof filterValue === 'string') {
          return itemValue
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }

        return itemValue === filterValue;
      });
    });
  }

  private _applySortingToStaticData(data: any[], sortString: string): any[] {
    if (!sortString) return data;

    const [field, direction] = sortString.split(' ');
    return [...data].sort((a, b) => {
      const aValue = this.getNestedValue(a, field);
      const bValue = this.getNestedValue(b, field);

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  // MARK: Table width and responsive methods
  getTableScrollX(): { x?: string | null; y?: string | null } {
    if (!this.option?.columns) {
      return { x: null, y: null };
    }

    // Calculate total width from columns that have width specified
    let totalWidth = 0;
    let hasFixedWidths = false;

    this.option.columns.forEach((column) => {
      if (column.width) {
        hasFixedWidths = true;
        // Extract numeric value from width (e.g., "120px" -> 120)
        const numericWidth = parseInt(column.width.replace(/\D/g, ''), 10);
        totalWidth += numericWidth || 100; // Default to 100px if can't parse
      } else {
        totalWidth += 150; // Default width for columns without specified width
      }
    });

    // Add width for actions column if exists
    if (this.option?.actions && this.option.actions.length > 0) {
      totalWidth += 120;
    }

    // Only return scroll config if the table width exceeds a reasonable threshold
    // This helps prevent unnecessary measurement rows
    const calculatedWidth = Math.max(totalWidth, 800);

    // Only enable horizontal scroll if we have fixed widths or many columns
    if (hasFixedWidths || this.option.columns.length > 4) {
      return { x: `${calculatedWidth}px`, y: null };
    }

    // Return minimal scroll config to prevent measurement row creation
    return { x: null, y: null };
  }

  // Alternative method for scenarios where scroll measurement causes issues
  shouldEnableScroll(): boolean {
    if (!this.option?.columns) return false;

    // Enable scroll only if we have fixed columns or specific width requirements
    return (
      this.option.columns.some((col) => col.fixed || col.width) ||
      this.option.columns.length > 5
    );
  }

  // TrackBy functions for performance optimization
  trackByColumn(index: number, column: TableColumn): any {
    return column.name || index;
  }

  trackByData(index: number, data: any): any {
    return data.id || index;
  }

  // MARK: PERMISSIONS
  // Method to check if a column should be visible based on permissions
  isColumnVisible(column: TableColumn): boolean {
    if (column.permission) {
      // You can implement permission checking logic here
      // For now, return true (show all columns)
      return true;
    }
    return true;
  }

  // Method to check if an action should be visible based on permissions and visibility function
  isActionVisible(action: TableAction, row: any): boolean {
    // Check permission first
    if (action.permission) {
      // You can implement permission checking logic here
      // For now, return true (show all actions)
    }

    // Check visibility function
    if (action.visible) {
      return action.visible(row);
    }

    return true;
  }
}
