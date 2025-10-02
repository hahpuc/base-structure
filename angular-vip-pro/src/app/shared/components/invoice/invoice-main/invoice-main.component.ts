import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ButtonComponent } from '../../ui/button/button.component';
import { InvoiceTableComponent } from '../invoice-table/invoice-table.component';

@Component({
  selector: 'app-invoice-main',
  imports: [
    CommonModule,
    InvoiceTableComponent,
    ButtonComponent
],
  templateUrl: './invoice-main.component.html',
  styles: ``
})
export class InvoiceMainComponent {

}
