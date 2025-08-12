import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WardCreateEditComponent } from './create-edit/ward-create-edit.component';
import { WardComponent } from './ward.component';

const routes: Routes = [
  {
    path: '',
    component: WardComponent,
    data: { title: 'Ward' },
  },
  {
    path: 'create',
    component: WardCreateEditComponent,
  },
  {
    path: 'edit/:id',
    component: WardCreateEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WardRoutingModule {}
