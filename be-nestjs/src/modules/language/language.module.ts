import { Global, Module } from '@nestjs/common';

import { LanguageRepositoryModule } from './repository/language.repository.module';
import { I18nService } from './services/i18n.service';
import { I18nCacheService } from './services/i18n-cache.service';
import { LanguageService } from './services/language.service';
import { TranslationService } from './services/translate.service';

@Global()
@Module({
  imports: [LanguageRepositoryModule],
  exports: [I18nService, LanguageService, TranslationService, I18nCacheService],
  providers: [
    I18nService,
    LanguageService,
    TranslationService,
    I18nCacheService,
  ],
  controllers: [],
})
export class LanguageModule {}
