import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NzDemoTableDynamicSettingsComponent } from '@/app/shared/components/tables/table/table-dynamic-antd.component';

@Component({
  imports: [NzDemoTableDynamicSettingsComponent, CommonModule],
  templateUrl: './ward.component.html',
})
export class WardComponent {
  constructor() {}
}
