import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterLanguageDto } from '@modules/language/dtos/language/filter-language.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Language } from '../entities/language.entity';

@Injectable()
export class LanguageRepository extends Repository<Language> {
  constructor(dataSource: DataSource) {
    super(Language, dataSource.createEntityManager());
  }

  async getList(params: FilterLanguageDto): Promise<[Language[], number]> {
    const query = this.createQueryBuilder('language');

    applyQuerySorting(params.sorting, query, 'language');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }
}
