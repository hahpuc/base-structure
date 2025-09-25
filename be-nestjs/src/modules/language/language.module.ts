import { Global, Module } from '@nestjs/common';

import { LanguageRepositoryModule } from './repository/language.repository.module';
import { I18nService } from './services/i18n.service';
import { I18nCacheService } from './services/i18n-cache.service';
import { LanguageService } from './services/language.service';
import { TranslationService } from './services/translation.service';
import { TranslationNamespaceService } from './services/translation-namespace.service';

@Global()
@Module({
  imports: [LanguageRepositoryModule],
  exports: [
    I18nService,
    I18nCacheService,
    LanguageService,
    TranslationNamespaceService,
    TranslationService,
  ],
  providers: [
    I18nService,
    I18nCacheService,
    LanguageService,
    TranslationNamespaceService,
    TranslationService,
  ],
  controllers: [],
})
export class LanguageModule {}
