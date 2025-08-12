import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

import { PermissionService } from '../../services/permission.service';
import { ListPaginate } from '../../types/base';

import {
  CheckedIdMap,
  FilterParams,
  TableAction,
  TableActionColor,
  TableColumn,
  TableOption,
  TableQueryParams,
  TableRowData,
} from './table.model';

@Component({
  standalone: false,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends TableRowData = TableRowData>
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() option!: TableOption<T>;

  tableData: T[] = [];
  loading = false;
  total = 0;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [10, 20, 50, 100];

  // Selection
  allChecked = false;
  indeterminate = false;
  mapOfCheckedId: CheckedIdMap = {};

  // Current filters and sorting
  currentFilters: FilterParams = {};
  currentSort = '';

  // Column widths for resizing
  columnWidths: { [key: string]: string } = {};

  // Subscription management
  private destroy$ = new Subject<void>();
  private isInitialized = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private permissionService: PermissionService
  ) {}

  protected getQueryParam(param: string): string | null {
    return this.activatedRoute.snapshot.queryParamMap.get(param);
  }

  // MARK: Initialization
  ngOnInit() {
    if (this.option) {
      this.pageSize = this.option.pageSize || 10;
      this.pageSizeOptions = this.option.pageSizeOptions || [10, 20, 50, 100];
    }
  }

  ngAfterViewInit() {
    this.initializeFromQueryParams();
    this.initializePermissionCache(); // Initialize permission cache
    this.isInitialized = true;
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['option'] && !changes['option'].firstChange && this.isInitialized) {
      this.initializeTable();
      this.initializePermissionCache(); // Reinitialize permission cache when options change
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
    const filters: FilterParams = {};

    // Handle search text parameter (filter)
    const searchTextParam = this.getQueryParam('filter');
    if (searchTextParam !== null && searchTextParam !== '') {
      filters['filter'] = searchTextParam;
    }

    if (this.option.filters) {
      this.option.filters.forEach(filter => {
        const filterValue = this.getQueryParam(filter.name);
        if (filterValue !== null && filterValue !== '') {
          let convertedValue: string | number | boolean = filterValue;

          // Convert to proper type based on filter type and options
          if (filter.type === 'select' && Array.isArray(filter.options)) {
            // Find matching option to get the correct type
            const matchingOption = filter.options.find(
              option => String(option.value) === String(filterValue)
            );
            if (matchingOption) {
              convertedValue = matchingOption.value as string | number | boolean;
            }
          } else if (filter.type === 'number') {
            const numValue = Number(filterValue);
            if (!isNaN(numValue)) {
              convertedValue = numValue;
            }
          }

          filters[filter.name] = convertedValue;
        }
      });
    }
    this.currentFilters = filters;

    this.initializeColumnWidths();
    this.loadData();
  }

  private initializeTable() {
    if (this.option) {
      this.pageSize = this.option.pageSize || 10;
      this.pageSizeOptions = this.option.pageSizeOptions || [10, 20, 50, 100];

      this.initializeColumnWidths();

      this.loadData();
    }
  }

  private initializeColumnWidths() {
    if (this.option?.columns) {
      this.option.columns.forEach(column => {
        if (column.width && !this.columnWidths[column.name]) {
          this.columnWidths[column.name] = column.width;
        }
      });
    }
  }

  // MARK: Data loading
  loadData() {
    if (!this.option.data) return;

    this.loading = true;
    this.cdr.detectChanges();

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
    (this.option.data(params) as Observable<ListPaginate<T>>)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.tableData = response.data;
          this.total = response.total_records;
          this.loading = false;
          this.updateSelection();
          // Trigger change detection to recalculate action column width
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.cdr.detectChanges();
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
  onFilterChange(filters: FilterParams) {
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

  private updateQueryParams() {
    const queryParams: TableQueryParams = {
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
  onSort(column: TableColumn<T>) {
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

  getSortDirection(column: TableColumn<T>): 'ascend' | 'descend' | null {
    if (!column.sortable || !this.currentSort) return null;

    const columnName = column.name;
    if (this.currentSort === `${columnName} asc`) {
      return 'ascend';
    } else if (this.currentSort === `${columnName} desc`) {
      return 'descend';
    }
    return null;
  }

  getSortFn(column: TableColumn<T>) {
    if (!column.sortable) return null;

    return (a: T, b: T) => {
      const aValue = this.getNestedValue(a, column.name);
      const bValue = this.getNestedValue(b, column.name);

      // Handle comparison of unknown types safely
      const aStr = String(aValue ?? '');
      const bStr = String(bValue ?? '');

      if (aStr < bStr) return -1;
      if (aStr > bStr) return 1;
      return 0;
    };
  }

  onSortChange(column: TableColumn<T>, sortOrder: string | null) {
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

  onAllChecked(checked: boolean) {
    this.tableData.forEach(item => {
      this.mapOfCheckedId[item.id] = checked;
    });
    this.updateSelection();
    this.cdr.detectChanges();
  }

  onItemChecked(id: string, checked: boolean) {
    this.mapOfCheckedId[id] = checked;
    this.updateSelection();
    this.cdr.detectChanges();
  }

  private updateSelection() {
    const checkedCount = this.tableData.filter(item => this.mapOfCheckedId[item.id]).length;
    this.allChecked = checkedCount === this.tableData.length;
    this.indeterminate = checkedCount > 0 && checkedCount < this.tableData.length;
  }

  getSelectedItems() {
    return this.tableData.filter(item => this.mapOfCheckedId[item.id]);
  }

  // MARK: Column methods
  getVisibleColumns(): TableColumn<T>[] {
    if (!this.option?.columns) return [];

    return this.option.columns.filter(column => {
      return this.isColumnVisibleSync(column);
    });
  }

  getColumnType(column: TableColumn<T>): string {
    if (column.customRender) {
      return 'custom-render';
    }
    // Check if column.type is a TemplateRef
    if (column.type && typeof column.type === 'object' && 'createEmbeddedView' in column.type) {
      return 'template';
    }
    return (column.type as string) || 'text';
  }

  getColumnTemplate(
    column: TableColumn<T>
  ): TemplateRef<{ $implicit: T; column: TableColumn<T> }> | null {
    if (column.type && typeof column.type === 'object' && 'createEmbeddedView' in column.type) {
      return column.type as TemplateRef<{ $implicit: T; column: TableColumn<T> }>;
    }
    return null;
  }

  getColumnValue(row: T, column: TableColumn<T>): unknown {
    const value = this.getNestedValue(row, column.name);

    if ((column.type === 'status' || column.type === 'switch') && typeof value === 'number') {
      return value === 1;
    }

    return value;
  }

  getDateValue(row: T, column: TableColumn<T>): Date | string | number | null | undefined {
    const value = this.getNestedValue(row, column.name);

    if (value === null || value === undefined) {
      return value;
    }

    if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
      return value;
    }

    return String(value);
  }

  getNumberValue(row: T, column: TableColumn<T>): number | null | undefined {
    const value = this.getNestedValue(row, column.name);

    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === 'number') {
      return value;
    }

    const numValue = Number(value);
    return isNaN(numValue) ? 0 : numValue;
  }

  getStringValue(row: T, column: TableColumn<T>): string {
    const value = this.getNestedValue(row, column.name);
    return String(value ?? '');
  }

  getCustomRender(row: T, column: TableColumn<T>): string {
    if (column.customRender) {
      return column.customRender(row);
    }
    return String(this.getColumnValue(row, column) ?? '');
  }

  isColumnDisabled(row: T, column: TableColumn<T>): boolean {
    if (column.disable) {
      return column.disable(row);
    }
    return false;
  }

  onColumnClick(row: T, column: TableColumn<T>) {
    if (column.click && !this.isColumnDisabled(row, column)) {
      column.click(row);
    }
  }

  onStatusChange(row: T, column: TableColumn<T>, newValue: boolean) {
    this.setNestedValue(row, column.name, newValue ? 1 : 0);

    if (column.click) {
      column.click(row);
    }
  }

  // MARK: Action methods
  getVisibleActions(row: T): TableAction<T>[] {
    if (!this.option.actions) return [];

    return this.option.actions.filter(action => {
      return this.isActionVisibleSync(action, row);
    });
  }

  onActionClick(row: T, action: TableAction<T>) {
    if (action.handler) {
      action.handler(row);
    }
  }

  getActionButtonClasses(action: TableAction<T>): string {
    const baseClasses =
      'table-btn-action w-[36px] h-[36px] rounded-[36px] flex items-center justify-center transition-colors duration-200';

    switch (action.color) {
      case 'primary':
        return `${baseClasses} bg-blue-50 text-blue-600 hover:bg-blue-200`;
      case 'danger':
        return `${baseClasses} bg-red-50 text-red-600 hover:bg-red-200`;
      case 'success':
        return `${baseClasses} bg-green-50 text-green-600 hover:bg-green-200`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 text-yellow-600 hover:bg-yellow-200`;
      case 'secondary':
        return `${baseClasses} bg-gray-50 text-gray-600 hover:bg-gray-200`;
      default:
        return `${baseClasses} bg-blue-50 text-blue-600 hover:bg-blue-200`;
    }
  }

  getActionIconClasses(action: TableAction<T>): string {
    const baseClasses = 'text-sm font-medium transition-colors duration-200';

    switch (action.color) {
      case 'primary':
        return `${baseClasses} text-blue-600`;
      case 'danger':
        return `${baseClasses} text-red-600`;
      case 'success':
        return `${baseClasses} text-green-600`;
      case 'warning':
        return `${baseClasses} text-yellow-600`;
      case 'secondary':
        return `${baseClasses} text-gray-600`;
      default:
        return `${baseClasses} text-blue-600`;
    }
  }

  getActionType(color?: TableActionColor): 'primary' | 'default' | 'dashed' | 'link' | 'text' {
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
  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce((current: unknown, prop: string) => {
      if (current && typeof current === 'object' && prop in current) {
        return (current as Record<string, unknown>)[prop];
      }
      return undefined;
    }, obj);
  }

  private setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
    const keys = path.split('.');
    const lastKey = keys.pop();

    if (!lastKey) return;

    const target = keys.reduce((current, key) => {
      return (current as Record<string, unknown>)[key] as Record<string, unknown>;
    }, obj);
    target[lastKey] = value;
  }

  truncateText(text: string, length: number): string {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  trackByColumn(index: number, column: TableColumn<T>): string | number {
    return column.name || index;
  }

  trackByData(index: number, data: T): string | number {
    return data.id || index;
  }

  // MARK: Static Data Utils
  private _loadStaticData() {
    if (Array.isArray(this.option.data)) {
      // Static data - apply client-side pagination
      let filteredData = [...this.option.data];

      // Apply filters for static data if needed
      if (Object.keys(this.currentFilters).length > 0) {
        filteredData = this._applyFiltersToStaticData(filteredData, this.currentFilters);
      }

      // Apply sorting for static data if needed
      if (this.currentSort) {
        filteredData = this._applySortingToStaticData(filteredData, this.currentSort);
      }

      this.total = filteredData.length;

      // Apply pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.tableData = filteredData.slice(startIndex, endIndex);

      this.loading = false;
      this.updateSelection();
      // Trigger change detection to recalculate action column width
      this.cdr.detectChanges();
    }
  }

  private _applyFiltersToStaticData(data: T[], filters: FilterParams): T[] {
    return data.filter(item => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key];
        const itemValue = this.getNestedValue(item, key);

        if (filterValue === null || filterValue === undefined || filterValue === '') {
          return true;
        }

        if (typeof filterValue === 'string') {
          return String(itemValue ?? '')
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }

        return itemValue === filterValue;
      });
    });
  }

  private _applySortingToStaticData(data: T[], sortString: string): T[] {
    if (!sortString) return data;

    const [field, direction] = sortString.split(' ');
    return [...data].sort((a, b) => {
      const aValue = this.getNestedValue(a, field);
      const bValue = this.getNestedValue(b, field);

      // Convert to strings for safe comparison
      const aStr = String(aValue ?? '');
      const bStr = String(bValue ?? '');

      if (direction === 'asc') {
        return aStr > bStr ? 1 : -1;
      } else {
        return aStr < bStr ? 1 : -1;
      }
    });
  }

  // MARK: Width & Scroll
  getTableScrollX(): { x?: string | null; y?: string | null } {
    if (!this.option?.columns) {
      return { x: null, y: null };
    }

    // Calculate total width from columns that have width specified
    let totalWidth = 0;

    this.option.columns.forEach(column => {
      if (column.width) {
        // Extract numeric value from width (e.g., "120px" -> 120)
        const numericWidth = parseInt(column.width.replace(/\D/g, ''), 10);
        totalWidth += numericWidth || 100; // Default to 100px if can't parse
      } else {
        // Use smarter default widths based on column type and name
        totalWidth += this.getDefaultColumnWidth(column);
      }
    });

    // Add width for actions column if exists - use dynamic width calculation
    if (this.option?.actions && this.option.actions.length > 0) {
      const actionColumnWidth = parseInt(this.getActionColumnWidth().replace(/\D/g, ''), 10);
      totalWidth += actionColumnWidth || 150;
    }

    // Always set a scroll width to prevent column stretching
    // This ensures columns maintain their intended widths
    const calculatedWidth = Math.max(totalWidth, 800);
    return { x: `${calculatedWidth}px`, y: null };
  }

  // Helper method to determine default column width based on type and content
  private getDefaultColumnWidth(column: TableColumn<T>): number {
    // Default widths based on column type and common patterns
    if (column.name === 'id' || column.name === '' || column.title?.toLowerCase() === 'id') {
      return 80; // ID columns are typically narrow
    }

    if (column.type === 'status' || column.type === 'switch' || column.type === 'boolean') {
      return 100; // Status/switch columns
    }

    if (column.type === 'date' || column.type === 'datetime') {
      return 150; // Date columns
    }

    if (column.type === 'time') {
      return 100; // Time columns
    }

    if (column.type === 'number' || column.type === 'percent') {
      return 120; // Number columns
    }

    if (column.type === 'image') {
      return 80; // Image columns
    }

    if (column.type === 'button') {
      return 120; // Button columns
    }

    // For text columns, consider the title length for a better estimate
    const titleLength = column.title?.length || 0;
    if (titleLength > 15) {
      return 200; // Longer titles likely need more space
    } else if (titleLength > 10) {
      return 150;
    } else {
      return 120; // Standard text column width
    }
  }

  // Alternative method for scenarios where scroll measurement causes issues
  shouldEnableScroll(): boolean {
    if (!this.option?.columns) return false;

    // Enable scroll only if we have fixed columns or specific width requirements
    return (
      this.option.columns.some(col => col.fixed || col.width) || this.option.columns.length > 5
    );
  }

  // MARK: PERMISSIONS
  // Method to check if a column should be visible based on permissions
  async isColumnVisible(column: TableColumn<T>): Promise<boolean> {
    if (column.permission) {
      return await this.permissionService.checkPermissions([column.permission]);
    }
    return true;
  }

  // Method to check if an action should be visible based on permissions and visibility function
  async isActionVisible(action: TableAction<T>, row: T): Promise<boolean> {
    // Check permission first
    if (action.permission) {
      const hasPermission = await this.permissionService.checkPermissions([action.permission]);
      if (!hasPermission) {
        return false;
      }
    }

    // Check visibility function
    if (action.visible) {
      return action.visible(row);
    }

    return true;
  }

  // Synchronous version for template usage - caches permission results
  private columnPermissionCache: { [key: string]: boolean } = {};
  private actionPermissionCache: { [key: string]: boolean } = {};

  // Initialize permission cache on component init
  private async initializePermissionCache() {
    // Cache column permissions
    if (this.option?.columns) {
      for (const column of this.option.columns) {
        if (column.permission) {
          this.columnPermissionCache[column.permission] =
            await this.permissionService.checkPermissions([column.permission]);
        }
      }
    }

    // Cache action permissions
    if (this.option?.actions) {
      for (const action of this.option.actions) {
        if (action.permission) {
          this.actionPermissionCache[action.permission] =
            await this.permissionService.checkPermissions([action.permission]);
        }
      }
    }

    // Trigger change detection to recalculate action column width after permissions are loaded
    this.cdr.detectChanges();
  }

  // Synchronous methods for template usage
  isColumnVisibleSync(column: TableColumn<T>): boolean {
    if (column.permission) {
      return this.columnPermissionCache[column.permission] ?? false;
    }
    return true;
  }

  isActionVisibleSync(action: TableAction<T>, row: T): boolean {
    // Check permission first
    if (action.permission) {
      const hasPermission = this.actionPermissionCache[action.permission] ?? false;
      if (!hasPermission) {
        return false;
      }
    }

    // Check visibility function
    if (action.visible) {
      return action.visible(row);
    }

    return true;
  }

  // MARK: COLUMN RESIZING
  onColumnResize(column: TableColumn<T>, width: number): void {
    if (!this.option?.resizable) return;

    const newWidth = `${width}px`;
    this.columnWidths[column.name] = newWidth;

    if (this.option?.columns) {
      const columnIndex = this.option.columns.findIndex(col => col.name === column.name);
      if (columnIndex !== -1) {
        this.option.columns[columnIndex].width = newWidth;
      }
    }
  }

  getColumnWidth(column: TableColumn<T>): string {
    if (this.columnWidths[column.name]) {
      return this.columnWidths[column.name];
    }

    if (column.width) {
      return column.width;
    }

    // Use the same smart default calculation as in getDefaultColumnWidth
    const defaultWidth = this.getDefaultColumnWidth(column);
    return `${defaultWidth}px`;
  }

  getColumnMinWidth(column: TableColumn<T>): number {
    if (column.minWidth) {
      return parseInt(column.minWidth.replace(/\D/g, ''), 10) || 80;
    }
    return 80;
  }

  getColumnMaxWidth(column: TableColumn<T>): number {
    if (column.maxWidth) {
      return parseInt(column.maxWidth.replace(/\D/g, ''), 10) || 800;
    }
    return 800;
  }

  isColumnResizable(column: TableColumn<T>): boolean {
    // Check if table-level resizable is enabled and column is not fixed
    if (!this.option?.resizable || column.fixed) {
      return false;
    }

    return true;
  }

  // MARK: ACTION COLUMN WIDTH CALCULATION
  getActionColumnWidth(): string {
    if (!this.option?.actions || this.option.actions.length === 0) {
      return '150px';
    }

    // Calculate width based on number of visible actions
    // Each action button is 36px wide + 8px gap between buttons (except the last one)
    // Add 16px padding (8px on each side)
    const buttonWidth = 36;
    const gapWidth = 8;
    const padding = 16;

    // Get the maximum number of visible actions for any row
    let maxVisibleActions = 0;
    if (this.tableData && this.tableData.length > 0) {
      maxVisibleActions = Math.max(
        ...this.tableData.map(row => this.getVisibleActions(row).length)
      );
    } else {
      // Fallback to total actions if no data loaded yet
      maxVisibleActions = this.option.actions.length;
    }

    if (maxVisibleActions === 0) {
      return '150px'; // Minimum width even if no visible actions
    }

    // Calculate total width: (buttons * buttonWidth) + (gaps * gapWidth) + padding
    const totalWidth =
      maxVisibleActions * buttonWidth + (maxVisibleActions - 1) * gapWidth + padding;

    // Ensure minimum width of 80px and maximum of 300px
    const finalWidth = Math.max(80, Math.min(300, totalWidth));

    return `${finalWidth}px`;
  }

  getActionColumnStyle(): { [key: string]: string } {
    const width = this.getActionColumnWidth();
    return {
      'min-width': width,
      'max-width': width,
      width: width,
    };
  }
}
