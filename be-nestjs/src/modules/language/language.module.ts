import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PermissionModule } from '../permission/permission.module';
import { LanguageAdminController } from './controllers/language.admin.controller';
import { TranslationAdminController } from './controllers/translate.admin.controller';
import { LanguageRepositoryModule } from './repository/language.repository.module';
import { I18nService } from './services/i18n.service';
import { I18nCacheService } from './services/i18n-cache.service';
import { LanguageService } from './services/language.service';
import { TranslationService } from './services/translate.service';

@Module({
  imports: [
    LanguageRepositoryModule,
    PermissionModule, // Import for PermissionsGuard dependency
    ScheduleModule.forRoot(), // Enable cron jobs
    CacheModule.register({
      ttl: 3600, // 1 hour
      max: 1000, // maximum number of items in cache
    }),
  ],
  exports: [I18nService, LanguageService, TranslationService, I18nCacheService],
  providers: [
    I18nService,
    LanguageService,
    TranslationService,
    I18nCacheService,
  ],
  controllers: [LanguageAdminController, TranslationAdminController],
})
export class LanguageModule {}
