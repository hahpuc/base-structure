import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import { BaseImportDto } from '@common/request/dtos/import.dto';
import {
  BaseImportResponse,
  ExportResponse,
} from '@common/response/types/base.reponse.type';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateTranslationDto } from '../dtos/translation/create-translation.dto';
import { FilterTranslationDto } from '../dtos/translation/filter-translation.dto';
import { UpdateTranslationDto } from '../dtos/translation/update-translation.dto';
import { Translation } from '../repository/entities/translation.entity';
import { TranslationService } from '../services/translation.service';

@Controller('translations')
@ApiTags('translation admin management')
@ApiBearerAuth('accessToken')
export class TranslationAdminController {
  constructor(private readonly service: TranslationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async getList(
    @Query() param: FilterTranslationDto,
  ): Promise<ListPaginate<Translation>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async getById(@Param('id') id: number): Promise<Translation> {
    return await this.service.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'language_manage_create' })
  async create(@Body() body: CreateTranslationDto): Promise<number> {
    return this.service.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'language_manage_update' })
  async update(@Body() body: UpdateTranslationDto): Promise<void> {
    return await this.service.update(body);
  }

  @Get('/export')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async export(@Query() param: FilterTranslationDto): Promise<ExportResponse> {
    return this.service.export(param);
  }

  @Post('/import')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_update' })
  async import(@Body() body: BaseImportDto): Promise<BaseImportResponse> {
    return this.service.import(body);
  }
}
