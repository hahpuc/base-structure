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
import { Observable, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import {
  ActiveFilter,
  FilterOptions,
  FilterValues,
  LoadingStates,
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

  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();
  private drawerSearchSubject$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({});
  }

  // MARK: Life Circle
  ngOnInit() {
    this.initializeForm();
    this.initializeSearchText();
    this.loadFilterOptions();
    this.setupFormChanges();
    this.setupSearchDebounce();

    setTimeout(() => {
      this.setInitialValuesAfterOptionsLoad();
      if (this.hasInitialValues() || this.searchText.trim()) {
        this.appliedFilters = { ...this.initialFilterValues };
        this.appliedSearchText = this.searchText;
        this.drawerSearchText = this.searchText;

        this.updateActiveFilters();
        this.onFilter();
      }
    }, 200);
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
  }

  // MARK: Init & Setup
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

  // MARK: Search - Load Data
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

  private loadFilterOptions() {
    this.filters.forEach(filter => {
      if (filter.type === 'select' && filter.options && !filter.parent) {
        this.loadOptionsForFilter(filter);
      }
    });
  }

  private loadOptionsForFilter(filter: TableFilter) {
    if (Array.isArray(filter.options)) {
      this.filterOptions[filter.name] = filter.options;
    } else if (typeof filter.options === 'function') {
      this.isLoadingOptions[filter.name] = true;
      (filter.options({}) as Observable<SelectOption[]>).pipe(takeUntil(this.destroy$)).subscribe({
        next: options => {
          this.filterOptions[filter.name] = options;
          this.isLoadingOptions[filter.name] = false;
        },
        error: () => {
          this.isLoadingOptions[filter.name] = false;
        },
      });
    }
  }

  private loadDependentOptions(filter: TableFilter, parentValue: unknown) {
    if (filter.type === 'select' && filter.options && typeof filter.options === 'function') {
      this.isLoadingOptions[filter.name] = true;
      const params = filter.parent ? { [filter.parent.filterName]: parentValue } : {};

      (filter.options(params) as Observable<SelectOption[]>)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: options => {
            this.filterOptions[filter.name] = options;
            this.isLoadingOptions[filter.name] = false;
          },
          error: () => {
            this.isLoadingOptions[filter.name] = false;
          },
        });
    }
  }

  // MARK: Filter functions
  onFilter() {
    const formValue = this.filterForm.value;
    const filterParams: FilterValues = {};

    // Use drawer search text when applying filters manually (from drawer)
    // Use main search text when applying automatically (from main search)
    const searchTextToUse = this.drawerSearchText?.trim() || this.searchText?.trim();

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
    this.appliedSearchText = searchTextToUse || '';

    // Sync both search texts
    if (searchTextToUse) {
      this.searchText = searchTextToUse;
      this.drawerSearchText = searchTextToUse;
    }

    // Update active filters display based on what was actually applied
    this.updateActiveFilters();

    this.filterChange.emit(filterParams);
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
  }

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

  // MARK: Utils
  // Compare function for select values to ensure proper selection
  compareSelectValues = (o1: unknown, o2: unknown): boolean => {
    if (o1 === null || o2 === null || o1 === undefined || o2 === undefined) {
      return o1 === o2;
    }
    return o1.toString() === o2.toString();
  };
}
