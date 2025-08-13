import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogPostComponent } from './blog-post.component';
import { BlogPostCreateEditComponent } from './create-edit/blog-post-create-edit.component';

@NgModule({
  declarations: [BlogPostComponent, BlogPostCreateEditComponent],
  imports: [SharedModule, BlogPostRoutingModule],
})
export class BlogPostModule {}
