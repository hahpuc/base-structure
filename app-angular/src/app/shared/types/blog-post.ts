import { EStatus } from '../constants/enum';

import { BaseModel, BaseQuery } from './base';
import { CategoryDto } from './category';

export type BlogPostDto = BaseModel & {
  title: string;
  slug: string;
  order_index: number;
  description: string;
  content: string;
  thumbnail: string;
  published_at: Date;
  status: EStatus;
  category: CategoryDto;
  category_id: number;
};

export type CreateBlogPost = BlogPostDto;
export type EditBlogPost = Partial<BlogPostDto> & {
  id: number;
};

export type QueryBlogPost = BaseQuery & {
  category_ids?: number[];
};
