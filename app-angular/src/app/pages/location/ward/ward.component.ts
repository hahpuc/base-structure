import { Component, Injector } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';

@Component({
  standalone: false,
  templateUrl: './ward.component.html',
})
export class WardComponent extends AppBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
