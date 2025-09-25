import { EStatus } from '@app/constant/app.enum';
import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterTranslationDto } from '@modules/language/dtos/translation/filter-translation.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Translation } from '../entities/translation.entity';

@Injectable()
export class TranslationRepository extends Repository<Translation> {
  constructor(dataSource: DataSource) {
    super(Translation, dataSource.createEntityManager());
  }

  async getList(
    params: FilterTranslationDto,
  ): Promise<[Translation[], number]> {
    const query = this.createQueryBuilder('translation')
      .leftJoinAndSelect('translation.namespace', 'namespace')
      .leftJoinAndSelect('translation.language', 'language');

    if (params.language_id) {
      query.andWhere('translation.language = :language_id', {
        language_id: params.language_id,
      });
    }

    if (params.namespace_id) {
      query.andWhere('translation.namespace = :namespace_id', {
        namespace_id: params.namespace_id,
      });
    }

    if (params.filter) {
      query.andWhere(
        '(translation.key LIKE :filter OR translation.value LIKE :filter)',
        { filter: `%${params.filter}%` },
      );
    }

    if (!isNaN(params.status)) {
      query.andWhere('translation.status = :status', { status: params.status });
    }

    applyQuerySorting('id ASC', query, 'translation');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async findByLanguageAndNamespace(
    language: string,
    namespace: string,
  ): Promise<Translation[]> {
    const query = this.createQueryBuilder('translation')
      .leftJoinAndSelect('translation.namespace', 'namespace')
      .leftJoinAndSelect('translation.language', 'language')
      .where('language.code = :language', { language })
      .andWhere('namespace.name = :namespace', { namespace })
      .andWhere('translation.status = :isActive', { isActive: EStatus.active })
      .andWhere('namespace.status = :isActive', { isActive: EStatus.active })
      .orderBy('translation.key', 'ASC');

    return query.getMany();
  }

  async findByKeyAndLanguage(
    key: string,
    language: string,
    namespace?: string,
  ): Promise<Translation | null> {
    const queryBuilder = this.createQueryBuilder('translation')
      .leftJoinAndSelect('translation.namespace', 'namespace')
      .where('translation.key = :key', { key })
      .andWhere('translation.language = :language', { language })
      .andWhere('translation.status = :isActive', { isActive: EStatus.active })
      .andWhere('namespace.status = :isActive', { isActive: EStatus.active });

    if (namespace) {
      queryBuilder.andWhere('namespace.name = :namespace', { namespace });
    }

    return queryBuilder.getOne();
  }

  async findLanguages(): Promise<string[]> {
    const result = await this.createQueryBuilder('translation')
      .select('DISTINCT translation.language', 'language')
      .where('translation.status = :isActive', { isActive: EStatus.active })
      .orderBy('translation.language', 'ASC')
      .getRawMany();

    return result.map((item) => item.language);
  }
}
