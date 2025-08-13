import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import {
  Body,
  Controller,
  Delete,
  Get,
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
@ApiTags('Categories')
@ApiBearerAuth('accessToken')
export class CategoryAdminController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Auth({ permissions: 'category_manage_create' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Auth({ permissions: 'category_manage_read' })
  async getList(
    @Query() param: FilterCategoryDto,
  ): Promise<ListPaginate<Category>> {
    return await this.categoryService.getList(param);
  }

  @Get('/all')
  @Auth({ permissions: 'category_manage_read' })
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  @Auth({ permissions: 'category_manage_read' })
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @Auth({ permissions: 'category_manage_update' })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Auth({ permissions: 'category_manage_delete' })
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
