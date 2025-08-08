import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProvinceCreateEditComponent } from './create-edit/province-create-edit.component';
import { ProvinceComponent } from './province.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinceComponent,
  },
  {
    path: 'create',
    component: ProvinceCreateEditComponent,
  },
  {
    path: 'edit/:id',
    component: ProvinceCreateEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvinceRoutingModule {}
