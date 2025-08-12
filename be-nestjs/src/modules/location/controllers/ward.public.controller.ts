import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Ward } from '../repository/entities/ward.entity';
import { WardService } from '../services/ward.service';

@Controller('wards')
@ApiTags('Wards')
@ApiBearerAuth('accessToken')
export class WardPublicController {
  constructor(private readonly wardService: WardService) {}

  @Get(':provinceId')
  @HttpCode(HttpStatus.OK)
  async getList(@Param('provinceId') provinceId: number): Promise<Ward[]> {
    return await this.wardService.getAll(+provinceId);
  }
}
