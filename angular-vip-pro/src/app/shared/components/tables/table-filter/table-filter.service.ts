import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from "rxjs/operators";

import { BaseQuery, ListPaginate } from "@/app/shared/types/base";

import {
  ActiveFilter,
  FilterOptions,
  FilterValues,
  LoadingStates,
  SelectOption,
  TableFilter,
} from "./table-filter.model";

@Injectable()
export class TableFilterService {
  constructor() {}

  initializeFormControls(
    filters: TableFilter[],
    initialFilterValues: FilterValues
  ) {
    const formControls: { [key: string]: unknown[] } = {};
    const filterOptions: FilterOptions = {};
    const isLoadingOptions: LoadingStates = {};
    filters.forEach((filter) => {
      let initialValue: unknown = initialFilterValues[filter.name] || null;
      if (
        initialValue !== null &&
        filter.type === "select" &&
        Array.isArray(filter.options)
      ) {
        const matchingOption = filter.options.find(
          (option) => String(option.value) === String(initialValue)
        );
        if (matchingOption) {
          initialValue = matchingOption.value;
        }
      }
      formControls[filter.name] = [initialValue];
      isLoadingOptions[filter.name] = false;
      filterOptions[filter.name] = [];
    });
    return { formControls, filterOptions, isLoadingOptions };
  }

  /**
   * Loads options for a filter (static or async)
   */
  loadOptionsForFilterAsync(
    filter: TableFilter,
    destroy$: Subject<void>
  ): Observable<SelectOption[]> {
    // Static options
    if (Array.isArray(filter.options)) {
      return of(filter.options);
    }
    // Async options
    if (typeof filter.options === "function") {
      if (filter.usePagination) {
        // Use paginated API - expects BaseQuery parameters
        return this.loadPaginatedOptions(filter, "", 1, destroy$);
      } else {
        // Use getAll() API - no parameters required
        const getAllFunction = filter.options as () => Observable<
          SelectOption[]
        >;
        return getAllFunction().pipe(takeUntil(destroy$));
      }
    }
    return of([]);
  }

  /**
   * Loads paginated options for a filter
   */
  loadPaginatedOptions(
    filter: TableFilter,
    searchText: string = "",
    page: number = 1,
    destroy$: Subject<void>
  ): Observable<SelectOption[]> {
    if (typeof filter.options !== "function") {
      return of([]);
    }
    const query: BaseQuery = {
      page,
      limit: filter.pageSize || 20,
      ...(searchText ? { filter: searchText } : {}),
    };
    return (filter.options(query) as Observable<ListPaginate<unknown>>).pipe(
      takeUntil(destroy$),
      map((response: ListPaginate<unknown>) => {
        return response.data.map((item) => {
          const record = item as Record<string, unknown>;
          return {
            label: (record["name"] ||
              record["title"] ||
              record["label"] ||
              String(item)) as string,
            value: record["id"] || item,
          };
        });
      })
    );
  }

  /**
   * Loads dependent options for a child filter based on parent value
   */
  loadDependentOptions(
    filter: TableFilter,
    parentValue: unknown,
    destroy$: Subject<void>,
    updateOptions: (options: SelectOption[]) => void,
    setLoading: (loading: boolean) => void
  ) {
    if (
      filter.type === "select" &&
      filter.options &&
      typeof filter.options === "function"
    ) {
      setLoading(true);
      if (filter.usePagination) {
        const query: BaseQuery = {
          page: 1,
          limit: filter.pageSize || 20,
          ...(filter.parent ? { [filter.parent.filterName]: parentValue } : {}),
        };
        (filter.options(query) as Observable<ListPaginate<unknown>>)
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: (response: ListPaginate<unknown>) => {
              const options = response.data.map((item) => {
                const record = item as Record<string, unknown>;
                return {
                  label: (record["name"] ||
                    record["title"] ||
                    record["label"] ||
                    String(item)) as string,
                  value: record["id"] || item,
                };
              });
              updateOptions(options);
              setLoading(false);
            },
            error: () => setLoading(false),
          });
      } else {
        const getAllFunction = filter.options as () => Observable<
          SelectOption[]
        >;
        getAllFunction()
          .pipe(takeUntil(destroy$))
          .subscribe({
            next: (options) => {
              updateOptions(options);
              setLoading(false);
            },
            error: () => setLoading(false),
          });
      }
    }
  }

  /**
   * Formats active filters for display
   */
  formatActiveFilters(
    filters: TableFilter[],
    appliedFilters: FilterValues,
    appliedSearchText: string,
    filterOptions: FilterOptions
  ): ActiveFilter[] {
    const activeFilters: ActiveFilter[] = [];
    if (appliedSearchText?.trim()) {
      activeFilters.push({
        filter: {
          name: "filter",
          label: "Search",
          type: "text",
        } as TableFilter,
        value: appliedSearchText,
        displayValue: appliedSearchText,
      });
    }
    filters.forEach((filter) => {
      const value = appliedFilters[filter.name];
      if (value !== null && value !== undefined && value !== "") {
        let displayValue = value.toString();
        if (filter.type === "select" && filterOptions[filter.name]) {
          const option = filterOptions[filter.name].find((opt) =>
            this.compareSelectValues(opt.value, value)
          );
          if (option) {
            displayValue = option.label;
          }
        }
        if (filter.type === "date" && value instanceof Date) {
          displayValue = value.toLocaleDateString();
        }
        activeFilters.push({ filter, value, displayValue });
      }
    });
    return activeFilters;
  }

  /**
   * Utility: compare select values
   */
  compareSelectValues(o1: unknown, o2: unknown): boolean {
    if (o1 === null || o2 === null || o1 === undefined || o2 === undefined) {
      return o1 === o2;
    }
    return o1.toString() === o2.toString();
  }

  /**
   * Debounce a Subject<string> and call a callback after debounce
   */
  setupDebounce(
    subject$: Subject<string>,
    debounceMs: number,
    destroy$: Subject<void>,
    callback: () => void
  ) {
    subject$
      .pipe(
        debounceTime(debounceMs),
        distinctUntilChanged(),
        takeUntil(destroy$)
      )
      .subscribe(callback);
  }

  // Add more methods for pagination, etc. as needed
}
