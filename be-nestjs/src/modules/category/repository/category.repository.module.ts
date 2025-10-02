import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  providers: [CategoryRepository],
  exports: [CategoryRepository],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryRepositoryModule {}
