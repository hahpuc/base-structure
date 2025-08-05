import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { TableFilter, SelectOption } from '../table/table.modle';

@Component({
  standalone: false,
  selector: 'ft-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit {
  @Input() filters: TableFilter[] = [];
  @Output() filterChange = new EventEmitter<any>();
  @Output() clearFilter = new EventEmitter<void>();

  filterForm: FormGroup;
  filterOptions: { [key: string]: SelectOption[] } = {};
  isLoadingOptions: { [key: string]: boolean } = {};
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({});
  }

  ngOnInit() {
    this.initializeForm();
    this.loadFilterOptions();
    this.setupFormChanges();
  }

  private initializeForm() {
    const formControls: { [key: string]: any } = {};

    this.filters.forEach((filter) => {
      formControls[filter.name] = [null];
      this.isLoadingOptions[filter.name] = false;
      this.filterOptions[filter.name] = [];
    });

    this.filterForm = this.fb.group(formControls);
  }

  private setupFormChanges() {
    // Setup parent-child relationships for dependent filters
    this.filters.forEach((filter) => {
      if (filter.parent) {
        const parentControl = this.filterForm.get(filter.parent.filterName);
        const childControl = this.filterForm.get(filter.name);

        if (parentControl && childControl) {
          parentControl.valueChanges.subscribe((parentValue) => {
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
    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.onFilter();
      });
  }

  private loadFilterOptions() {
    this.filters.forEach((filter) => {
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
        next: (options) => {
          this.filterOptions[filter.name] = options;
          this.isLoadingOptions[filter.name] = false;
        },
        error: () => {
          this.isLoadingOptions[filter.name] = false;
        },
      });
    }
  }

  private loadDependentOptions(filter: TableFilter, parentValue: any) {
    if (
      filter.type === 'select' &&
      filter.options &&
      typeof filter.options === 'function'
    ) {
      this.isLoadingOptions[filter.name] = true;
      const params = { [filter.parent!.filterName]: parentValue };

      (filter.options(params) as Observable<SelectOption[]>).subscribe({
        next: (options) => {
          this.filterOptions[filter.name] = options;
          this.isLoadingOptions[filter.name] = false;
        },
        error: () => {
          this.isLoadingOptions[filter.name] = false;
        },
      });
    }
  }

  onFilter() {
    const formValue = this.filterForm.value;
    const filterParams: any = {};

    Object.keys(formValue).forEach((key) => {
      if (
        formValue[key] !== null &&
        formValue[key] !== undefined &&
        formValue[key] !== ''
      ) {
        filterParams[key] = formValue[key];
      }
    });

    this.filterChange.emit(filterParams);
  }

  onClear() {
    this.filterForm.reset();

    // Emit empty filter object to clear all filter parameters from URL
    this.filterChange.emit({});
    this.clearFilter.emit();
  }
}
