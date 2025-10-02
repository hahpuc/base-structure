import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlowJointComponent } from './flow-joint.component';

const routes: Routes = [
  {
    path: '',
    component: FlowJointComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowJointRoutingModule {}
