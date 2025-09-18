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
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { Observable, Subject, takeUntil } from "rxjs";

import { ListPaginate } from "@/app/shared/types/base";
import { CommonModule } from "@angular/common";
import { TableDataService } from "./services/table-data.service";
import { TablePermissionService } from "./services/table-permission.service";
import { getNestedValue, setNestedValue, truncateText } from "./table-utils";
import {
  CheckedIdMap,
  FilterParams,
  TableAction,
  TableActionColor,
  TableColumn,
  TableOption,
  TableQueryParams,
  TableRowData,
} from "./table.model";

import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { TableFilterComponent } from "../table-filter/table-filter.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzSwitchModule,
    NzTagModule,
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzCheckboxModule,
    TableFilterComponent,
  ],
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
  currentSort = "";

  // Column widths for resizing
  columnWidths: { [key: string]: string } = {};

  // Subscription management
  private destroy$ = new Subject<void>();
  private isInitialized = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private tableDataService: TableDataService<T>,
    private tablePermissionService: TablePermissionService<T>
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
    if (
      changes["option"] &&
      !changes["option"].firstChange &&
      this.isInitialized
    ) {
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
    const pageParam = this.getQueryParam("page");
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (page > 0) {
        this.currentPage = page;
      }
    }

    const limitParam = this.getQueryParam("limit");
    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (limit > 0 && this.pageSizeOptions.includes(limit)) {
        this.pageSize = limit;
      }
    }

    // Get sorting parameter
    const sortingParam = this.getQueryParam("sorting");
    if (sortingParam) {
      this.currentSort = sortingParam;
    }

    // Get filter parameters
    const filters: FilterParams = {};

    // Handle search text parameter (filter)
    const searchTextParam = this.getQueryParam("filter");
    if (searchTextParam !== null && searchTextParam !== "") {
      filters["filter"] = searchTextParam;
    }

    if (this.option.filters) {
      this.option.filters.forEach((filter) => {
        const filterValue = this.getQueryParam(filter.name);
        if (filterValue !== null && filterValue !== "") {
          let convertedValue: string | number | boolean = filterValue;

          // Convert to proper type based on filter type and options
          if (filter.type === "select" && Array.isArray(filter.options)) {
            // Find matching option to get the correct type
            const matchingOption = filter.options.find(
              (option) => String(option.value) === String(filterValue)
            );
            if (matchingOption) {
              convertedValue = matchingOption.value as
                | string
                | number
                | boolean;
            }
          } else if (filter.type === "number") {
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
      this.option.columns.forEach((column) => {
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

    const result = this.tableDataService.loadData(this.option, params);

    if (
      result &&
      typeof (result as Observable<ListPaginate<T>>).subscribe === "function"
    ) {
      // Dynamic data (Observable)
      (result as Observable<ListPaginate<T>>)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.tableData = response.data;
            this.total = response.total_records;
            this.loading = false;

            this.updateSelection();
            this.cdr.detectChanges();
          },
          error: () => {
            this.loading = false;
            this.cdr.detectChanges();
          },
        });
    } else if (result) {
      // Static data (ListPaginate<T>)
      const response = result as ListPaginate<T>;
      this.tableData = response.data;
      this.total = response.total_records;
      this.loading = false;

      this.updateSelection();
      this.cdr.detectChanges();
    }
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
    let newSort = "";

    if (this.currentSort === `${columnName} asc`) {
      newSort = `${columnName} desc`;
    } else if (this.currentSort === `${columnName} desc`) {
      newSort = "";
    } else {
      newSort = `${columnName} asc`;
    }

    this.currentSort = newSort;
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadData();
  }

  getSortDirection(column: TableColumn<T>): "ascend" | "descend" | null {
    if (!column.sortable || !this.currentSort) return null;

    const columnName = column.name;
    if (this.currentSort === `${columnName} asc`) {
      return "ascend";
    } else if (this.currentSort === `${columnName} desc`) {
      return "descend";
    }
    return null;
  }

  getSortFn(column: TableColumn<T>) {
    if (!column.sortable) return null;
    return (a: T, b: T) => {
      const aValue = getNestedValue(a, column.name);
      const bValue = getNestedValue(b, column.name);
      const aStr = String(aValue ?? "");
      const bStr = String(bValue ?? "");
      if (aStr < bStr) return -1;
      if (aStr > bStr) return 1;
      return 0;
    };
  }

  onSortChange(column: TableColumn<T>, sortOrder: string | null) {
    if (!column.sortable) return;

    const columnName = column.name;
    let newSort = "";

    if (sortOrder === "ascend") {
      newSort = `${columnName} asc`;
    } else if (sortOrder === "descend") {
      newSort = `${columnName} desc`;
    } else {
      newSort = "";
    }

    this.currentSort = newSort;
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadData();
  }

  onAllChecked(checked: boolean) {
    this.tableData.forEach((item) => {
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

  // MARK: PERMISSIONS (delegated to TablePermissionService)
  private async initializePermissionCache() {
    await this.tablePermissionService.initializePermissionCache(
      this.option?.columns,
      this.option?.actions
    );
    this.cdr.detectChanges();
  }

  async isColumnVisible(column: TableColumn<T>): Promise<boolean> {
    return this.tablePermissionService.isColumnVisible(column);
  }

  async isActionVisible(action: TableAction<T>, row: T): Promise<boolean> {
    return this.tablePermissionService.isActionVisible(action, row);
  }

  isColumnVisibleSync(column: TableColumn<T>): boolean {
    return this.tablePermissionService.isColumnVisibleSync(column);
  }

  isActionVisibleSync(action: TableAction<T>, row: T): boolean {
    return this.tablePermissionService.isActionVisibleSync(action, row);
  }

  // MARK: Table configuration and display methods
  getTableScroll(): { x?: string | null; y?: string | null } {
    const scroll: { x?: string | null; y?: string | null } = {};

    if (this.option.resizable) {
      scroll.x = "100%";
    }

    if (this.option.fixHeader !== false) {
      // Default is false now
      scroll.y = "400px";
    }

    return scroll;
  }

  getScrollX(): string | null {
    return this.option.resizable ? "100%" : null;
  }

  getScrollY(): string | null {
    return this.option.fixHeader !== false ? "400px" : null; // Default is false
  }

  getFixedLeft(): boolean {
    return this.option.fixHeader !== false; // Default is false
  }

  isExpandable(): boolean {
    return this.option.expandable === true;
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly T[]): void {
    // Handle current page data change if needed
  }

  hasExpandableRows(): boolean {
    return (
      this.isExpandable() &&
      this.tableData.some((row: any) => row["expand"] !== undefined)
    );
  }

  getVisibleColumns(): TableColumn<T>[] {
    return this.option.columns.filter((column) =>
      this.isColumnVisibleSync(column)
    );
  }

  getColumnWidth(column: TableColumn<T>): string {
    return this.columnWidths[column.name] || column.width || "auto";
  }

  getColumnAlign(column: TableColumn<T>): string {
    return column.align || "left";
  }

  hasActions(): boolean {
    return !!(this.option.actions && this.option.actions.length > 0);
  }

  getRowKey(row: T): string {
    return String(row.id);
  }

  getExpandContent(row: T): string {
    return `<div>${JSON.stringify(row, null, 2)}</div>`;
  }

  getTotalColumnsCount(): number {
    let count = this.getVisibleColumns().length;
    if (this.isExpandable()) count++;
    if (this.option.selectable) count++;
    if (this.hasActions()) count++;
    return count;
  }

  getCellValue(row: T, column: TableColumn<T>): any {
    return getNestedValue(row as Record<string, unknown>, column.name);
  }

  getCellClass(column: TableColumn<T>, row: T): string {
    let classes = "";
    if (column.click) {
      classes += "cursor-pointer ";
    }
    if (this.isColumnDisabled(column, row)) {
      classes += "text-gray-400 ";
    }
    return classes.trim();
  }

  onCellClick(column: TableColumn<T>, row: T): void {
    if (column.click && !this.isColumnDisabled(column, row)) {
      column.click(row);
    }
  }

  isColumnDisabled(column: TableColumn<T>, row: T): boolean {
    return column.disable ? column.disable(row) : false;
  }

  // MARK: Formatting methods
  formatNumber(value: any): string {
    if (value === null || value === undefined) return "";
    return Number(value).toLocaleString();
  }

  formatDate(value: any): string {
    if (!value) return "";
    return new Date(value).toLocaleDateString();
  }

  formatDateTime(value: any): string {
    if (!value) return "";
    return new Date(value).toLocaleString();
  }

  formatTime(value: any): string {
    if (!value) return "";
    return new Date(value).toLocaleTimeString();
  }

  formatPercent(value: any): string {
    if (value === null || value === undefined) return "";
    return (Number(value) * 100).toFixed(2) + "%";
  }

  truncateText(text: any, length: number): string {
    return truncateText(String(text || ""), length);
  }

  // MARK: Switch and button handlers
  onSwitchChange(column: TableColumn<T>, row: T, value: boolean): void {
    if (column.click) {
      // Update the row data
      setNestedValue(row as Record<string, unknown>, column.name, value);
      column.click(row);
    }
  }

  onButtonClick(column: TableColumn<T>, row: T): void {
    if (column.click) {
      column.click(row);
    }
  }

  // MARK: Actions methods
  getVisibleActions(row: T): TableAction<T>[] {
    if (!this.option.actions) return [];
    return this.option.actions.filter((action) =>
      this.isActionVisibleSync(action, row)
    );
  }

  onActionClick(action: TableAction<T>, row: T): void {
    if (action.handler) {
      action.handler(row);
    }
  }

  getActionColor(color?: TableActionColor): string {
    switch (color) {
      case "danger":
        return "#ff4d4f";
      case "success":
        return "#52c41a";
      case "warning":
        return "#faad14";
      case "secondary":
        return "#8c8c8c";
      case "primary":
      default:
        return "#1890ff";
    }
  }
}
