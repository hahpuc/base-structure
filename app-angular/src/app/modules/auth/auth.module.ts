import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { authRoutes } from './auth.routes';

@NgModule({
  imports: [
    SharedModule, // This provides CommonModule, FormsModule, ReactiveFormsModule, etc.
    RouterModule.forChild(authRoutes),
    // Import standalone components
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
  ],
  exports: [LoginComponent, RegisterComponent, AuthLayoutComponent],
})
export class AuthModule {}
