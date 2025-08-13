import { ListPaginate } from '@common/database/types/database.type';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FilterBlogPostDto } from '../dtos/filter-blog-post.dto';
import { BlogPost } from '../repository/entities/blog-post.entity';
import { BlogPostService } from '../services/blog-post.service';

@Controller('blogposts')
@ApiTags('BlogPost')
export class BlogPostPublicController {
  constructor(private readonly service: BlogPostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() param: FilterBlogPostDto,
  ): Promise<ListPaginate<BlogPost>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: number): Promise<BlogPost> {
    return await this.service.getById(id);
  }
}
