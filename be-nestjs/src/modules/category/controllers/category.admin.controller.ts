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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FilterCategoryDto } from '../dtos/filter-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../repository/entities/category.entity';
import { CategoryService } from '../services/category.service';

@Controller('categories')
@ApiTags('Category')
@ApiBearerAuth('accessToken')
export class CategoryAdminController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'category_manage_create' })
  async create(@Body() body: CreateCategoryDto): Promise<void> {
    return this.service.create(body);
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'category_manage_read' })
  async getAll(): Promise<Category[]> {
    return await this.service.getAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'category_manage_read' })
  async getList(
    @Query() param: FilterCategoryDto,
  ): Promise<ListPaginate<Category>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'category_manage_read' })
  async getById(@Param('id') id: number): Promise<Category> {
    return await this.service.getById(id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'category_manage_update' })
  async update(@Body() body: UpdateCategoryDto): Promise<void> {
    return await this.service.update(body);
  }

  @Delete(':id([0-9]+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'category_manage_delete' })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.service.delete(id);
  }
}
