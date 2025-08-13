import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogPostComponent } from './blog-post.component';

@NgModule({
  declarations: [BlogPostComponent],
  imports: [SharedModule, BlogPostRoutingModule],
})
export class BlogPostModule {}
