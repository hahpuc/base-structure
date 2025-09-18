import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment';

import { BlogPostDto, CreateBlogPost, EditBlogPost, QueryBlogPost } from '../types/blog-post';

import { AppBaseService } from './app-base.service';

@Injectable({ providedIn: 'root' })
export class BlogPostService extends AppBaseService<
  number,
  BlogPostDto,
  CreateBlogPost,
  EditBlogPost,
  QueryBlogPost
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'blog-posts');
  }
}
