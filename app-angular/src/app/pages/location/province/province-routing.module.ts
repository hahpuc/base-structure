import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProvinceComponent } from './province.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinceComponent,
    data: { title: 'Province' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvinceRoutingModule {}
