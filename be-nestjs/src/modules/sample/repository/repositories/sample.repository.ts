import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterSampleDto } from '@modules/sample/dtos/filter-sample.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Sample } from '../entities/sample.entity';

@Injectable()
export class SampleRepository extends Repository<Sample> {
  constructor(dataSource: DataSource) {
    super(Sample, dataSource.createEntityManager());
  }

  async getList(params: FilterSampleDto): Promise<[Sample[], number]> {
    const query = this.createQueryBuilder('sample')
      .leftJoinAndSelect('sample.ward', 'ward')
      .leftJoinAndSelect('ward.province', 'province')
      .leftJoinAndSelect('sample.category', 'category')
      .leftJoinAndSelect('sample.creator', 'creator');

    if (params?.filter) {
      query.where('(sample.name LIKE :filter OR sample.slug LIKE :filter)', {
        filter: `%${params.filter}%`,
      });
    }

    if (params?.status !== undefined) {
      query.andWhere('sample.status = :status', {
        status: params.status,
      });
    }

    if (params?.type !== undefined) {
      query.andWhere('sample.type = :type', {
        type: params.type,
      });
    }

    if (params?.category_id) {
      query.andWhere('sample.category_id = :categoryId', {
        categoryId: params.category_id,
      });
    }

    if (params?.ward_id) {
      query.andWhere('sample.ward_id = :wardId', {
        wardId: params.ward_id,
      });
    }

    if (params?.creator_id) {
      query.andWhere('sample.creator_id = :creatorId', {
        creatorId: params.creator_id,
      });
    }

    if (params?.start_time) {
      query.andWhere('sample.start_time >= :startTime', {
        startTime: params.start_time,
      });
    }

    if (params?.end_time) {
      query.andWhere('sample.end_time <= :endTime', {
        endTime: params.end_time,
      });
    }

    applyQuerySorting(params.sorting, query, 'sample');
    applyQueryPaging(params, query);

    return query.getManyAndCount();
  }
}
