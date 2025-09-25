import { EStatus } from '@app/constant/app.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Cache } from 'cache-manager';

import { Translation } from '../repository/entities/translation.entity';
import { LanguageRepository } from '../repository/repositories/language.repository';
import { TranslationRepository } from '../repository/repositories/translation.repository';
import { CachedTranslations, TranslationCacheKey } from '../types/i18n.type';

@Injectable()
export class I18nCacheService implements OnModuleInit {
  private readonly CACHE_KEY = 'i18n_translations';
  private readonly CACHE_TTL = 60 * 60 * 1000;

  constructor(
    private readonly logger: Logger,
    private readonly translationRepository: TranslationRepository,
    private readonly languageRepository: LanguageRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Warm up cache when the module initializes
   */
  async onModuleInit(): Promise<void> {
    // Add a small delay to ensure database connections are ready
    setTimeout(async () => {
      try {
        await this.warmUpCache();
      } catch (error) {
        this.logger.error('Failed to warm up i18n cache on startup:', error);
      }
    }, 2000); // 2 second delay
  }

  /**
   * Refresh cache every 4 hours
   * This ensures translations stay fresh even if the cache TTL expires
   */
  @Cron(CronExpression.EVERY_4_HOURS)
  async refreshCachePeriodically(): Promise<void> {
    this.logger.log('Starting periodic cache refresh...');
    try {
      await this.refreshCache();
      this.logger.log('Periodic cache refresh completed successfully');
    } catch (error) {
      this.logger.error('Periodic cache refresh failed:', error);
    }
  }

  /**
   * Refresh cache at midnight daily
   * This ensures a clean start each day
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async refreshCacheDaily(): Promise<void> {
    this.logger.log('Starting daily cache refresh...');
    try {
      await this.refreshCache();

      this.logger.log(`Daily cache refresh completed`);
    } catch (error) {
      this.logger.error('Daily cache refresh failed:', error);
    }
  }

  /**
   * Manual cache refresh endpoint (can be called via admin API)
   */
  async manualRefresh(): Promise<void> {
    try {
      this.logger.log('Manual cache refresh initiated');
      await this.refreshCache();
    } catch (error) {
      this.logger.error('Manual cache refresh failed:', error);
    }
  }

  /**
   * Warm up cache by preloading all active translations
   * Should be called on application startup
   */
  async warmUpCache(): Promise<void> {
    try {
      this.logger.log('Starting cache warm-up...');
      const startTime = Date.now();

      // Get all active languages
      const languages = await this.languageRepository.find({
        where: { status: EStatus.active },
        select: ['code'],
      });

      // Get all translations grouped by language
      let allTranslations: Translation[];
      let activeTranslations: Translation[];

      try {
        allTranslations = await this.translationRepository.find({
          relations: ['namespace', 'language'],
          where: { status: EStatus.active },
        });

        activeTranslations = allTranslations.filter(
          (t) => t?.status === EStatus.active,
        );
      } catch (error) {
        this.logger.error('Failed to fetch translations from database:', error);
        throw new Error(`Database query failed: ${error.message}`);
      }

      this.logger.log(
        `Found ${languages.length} active languages and ${activeTranslations.length} active translations`,
      );

      // Group translations by language and namespace
      const translationsByLang: Record<string, CachedTranslations> = {};
      const namespacesByLang: Record<string, Set<string>> = {};

      activeTranslations.forEach((translation) => {
        try {
          // Safety checks for null/undefined values
          if (
            !translation?.language?.code ||
            !translation?.namespace?.name ||
            !translation?.key
          ) {
            this.logger.warn('Skipping invalid translation:', {
              translationId: translation?.id,
              hasLanguage: !!translation?.language,
              hasNamespace: !!translation?.namespace,
              hasKey: !!translation?.key,
            });
            return;
          }

          const langCode = translation.language.code;
          const namespaceName = translation.namespace.name;

          if (!translationsByLang[langCode]) {
            translationsByLang[langCode] = {};
            namespacesByLang[langCode] = new Set();
          }

          if (!translationsByLang[langCode][namespaceName]) {
            translationsByLang[langCode][namespaceName] = {};
          }

          translationsByLang[langCode][namespaceName][translation.key] =
            translation.value || '';
          namespacesByLang[langCode].add(namespaceName);
        } catch (error) {
          this.logger.error('Error processing translation:', {
            translationId: translation?.id,
            error: error.message,
          });
        }
      });

      this.logger.debug(
        `Grouped ${activeTranslations.length} translations by language and namespace`,
      );

      // Cache all translations
      const cachePromises: Promise<void>[] = [];

      for (const [langCode, namespaces] of Object.entries(translationsByLang)) {
        // Cache all translations for the language
        const allLangCacheKey = `${this.CACHE_KEY}:all:${langCode}`;
        cachePromises.push(
          this.cacheManager.set(allLangCacheKey, namespaces, this.CACHE_TTL),
        );

        // Cache each namespace separately
        for (const [namespaceName, translations] of Object.entries(
          namespaces,
        )) {
          const namespaceCacheKey = this.getCacheKey({
            language: langCode,
            namespace: namespaceName,
          });
          cachePromises.push(
            this.cacheManager.set(
              namespaceCacheKey,
              translations,
              this.CACHE_TTL,
            ),
          );
        }
      }

      this.logger.debug(`Prepared ${cachePromises.length} cache operations`);

      // Cache available languages
      const languageCodes = languages.map((lang) => lang.code);
      const languagesCacheKey = `${this.CACHE_KEY}:languages`;
      cachePromises.push(
        this.cacheManager.set(languagesCacheKey, languageCodes, this.CACHE_TTL),
      );

      // Wait for all cache operations to complete
      try {
        await Promise.all(cachePromises);
        this.logger.debug('All cache operations completed successfully');
      } catch (error) {
        this.logger.error('Some cache operations failed:', error);
        throw new Error(`Cache operations failed: ${error.message}`);
      }

      const endTime = Date.now();
      const totalLanguages = Object.keys(translationsByLang).length;
      const totalNamespaces = Object.values(namespacesByLang).reduce(
        (sum, namespaces) => sum + namespaces.size,
        0,
      );
      const totalTranslations = activeTranslations.length;

      this.logger.log(
        `Cache warm-up completed in ${endTime - startTime}ms. ` +
          `Cached ${totalTranslations} translations across ${totalNamespaces} namespaces ` +
          `in ${totalLanguages} languages.`,
      );
    } catch (error) {
      this.logger.error('Error during cache warm-up:', error);
      throw error;
    }
  }

  /**
   * Refresh cache periodically or on-demand
   * This method can be called by a cron job or scheduler
   */
  async refreshCache(): Promise<void> {
    try {
      this.logger.log('Starting cache refresh...');

      // Clear all i18n cache
      await this.clearCacheByPattern(`${this.CACHE_KEY}:*`);

      // Warm up cache again
      await this.warmUpCache();

      this.logger.log('Cache refresh completed successfully');
    } catch (error) {
      this.logger.error('Error during cache refresh:', error);
    }
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
