import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { I18nService } from './i18n.service';

@Injectable()
export class I18nCacheService implements OnModuleInit {
  private readonly logger = new Logger(I18nCacheService.name);

  constructor(private readonly i18nService: I18nService) {}

  /**
   * Warm up cache when the module initializes
   */
  async onModuleInit(): Promise<void> {
    // Add a small delay to ensure database connections are ready
    setTimeout(async () => {
      try {
        await this.i18nService.warmUpCache();
      } catch (error) {
        this.logger.error('Failed to warm up i18n cache on startup:', error);
        // Don't throw here to prevent application startup failure
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
      await this.i18nService.refreshCache();
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
      await this.i18nService.refreshCache();

      // Log cache statistics
      const stats = await this.i18nService.getCacheStats();
      this.logger.log(
        `Daily cache refresh completed. Stats: ${stats.totalTranslations} translations ` +
          `across ${stats.languages} languages and ${Object.keys(stats.namespaces).length} namespaces`,
      );
    } catch (error) {
      this.logger.error('Daily cache refresh failed:', error);
    }
  }

  /**
   * Manual cache refresh endpoint (can be called via admin API)
   */
  async manualRefresh(): Promise<{
    success: boolean;
    message: string;
    stats?: any;
  }> {
    try {
      this.logger.log('Manual cache refresh initiated');
      await this.i18nService.refreshCache();

      const stats = await this.i18nService.getCacheStats();

      return {
        success: true,
        message: 'Cache refreshed successfully',
        stats,
      };
    } catch (error) {
      this.logger.error('Manual cache refresh failed:', error);
      return {
        success: false,
        message: `Cache refresh failed: ${error.message}`,
      };
    }
  }
}
