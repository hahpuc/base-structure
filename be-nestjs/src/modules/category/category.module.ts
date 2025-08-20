import { Module } from '@nestjs/common';

import { CategoryRepositoryModule } from './repository/category.repository.module';
import { CategoryService } from './services/category.service';

@Module({
  imports: [CategoryRepositoryModule],
  exports: [CategoryService],
  providers: [CategoryService],
  controllers: [],
})
export class CategoryModule {}
