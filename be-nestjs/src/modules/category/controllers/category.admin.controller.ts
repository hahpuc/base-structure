import { BaseAdminController } from '@common/base/controllers/base-admin.controller';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FilterCategoryDto } from '../dtos/filter-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../repository/entities/category.entity';
import { CategoryService } from '../services/category.service';

const CategoryBaseController = BaseAdminController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto
>({
  create: 'category_manage_create',
  read: 'category_manage_read',
  update: 'category_manage_update',
  delete: 'category_manage_delete',
});

@Controller('categories')
@ApiTags('Category')
export class CategoryAdminController extends CategoryBaseController {
  constructor(service: CategoryService) {
    super(service);
  }
}
