import { EStatus } from '@app/constant/app.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TranslationNamespace } from '../entities/translation-namespace.entity';

@Injectable()
export class TranslationNamespaceRepository {
  constructor(
    @InjectRepository(TranslationNamespace)
    private readonly repository: Repository<TranslationNamespace>,
  ) {}

  async findAll(): Promise<TranslationNamespace[]> {
    return this.repository.find({
      where: { status: EStatus.active },
      order: { name: 'ASC' },
    });
  }

  async findByName(name: string): Promise<TranslationNamespace | null> {
    return this.repository.findOne({
      where: { name, status: EStatus.active },
    });
  }

  async create(
    namespace: Partial<TranslationNamespace>,
  ): Promise<TranslationNamespace> {
    const entity = this.repository.create(namespace);
    return this.repository.save(entity);
  }

  async update(
    id: number,
    namespace: Partial<TranslationNamespace>,
  ): Promise<TranslationNamespace> {
    await this.repository.update(id, namespace);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
