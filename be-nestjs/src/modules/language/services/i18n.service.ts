import { EStatus } from '@app/constant/app.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';

import { Translation } from '../repository/entities/translation.entity';
import { LanguageRepository } from '../repository/repositories/language.repository';
import { TranslationRepository } from '../repository/repositories/translation.repository';
import { CachedTranslations, TranslationCacheKey } from '../types/i18n.type';

@Injectable({
  scope: Scope.REQUEST,
})
export class I18nService {
  private readonly CACHE_KEY = 'i18n_translations';
  private readonly CACHE_TTL = 60 * 60 * 1000;

  constructor(
    private readonly translationRepository: TranslationRepository,
    private readonly languageRepository: LanguageRepository,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  /**
   * Get a translation by key, namespace, and language
   * @param key Translation key
   * @param options Translation options
   * @returns Translated string
   */
  async t(
    key: string,
    options: {
      lang?: string;
      namespace?: string;
      args?: Record<string, any>;
      defaultValue?: string;
    } = {},
  ): Promise<string> {
    const {
      lang = this.request['locale'] || 'en',
      namespace = 'common',
      args = {},
      defaultValue = key,
    } = options;

    try {
      // Get translation from cache or database
      const translation = await this.getTranslation(key, lang, namespace);

      if (!translation) {
        this.logger.warn(
          `Translation not found: key=${key}, lang=${lang}, namespace=${namespace}`,
        );
        return this.interpolate(defaultValue, args);
      }

      return this.interpolate(translation.value, args);
    } catch (error) {
      this.logger.error('Error getting translation:', error);
      return this.interpolate(defaultValue, args);
    }
  }

  /**
   * Get multiple translations by namespace and language
   * @param namespace Translation namespace
   * @param lang Language code
   * @returns Object with translations
   */
  async getTranslations(
    namespace: string = 'common',
    lang: string = this.request['locale'] || 'en',
  ): Promise<Record<string, string>> {
    try {
      const cacheKey = this.getCacheKey({ language: lang, namespace });

      // Try to get from cache first
      const cachedTranslations: Record<string, string> =
        await this.cacheManager.get(cacheKey);

      if (cachedTranslations) {
        this.logger.debug(
          `Translations retrieved from cache for ${namespace}:${lang}`,
        );
        return cachedTranslations;
      }

      // Load from database
      this.logger.debug(
        `Loading translations from database for ${namespace}:${lang}`,
      );
      const translations =
        await this.translationRepository.findByLanguageAndNamespace(
          lang,
          namespace,
        );

      const translationsMap: Record<string, string> = {};
      translations.forEach((translation) => {
        translationsMap[translation.key] = translation.value;
      });

      // Cache the translations
      this.logger.debug(
        `Caching ${Object.keys(translationsMap).length} translations for ${namespace}:${lang}`,
      );
      await this.cacheManager.set(cacheKey, translationsMap, this.CACHE_TTL);

      return translationsMap;
    } catch (error) {
      this.logger.error(
        `Error loading translations for ${namespace}:${lang}`,
        error,
      );
      return {};
    }
  }

  /**
   * Get all translations for a language
   * @param lang Language code
   * @returns Nested object with all translations organized by namespace
   */
  async getAllTranslations(
    lang: string = this.request['locale'] || 'en',
  ): Promise<CachedTranslations> {
    try {
      const cacheKey = `${this.CACHE_KEY}:all:${lang}`;

      // Try to get from cache first
      const cachedData: CachedTranslations =
        await this.cacheManager.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      // Load all translations for the language from database
      const allTranslations = await this.translationRepository.findAll();
      const languageTranslations = allTranslations.filter(
        (t) => t.language.code === lang && t.status === EStatus.active,
      );

      const translationsMap: CachedTranslations = {};

      languageTranslations.forEach((translation) => {
        const namespaceName = translation.namespace.name;
        if (!translationsMap[namespaceName]) {
          translationsMap[namespaceName] = {};
        }
        translationsMap[namespaceName][translation.key] = translation.value;
      });

      // Cache the translations
      await this.cacheManager.set(cacheKey, translationsMap, this.CACHE_TTL);

      return translationsMap;
    } catch (error) {
      this.logger.error(`Error loading all translations for ${lang}`, error);
      return {};
    }
  }

  /**
   * Check if a translation exists
   * @param key Translation key
   * @param lang Language code
   * @param namespace Translation namespace
   * @returns boolean
   */
  async exists(
    key: string,
    lang: string = this.request['locale'] || 'en',
    namespace: string = 'common',
  ): Promise<boolean> {
    try {
      const translation = await this.getTranslation(key, lang, namespace);
      return !!translation;
    } catch (error) {
      this.logger.error('Error checking translation existence:', error);
      return false;
    }
  }

  /**
   * Get available languages
   * @returns Array of available language codes
   */
  async getAvailableLanguages(): Promise<string[]> {
    try {
      const cacheKey = `${this.CACHE_KEY}:languages`;

      // Try to get from cache first
      const cachedLanguages: string[] = await this.cacheManager.get(cacheKey);

      if (cachedLanguages) {
        return cachedLanguages;
      }

      // Load from database
      const languages = await this.languageRepository.find({
        where: { status: EStatus.active },
        select: ['code'],
      });

      const languageCodes = languages.map((lang) => lang.code);

      // Cache the languages
      await this.cacheManager.set(cacheKey, languageCodes, this.CACHE_TTL);

      return languageCodes;
    } catch (error) {
      this.logger.error('Error loading available languages', error);
      return [this.request['locale'] || 'en']; // Fallback to request locale or 'en'
    }
  }

  /**
   * Get cache statistics for monitoring
   */
  async getCacheStats(): Promise<{
    languages: number;
    namespaces: Record<string, number>;
    totalTranslations: number;
    cacheHitRate?: number;
  }> {
    try {
      const languages = await this.getAvailableLanguages();
      const stats = {
        languages: languages.length,
        namespaces: {} as Record<string, number>,
        totalTranslations: 0,
      };

      for (const lang of languages) {
        const allTranslations = await this.getAllTranslations(lang);
        Object.keys(allTranslations).forEach((namespace) => {
          const translationCount = Object.keys(
            allTranslations[namespace],
          ).length;
          if (!stats.namespaces[namespace]) {
            stats.namespaces[namespace] = 0;
          }
          stats.namespaces[namespace] += translationCount;
          stats.totalTranslations += translationCount;
        });
      }

      return stats;
    } catch (error) {
      this.logger.error('Error getting cache stats:', error);
      return { languages: 0, namespaces: {}, totalTranslations: 0 };
    }
  }

  /**
   * Reload translations for a specific language and namespace
   * @param lang Language code
   * @param namespace Translation namespace
   */
  async reloadTranslations(lang?: string, namespace?: string): Promise<void> {
    try {
      if (lang && namespace) {
        // Clear specific cache entry
        const cacheKey = this.getCacheKey({ language: lang, namespace });
        await this.cacheManager.del(cacheKey);
      } else if (lang) {
        // Clear all cache entries for a language
        const pattern = `${this.CACHE_KEY}:${lang}:*`;
        await this.clearCacheByPattern(pattern);

        // Also clear the 'all' cache for this language
        await this.cacheManager.del(`${this.CACHE_KEY}:all:${lang}`);
      } else {
        // Clear all translation cache
        const pattern = `${this.CACHE_KEY}:*`;
        await this.clearCacheByPattern(pattern);
      }

      this.logger.log(
        `Reloaded translations for ${lang || 'all'}:${namespace || 'all'}`,
      );
    } catch (error) {
      this.logger.error('Error reloading translations:', error);
    }
  }

  /**
   * Private method to get a single translation
   * @param key Translation key
   * @param lang Language code
   * @param namespace Translation namespace
   * @returns Translation entity or null
   */
  private async getTranslation(
    key: string,
    lang: string,
    namespace: string,
  ): Promise<Translation | null> {
    // First try to get from the namespace cache
    const translations = await this.getTranslations(namespace, lang);

    if (translations[key]) {
      // Create a mock translation object for consistency
      return {
        key,
        value: translations[key],
        language: { code: lang } as any,
        namespace: { name: namespace } as any,
      } as Translation;
    }

    // If not found in cache, try direct database lookup
    return await this.translationRepository.findByKeyAndLanguage(
      key,
      lang,
      namespace,
    );
  }

  /**
   * Private method to interpolate variables in translation strings
   * @param text Translation text with placeholders
   * @param args Variables to interpolate
   * @returns Interpolated string
   */
  private interpolate(text: string, args: Record<string, any>): string {
    if (!args || Object.keys(args).length === 0) {
      return text;
    }

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return args[key] !== undefined ? String(args[key]) : match;
    });
  }

  /**
   * Private method to generate cache key
   * @param options Cache key options
   * @returns Cache key string
   */
  private getCacheKey(options: TranslationCacheKey): string {
    const { language, namespace } = options;
    return namespace
      ? `${this.CACHE_KEY}:${language}:${namespace}`
      : `${this.CACHE_KEY}:${language}`;
  }

  /**
   * Private method to clear cache by pattern
   * @param pattern Cache key pattern
   */
  private async clearCacheByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.cacheManager.store.keys(pattern);
      if (keys.length > 0) {
        await this.cacheManager.store.mdel(...keys);
      }
    } catch (error) {
      this.logger.warn('Failed to clear cache by pattern:', error);
    }
  }
}
