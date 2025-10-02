import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleCreateEditComponent } from './create-edit/role-create-edit.component';
import { RoleComponent } from './role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: { title: 'Role' },
  },
  {
    path: 'create',
    component: RoleCreateEditComponent,
  },
  {
    path: 'edit/:id',
    component: RoleCreateEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
