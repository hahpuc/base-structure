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
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseCreateDto, BaseUpdateDto } from '../dtos/base.dto';
import { BaseFilterParamDto } from '../dtos/base-filter.dto';
import { BaseEntity } from '../repositories/entities/base.entity';
import { BaseService } from '../services/base.service';

/**
 * Base Admin Controller providing common CRUD operations with permissions
 */
export function BaseAdminController<
  TEntity extends BaseEntity,
  TCreateDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto,
  TFilterDto extends BaseFilterParamDto,
>(permissions: {
  create: string;
  read: string;
  update: string;
  delete: string;
}) {
  @Controller()
  @ApiBearerAuth('accessToken')
  abstract class BaseController {
    constructor(
      public readonly service: BaseService<
        TEntity,
        TCreateDto,
        TUpdateDto,
        TFilterDto
      >,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Auth({ permissions: permissions.create })
    async create(@Body() body: TCreateDto): Promise<void> {
      return await this.service.create(body);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Auth({ permissions: permissions.read })
    async getList(@Query() param: TFilterDto): Promise<ListPaginate<TEntity>> {
      return await this.service.getList(param);
    }

    @Get(':id([0-9]+)')
    @HttpCode(HttpStatus.OK)
    @Auth({ permissions: permissions.read })
    async getById(@Param('id') id: number): Promise<TEntity> {
      return await this.service.getById(id);
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Auth({ permissions: permissions.update })
    async update(@Body() body: TUpdateDto): Promise<void> {
      return await this.service.update(body);
    }

    @Delete(':id([0-9]+)')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Auth({ permissions: permissions.delete })
    async delete(@Param('id') id: number): Promise<void> {
      return await this.service.delete(id);
    }

    @Put(':id([0-9]+)/toggle-status')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Auth({ permissions: permissions.update })
    async toggleStatus(@Param('id') id: number): Promise<void> {
      return await this.service.toggleStatus(id);
    }

    @Post('bulk')
    @HttpCode(HttpStatus.CREATED)
    @Auth({ permissions: permissions.create })
    async bulkCreate(@Body() bodies: TCreateDto[]): Promise<void> {
      return await this.service.bulkCreate(bodies);
    }

    @Delete('bulk')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Auth({ permissions: permissions.delete })
    async bulkDelete(@Body('ids') ids: number[]): Promise<void> {
      return await this.service.bulkDelete(ids);
    }
  }

  return BaseController;
}
