import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Province } from './entities/province.entity';
import { Ward } from './entities/ward.entity';
import { ProvinceRepository } from './repositories/province.repository';
import { WardRepository } from './repositories/ward.repository';

@Module({
  providers: [ProvinceRepository, WardRepository],
  exports: [ProvinceRepository, WardRepository],
  imports: [TypeOrmModule.forFeature([Province, Ward])],
})
export class LocationRepositoryModule {}
