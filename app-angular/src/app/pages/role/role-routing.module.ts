import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: { title: 'Role' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
