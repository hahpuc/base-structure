import { PermissionModule } from '@modules/permission/permission.module';
import { SystemPublicController } from '@modules/system/controllers/system.public.controller';
import { SystemModule } from '@modules/system/system.module';
import { UserPublicController } from '@modules/user/controllers/user.public.controller';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthPublicController } from 'src/health/controllers/health.public.controller';

@Module({
  controllers: [
    HealthPublicController,
    SystemPublicController,
    UserPublicController,
  ],
  providers: [],
  exports: [],
  imports: [TerminusModule, SystemModule, UserModule, PermissionModule],
})
export class RoutesPublicModule {}
