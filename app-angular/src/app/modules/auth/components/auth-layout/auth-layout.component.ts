import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  constructor() {}
}
