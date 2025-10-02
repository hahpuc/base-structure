import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { ProvinceCreateEditComponent } from './create-edit/province-create-edit.component';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';

@NgModule({
  declarations: [ProvinceComponent, ProvinceCreateEditComponent],
  imports: [SharedModule, ProvinceRoutingModule],
})
export class ProvinceModule {}
