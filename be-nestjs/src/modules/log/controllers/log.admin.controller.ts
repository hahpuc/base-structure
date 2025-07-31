import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LogService } from '../services/log.service';

@Controller('logs')
@ApiTags('Log')
@ApiBearerAuth('accessToken')
export class LogAdminController {
  constructor(private readonly service: LogService) {}

  @Get()
  getListLogs(): { data: string[] } {
    return this.service.getListLog();
  }

  @Get(':logFile')
  getLogByName(@Param('logFile') logFile: string): StreamableFile | [] {
    return this.service.readLogByName(logFile);
  }
}
