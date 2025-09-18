import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { LineChartOneComponent } from '../../../shared/components/charts/line/line-chart-one/line-chart-one.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';


@Component({
  selector: 'app-line-chart',
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    ComponentCardComponent,
    LineChartOneComponent,
  ],
  templateUrl: './line-chart.component.html',
  styles: ``
})
export class LineChartComponent {

}
