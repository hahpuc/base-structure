import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzBadgeModule } from "ng-zorro-antd/badge";

@Component({
  selector: "app-table-filter-search",
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzBadgeModule,
  ],
  templateUrl: "./table-filter-search.component.html",
})
export class TableFilterSearchComponent {
  @Input() searchText = "";
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
