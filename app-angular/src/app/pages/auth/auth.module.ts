import { SharedModule } from '@/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { AuthenticateRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './regsiter/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule, AuthenticateRoutingModule],
})
export class AuthModule {}
