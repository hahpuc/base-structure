import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { BaseOption } from '@common/response/types/base.reponse.type';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';

import { CreateNamespaceDto } from '../dtos/namespace/create-namespace.dto';
import { FilterNamespaceDto } from '../dtos/namespace/filter-namespace.dto';
import { UpdateNamespaceDto } from '../dtos/namespace/update-namespace.dto';
import { TranslationNamespace } from '../repository/entities/translation-namespace.entity';
import { TranslationNamespaceRepository } from '../repository/repositories/translation-namespace.repository';
import { CustomMessageService } from './custom-message.service';
import { I18nService } from './i18n.service';

@Injectable()
export class TranslationNamespaceService {
  private customMessageService: CustomMessageService;

  constructor(
    private readonly namespaceRepository: TranslationNamespaceRepository,
    i18nService: I18nService,
  ) {
    this.customMessageService = new CustomMessageService(
      i18nService,
      'translation_namespace',
    );
  }

  async create(input: CreateNamespaceDto): Promise<number> {
    const { id } = await this.namespaceRepository.save(input);
    return id;
  }

  async getById(id: number): Promise<TranslationNamespace> {
    const app = await this.namespaceRepository.findOneBy({ id });
    if (!app) {
      const message = await this.customMessageService.get('NOT_FOUND');
      throw new CustomError(404, 'NOT_FOUND', message);
    }
    return app;
  }

  async getList(
    params: FilterNamespaceDto,
  ): Promise<ListPaginate<TranslationNamespace>> {
    const [data, count] = await this.namespaceRepository.getList(params);

    return wrapPagination<TranslationNamespace>(data, count, params);
  }

  async getOptions(): Promise<BaseOption[]> {
    const namespaces = await this.namespaceRepository.find({
      where: { status: EStatus.active },
      order: { name: 'ASC' },
    });

    return namespaces.map((ns) => ({
      label: ns.name,
      value: ns.id,
    }));
  }

  async update(input: UpdateNamespaceDto): Promise<void> {
    const app = await this.getById(input.id);

    Object.assign(app, { ...input });

    await this.namespaceRepository.save(app);
  }

  async delete(id: number): Promise<void> {
    const app = await this.getById(id);
    await this.namespaceRepository.remove(app);
  }
}
