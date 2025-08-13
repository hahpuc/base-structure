import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogPostComponent } from './blog-post.component';
import { BlogPostCreateEditComponent } from './create-edit/blog-post-create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BlogPostComponent,
  },
  {
    path: 'create',
    component: BlogPostCreateEditComponent,
  },
  {
    path: 'edit/:id',
    component: BlogPostCreateEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogPostRoutingModule {}
