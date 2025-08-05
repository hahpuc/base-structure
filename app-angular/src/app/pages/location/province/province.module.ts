import { SharedModule } from '@/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { ProvinceComponent } from './province.component';
import { ProvinceRoutingModule } from './province-routing.module';

@NgModule({
  declarations: [ProvinceComponent],
  imports: [SharedModule, ProvinceRoutingModule],
})
export class ProvinceModule {}
