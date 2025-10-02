import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogPost } from './entities/blog-post.entity';
import { BlogPostRepository } from './repositories/blog-post.repository';

@Module({
  providers: [BlogPostRepository],
  exports: [BlogPostRepository],
  imports: [TypeOrmModule.forFeature([BlogPost])],
})
export class BlogPostRepositoryModule {}
