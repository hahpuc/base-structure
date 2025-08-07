import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';

@NgModule({
  declarations: [ProvinceComponent],
  imports: [SharedModule, ProvinceRoutingModule],
})
export class ProvinceModule {}
