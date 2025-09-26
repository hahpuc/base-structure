import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import { BaseOption } from '@common/response/types/base.reponse.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateLanguageDto } from '../dtos/language/create-language.dto';
import { FilterLanguageDto } from '../dtos/language/filter-language.dto';
import { UpdateLanguageDto } from '../dtos/language/update-language.dto';
import { Language } from '../repository/entities/language.entity';
import { I18nService } from '../services/i18n.service';
import { I18nCacheService } from '../services/i18n-cache.service';
import { LanguageService } from '../services/language.service';
import { CachedTranslations } from '../types/i18n.type';

@Controller('languages')
@ApiTags('Languages')
@ApiBearerAuth('accessToken')
export class LanguageAdminController {
  constructor(
    private readonly languageService: LanguageService,
    private readonly i18nService: I18nService,
    private readonly i18nCacheService: I18nCacheService,
  ) {}

  // MARK: Managements
  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() param: FilterLanguageDto,
  ): Promise<ListPaginate<Language>> {
    return await this.languageService.getList(param);
  }

  @Get('/options')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async getOptions(): Promise<BaseOption[]> {
    return await this.languageService.getOptions();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'language_manage_create' })
  async create(@Body() body: CreateLanguageDto): Promise<void> {
    return this.languageService.create(body);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: number): Promise<Language> {
    return await this.languageService.getById(id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'language_manage_update' })
  async update(@Body() body: UpdateLanguageDto): Promise<void> {
    return await this.languageService.update(body);
  }

  @Delete(':id([0-9]+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'language_manage_delete' })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.languageService.delete(id);
  }

  // MARK: Cache Management
  @Post('/cache/refresh')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_update' })
  async refreshCache(): Promise<void> {
    return await this.i18nCacheService.manualRefresh();
  }

  @Get('/cache/stats')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async getCacheStats(): Promise<{
    languages: number;
    namespaces: Record<string, number>;
    totalTranslations: number;
    cacheHitRate?: number;
  }> {
    return await this.i18nService.getCacheStats();
  }

  @Post('/cache/warm-up')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_update' })
  async warmUpCache(): Promise<{ success: boolean; message: string }> {
    try {
      await this.i18nCacheService.warmUpCache();
      return {
        success: true,
        message: 'Cache warmed up successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: `Cache warm-up failed: ${error.message}`,
      };
    }
  }

  @Delete('/cache/:language')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'language_manage_update' })
  async clearLanguageCache(@Param('language') language: string): Promise<void> {
    await this.i18nService.reloadTranslations(language);
  }

  @Delete('/cache/:language/:namespace')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'language_manage_update' })
  async clearNamespaceCache(
    @Param('language') language: string,
    @Param('namespace') namespace: string,
  ): Promise<void> {
    await this.i18nService.reloadTranslations(language, namespace);
  }

  // MARK: Public
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAllLanguages(): Promise<Language[]> {
    return await this.i18nService.getAllLanguages();
  }

  // {
  //   "en": {
  //     "common": {
  //       "hello": "Hello",
  //       "world": "World"
  //     },
  //     "admin": {
  //       "dashboard": "Dashboard"
  //     }
  //   },
  //   "vi": {
  //     "common": {
  //       "hello": "Xin chào",
  //       "world": "Thế giới"
  //     },
  //     "admin": {
  //       "dashboard": "Bảng điều khiển"
  //     }
  //   }
  // }
  @Get('/translations/all')
  @HttpCode(HttpStatus.OK)
  async getAllTranslations(): Promise<Record<string, CachedTranslations>> {
    return await this.i18nService.getAllTranslationsForAdmin();
  }
}
