import { ListPaginate } from '@common/database/types/database.type';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FilterCategoryDto } from '../dtos/filter-category.dto';
import { Category } from '../repository/entities/category.entity';
import { CategoryService } from '../services/category.service';

@Controller('categories')
@ApiTags('Category')
export class CategoryPublicController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() param: FilterCategoryDto,
  ): Promise<ListPaginate<Category>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: number): Promise<Category> {
    return await this.service.getById(id);
  }

  @Get('test/i18n')
  @HttpCode(HttpStatus.OK)
  async testI18n(
    @Query('key') key: string,
    @Query('namespace') namespace: string,
  ): Promise<any> {
    return this.service.testI18n(key, namespace);
  }
}
