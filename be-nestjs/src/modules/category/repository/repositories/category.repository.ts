import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FilterCategoryDto } from '../../dtos/filter-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async getList(params: FilterCategoryDto): Promise<[Category[], number]> {
    const query = this.createQueryBuilder('category');

    applyQuerySorting(params.sorting, query, 'category');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async findByIdOrSlug(idOrSlug: number | string): Promise<Category> {
    const query = this.createQueryBuilder('category')
      .where('category.id = :id', { id: idOrSlug })
      .orWhere('category.slug = :slug', { slug: idOrSlug });

    return query.getOne();
  }
}
