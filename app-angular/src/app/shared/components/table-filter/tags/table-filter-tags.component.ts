import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActiveFilter } from '../table-filter.model';

@Component({
  standalone: false,
  selector: 'app-table-filter-tags',
  templateUrl: './table-filter-tags.component.html',
})
export class TableFilterTagsComponent {
  @Input() activeFilters: ActiveFilter[] = [];
  @Output() remove = new EventEmitter<ActiveFilter>();
  @Output() clearAll = new EventEmitter<void>();

  trackByFilter(filter: ActiveFilter) {
    return filter.filter.name + ':' + filter.value;
  }
}
