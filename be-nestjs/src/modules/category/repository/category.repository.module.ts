import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryRepositoryModule {}
