import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { WardRoutingModule } from './ward-routing.module';
import { WardComponent } from './ward.component';

@NgModule({
  declarations: [WardComponent],
  imports: [SharedModule, WardRoutingModule],
})
export class WardModule {}
