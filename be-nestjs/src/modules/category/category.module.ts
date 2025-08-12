import { PermissionRepositoryModule } from '@modules/permission/repository/permission.repository.module';
import { Module } from '@nestjs/common';

import { CategoryRepositoryModule } from './repository/category.repository.module';
import { CategoryService } from './services/category.service';

@Module({
  imports: [CategoryRepositoryModule, PermissionRepositoryModule],
  controllers: [],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
