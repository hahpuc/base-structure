import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { RoleCreateEditComponent } from './create-edit/role-create-edit.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';

@NgModule({
  declarations: [RoleComponent, RoleCreateEditComponent],
  imports: [SharedModule, RoleRoutingModule],
})
export class RoleModule {}
