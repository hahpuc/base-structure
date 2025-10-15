import { BaseService } from "./base.service";
import { CategoryDto, CreateCategory, EditCategory } from "@/types/category";
import { API_ENDPOINTS } from "@/constants/enum";

class CategoryService extends BaseService<
  CategoryDto,
  CreateCategory,
  EditCategory
> {
  protected baseUrl = API_ENDPOINTS.CATEGORIES;
}

export const categoryService = new CategoryService();
