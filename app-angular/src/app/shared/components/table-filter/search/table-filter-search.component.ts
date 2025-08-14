import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-table-filter-search',
  templateUrl: './table-filter-search.component.html',
})
export class TableFilterSearchComponent {
  @Input() searchText = '';
  @Input() hasActiveFilters = false;
  @Input() activeFiltersCount = 0;
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();
  @Output() toggleDrawer = new EventEmitter<void>();

  onInputChange(value: string) {
    this.searchTextChange.emit(value);
  }

  onClear() {
    this.clearSearch.emit();
  }

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }
}
