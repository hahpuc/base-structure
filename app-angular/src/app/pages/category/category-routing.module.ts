import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoryCreateEditComponent } from './create-edit/category-create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: { title: 'Category' },
  },
  {
    path: 'create',
    component: CategoryCreateEditComponent,
  },
  {
    path: 'edit/:id',
    component: CategoryCreateEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
