import { Component, Injector } from '@angular/core';

import { AppBaseComponent } from '../../app.base.component';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent extends AppBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
