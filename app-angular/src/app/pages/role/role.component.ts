import { Component, Injector } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';

@Component({
  standalone: false,
  templateUrl: './role.component.html',
})
export class RoleComponent extends AppBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
