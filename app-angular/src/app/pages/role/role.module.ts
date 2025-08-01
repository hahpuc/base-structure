import { SharedModule } from '@/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';

@NgModule({
  declarations: [RoleComponent],
  imports: [SharedModule, RoleRoutingModule],
})
export class RoleModule {}
