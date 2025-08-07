import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WardComponent } from './ward.component';

const routes: Routes = [
  {
    path: '',
    component: WardComponent,
    data: { title: 'Ward' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WardRoutingModule {}
