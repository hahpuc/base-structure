import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { CreateTranslationDto } from '../dtos/translation/create-translation.dto';
import { FilterTranslationDto } from '../dtos/translation/filter-translation.dto';
import { UpdateTranslationDto } from '../dtos/translation/update-translation.dto';
import { Translation } from '../repository/entities/translation.entity';
import { TranslationService } from '../services/translate.service';

@Controller('translations')
@ApiTags('Translations')
@ApiBearerAuth('accessToken')
export class TranslationAdminController {
  constructor(private readonly translationService: TranslationService) {}

  // MARK: CRUD Operations
  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() params: FilterTranslationDto,
  ): Promise<ListPaginate<Translation>> {
    return await this.translationService.getList(params);
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Translation[]> {
    return await this.translationService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'translation_manage_create' })
  async create(@Body() body: CreateTranslationDto): Promise<void> {
    return await this.translationService.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'translation_manage_update' })
  async update(@Body() body: UpdateTranslationDto): Promise<void> {
    return await this.translationService.update(body);
  }

  @Delete(':id([0-9]+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'translation_manage_delete' })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.translationService.delete(id);
  }

  // MARK: Bulk Operations
  @Post('/bulk-import')
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'translation_manage_create' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async bulkImport(
    @UploadedFile() file: Express.Multer.File,
    @Body('language') language: string,
    @Body('namespace') namespace: string,
  ): Promise<void> {
    if (!file) {
      throw new Error('File is required');
    }

    const fileContent = file.buffer.toString('utf-8');
    const translations = JSON.parse(fileContent);

    return await this.translationService.bulkImport(
      language,
      namespace,
      translations,
    );
  }

  @Post('/bulk-import-json')
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'translation_manage_create' })
  async bulkImportJson(
    @Body()
    body: {
      language: string;
      namespace: string;
      translations: Record<string, string>;
    },
  ): Promise<void> {
    return await this.translationService.bulkImport(
      body.language,
      body.namespace,
      body.translations,
    );
  }

  @Get('/export/:language')
  @HttpCode(HttpStatus.OK)
  async exportTranslations(
    @Param('language') language: string,
    @Query('namespace') namespace?: string,
  ): Promise<Record<string, any>> {
    return await this.translationService.exportTranslations(
      language,
      namespace,
    );
  }
}
