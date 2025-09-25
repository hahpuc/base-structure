import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';

import { CreateTranslationDto } from '../dtos/translation/create-translation.dto';
import { FilterTranslationDto } from '../dtos/translation/filter-translation.dto';
import { UpdateTranslationDto } from '../dtos/translation/update-translation.dto';
import { Translation } from '../repository/entities/translation.entity';
import { LanguageRepository } from '../repository/repositories/language.repository';
import { TranslationRepository } from '../repository/repositories/translation.repository';
import { TranslationNamespaceRepository } from '../repository/repositories/translation-namespace.repository';

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);
  private translationMessage: MessageService;
  private readonly CACHE_KEY = 'translations';
  private readonly CACHE_TTL = 36000; // 1 hour

  constructor(
    private readonly translationRepository: TranslationRepository,
    private readonly languageRepository: LanguageRepository,
    private readonly namespaceRepository: TranslationNamespaceRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    i18nService: I18nService,
  ) {
    this.translationMessage = new MessageService(i18nService, 'translation');
  }

  async create(input: CreateTranslationDto): Promise<void> {
    // Validate language exists
    const language = await this.languageRepository.findOne({
      where: { code: input.language, status: EStatus.active },
    });
    if (!language) {
      throw new CustomError(404, 'LANGUAGE_NOT_FOUND', 'Language not found');
    }

    // Validate namespace exists
    let namespace;
    const namespaceId = parseInt(input.namespace_id);
    if (isNaN(namespaceId)) {
      // It's a name, find by name
      namespace = await this.namespaceRepository.findByName(input.namespace_id);
    } else {
      // It's an ID, find by ID
      const namespaces = await this.namespaceRepository.findAll();
      namespace = namespaces.find((n) => n.id === namespaceId);
    }

    if (!namespace) {
      throw new CustomError(404, 'NAMESPACE_NOT_FOUND', 'Namespace not found');
    }

    // Check if translation already exists
    const existingTranslation =
      await this.translationRepository.findByKeyAndLanguage(
        input.key,
        input.language,
        namespace.name,
      );

    if (existingTranslation) {
      throw new CustomError(
        400,
        'TRANSLATION_EXISTS',
        'Translation already exists for this key, language, and namespace',
      );
    }

    await this.translationRepository.create({
      key: input.key,
      value: input.value,
      description: input.description,
      status: input.status,
      language_id: language.id,
      namespace_id: namespace.id,
    });

    // Clear cache for this language and namespace
    await this.clearCache(input.language, namespace.name);
  }

  async getById(id: number): Promise<Translation> {
    // For now, we'll get from the findAll method and filter by ID
    // since the repository doesn't have a direct findById method
    const translations = await this.translationRepository.findAll();
    const translation = translations.find((t) => t.id === id);

    if (!translation) {
      throw new CustomError(404, 'NOT_FOUND', 'Translation not found');
    }

    return translation;
  }

  async getList(
    params: FilterTranslationDto,
  ): Promise<ListPaginate<Translation>> {
    // Since the repository doesn't have a getList method, we'll implement basic pagination
    const allTranslations = await this.translationRepository.findAll();

    const { page = 1, limit = 10 } = params;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = allTranslations.slice(startIndex, endIndex);
    const count = allTranslations.length;

    return wrapPagination<Translation>(data, count, params);
  }

  async getAll(): Promise<Translation[]> {
    return await this.translationRepository.findAll();
  }

  async update(input: UpdateTranslationDto): Promise<void> {
    const translation = await this.getById(input.id);

    await this.translationRepository.update(input.id, {
      value: input.value ?? translation.value,
      description: input.description ?? translation.description,
      status: input.status ?? translation.status,
      version: translation.version + 1,
    });

    // Get updated translation to clear cache properly
    const updatedTranslation = await this.getById(input.id);
    await this.clearCache(
      updatedTranslation.language.code,
      updatedTranslation.namespace.name,
    );
  }

  async delete(id: number): Promise<void> {
    const translation = await this.getById(id);
    await this.translationRepository.delete(id);

    // Clear cache for this translation's language and namespace
    await this.clearCache(
      translation.language.code,
      translation.namespace.name,
    );
  }

  async bulkImport(
    languageCode: string,
    namespaceName: string,
    translations: Record<string, string>,
  ): Promise<void> {
    // Validate language
    const language = await this.languageRepository.findOne({
      where: { code: languageCode, status: EStatus.active },
    });
    if (!language) {
      throw new CustomError(404, 'LANGUAGE_NOT_FOUND', 'Language not found');
    }

    // Validate or create namespace
    let namespace = await this.namespaceRepository.findByName(namespaceName);
    if (!namespace) {
      namespace = await this.namespaceRepository.create({
        name: namespaceName,
        status: EStatus.active,
      });
    }

    const translationEntities: Partial<Translation>[] = [];

    for (const [key, value] of Object.entries(translations)) {
      // Check if translation exists
      const existingTranslation =
        await this.translationRepository.findByKeyAndLanguage(
          key,
          languageCode,
          namespaceName,
        );

      if (existingTranslation) {
        // Update existing
        await this.translationRepository.update(existingTranslation.id, {
          value,
          version: existingTranslation.version + 1,
        });
      } else {
        // Create new
        translationEntities.push({
          key,
          value,
          language_id: language.id,
          namespace_id: namespace.id,
          status: EStatus.active,
        });
      }
    }

    if (translationEntities.length > 0) {
      await this.translationRepository.bulkUpsert(translationEntities);
    }

    await this.clearCache(languageCode, namespaceName);
  }

  async exportTranslations(
    languageCode: string,
    namespaceName?: string,
  ): Promise<Record<string, any>> {
    const language = await this.languageRepository.findOne({
      where: { code: languageCode, status: EStatus.active },
    });
    if (!language) {
      throw new CustomError(404, 'LANGUAGE_NOT_FOUND', 'Language not found');
    }

    // Get translations by language and optionally namespace
    let translations: Translation[];
    if (namespaceName) {
      translations =
        await this.translationRepository.findByLanguageAndNamespace(
          languageCode,
          namespaceName,
        );
    } else {
      // Get all translations for the language
      const allTranslations = await this.translationRepository.findAll();
      translations = allTranslations.filter(
        (t) => t.language_id === language.id,
      );
    }

    const result: Record<string, any> = {};

    translations.forEach((translation) => {
      const namespace = translation.namespace.name;
      if (!result[namespace]) {
        result[namespace] = {};
      }
      result[namespace][translation.key] = translation.value;
    });

    return result;
  }

  async getTranslationsByLanguage(
    languageCode: string,
  ): Promise<Translation[]> {
    const language = await this.languageRepository.findOne({
      where: { code: languageCode, status: EStatus.active },
    });
    if (!language) {
      throw new CustomError(404, 'LANGUAGE_NOT_FOUND', 'Language not found');
    }

    const allTranslations = await this.translationRepository.findAll();
    return allTranslations.filter((t) => t.language_id === language.id);
  }

  async getTranslationsByNamespace(
    languageCode: string,
    namespaceName: string,
  ): Promise<Translation[]> {
    return this.translationRepository.findByLanguageAndNamespace(
      languageCode,
      namespaceName,
    );
  }

  private async clearCache(
    languageCode?: string,
    namespaceName?: string,
  ): Promise<void> {
    try {
      if (languageCode && namespaceName) {
        await this.cacheManager.del(
          `${this.CACHE_KEY}:${languageCode}:${namespaceName}`,
        );
      } else if (languageCode) {
        // Clear all namespaces for this language
        const keys = await this.cacheManager.store.keys(
          `${this.CACHE_KEY}:${languageCode}:*`,
        );
        if (keys.length > 0) {
          await this.cacheManager.store.mdel(...keys);
        }
      } else {
        // Clear all translation cache
        const keys = await this.cacheManager.store.keys(`${this.CACHE_KEY}:*`);
        if (keys.length > 0) {
          await this.cacheManager.store.mdel(...keys);
        }
      }
    } catch (error) {
      this.logger.warn('Failed to clear cache:', error);
    }
  }
}
