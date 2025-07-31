import { LogAdminController } from '@modules/log/controllers/log.admin.controller';
import { LogModule } from '@modules/log/log.module';
import { PermissionAdminController } from '@modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from '@modules/permission/permission.module';
import { RoleAdminController } from '@modules/role/controllers/role.admin.controller';
import { RoleModule } from '@modules/role/role.module';
import { SystemAdminController } from '@modules/system/controllers/system.admin.controller';
import { SystemModule } from '@modules/system/system.module';
import { UserAdminController } from '@modules/user/controllers/user.admin.controller';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
    PermissionAdminController,
    RoleAdminController,
    SystemAdminController,
    UserAdminController,
    LogAdminController,
  ],
  providers: [],
  exports: [],
  imports: [RoleModule, PermissionModule, UserModule, SystemModule, LogModule],
})
export class RoutesAdminModule {}
