import { Module } from '@nestjs/common';

import { LogService } from './services/log.service';

@Module({
  imports: [],
  exports: [LogService],
  providers: [LogService],
  controllers: [],
})
export class LogModule {}
