import { SharedModule } from '@/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { WardComponent } from './ward.component';
import { WardRoutingModule } from './ward-routing.module';

@NgModule({
  declarations: [WardComponent],
  imports: [SharedModule, WardRoutingModule],
})
export class WardModule {}
