import { ListPaginate } from '@common/database/types/database.type';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';

import { BaseCreateDto, BaseUpdateDto } from '../dtos/base.dto';
import { BaseFilterParamDto } from '../dtos/base-filter.dto';
import { BaseEntity } from '../repositories/entities/base.entity';
import { BaseService } from '../services/base.service';

/**
 * Base Public Controller providing common read-only operations
 * For public APIs that don't require authentication
 */
export function BasePublicController<
  TEntity extends BaseEntity,
  TCreateDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto,
  TFilterDto extends BaseFilterParamDto,
>() {
  @Controller()
  abstract class BaseController {
    constructor(
      public readonly service: BaseService<
        TEntity,
        TCreateDto,
        TUpdateDto,
        TFilterDto
      >,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getList(@Query() param: TFilterDto): Promise<ListPaginate<TEntity>> {
      return await this.service.getList(param);
    }

    @Get(':id([0-9]+)')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<TEntity> {
      return await this.service.getById(id);
    }

    // Add slug support for SEO-friendly URLs
    @Get(':slug')
    @HttpCode(HttpStatus.OK)
    async getBySlug(@Param('slug') slug: string): Promise<TEntity> {
      return await this.service.getById(slug);
    }
  }

  return BaseController;
}
