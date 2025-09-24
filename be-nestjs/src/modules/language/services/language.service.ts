import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { wrapPagination } from '@common/utils/object.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { CreateLanguageDto } from '../dtos/language/create-language.dto';
import { FilterLanguageDto } from '../dtos/language/filter-language.dto';
import { GetLanguageDto } from '../dtos/language/language.dto';
import { UpdateLanguageDto } from '../dtos/language/update-language.dto';
import { Language } from '../repository/entities/language.entity';
import { LanguageRepository } from '../repository/repositories/language.repository';

@Injectable()
export class LanguageService {
  private readonly logger = new Logger(LanguageService.name);
  private readonly CACHE_KEY = 'languages';
  private readonly CACHE_TTL = 36000; // 1 hour

  constructor(
    private readonly languageRepository: LanguageRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // MARK: CRUD
  async getList(params: FilterLanguageDto): Promise<ListPaginate<Language>> {
    const [data, count] = await this.languageRepository.getList(params);

    return wrapPagination<Language>(data, count, params);
  }

  async create(input: CreateLanguageDto): Promise<void> {
    await this._checkCodeExist(input.code);

    const language = new Language();

    Object.assign(language, {
      ...input,
    });

    await this.languageRepository.save(language);

    await this.clearCache();
  }

  async update(input: UpdateLanguageDto): Promise<void> {
    const result = await this._getByIdOrCode(input.id);

    await this._checkCodeExist(input.code, input.id);

    Object.assign(result, { ...input });

    await this.languageRepository.save(result);

    await this.clearCache();
  }

  async delete(id: number): Promise<void> {
    const result = await this.getById(id);
    await this.languageRepository.softRemove(result);

    await this.clearCache();
  }

  async getById(id: number): Promise<Language> {
    const result = await this.languageRepository.findOneBy({ id });
    if (!result) {
      throw new CustomError(404, 'NOT_FOUND', 'Not found Data');
    }
    return result;
  }

  // MARK: Caching
  async getAll(): Promise<GetLanguageDto[]> {
    const cacheKey = `${this.CACHE_KEY}:all`;

    try {
      // Try to get from cache first
      const cached = await this.cacheManager.get<GetLanguageDto[]>(cacheKey);
      if (cached) {
        this.logger.debug('All languages retrieved from cache');
        return cached;
      }

      // If not in cache, get from database
      const languages = await this.languageRepository.find({
        order: { name: 'ASC' },
      });

      const languageDtos: GetLanguageDto[] = languages.map((lang) => ({
        ...lang,
      }));

      // Cache the result
      await this.cacheManager.set(cacheKey, languageDtos, this.CACHE_TTL);
      this.logger.debug(`Cached ${languageDtos.length} languages`);

      return languageDtos;
    } catch (error) {
      this.logger.error('Error fetching all languages:', error);
      throw error;
    }
  }

  async getAllActive(): Promise<GetLanguageDto[]> {
    const cacheKey = `${this.CACHE_KEY}:active`;

    try {
      // Try to get from cache first
      const cached = await this.cacheManager.get<GetLanguageDto[]>(cacheKey);
      if (cached) {
        this.logger.debug('Languages retrieved from cache');
        return cached;
      }

      const languages = await this.languageRepository.find({
        where: { status: EStatus.active },
        order: { name: 'ASC' },
      });

      const languageDtos: GetLanguageDto[] = languages.map((lang) => ({
        ...lang,
      }));

      // Cache the result
      await this.cacheManager.set(cacheKey, languageDtos, this.CACHE_TTL);
      this.logger.debug(`Cached ${languageDtos.length} active languages`);

      return languageDtos;
    } catch (error) {
      this.logger.error('Error fetching active languages:', error);
      throw error;
    }
  }

  async findByCode(code: string): Promise<Language | null> {
    const cacheKey = `${this.CACHE_KEY}:code:${code}`;

    try {
      // Try to get from cache first
      const cached = await this.cacheManager.get<Language>(cacheKey);
      if (cached) {
        this.logger.debug(`Language ${code} retrieved from cache`);
        return cached;
      }

      // If not in cache, get from database
      const language = await this.languageRepository.findOne({
        where: { code, status: EStatus.active },
      });

      if (language) {
        await this.cacheManager.set(cacheKey, language, this.CACHE_TTL);
        this.logger.debug(`Cached language ${code}`);
      }

      return language;
    } catch (error) {
      this.logger.error(`Error fetching language ${code}:`, error);
      throw error;
    }
  }

  async getActiveCodes(): Promise<string[]> {
    const cacheKey = `${this.CACHE_KEY}:codes:active`;

    try {
      // Try to get from cache first
      const cached = await this.cacheManager.get<string[]>(cacheKey);
      if (cached) {
        this.logger.debug('Active language codes retrieved from cache');
        return cached;
      }

      // If not in cache, get from database
      const languages = await this.languageRepository.find({
        where: { status: EStatus.active },
        select: ['code'],
        order: { code: 'ASC' },
      });

      const codes = languages.map((lang) => lang.code);

      // Cache the result
      await this.cacheManager.set(cacheKey, codes, this.CACHE_TTL);
      this.logger.debug(`Cached ${codes.length} active language codes`);

      return codes;
    } catch (error) {
      this.logger.error('Error fetching active language codes:', error);
      throw error;
    }
  }

  async clearCache(): Promise<void> {
    try {
      const keys = [
        `${this.CACHE_KEY}:active`,
        `${this.CACHE_KEY}:all`,
        `${this.CACHE_KEY}:codes:active`,
      ];

      // Clear all language-related cache entries
      await Promise.all(keys.map((key) => this.cacheManager.del(key)));

      // Clear individual language caches
      const allLanguages = await this.languageRepository.find({
        select: ['code'],
      });
      const individualKeys = allLanguages.map(
        (lang) => `${this.CACHE_KEY}:code:${lang.code}`,
      );
      await Promise.all(
        individualKeys.map((key) => this.cacheManager.del(key)),
      );

      this.logger.log('Language cache cleared');
    } catch (error) {
      this.logger.error('Error clearing language cache:', error);
      throw error;
    }
  }

  async warmCache(): Promise<void> {
    try {
      this.logger.log('Warming language cache...');

      await Promise.all([
        this.getAllActive(),
        this.getAll(),
        this.getActiveCodes(),
      ]);

      this.logger.log('Language cache warmed successfully');
    } catch (error) {
      this.logger.error('Error warming language cache:', error);
      throw error;
    }
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
