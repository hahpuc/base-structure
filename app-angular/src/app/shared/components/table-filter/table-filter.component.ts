import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';

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
export class TableFilterComponent implements OnInit, OnChanges {
  @Input() filters: TableFilter[] = [];
  @Input() initialFilterValues: FilterValues = {};
  @Output() filterChange = new EventEmitter<FilterValues>();
  @Output() clearFilter = new EventEmitter<void>();

  filterForm: FormGroup;
  filterOptions: FilterOptions = {};
  isLoadingOptions: LoadingStates = {};
  isLoading = false;

  searchText = '';
  activeFilters: ActiveFilter[] = [];

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

    setTimeout(() => {
      this.setInitialValuesAfterOptionsLoad();
      this.updateActiveFilters();
      if (this.hasInitialValues() || this.searchText.trim()) {
        // Also check if searchText has value
        this.onFilter();
      }
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialFilterValues'] && !changes['initialFilterValues'].firstChange) {
      this.updateFormWithInitialValues();
      this.initializeSearchText(); // Also update search text when initial values change
      this.updateActiveFilters();
    }
  }

  // MARK: Init & Load Data
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
    // Initialize search text from initialFilterValues if 'filter' parameter exists
    const filterValue = this.initialFilterValues?.['filter'];
    if (filterValue && typeof filterValue === 'string') {
      this.searchText = filterValue;
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  private setupFormChanges() {
    // Setup parent-child relationships for dependent filters
    this.filters.forEach(filter => {
      if (filter.parent) {
        const parentControl = this.filterForm.get(filter.parent.filterName);
        const childControl = this.filterForm.get(filter.name);

        if (parentControl && childControl) {
          parentControl.valueChanges.subscribe(parentValue => {
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

    // Auto-submit form on changes with debounce
    this.filterForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
      this.updateActiveFilters();
      this.onFilter();
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
      (filter.options({}) as Observable<SelectOption[]>).subscribe({
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

      (filter.options(params) as Observable<SelectOption[]>).subscribe({
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

    // Include search text if available
    if (this.searchText?.trim()) {
      filterParams['filter'] = this.searchText.trim();
    }

    Object.keys(formValue).forEach(key => {
      if (formValue[key] !== null && formValue[key] !== undefined && formValue[key] !== '') {
        filterParams[key] = formValue[key];
      }
    });

    this.filterChange.emit(filterParams);
  }

  onClear() {
    this.filterForm.reset();
    this.searchText = '';
    this.activeFilters = [];

    // Emit empty filter object to clear all filter parameters from URL
    this.filterChange.emit({});
    this.clearFilter.emit();
  }

  onSearchTextChange() {
    // Debounce search text changes
    setTimeout(() => {
      this.updateActiveFilters();
      this.onFilter();
    }, 300);
  }

  clearSearchText() {
    this.searchText = '';
    this.updateActiveFilters();
    this.onFilter();
  }

  updateActiveFilters() {
    this.activeFilters = [];
    const formValue = this.filterForm.value;

    // Add search text to active filters if present
    if (this.searchText?.trim()) {
      this.activeFilters.push({
        filter: {
          name: 'filter',
          label: 'Search',
          type: 'text',
        } as TableFilter,
        value: this.searchText,
        displayValue: this.searchText,
      });
    }

    // Add form filters to active filters
    this.filters.forEach(filter => {
      const value = formValue[filter.name];
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
      this.clearSearchText();
    } else {
      const control = this.filterForm.get(filterToRemove.filter.name);
      if (control) {
        control.setValue(null);
      }
    }
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
