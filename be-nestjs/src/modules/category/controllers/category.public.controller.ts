import { BasePublicController } from '@common/base/controllers/base-public.controller';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FilterCategoryDto } from '../dtos/filter-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../repository/entities/category.entity';
import { CategoryService } from '../services/category.service';

const CategoryBasePublicController = BasePublicController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto
>();

@Controller('categories')
@ApiTags('Category')
export class CategoryPublicController extends CategoryBasePublicController {
  constructor(service: CategoryService) {
    super(service);
  }

  // All public read operations are automatically available
  // Add category-specific public methods here if needed
}
