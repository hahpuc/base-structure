import { Component, Injector } from '@angular/core';

import { AppBaseComponent } from '../../app.base.component';

@Component({
  templateUrl: './blank-layout.component.html',
  standalone: false,
})
export class BlankLayoutComponent extends AppBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
