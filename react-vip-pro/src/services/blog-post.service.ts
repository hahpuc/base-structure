import { BlogPostDto, CreateBlogPost, EditBlogPost, QueryBlogPost } from '@/types/blog-post';

import { BaseService } from './base.service';

const API_PREFIX = '/admin';

class BlogPostService extends BaseService<
  number,
  BlogPostDto,
  CreateBlogPost,
  EditBlogPost,
  QueryBlogPost
> {
  constructor() {
    super(API_PREFIX, 'blog-posts');
  }
}

export const blogPostService = new BlogPostService();
