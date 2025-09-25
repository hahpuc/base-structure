import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';

import { CreateTranslationDto } from '../dtos/translation/create-translation.dto';
import { FilterTranslationDto } from '../dtos/translation/filter-translation.dto';
import { UpdateTranslationDto } from '../dtos/translation/update-translation.dto';
import { Translation } from '../repository/entities/translation.entity';
import { TranslationRepository } from '../repository/repositories/translation.repository';
import { CustomMessageService } from './custom-message.service';
import { I18nService } from './i18n.service';

@Injectable()
export class TranslationService {
  private customMessageService: CustomMessageService;

  constructor(
    private readonly translationRepository: TranslationRepository,
    i18nService: I18nService,
  ) {
    this.customMessageService = new CustomMessageService(
      i18nService,
      'translation',
    );
  }

  async create(input: CreateTranslationDto): Promise<number> {
    const { id } = await this.translationRepository.save(input);
    return id;
  }

  async getById(id: number): Promise<Translation> {
    const app = await this.translationRepository.findOneBy({ id });
    if (!app) {
      const message = await this.customMessageService.get('NOT_FOUND');
      throw new CustomError(404, 'NOT_FOUND', message);
    }
    return app;
  }

  async getList(
    params: FilterTranslationDto,
  ): Promise<ListPaginate<Translation>> {
    const [data, count] = await this.translationRepository.getList(params);

    return wrapPagination<Translation>(data, count, params);
  }

  async update(input: UpdateTranslationDto): Promise<void> {
    const app = await this.getById(input.id);

    Object.assign(app, { ...input });

    await this.translationRepository.save(app);
  }

  async delete(id: number): Promise<void> {
    const app = await this.getById(id);
    await this.translationRepository.remove(app);
  }
}
