import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { SystemRepositoryModule } from './repository/system.repository.module';
import { SystemService } from './services/system.service';

@Module({
  imports: [SystemRepositoryModule],
  exports: [SystemService],
  providers: [SystemService],
  controllers: [],
})
export class SystemModule implements OnApplicationBootstrap {
  constructor(private readonly systemService: SystemService) {}
  onApplicationBootstrap(): void {
    this.systemService.cachingDefaultValue().then();
  }
}
