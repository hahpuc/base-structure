import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSpinModule } from "ng-zorro-antd/spin";
import {
  FilterOptions,
  LoadingStates,
  PaginatedSelectOptions,
  TableFilter,
} from "../table-filter.model";

@Component({
  selector: "app-table-filter-drawer",
  imports: [
    CommonModule,
    NzDrawerModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSpinModule,
    NzInputNumberModule,
  ],
  templateUrl: "./table-filter-drawer.component.html",
})
export class TableFilterDrawerComponent {
  @Input() visible = false;
  @Input() filters: TableFilter[] = [];
  @Input() filterForm!: FormGroup;
  @Input() filterOptions: FilterOptions = {};
  @Input() isLoadingOptions: LoadingStates = {};
  @Input() isLoading = false;
  @Input() searchText = "";
  @Input() appliedSearchText = "";
  @Input() paginatedOptions: { [key: string]: PaginatedSelectOptions } = {};
  @Input() compareSelectValues: (o1: unknown, o2: unknown) => boolean = () =>
    false;
  @Input() isPaginatedFilter: (filterName: string) => boolean = () => false;
  @Input() isPaginatedLoading: (filterName: string) => boolean = () => false;

  @Output() closeDrawer = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<void>();
  @Output() onClear = new EventEmitter<void>();
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() onSelectSearch = new EventEmitter<{
    filterName: string;
    searchText: string;
  }>();
  @Output() onSelectScrollToBottom = new EventEmitter<string>();

  clearDrawerSearchText() {
    this.searchText = "";
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
