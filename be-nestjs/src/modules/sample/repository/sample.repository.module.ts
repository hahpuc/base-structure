import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sample } from './entities/sample.entity';
import { SampleRepository } from './repositories/sample.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [SampleRepository],
  exports: [SampleRepository],
})
export class SampleRepositoryModule {}
