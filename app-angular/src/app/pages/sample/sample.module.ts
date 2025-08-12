import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { SampleRoutingModule } from './sample-routing.module';
import { SampleComponent } from './sample.component';

@NgModule({
  declarations: [SampleComponent],
  imports: [SharedModule, SampleRoutingModule],
})
export class SampleModule {}
