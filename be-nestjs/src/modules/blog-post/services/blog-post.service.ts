import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { CreateBlogPostDto } from '../dtos/create-blog-post.dto';
import { FilterBlogPostDto } from '../dtos/filter-blog-post.dto';
import { UpdateBlogPostDto } from '../dtos/update-blog-post.dto';
import { BlogPost } from '../repository/entities/blog-post.entity';
import { BlogPostRepository } from '../repository/repositories/blog-post.repository';

@Injectable()
export class BlogPostService {
  private blogpostMessage: MessageService;

  constructor(
    private readonly blogpostRepository: BlogPostRepository,
    i18nService: I18nService,
  ) {
    this.blogpostMessage = new MessageService(i18nService, 'blog-post');
  }

  async create(input: CreateBlogPostDto): Promise<void> {
    await this._checkSlugExist(input.slug);

    const blogPost = new BlogPost();

    Object.assign(blogPost, {
      ...input,
    });

    await this.blogpostRepository.save(input);
  }

  async getById(id: number): Promise<BlogPost> {
    const app = await this.blogpostRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.blogpostMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async getList(params: FilterBlogPostDto): Promise<ListPaginate<BlogPost>> {
    const [data, count] = await this.blogpostRepository.getList(params);

    return wrapPagination<BlogPost>(data, count, params);
  }

  async update(input: UpdateBlogPostDto): Promise<void> {
    const post = await this._getByIdOrSlug(input.id);

    await this._checkSlugExist(input.slug, input.id);

    Object.assign(post, { ...input });

    await this.blogpostRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    const app = await this.getById(id);
    await this.blogpostRepository.remove(app);
  }

  async toggleStatus(id: number): Promise<void> {
    const post = await this.getById(id);

    Object.assign(post, {
      ...post,
      status:
        post.status === EStatus.active ? EStatus.inactive : EStatus.active,
    });

    await this.blogpostRepository.save(post);
  }

  private async _getByIdOrSlug(idOrSlug: number | string): Promise<BlogPost> {
    const blogPost = await this.blogpostRepository.findByIdOrSlug(idOrSlug);

    if (!blogPost) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.blogpostMessage.get('NOT_FOUND'),
      );
    }

    return blogPost;
  }

  private async _checkSlugExist(slug: string, id?: number): Promise<void> {
    const product = await this.blogpostRepository.findOneBy({ slug });

    if (product) {
      if (!id || product.id !== id) {
        throw new CustomError(
          400,
          'SLUG_INVALID',
          this.blogpostMessage.get('SLUG_INVALID'),
        );
      }
    }
  }
}
