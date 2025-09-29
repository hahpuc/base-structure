import { CommonModule } from '@angular/common';
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
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  takeUntil,
  tap,
} from 'rxjs';

import { TableFilterDrawerComponent } from './drawer/table-filter-drawer.component';
import { TableFilterSearchComponent } from './search/table-filter-search.component';
import {
  ActiveFilter,
  FilterOptions,
  FilterValues,
  LoadingStates,
  PaginatedSelectOptions,
  SelectOption,
  TableFilter,
} from './table-filter.model';
import { TableFilterService } from './table-filter.service';
import { TableFilterTagsComponent } from './tags/table-filter-tags.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TableFilterDrawerComponent,
    TableFilterSearchComponent,
    TableFilterTagsComponent,
  ],
  providers: [TableFilterService],
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
    private cdr: ChangeDetectorRef,
    private filterService: TableFilterService
  ) {
    // Form will be initialized in ngOnInit
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
    const { formControls, filterOptions, isLoadingOptions } =
      this.filterService.initializeFormControls(this.filters, this.initialFilterValues);
    this.filterForm = this.fb.group(formControls);
    this.filterOptions = filterOptions;
    this.isLoadingOptions = isLoadingOptions;
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
          // Use service for async loader
          asyncLoaders.push(
            this.filterService.loadOptionsForFilterAsync(filter, this.destroy$).pipe(
              tap(options => {
                this.filterOptions[filter.name] = options;
                this.isLoadingOptions[filter.name] = false;
              })
            )
          );
          this.isLoadingOptions[filter.name] = true;
        } else if (Array.isArray(filter.options)) {
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

  private loadPaginatedOptions(
    filter: TableFilter,
    searchText = '',
    page = 1
  ): Observable<SelectOption[]> {
    return this.filterService.loadPaginatedOptions(filter, searchText, page, this.destroy$).pipe(
      tap(options => {
        // You may want to update paginatedOptions state here if needed
        this.filterOptions[filter.name] = options;
        this.isLoadingOptions[filter.name] = false;
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
    this.filterService.setupDebounce(this.searchSubject$, 500, this.destroy$, () => {
      this.drawerSearchText = this.searchText;
      this.appliedSearchText = this.searchText;
      this.updateActiveFilters();
      this.onFilter();
    });

    // Drawer search text - no auto apply, only update when Apply button is clicked
    this.filterService.setupDebounce(this.drawerSearchSubject$, 300, this.destroy$, () => {
      // No automatic updates - only when Apply is clicked
    });
  }

  private loadDependentOptions(filter: TableFilter, parentValue: unknown) {
    this.filterService.loadDependentOptions(
      filter,
      parentValue,
      this.destroy$,
      options => {
        this.filterOptions[filter.name] = options;
      },
      loading => {
        this.isLoadingOptions[filter.name] = loading;
      }
    );
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
    this.activeFilters = this.filterService.formatActiveFilters(
      this.filters,
      this.appliedFilters,
      this.appliedSearchText,
      this.filterOptions
    );
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
    return this.filterService.compareSelectValues(o1, o2);
  };

  openDrawer() {
    this.isDrawerVisible = true;
  }

  closeDrawer() {
    this.isDrawerVisible = false;
  }
}
