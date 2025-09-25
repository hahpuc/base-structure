import { BlogPostModule } from '@modules/blog-post/blog-post.module';
import { BlogPostAdminController } from '@modules/blog-post/controllers/blog-post.admin.controller';
import { CategoryModule } from '@modules/category/category.module';
import { CategoryAdminController } from '@modules/category/controllers/category.admin.controller';
import { LanguageAdminController } from '@modules/language/controllers/language.admin.controller';
import { TranslationAdminController } from '@modules/language/controllers/translate.admin.controller';
import { ProvinceAdminController } from '@modules/location/controllers/province.admin.controller';
import { WardAdminController } from '@modules/location/controllers/ward.admin.controller';
import { LocationModule } from '@modules/location/location.module';
import { LogAdminController } from '@modules/log/controllers/log.admin.controller';
import { LogModule } from '@modules/log/log.module';
import { PermissionAdminController } from '@modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from '@modules/permission/permission.module';
import { RoleAdminController } from '@modules/role/controllers/role.admin.controller';
import { RoleModule } from '@modules/role/role.module';
import { SampleAdminController } from '@modules/sample/controllers/sample.admin.controller';
import { SampleModule } from '@modules/sample/sample.module';
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
    ProvinceAdminController,
    WardAdminController,
    CategoryAdminController,
    SampleAdminController,
    BlogPostAdminController,
    LanguageAdminController,
    TranslationAdminController,
  ],
  providers: [],
  exports: [],
  imports: [
    RoleModule,
    PermissionModule,
    UserModule,
    SystemModule,
    LogModule,
    LocationModule,
    CategoryModule,
    SampleModule,
    BlogPostModule,
    // LanguageModule removed - now global via CommonModule
  ],
})
export class RoutesAdminModule {}
