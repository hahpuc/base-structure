import { AuthModule } from '@auth/auth.module';
import { RoleRepositoryModule } from '@modules/role/repository/role.repository.module';
import { SystemModule } from '@modules/system/system.module';
import { Module } from '@nestjs/common';

import { UserRepositoryModule } from './repository/user.repository.module';
import { UserService } from './services/user.service';

@Module({
  imports: [
    RoleRepositoryModule,
    UserRepositoryModule,
    AuthModule,
    SystemModule,
  ],
  exports: [UserService, UserRepositoryModule],
  providers: [UserService],
  controllers: [],
})
export class UserModule {}
