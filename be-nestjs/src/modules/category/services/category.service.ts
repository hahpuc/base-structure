import { BaseService } from '@common/base/services/base.service';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FilterCategoryDto } from '../dtos/filter-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../repository/entities/category.entity';
import { CategoryRepository } from '../repository/repositories/category.repository';

@Injectable()
export class CategoryService extends BaseService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto
> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    i18nService: I18nService,
  ) {
    super(categoryRepository, i18nService, 'category');
  }

  /**
   * Get category by ID or slug
   */
  async getByIdOrSlug(idOrSlug: number | string): Promise<Category> {
    const category = await this.categoryRepository.findByIdOrSlug(idOrSlug);

    if (!category) {
      throw new CustomError(404, 'NOT_FOUND', this.message.get('NOT_FOUND'));
    }

    return category;
  }

  /**
   * Validation before creating a category
   */
  protected async beforeCreate(input: CreateCategoryDto): Promise<void> {
    // Check if slug already exists
    const existingCategory = await this.getByField('slug', input.slug);
    if (existingCategory) {
      throw new CustomError(
        409,
        'SLUG_ALREADY_EXISTS',
        this.message.get('SLUG_ALREADY_EXISTS'),
      );
    }

    // Check if name already exists
    const existingNameCategory = await this.getByField('name', input.name);
    if (existingNameCategory) {
      throw new CustomError(
        409,
        'NAME_ALREADY_EXISTS',
        this.message.get('NAME_ALREADY_EXISTS'),
      );
    }
  }

  /**
   * Validation before updating a category
   */
  protected async beforeUpdate(
    input: UpdateCategoryDto,
    entity: Category,
  ): Promise<void> {
    // Check if slug already exists (excluding current entity)
    if (input.slug && input.slug !== entity.slug) {
      const existingSlugCategory = await this.getByField('slug', input.slug);
      if (existingSlugCategory && existingSlugCategory.id !== entity.id) {
        throw new CustomError(
          409,
          'SLUG_ALREADY_EXISTS',
          this.message.get('SLUG_ALREADY_EXISTS'),
        );
      }
    }

    // Check if name already exists (excluding current entity)
    if (input.name && input.name !== entity.name) {
      const existingNameCategory = await this.getByField('name', input.name);
      if (existingNameCategory && existingNameCategory.id !== entity.id) {
        throw new CustomError(
          409,
          'NAME_ALREADY_EXISTS',
          this.message.get('NAME_ALREADY_EXISTS'),
        );
      }
    }
  }

  /**
   * Get categories by order index
   */
  async getCategoriesByOrder(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: { order_index: 'ASC', name: 'ASC' },
    });
  }

  /**
   * Update category order
   */
  async updateOrder(categoryId: number, newOrderIndex: number): Promise<void> {
    const category = await this.getById(categoryId);
    category.order_index = newOrderIndex;
    await this.categoryRepository.save(category);
  }
}
