import { Routes } from '@angular/router';

import { CreateEditProvinceComponent } from './province/create-edit/create-edit-province.component';
import { ProvinceComponent } from './province/province.component';
import { WardComponent } from './ward/ward.component';

const routes: Routes = [
  {
    path: 'ward',
    component: WardComponent,
  },
  {
    path: 'province',
    component: ProvinceComponent,
  },
  {
    path: 'province/create',
    component: CreateEditProvinceComponent,
  },
  {
    path: 'province/edit/:id',
    component: CreateEditProvinceComponent,
  },
];

export default routes;
