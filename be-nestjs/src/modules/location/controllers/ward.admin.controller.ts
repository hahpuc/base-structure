import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import { BaseImportDto } from '@common/request/dtos/import.dto';
import { ApiPaginatedResponse } from '@common/response/decorators/paginate-response.decorator';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateWardDto } from '../dtos/ward/create-ward.dto';
import { FilterWardDto } from '../dtos/ward/filter-ward.dto';
import { UpdateWardDto } from '../dtos/ward/update-ward.dto';
import { Ward } from '../repository/entities/ward.entity';
import { WardService } from '../services/ward.service';

@Controller('wards')
@ApiTags('Wards')
export class WardAdminController {
  constructor(private readonly service: WardService) {}

  @Post()
  @Auth({ permissions: 'ward_manage_create' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateWardDto): Promise<void> {
    return await this.service.create(body);
  }

  @Get('/:id([0-9]+)')
  @Auth({ permissions: 'ward_manage_read' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Ward })
  async getById(@Param('id') id: number): Promise<Ward> {
    return await this.service.getById(id);
  }

  @Get()
  // @Auth({ permissions: 'ward_manage_read' })
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse({ type: Ward })
  async getList(@Query() param: FilterWardDto): Promise<ListPaginate<Ward>> {
    return await this.service.getList(param);
  }

  @Put()
  @Auth({ permissions: 'ward_manage_update' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() body: UpdateWardDto): Promise<void> {
    return await this.service.update(body);
  }

  @Get('/export')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'ward_manage_export' })
  async export(@Query() param: FilterWardDto): Promise<ExportResponse> {
    return await this.service.export(param);
  }

  @Post('/import')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'ward_manage_import' })
  async import(@Body() body: BaseImportDto) {
    return await this.service.import(body);
  }

  @Put('/toggle/status/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'ward_manage_update' })
  async toggleStatus(@Param('id') id: number): Promise<void> {
    await this.service.toggleStatus(id);
  }
}
