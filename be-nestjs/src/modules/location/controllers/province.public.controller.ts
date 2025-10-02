import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Province } from '../repository/entities/province.entity';
import { ProvinceService } from '../services/province.service';

@Controller('provinces')
@ApiTags('Provinces')
@ApiBearerAuth('accessToken')
export class ProvincePublicController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(): Promise<Province[]> {
    return await this.provinceService.getAll();
  }
}
