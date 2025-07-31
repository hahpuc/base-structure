import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { AuthUser } from '@auth/types/auth.type';
import { AUser } from '@common/request/decorators/params/request.params.decorator';
import { User } from '@modules/user/repository/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FollowOADto, UpdateProfileDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('accessToken')
export class UserPublicController {
  constructor(private readonly service: UserService) {}

  @Get('/my-profile')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  @ApiOkResponse({ type: User })
  async myProfile(@AUser() user: AuthUser): Promise<User> {
    return await this.service.myProfile(user);
  }

  @Put('/my-profile')
  @HttpCode(HttpStatus.OK)
  @Auth({ scope: 'mini_app' })
  @ApiOkResponse({ type: User })
  async updateProfile(
    @Body() body: UpdateProfileDto,
    @AUser() user: AuthUser,
  ): Promise<void> {
    return await this.service.updateProfile(body, user);
  }

  @Put('/follow-oa')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ scope: 'mini_app' })
  async followOA(
    @Body() body: FollowOADto,
    @AUser() user: AuthUser,
  ): Promise<void> {
    return await this.service.followOA(body, user);
  }
}
