import { Module } from '@nestjs/common';

import { LocationRepositoryModule } from './repository/location.repository.module';
import { ProvinceService } from './services/province.service';
import { WardService } from './services/ward.service';

@Module({
  imports: [LocationRepositoryModule],
  exports: [ProvinceService, WardService],
  providers: [ProvinceService, WardService],
  controllers: [],
})
export class LocationModule {}
