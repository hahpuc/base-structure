import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateSampleDto } from '../dtos/create-sample.dto';
import { FilterSampleDto } from '../dtos/filter-sample.dto';
import { UpdateSampleDto } from '../dtos/update-sample.dto';
import { Sample } from '../repository/entities/sample.entity';
import { SampleService } from '../services/sample.service';

@Controller('samples')
@ApiTags('Samples')
@ApiBearerAuth('accessToken')
export class SampleAdminController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @Auth({ permissions: 'sample_manage_create' })
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  @Auth({ permissions: 'sample_manage_read' })
  async getList(
    @Query() param: FilterSampleDto,
  ): Promise<ListPaginate<Sample>> {
    return await this.sampleService.getList(param);
  }

  @Get(':id')
  @Auth({ permissions: 'sample_manage_read' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.findOne(id);
  }

  @Put(':id')
  @Auth({ permissions: 'sample_manage_update' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSampleDto: UpdateSampleDto,
  ) {
    return this.sampleService.update(id, updateSampleDto);
  }

  @Delete(':id')
  @Auth({ permissions: 'sample_manage_delete' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.remove(id);
  }

  @Get('slug/:slug')
  @Auth({ permissions: 'sample_manage_read' })
  findBySlug(@Param('slug') slug: string) {
    return this.sampleService.findBySlug(slug);
  }

  @Get('category/:categoryId')
  @Auth({ permissions: 'sample_manage_read' })
  findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.sampleService.findByCategory(categoryId);
  }

  @Get('ward/:wardId')
  @Auth({ permissions: 'sample_manage_read' })
  findByWard(@Param('wardId', ParseIntPipe) wardId: number) {
    return this.sampleService.findByWard(wardId);
  }
}
