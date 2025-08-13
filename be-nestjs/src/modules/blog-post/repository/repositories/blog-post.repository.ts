import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FilterBlogPostDto } from '../../dtos/filter-blog-post.dto';
import { BlogPost } from '../entities/blog-post.entity';

@Injectable()
export class BlogPostRepository extends Repository<BlogPost> {
  constructor(dataSource: DataSource) {
    super(BlogPost, dataSource.createEntityManager());
  }

  async getList(params: FilterBlogPostDto): Promise<[BlogPost[], number]> {
    const { filter, category_id, status } = params;

    const query = this.createQueryBuilder('blogPost');

    query.leftJoinAndSelect('blogPost.category', 'category');

    if (!isNaN(status)) {
      query.andWhere('blogPost.status = :status', { status: status });
    }

    if (!isNaN(category_id)) {
      query.andWhere('blogPost.category_id = :category_id', {
        category_id: category_id,
      });
    }

    if (filter) {
      query.andWhere('blogPost.title like :title', {
        title: `%${filter}%`,
      });
    }

    applyQuerySorting(params.sorting, query, 'blogPost');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
    4;
  }

  async findByIdOrSlug(idOrSlug: number | string): Promise<BlogPost> {
    const query = this.createQueryBuilder('post')
      .where('post.id = :id', { id: idOrSlug })
      .orWhere('post.slug = :slug', { slug: idOrSlug });

    return query.getOne();
  }
}
