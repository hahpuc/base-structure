import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FilterCategoryDto } from '../dtos/filter-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../repository/entities/category.entity';
import { CategoryRepository } from '../repository/repositories/category.repository';

@Injectable()
export class CategoryService {
  private categoryMessage: MessageService;

  constructor(
    private readonly categoryRepository: CategoryRepository,
    i18nService: I18nService,
  ) {
    this.categoryMessage = new MessageService(i18nService, 'category');
  }

  async create(input: CreateCategoryDto): Promise<void> {
    await this._checkSlugExist(input.slug);

    const category = new Category();

    Object.assign(category, {
      ...input,
    });

    await this.categoryRepository.save(category);
  }

  async getById(id: number): Promise<Category> {
    const app = await this.categoryRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.categoryMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getList(params: FilterCategoryDto): Promise<ListPaginate<Category>> {
    const [data, count] = await this.categoryRepository.getList(params);

    return wrapPagination<Category>(data, count, params);
  }

  async update(input: UpdateCategoryDto): Promise<void> {
    const category = await this._getByIdOrSlug(input.id);

    await this._checkSlugExist(input.slug, input.id);

    Object.assign(category, { ...input });

    await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const app = await this.getById(id);
    await this.categoryRepository.remove(app);
  }

  private async _getByIdOrSlug(idOrSlug: number | string): Promise<Category> {
    const category = await this.categoryRepository.findByIdOrSlug(idOrSlug);

    if (!category) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.categoryMessage.get('NOT_FOUND'),
      );
    }

    return category;
  }

  private async _checkSlugExist(slug: string, id?: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ slug });

    if (category) {
      if (!id || category.id !== id) {
        throw new CustomError(
          400,
          'SLUG_INVALID',
          this.categoryMessage.get('SLUG_INVALID'),
        );
      }
    }
  }
}
