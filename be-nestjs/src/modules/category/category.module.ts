import { createSimpleModule } from '@common/base/modules/base.module.factory';

import { CategoryAdminController } from './controllers/category.admin.controller';
import { CategoryPublicController } from './controllers/category.public.controller';
import { Category } from './repository/entities/category.entity';
import { CategoryRepository } from './repository/repositories/category.repository';
import { CategoryService } from './services/category.service';

export const CategoryModule = createSimpleModule({
  entity: Category,
  service: CategoryService,
  adminController: CategoryAdminController,
  publicController: CategoryPublicController,
  repository: CategoryRepository,
});
