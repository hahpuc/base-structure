import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  forkJoin,
  of,
  tap,
  switchMap,
  map,
} from 'rxjs';

import { BaseQuery, ListPaginate } from '../../types/base';

import {
  ActiveFilter,
  FilterOptions,
  FilterValues,
  LoadingStates,
  PaginatedSelectOptions,
  SelectOption,
  TableFilter,
} from './table-filter.model';

@Component({
  standalone: false,
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() filters: TableFilter[] = [];
  @Input() initialFilterValues: FilterValues = {};
  @Output() filterChange = new EventEmitter<FilterValues>();
  @Output() clearFilter = new EventEmitter<void>();

  filterForm: FormGroup;
  filterOptions: FilterOptions = {};
  isLoadingOptions: LoadingStates = {};
  isLoading = false;

  searchText = '';
  drawerSearchText = '';
  activeFilters: ActiveFilter[] = [];
  appliedSearchText = '';
  appliedFilters: FilterValues = {};
  isDrawerVisible = false;

  // Pagination for select options
  paginatedOptions: { [key: string]: PaginatedSelectOptions } = {};
  searchSubjects: { [key: string]: Subject<string> } = {};

  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();
  private drawerSearchSubject$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({});
  }

  // MARK: - Lifecycle Hooks
  ngOnInit() {
    this.initializeForm();
    this.initializeSearchText();
    this.setupFormChanges();
    this.setupSearchDebounce();

    // Load options and then apply initial values
    this.loadFilterOptionsAndApplyInitialValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialFilterValues'] && !changes['initialFilterValues'].firstChange) {
      this.updateFormWithInitialValues();
      this.initializeSearchText();

      this.appliedFilters = { ...this.initialFilterValues };
      this.appliedSearchText = this.searchText;
      this.drawerSearchText = this.searchText;

      this.updateActiveFilters();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject$.complete();
    this.drawerSearchSubject$.complete();
  }

  // MARK: - Initialization & Setup
  private hasInitialValues(): boolean {
    return (
      this.initialFilterValues &&
      Object.keys(this.initialFilterValues).some(
        key =>
          this.initialFilterValues[key] !== null &&
          this.initialFilterValues[key] !== undefined &&
          this.initialFilterValues[key] !== ''
      )
    );
  }

  private initializeForm() {
    const formControls: { [key: string]: unknown[] } = {};

    this.filters.forEach(filter => {
      let initialValue: unknown = this.initialFilterValues[filter.name] || null;

      // Convert string values to proper types for select filters
      if (initialValue !== null && filter.type === 'select' && Array.isArray(filter.options)) {
        // Find the matching option to get the correct type
        const matchingOption = filter.options.find(
          option => String(option.value) === String(initialValue)
        );
        if (matchingOption) {
          initialValue = matchingOption.value;
        }
      }

      formControls[filter.name] = [initialValue];
      this.isLoadingOptions[filter.name] = false;
      this.filterOptions[filter.name] = [];
    });

    this.filterForm = this.fb.group(formControls);
  }

  private updateFormWithInitialValues() {
    if (this.filterForm && this.initialFilterValues) {
      Object.keys(this.initialFilterValues).forEach(key => {
        const control = this.filterForm.get(key);
        if (control) {
          let value: unknown = this.initialFilterValues[key];

          // Convert string values to proper types for select filters
          const filter = this.filters.find(f => f.name === key);
          if (
            filter &&
            value !== null &&
            filter.type === 'select' &&
            Array.isArray(filter.options)
          ) {
            const matchingOption = filter.options.find(
              option => String(option.value) === String(value)
            );
            if (matchingOption) {
              value = matchingOption.value;
            }
          }

          control.setValue(value, { emitEvent: false });
        }
      });
    }
  }

  private setInitialValuesAfterOptionsLoad() {
    this.updateFormWithInitialValues();
  }

  private initializeSearchText() {
    const filterValue = this.initialFilterValues?.['filter'];
    if (filterValue && typeof filterValue === 'string') {
      this.searchText = filterValue;
      this.drawerSearchText = filterValue;
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  private setupFormChanges() {
    this.filters.forEach(filter => {
      if (filter.parent) {
        const parentControl = this.filterForm.get(filter.parent.filterName);
        const childControl = this.filterForm.get(filter.name);

        if (parentControl && childControl) {
          parentControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(parentValue => {
            childControl.setValue(null);
            if (parentValue) {
              this.loadDependentOptions(filter, parentValue);
            } else {
              this.filterOptions[filter.name] = [];
            }
          });
        }
      }
    });
  }

  // MARK: - Search & Loading
  private loadFilterOptionsAndApplyInitialValues() {
    // Collect all async option loading observables
    const asyncLoaders: Observable<SelectOption[]>[] = [];

    this.filters.forEach(filter => {
      if (filter.type === 'select' && filter.options && !filter.parent) {
        if (typeof filter.options === 'function') {
          // This is an async loader
          asyncLoaders.push(this.loadOptionsForFilterAsync(filter));
        } else if (Array.isArray(filter.options)) {
          // Static options, load immediately
          this.filterOptions[filter.name] = filter.options;
        }
      }
    });

    // If we have async loaders, wait for them to complete
    if (asyncLoaders.length > 0) {
      forkJoin(asyncLoaders)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.applyInitialValuesAfterOptionsLoad();
          },
          error: () => {
            // Even if some options fail to load, apply initial values
            this.applyInitialValuesAfterOptionsLoad();
          },
        });
    } else {
      // No async loaders, apply initial values immediately
      this.applyInitialValuesAfterOptionsLoad();
    }
  }

  private loadOptionsForFilterAsync(filter: TableFilter): Observable<SelectOption[]> {
    this.isLoadingOptions[filter.name] = true;

    if (typeof filter.options === 'function') {
      // Check if this filter uses pagination or getAll approach
      if (filter.usePagination) {
        // Use paginated API - expects BaseQuery parameters
        return this.loadPaginatedOptions(filter);
      } else {
        // Use getAll() API - no parameters required
        // Cast to the correct function type that takes no parameters
        const getAllFunction = filter.options as () => Observable<SelectOption[]>;
        return getAllFunction().pipe(
          takeUntil(this.destroy$),
          tap({
            next: (options: SelectOption[]) => {
              this.filterOptions[filter.name] = options;
              this.isLoadingOptions[filter.name] = false;
            },
            error: () => {
              this.isLoadingOptions[filter.name] = false;
            },
          })
        );
      }
    }

    // Fallback for static options (shouldn't happen in this context)
    return of([]);
  }

  private loadPaginatedOptions(
    filter: TableFilter,
    searchText = '',
    page = 1
  ): Observable<SelectOption[]> {
    if (typeof filter.options !== 'function') {
      return of([]);
    }

    const query: BaseQuery = {
      page,
      limit: filter.pageSize || 20,
      ...(searchText ? { filter: searchText } : {}),
    };

    // Initialize pagination state if not exists
    if (!this.paginatedOptions[filter.name]) {
      this.paginatedOptions[filter.name] = {
        options: [],
        hasMore: true,
        currentPage: 0,
        pageSize: filter.pageSize || 20,
        total: 0,
        loading: false,
        searchText: '',
      };
    }

    const paginatedState = this.paginatedOptions[filter.name];
    paginatedState.loading = true;

    return (filter.options(query) as Observable<ListPaginate<unknown>>).pipe(
      takeUntil(this.destroy$),
      map((response: ListPaginate<unknown>) => {
        // Convert paginated response to SelectOption[]
        const newOptions = response.data.map(item => {
          const record = item as Record<string, unknown>;
          return {
            label: (record['name'] || record['title'] || record['label'] || String(item)) as string,
            value: record['id'] || item,
          };
        });

        // Update pagination state
        if (page === 1) {
          // First page or new search - replace options
          paginatedState.options = newOptions;
        } else {
          // Subsequent pages - append options
          paginatedState.options = [...paginatedState.options, ...newOptions];
        }

        paginatedState.currentPage = page;
        paginatedState.total = response.total_records;
        paginatedState.hasMore = page < response.total_pages;
        paginatedState.loading = false;
        paginatedState.searchText = searchText;

        // Update filter options for the component
        this.filterOptions[filter.name] = paginatedState.options;
        this.isLoadingOptions[filter.name] = false;

        return paginatedState.options;
      }),
      tap({
        error: () => {
          paginatedState.loading = false;
          this.isLoadingOptions[filter.name] = false;
        },
      })
    );
  }

  private applyInitialValuesAfterOptionsLoad() {
    this.setInitialValuesAfterOptionsLoad();

    if (this.hasInitialValues() || this.searchText.trim()) {
      this.appliedFilters = { ...this.initialFilterValues };
      this.appliedSearchText = this.searchText;
      this.drawerSearchText = this.searchText;

      this.updateActiveFilters();
      this.onFilter();
    }
  }
  private setupSearchDebounce() {
    // Main search text - auto debounce and call API
    this.searchSubject$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        // Auto apply for main search
        this.drawerSearchText = this.searchText;
        this.appliedSearchText = this.searchText;
        this.updateActiveFilters();
        this.onFilter();
      });

    // Drawer search text - no auto apply, only update when Apply button is clicked
    this.drawerSearchSubject$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        // No automatic updates - only when Apply is clicked
      });
  }

  private loadDependentOptions(filter: TableFilter, parentValue: unknown) {
    if (filter.type === 'select' && filter.options && typeof filter.options === 'function') {
      this.isLoadingOptions[filter.name] = true;

      if (filter.usePagination) {
        // For paginated dependent filters, we need to pass the parent value through the query
        const query: BaseQuery = {
          page: 1,
          limit: filter.pageSize || 20,
          ...(filter.parent ? { [filter.parent.filterName]: parentValue } : {}),
        };

        (filter.options(query) as Observable<ListPaginate<unknown>>)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response: ListPaginate<unknown>) => {
              // Convert paginated response to SelectOption[]
              const options = response.data.map(item => {
                const record = item as Record<string, unknown>;
                return {
                  label: (record['name'] ||
                    record['title'] ||
                    record['label'] ||
                    String(item)) as string,
                  value: record['id'] || item,
                };
              });
              this.filterOptions[filter.name] = options;
              this.isLoadingOptions[filter.name] = false;
            },
            error: () => {
              this.isLoadingOptions[filter.name] = false;
            },
          });
      } else {
        // For non-paginated dependent filters, we need to handle differently
        // Since getAll() doesn't take parameters, we might need to filter client-side
        // or use a different approach for dependent filters

        // For now, call getAll() and filter client-side (not ideal for large datasets)
        const getAllFunction = filter.options as () => Observable<SelectOption[]>;
        getAllFunction()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: options => {
              // TODO: Add client-side filtering based on parentValue if needed
              this.filterOptions[filter.name] = options;
              this.isLoadingOptions[filter.name] = false;
            },
            error: () => {
              this.isLoadingOptions[filter.name] = false;
            },
          });
      }
    }
  }

  // MARK: - Filter Actions
  onFilter() {
    const formValue = this.filterForm.value;
    const filterParams: FilterValues = {};

    // When applying from drawer, use drawer search text explicitly
    // Don't fall back to main search text if drawer search is empty
    const searchTextToUse = this.drawerSearchText?.trim() || '';

    if (searchTextToUse) {
      filterParams['filter'] = searchTextToUse;
    }

    Object.keys(formValue).forEach(key => {
      if (formValue[key] !== null && formValue[key] !== undefined && formValue[key] !== '') {
        filterParams[key] = formValue[key];
      }
    });

    // Save applied filters and search text
    this.appliedFilters = { ...filterParams };
    this.appliedSearchText = searchTextToUse;

    // Sync main search text with drawer search text when applying
    this.searchText = searchTextToUse;

    // Update active filters display based on what was actually applied
    this.updateActiveFilters();

    this.filterChange.emit(filterParams);

    // Close drawer after applying filters
    this.closeDrawer();
  }

  onClear() {
    this.filterForm.reset();
    this.searchText = '';
    this.drawerSearchText = '';
    this.appliedSearchText = '';
    this.appliedFilters = {};
    this.activeFilters = [];

    // Emit empty filter object to clear all filter parameters from URL
    this.filterChange.emit({});
    this.clearFilter.emit();

    // Close drawer after clearing filters
    this.closeDrawer();
  }

  onSearchTextChange() {
    // Use the search subject for debouncing main search (auto-apply)
    this.searchSubject$.next(this.searchText);
  }

  onDrawerSearchTextChange() {
    // Use the drawer search subject for debouncing drawer search (manual apply)
    this.drawerSearchSubject$.next(this.drawerSearchText);
  }

  clearSearchText() {
    this.searchText = '';
    // Auto-apply when clearing main search
    this.drawerSearchText = '';
    this.appliedSearchText = '';
    this.updateActiveFilters();
    this.onFilter();
  }

  clearDrawerSearchText() {
    this.drawerSearchText = '';
    // Don't auto-apply when clearing drawer search - wait for Apply button
    this.cdr.detectChanges();
  }

  // MARK: - Active Filters Management
  updateActiveFilters() {
    this.activeFilters = [];

    // Add applied search text to active filters if present
    if (this.appliedSearchText?.trim()) {
      this.activeFilters.push({
        filter: {
          name: 'filter',
          label: 'Search',
          type: 'text',
        } as TableFilter,
        value: this.appliedSearchText,
        displayValue: this.appliedSearchText,
      });
    }

    // Add applied form filters to active filters
    this.filters.forEach(filter => {
      const value = this.appliedFilters[filter.name];
      if (value !== null && value !== undefined && value !== '') {
        let displayValue = value.toString();

        // For select filters, get the display label
        if (filter.type === 'select' && this.filterOptions[filter.name]) {
          const option = this.filterOptions[filter.name].find(opt =>
            this.compareSelectValues(opt.value, value)
          );
          if (option) {
            displayValue = option.label;
          }
        }

        // Format date values
        if (filter.type === 'date' && value instanceof Date) {
          displayValue = value.toLocaleDateString();
        }

        this.activeFilters.push({
          filter,
          value,
          displayValue,
        });
      }
    });
  }

  removeActiveFilter(filterToRemove: ActiveFilter) {
    if (filterToRemove.filter.name === 'filter') {
      // Clear both applied and current search texts
      this.appliedSearchText = '';
      this.searchText = '';
      this.drawerSearchText = '';
    } else {
      // Clear both applied filter and form control
      delete this.appliedFilters[filterToRemove.filter.name];
      const control = this.filterForm.get(filterToRemove.filter.name);
      if (control) {
        control.setValue(null);
      }
    }

    // Update active filters display and reapply filters
    this.updateActiveFilters();
    this.onFilter();
  }

  hasActiveFilters(): boolean {
    return this.activeFilters.length > 0;
  }

  // MARK: - Pagination Methods for Ant Design Select
  onSelectSearch(filterName: string, searchText: string): void {
    const filter = this.filters.find(f => f.name === filterName);
    if (!filter?.usePagination) {
      return;
    }

    // Debounce search
    if (!this.searchSubjects[filterName]) {
      this.searchSubjects[filterName] = new Subject<string>();
      this.searchSubjects[filterName]
        .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe(search => {
          this.loadPaginatedOptions(filter, search, 1).subscribe();
        });
    }

    this.searchSubjects[filterName].next(searchText);
  }

  onSelectScrollToBottom(filterName: string): void {
    const filter = this.filters.find(f => f.name === filterName);
    if (!filter?.usePagination) {
      return;
    }

    const paginatedState = this.paginatedOptions[filterName];
    if (!paginatedState || paginatedState.loading || !paginatedState.hasMore) {
      return;
    }

    // Load next page
    const nextPage = paginatedState.currentPage + 1;
    this.loadPaginatedOptions(filter, paginatedState.searchText || '', nextPage).subscribe();
  }

  // Check if a filter uses pagination
  isPaginatedFilter(filterName: string): boolean {
    const filter = this.filters.find(f => f.name === filterName);
    return filter?.usePagination === true;
  }

  // Get loading state for paginated filters
  isPaginatedLoading(filterName: string): boolean {
    return this.paginatedOptions[filterName]?.loading || false;
  }

  // MARK: - Utility Functions
  // Compare function for select values to ensure proper selection
  compareSelectValues = (o1: unknown, o2: unknown): boolean => {
    if (o1 === null || o2 === null || o1 === undefined || o2 === undefined) {
      return o1 === o2;
    }
    return o1.toString() === o2.toString();
  };

  openDrawer() {
    this.isDrawerVisible = true;
  }

  closeDrawer() {
    this.isDrawerVisible = false;
  }
}
