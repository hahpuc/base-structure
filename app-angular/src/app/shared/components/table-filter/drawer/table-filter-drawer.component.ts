import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  FilterOptions,
  LoadingStates,
  PaginatedSelectOptions,
  TableFilter,
} from '../table-filter.model';

@Component({
  standalone: false,
  selector: 'app-table-filter-drawer',
  templateUrl: './table-filter-drawer.component.html',
})
export class TableFilterDrawerComponent {
  @Input() visible = false;
  @Input() filters: TableFilter[] = [];
  @Input() filterForm!: FormGroup;
  @Input() filterOptions: FilterOptions = {};
  @Input() isLoadingOptions: LoadingStates = {};
  @Input() isLoading = false;
  @Input() searchText = '';
  @Input() appliedSearchText = '';
  @Input() paginatedOptions: { [key: string]: PaginatedSelectOptions } = {};
  @Input() compareSelectValues: (o1: unknown, o2: unknown) => boolean = () => false;
  @Input() isPaginatedFilter: (filterName: string) => boolean = () => false;
  @Input() isPaginatedLoading: (filterName: string) => boolean = () => false;

  @Output() closeDrawer = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<void>();
  @Output() onClear = new EventEmitter<void>();
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() onSelectSearch = new EventEmitter<{ filterName: string; searchText: string }>();
  @Output() onSelectScrollToBottom = new EventEmitter<string>();

  clearDrawerSearchText() {
    this.searchText = '';
    this.searchTextChange.emit(this.searchText);
  }

  handleSearchTextChange(value: string) {
    this.searchText = value;
    this.searchTextChange.emit(value);
  }

  handleSelectSearch(filterName: string, searchText: string) {
    this.onSelectSearch.emit({ filterName, searchText });
  }

  handleSelectScrollToBottom(filterName: string) {
    this.onSelectScrollToBottom.emit(filterName);
  }
}
