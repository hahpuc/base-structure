import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterNamespaceDto } from '@modules/language/dtos/namespace/filter-namespace.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TranslationNamespace } from '../entities/translation-namespace.entity';

@Injectable()
export class TranslationNamespaceRepository extends Repository<TranslationNamespace> {
  constructor(dataSource: DataSource) {
    super(TranslationNamespace, dataSource.createEntityManager());
  }

  async getList(
    params: FilterNamespaceDto,
  ): Promise<[TranslationNamespace[], number]> {
    const query = this.createQueryBuilder('translation_namespace');

    applyQuerySorting(params.sorting, query, 'translation_namespace');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }
}
