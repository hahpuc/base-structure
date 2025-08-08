import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import { ExportResponse } from '@common/response/types/base.reponse.type';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateProvinceDto } from '../dtos/province/create-province.dto';
import { FilterProvinceDto } from '../dtos/province/filter-province.dto';
import { UpdateProvinceDto } from '../dtos/province/update-province.dto';
import { Province } from '../repository/entities/province.entity';
import { ProvinceService } from '../services/province.service';

@Controller('provinces')
@ApiTags('Provinces')
@ApiBearerAuth('accessToken')
export class ProvinceAdminController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/not-permission')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Province[]> {
    return this.provinceService.getNotPermission();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @Auth({ permissions: 'province_manage_create' })
  async create(@Body() body: CreateProvinceDto): Promise<void> {
    return this.provinceService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  // @Auth({ permissions: 'province_manage_read' })
  async getList(
    @Query() param: FilterProvinceDto,
  ): Promise<ListPaginate<Province>> {
    return await this.provinceService.getList(param);
  }

  @Get('/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  // @Auth({ permissions: 'province_manage_read' })
  async getById(@Param('id') id: number): Promise<Province> {
    return await this.provinceService.getById(id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  // @Auth({ permissions: 'province_manage_update' })
  async update(@Body() body: UpdateProvinceDto): Promise<void> {
    return await this.provinceService.update(body);
  }

  @Get('/export')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'district_manage_export' })
  async export(@Query() param: FilterProvinceDto): Promise<ExportResponse> {
    return await this.provinceService.export(param);
  }

  @Put('/toggle/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // @Auth({ permissions: 'province_manage_update' })
  async toggleStatus(@Param('id') id: number): Promise<void> {
    await this.provinceService.toggleStatus(id);
  }
}
