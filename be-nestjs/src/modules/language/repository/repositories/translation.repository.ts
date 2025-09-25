import { EStatus } from '@app/constant/app.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Translation } from '../entities/translation.entity';

@Injectable()
export class TranslationRepository {
  constructor(
    @InjectRepository(Translation)
    private readonly repository: Repository<Translation>,
  ) {}

  async findByLanguageAndNamespace(
    language: string,
    namespace: string,
  ): Promise<Translation[]> {
    const query = this.repository
      .createQueryBuilder('translation')
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
    const queryBuilder = this.repository
      .createQueryBuilder('translation')
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
    const result = await this.repository
      .createQueryBuilder('translation')
      .select('DISTINCT translation.language', 'language')
      .where('translation.status = :isActive', { isActive: EStatus.active })
      .orderBy('translation.language', 'ASC')
      .getRawMany();

    return result.map((item) => item.language);
  }

  async bulkUpsert(translations: Partial<Translation>[]): Promise<void> {
    await this.repository.save(translations);
  }

  async findAll(): Promise<Translation[]> {
    return this.repository.find({
      relations: ['namespace', 'language'],
      where: { status: EStatus.active },
    });
  }

  async create(translation: Partial<Translation>): Promise<Translation> {
    const entity = this.repository.create(translation);
    return this.repository.save(entity);
  }

  async update(
    id: number,
    translation: Partial<Translation>,
  ): Promise<Translation> {
    await this.repository.update(id, translation);
    return this.repository.findOne({ where: { id }, relations: ['namespace'] });
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
