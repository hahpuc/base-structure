import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { authRoutes } from './auth.routes';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthLayoutComponent],
  imports: [SharedModule, RouterModule.forChild(authRoutes)],
  exports: [LoginComponent, RegisterComponent, AuthLayoutComponent],
})
export class AuthModule {}
