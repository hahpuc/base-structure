import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { FlowJointRoutingModule } from './flow-joint-routing.module';
import { FlowJointComponent } from './flow-joint.component';

@NgModule({
  declarations: [FlowJointComponent],
  imports: [SharedModule, FlowJointRoutingModule],
})
export class FlowJointModule {}
