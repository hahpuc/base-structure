import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { System } from './entities/system.entity';
import { SystemRepository } from './repositories/system.repository';

@Module({
  providers: [SystemRepository],
  exports: [SystemRepository],
  imports: [TypeOrmModule.forFeature([System])],
})
export class SystemRepositoryModule {}
