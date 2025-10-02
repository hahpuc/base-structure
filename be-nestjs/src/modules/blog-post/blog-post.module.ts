import { Module } from '@nestjs/common';

import { BlogPostRepositoryModule } from './repository/blog-post.repository.module';
import { BlogPostService } from './services/blog-post.service';

@Module({
  imports: [BlogPostRepositoryModule],
  exports: [BlogPostService],
  providers: [BlogPostService],
  controllers: [],
})
export class BlogPostModule {}
