import { ChangeDetectorRef, Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, takeUntil } from 'rxjs';

import { BaseQuery, ListPaginate } from '../../../types/base';
import {
  CheckboxOption,
  FtFormControl,
  PaginatedFormSelectOptions,
  RadioOption,
  SelectOption,
} from '../form.model';

@Injectable({
  providedIn: 'root',
})
export class FormOptionsService {
  private controlOptionsCache = new Map<string, SelectOption[]>();
  private paginatedOptions: { [key: string]: PaginatedFormSelectOptions } = {};
  private searchSubjects: { [key: string]: Subject<string> } = {};
  private destroy$ = new Subject<void>();
  private cdr?: ChangeDetectorRef;
  private controls: FtFormControl[] = [];

  setCdr(cdr: ChangeDetectorRef): void {
    this.cdr = cdr;
  }

  async loadDynamicOptions(controls: FtFormControl[]): Promise<void> {
    this.controls = controls;
    const promises: Promise<void>[] = [];

    for (const control of controls) {
      if (control.options && typeof control.options === 'function') {
        const promise = this.loadOptionsForControl(control);
        promises.push(promise);
      }
    }

    await Promise.all(promises);
    this.cdr?.detectChanges();
  }

  private async loadOptionsForControl(control: FtFormControl): Promise<void> {
    if (!control.options || typeof control.options !== 'function') {
      return;
    }

    try {
      this.controlOptionsCache.set(control.name, []);

      if (control.usePagination) {
        this.loadPaginatedOptions(control, '', 1).subscribe();
      } else {
        const getAllFunction = control.options as () => Observable<SelectOption[]>;
        const result = getAllFunction();

        if (result instanceof Promise) {
          const options = await result;
          this.controlOptionsCache.set(control.name, options);
        } else if (result instanceof Observable) {
          result.pipe(takeUntil(this.destroy$)).subscribe(options => {
            this.controlOptionsCache.set(control.name, options);
            this.cdr?.detectChanges();
          });
        } else if (Array.isArray(result)) {
          this.controlOptionsCache.set(control.name, result);
        }
      }
    } catch (error) {
      this.controlOptionsCache.set(control.name, []);
    }
  }

  private loadPaginatedOptions(
    control: FtFormControl,
    searchText = '',
    page = 1
  ): Observable<SelectOption[]> {
    if (typeof control.options !== 'function') {
      return new Observable(observer => observer.next([]));
    }

    const query: BaseQuery = {
      page,
      limit: control.pageSize || 20,
      ...(searchText ? { filter: searchText } : {}),
    };

    if (!this.paginatedOptions[control.name]) {
      this.paginatedOptions[control.name] = {
        options: [],
        hasMore: true,
        currentPage: 0,
        pageSize: control.pageSize || 20,
        total: 0,
        loading: false,
        searchText: '',
      };
    }

    const paginatedState = this.paginatedOptions[control.name];
    paginatedState.loading = true;

    return (control.options(query) as Observable<ListPaginate<unknown>>).pipe(
      takeUntil(this.destroy$),
      map((response: ListPaginate<unknown>) => {
        const newOptions = response.data.map(item => {
          const record = item as Record<string, unknown>;
          return {
            label: (record['name'] || record['title'] || record['label'] || String(item)) as string,
            value: record['id'] || item,
          };
        });

        if (page === 1) {
          paginatedState.options = newOptions;
        } else {
          paginatedState.options = [...paginatedState.options, ...newOptions];
        }

        paginatedState.currentPage = page;
        paginatedState.total = response.total_records;
        paginatedState.hasMore = page < response.total_pages;
        paginatedState.loading = false;
        paginatedState.searchText = searchText;

        this.controlOptionsCache.set(control.name, paginatedState.options);
        this.cdr?.detectChanges();

        return paginatedState.options;
      })
    );
  }

  onSelectSearch(controlName: string, searchText: string): void {
    const control = this.controls.find(c => c.name === controlName);
    if (!control?.usePagination) return;

    if (!this.searchSubjects[controlName]) {
      this.searchSubjects[controlName] = new Subject<string>();
      this.searchSubjects[controlName]
        .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe(search => {
          this.loadPaginatedOptions(control, search, 1).subscribe();
        });
    }

    this.searchSubjects[controlName].next(searchText);
  }

  onSelectScrollToBottom(controlName: string): void {
    const control = this.controls.find(c => c.name === controlName);
    if (!control?.usePagination) return;

    const paginatedState = this.paginatedOptions[controlName];
    if (!paginatedState || paginatedState.loading || !paginatedState.hasMore) return;

    const nextPage = paginatedState.currentPage + 1;
    this.loadPaginatedOptions(control, paginatedState.searchText || '', nextPage).subscribe();
  }

  isPaginatedControl(controlName: string): boolean {
    const control = this.controls.find(c => c.name === controlName);
    return control?.usePagination === true;
  }

  isPaginatedLoading(controlName: string): boolean {
    return this.paginatedOptions[controlName]?.loading || false;
  }

  getSelectOptions(control: FtFormControl): SelectOption[] {
    if (this.controlOptionsCache.has(control.name)) {
      return this.controlOptionsCache.get(control.name) || [];
    }

    if (!control.options) return [];

    if (Array.isArray(control.options)) {
      return control.options as SelectOption[];
    }

    if (control.options instanceof Observable) {
      control.options.pipe(takeUntil(this.destroy$)).subscribe(options => {
        this.controlOptionsCache.set(control.name, options);
        this.cdr?.detectChanges();
      });
      return [];
    }

    return [];
  }

  getRadioOptions(control: FtFormControl): RadioOption[] {
    if (!control.options || !Array.isArray(control.options)) return [];
    return control.options as RadioOption[];
  }

  getCheckboxOptions(control: FtFormControl): CheckboxOption[] {
    if (!control.options || !Array.isArray(control.options)) return [];
    return control.options as CheckboxOption[];
  }

  async refreshControlOptions(controlName: string): Promise<void> {
    const control = this.controls.find(c => c.name === controlName);
    if (control) {
      this.controlOptionsCache.delete(controlName);
      if (this.paginatedOptions[controlName]) {
        delete this.paginatedOptions[controlName];
      }
      await this.loadOptionsForControl(control);
      this.cdr?.detectChanges();
    }
  }

  getCurrentOptions(controlName: string): SelectOption[] {
    return this.controlOptionsCache.get(controlName) || [];
  }

  cleanup(): void {
    this.controlOptionsCache.clear();
    this.paginatedOptions = {};
    Object.values(this.searchSubjects).forEach(subject => subject.complete());
    this.searchSubjects = {};
    this.destroy$.next();
    this.destroy$.complete();
    this.cdr = undefined;
    this.controls = [];
  }
}
