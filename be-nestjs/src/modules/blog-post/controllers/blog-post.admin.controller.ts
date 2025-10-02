import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateBlogPostDto } from '../dtos/create-blog-post.dto';
import { FilterBlogPostDto } from '../dtos/filter-blog-post.dto';
import { UpdateBlogPostDto } from '../dtos/update-blog-post.dto';
import { BlogPost } from '../repository/entities/blog-post.entity';
import { BlogPostService } from '../services/blog-post.service';

@Controller('blog-posts')
@ApiTags('Blog Post')
@ApiBearerAuth('accessToken')
export class BlogPostAdminController {
  constructor(private readonly service: BlogPostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth({ permissions: 'blog_post_manage_create' })
  async create(@Body() body: CreateBlogPostDto): Promise<void> {
    return this.service.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'blog_post_manage_read' })
  async getList(
    @Query() param: FilterBlogPostDto,
  ): Promise<ListPaginate<BlogPost>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'blog_post_manage_read' })
  async getById(@Param('id') id: number): Promise<BlogPost> {
    return await this.service.getById(id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'blog_post_manage_update' })
  async update(@Body() body: UpdateBlogPostDto): Promise<void> {
    return await this.service.update(body);
  }

  @Delete(':id([0-9]+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'blog_post_manage_delete' })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.service.delete(id);
  }

  @Put('/toggle/:id([0-9]+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'blog_post_manage_update' })
  async toggleStatus(@Param('id') id: number): Promise<void> {
    return await this.service.toggleStatus(id);
  }
}
