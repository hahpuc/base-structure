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
}
