import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import { BaseOption } from '@common/response/types/base.reponse.type';
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

import { CreateNamespaceDto } from '../dtos/namespace/create-namespace.dto';
import { FilterNamespaceDto } from '../dtos/namespace/filter-namespace.dto';
import { UpdateNamespaceDto } from '../dtos/namespace/update-namespace.dto';
import { TranslationNamespace } from '../repository/entities/translation-namespace.entity';
import { TranslationNamespaceService } from '../services/translation-namespace.service';

@Controller('namespaces')
@ApiTags('namespace admin management')
@ApiBearerAuth('accessToken')
export class NamespaceAdminController {
  constructor(private readonly service: TranslationNamespaceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async getList(
    @Query() param: FilterNamespaceDto,
  ): Promise<ListPaginate<TranslationNamespace>> {
    return await this.service.getList(param);
  }

  @Get('/options')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async getOptions(): Promise<BaseOption[]> {
    return await this.service.getOptions();
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'language_manage_read' })
  async getById(@Param('id') id: number): Promise<TranslationNamespace> {
    return await this.service.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'language_manage_create' })
  async create(@Body() body: CreateNamespaceDto): Promise<number> {
    return this.service.create(body);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'language_manage_update' })
  async update(@Body() body: UpdateNamespaceDto): Promise<void> {
    return await this.service.update(body);
  }
}
