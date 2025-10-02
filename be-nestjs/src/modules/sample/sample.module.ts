import { PermissionRepositoryModule } from '@modules/permission/repository/permission.repository.module';
import { Module } from '@nestjs/common';

import { SampleRepositoryModule } from './repository/sample.repository.module';
import { SampleService } from './services/sample.service';

@Module({
  imports: [SampleRepositoryModule, PermissionRepositoryModule],
  controllers: [],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleModule {}
