import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { AUser } from '@common/request/decorators/params/request.params.decorator';
import { ApiPaginatedResponse } from '@common/response/decorators/paginate-response.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { ResetLockDto, UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../repository/entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('accessToken')
export class UserAdminController {
  constructor(private readonly service: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'user_manage_create' })
  async create(@Body() body: CreateUserDto): Promise<void> {
    await this.service.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'user_manage_read' })
  @ApiPaginatedResponse({ type: User })
  async getList(@Query() param: FilterUserDto): Promise<ListPaginate<User>> {
    return await this.service.getList(param);
  }

  @Get('/my-profile')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'admin' })
  @ApiOkResponse({ type: User })
  async myProfile(@AUser() user: AuthUser): Promise<User> {
    return await this.service.myProfile(user);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'user_manage_read' })
  @ApiOkResponse({ type: User })
  async getById(@Param('id') id: string): Promise<User> {
    return await this.service.getById(id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'user_manage_update' })
  async update(@Body() body: UpdateUserDto): Promise<void> {
    await this.service.update(body);
  }

  @Put('/toggle/status/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'user_manage_update' })
  async toggleStatus(@Param('id') id: string): Promise<void> {
    await this.service.toggleStatus(id);
  }

  @Put('/reset-lock')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'user_manage_update' })
  async resetPassword(@Body() body: ResetLockDto): Promise<void> {
    await this.service.resetLock(body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'user_manage_delete' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
