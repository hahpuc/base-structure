import { CategoryModule } from '@modules/category/category.module';
import { CategoryPublicController } from '@modules/category/controllers/category.public.controller';
import { ProvincePublicController } from '@modules/location/controllers/province.public.controller';
import { WardPublicController } from '@modules/location/controllers/ward.public.controller';
import { LocationModule } from '@modules/location/location.module';
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
    ProvincePublicController,
    WardPublicController,
    CategoryPublicController,
  ],
  providers: [],
  exports: [],
  imports: [
    TerminusModule,
    SystemModule,
    UserModule,
    PermissionModule,
    LocationModule,
    CategoryModule,
  ],
})
export class RoutesPublicModule {}
