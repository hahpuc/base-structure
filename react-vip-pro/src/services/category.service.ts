import { CategoryDto, CreateCategory, EditCategory, QueryCategory } from '@/types/category';

import { BaseService } from './base.service';
import { ApiClient } from './client/axios-client';

const API_PREFIX = '/admin';

class CategoryService extends BaseService<
  number,
  CategoryDto,
  CreateCategory,
  EditCategory,
  QueryCategory
> {
  constructor() {
    super(API_PREFIX, 'categories');
  }

  getAll() {
    return ApiClient.get<CategoryDto[]>(`${this.apiUrl}/all`);
  }
}

export const categoryService = new CategoryService();
