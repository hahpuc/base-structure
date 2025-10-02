import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { WardCreateEditComponent } from './create-edit/ward-create-edit.component';
import { WardRoutingModule } from './ward-routing.module';
import { WardComponent } from './ward.component';

@NgModule({
  declarations: [WardComponent, WardCreateEditComponent],
  imports: [SharedModule, WardRoutingModule],
})
export class WardModule {}
