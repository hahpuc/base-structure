import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterCategoryDto } from '@modules/category/dtos/filter-category.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async getList(params: FilterCategoryDto): Promise<[Category[], number]> {
    const query = this.createQueryBuilder('category');

    if (params?.filter) {
      query.where(
        '(category.name LIKE :filter OR category.slug LIKE :filter)',
        {
          filter: `%${params.filter}%`,
        },
      );
    }

    if (params?.status) {
      query.andWhere('category.status = :status', {
        status: params.status,
      });
    }

    applyQuerySorting(params.sorting, query, 'category');
    applyQueryPaging(params, query);

    return query.getManyAndCount();
  }
}
