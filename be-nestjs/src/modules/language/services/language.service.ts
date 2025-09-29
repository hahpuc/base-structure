import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { BaseOption } from '@common/response/types/base.reponse.type';
import { wrapPagination } from '@common/utils/object.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { CreateLanguageDto } from '../dtos/language/create-language.dto';
import { FilterLanguageDto } from '../dtos/language/filter-language.dto';
import { UpdateLanguageDto } from '../dtos/language/update-language.dto';
import { Language } from '../repository/entities/language.entity';
import { LanguageRepository } from '../repository/repositories/language.repository';
import { TranslationService } from './translation.service';

@Injectable()
export class LanguageService {
  constructor(
    private readonly languageRepository: LanguageRepository,
    private readonly translationService: TranslationService,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // MARK: CRUD
  async getList(params: FilterLanguageDto): Promise<ListPaginate<Language>> {
    const [data, count] = await this.languageRepository.getList(params);

    return wrapPagination<Language>(data, count, params);
  }

  async getOptions(): Promise<BaseOption[]> {
    const languages = await this.languageRepository.find({
      where: { status: EStatus.active },
      order: { name: 'ASC' },
    });

    return languages.map((lang) => ({
      label: lang.name,
      value: lang.id,
    }));
  }

  async create(input: CreateLanguageDto): Promise<void> {
    await this._checkCodeExist(input.code);

    const language = new Language();

    Object.assign(language, {
      ...input,
    });

    await this.languageRepository.save(language);
  }

  async createDefaultTranslations(input: CreateLanguageDto): Promise<void> {
    await this._checkCodeExist(input.code);

    const language = new Language();

    Object.assign(language, {
      ...input,
    });

    const result = await this.languageRepository.save(language);

    if (result) {
      await this.translationService.createDefaultTranslations(result.id);
    }
  }

  async update(input: UpdateLanguageDto): Promise<void> {
    const result = await this._getByIdOrCode(input.id);

    await this._checkCodeExist(input.code, input.id);

    Object.assign(result, { ...input });

    await this.languageRepository.save(result);
  }

  async delete(id: number): Promise<void> {
    const result = await this.getById(id);
    await this.languageRepository.softRemove(result);
  }

  async getById(id: number): Promise<Language> {
    const result = await this.languageRepository.findOneBy({ id });
    if (!result) {
      throw new CustomError(404, 'NOT_FOUND', 'Not found Data');
    }
    return result;
  }

  // MARK: Helper

  private async _getByIdOrCode(idOrCode: number | string): Promise<Language> {
    const result = await this.languageRepository.findOne({
      where:
        typeof idOrCode === 'number' ? { id: idOrCode } : { code: idOrCode },
    });

    if (!result) {
      throw new CustomError(404, 'NOT_FOUND', 'Language not found');
    }

    return result;
  }

  private async _checkCodeExist(code: string, id?: number): Promise<void> {
    const language = await this.languageRepository.findOneBy({ code });

    if (language) {
      if (!id || language.id !== id) {
        throw new CustomError(
          400,
          'SLUG_INVALID',
          'Language code already exists',
        );
      }
    }
  }
}
