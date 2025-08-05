import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterWardDto } from '@modules/location/dtos/ward/filter-ward.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

import { Ward } from '../entities/ward.entity';

@Injectable()
export class WardRepository extends Repository<Ward> {
  constructor(dataSource: DataSource) {
    super(Ward, dataSource.createEntityManager());
  }

  async getList(
    params: FilterWardDto,
    isExport = false,
  ): Promise<[Ward[], number]> {
    const query = this.createQueryBuilder('ward').leftJoinAndSelect(
      'ward.province',
      'province',
    );

    this._applyQueryBase(params, query);
    applyQuerySorting(params.sorting, query, 'ward');
    applyQuerySorting(`id desc`, query, 'ward', true);
    applyQueryPaging(params, query, isExport);

    query.select([
      'ward.id',
      'ward.name',
      'ward.status',
      'ward.created_at',
      'ward.updated_at',
      'province.name',
      'province.status',
    ]);

    if (isExport) {
      return [await query.getRawMany(), 0];
    }

    return await query.getManyAndCount();
  }

  private _applyQueryBase(
    params: FilterWardDto,
    query: SelectQueryBuilder<Ward>,
  ): void {
    if (params?.filter)
      query.where('(ward.name LIKE :filter)', {
        filter: `%${params?.filter}%`,
      });

    if (!isNaN(params.status))
      query.andWhere('(ward.status = :status)', {
        status: params?.status,
      });

    if (params?.province_id)
      query.andWhere('(ward.province_id = :province_id)', {
        province_id: params?.province_id,
      });

    if (params?.province_ids)
      query.andWhere('(ward.province_id IN (:...province_ids))', {
        province_ids: params.province_ids,
      });
  }
}
