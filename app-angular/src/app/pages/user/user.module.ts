import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { UserCreateEditComponent } from './create-edit/user-create-edit.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, UserCreateEditComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
