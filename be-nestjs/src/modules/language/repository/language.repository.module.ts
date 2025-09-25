import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Language } from './entities/language.entity';
import { Translation } from './entities/translation.entity';
import { TranslationNamespace } from './entities/translation-namespace.entity';
import { LanguageRepository } from './repositories/language.repository';
import { TranslationRepository } from './repositories/translation.repository';
import { TranslationNamespaceRepository } from './repositories/translation-namespace.repository';

@Module({
  providers: [
    LanguageRepository,
    TranslationNamespaceRepository,
    TranslationRepository,
  ],
  exports: [
    LanguageRepository,
    TranslationNamespaceRepository,
    TranslationRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([Language, TranslationNamespace, Translation]),
  ],
})
export class LanguageRepositoryModule {}
