import { Routes } from '@angular/router';

import { CreateEditRoleComponent } from './role/create-edit/create-edit-role.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: 'role',
    component: RoleComponent,
  },
  {
    path: 'role/create',
    component: CreateEditRoleComponent,
  },
  {
    path: 'role/edit/:id',
    component: CreateEditRoleComponent,
  },
];

export default routes;
