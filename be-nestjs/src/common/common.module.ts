import { ExcelModule } from '@common/excel/excel.module';
import { QueueConfigModule } from '@common/queue/queue.module';
import { S3Module } from '@common/s3/s3.module';
import configs from '@configs/index';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CacheConfigModule } from './cache/cache.config.module';
import { DatabaseModule } from './database/database.module';
import { ErrorModule } from './error/error.module';
import { JobsModule } from './jobs/jobs.module';
import { LoggerModule } from './logger/logger.module';
import { MessageModule } from './message/message.module';
import { RequestModule } from './request/request.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }), //todo: validate .env
    LoggerModule,
    DatabaseModule,
    ErrorModule,
    RequestModule,
    JobsModule.forRoot(),
    MessageModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CacheConfigModule,
    QueueConfigModule,
    ExcelModule,
    S3Module,
  ],
})
export class CommonModule {}
