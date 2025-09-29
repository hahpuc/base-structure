import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterProvinceDto } from '@modules/location/dtos/province/filter-province.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

import { Province } from '../entities/province.entity';

@Injectable()
export class ProvinceRepository extends Repository<Province> {
  constructor(dataSource: DataSource) {
    super(Province, dataSource.createEntityManager());
  }

  async getList(
    params: FilterProvinceDto,
    isExport = false,
  ): Promise<[Province[], number]> {
    const query = this.createQueryBuilder('province');

    this._applyQueryBase(params, query);
    applyQuerySorting(params.sorting, query, 'province');
    applyQuerySorting(`id desc`, query, 'province', true);
    applyQueryPaging(params, query, isExport);

    if (isExport) {
      return [await query.getRawMany(), 0];
    }

    return await query.getManyAndCount();
  }

  async getListExport(params: FilterProvinceDto): Promise<any[]> {
    const query = this.createQueryBuilder('province');

    this._applyQueryBase(params, query);
    applyQuerySorting(params.sorting, query, 'province');
    applyQuerySorting(`id desc`, query, 'province', true);
    applyQueryPaging(params, query, true);

    return await query.getRawMany();
  }

  private _applyQueryBase(
    params: FilterProvinceDto,
    query: SelectQueryBuilder<Province>,
  ): void {
    if (params?.filter)
      query.where('(province.name LIKE :filter)', {
        filter: `%${params?.filter}%`,
      });

    if (!isNaN(params.status))
      query.andWhere('(province.status = :status)', {
        status: params?.status,
      });
  }
}
