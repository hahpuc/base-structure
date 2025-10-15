import { BaseService } from "./base.service";
import {
  BlogPostDto,
  CreateBlogPost,
  EditBlogPost,
  QueryBlogPost,
} from "@/types/blog-post";
import { ApiClient } from "./client/axios-client";
import { ApiResult } from "@/types/api-result";
import { ListPaginate } from "@/types/base";
import { API_ENDPOINTS } from "@/constants/enum";

class BlogPostService extends BaseService<
  BlogPostDto,
  CreateBlogPost,
  EditBlogPost
> {
  protected baseUrl = API_ENDPOINTS.BLOG_POSTS;

  /**
   * Get paginated blog posts with category filtering
   */
  async getBlogPosts(
    query: QueryBlogPost
  ): Promise<ApiResult<ListPaginate<BlogPostDto>>> {
    const params = new URLSearchParams();

    // Add pagination parameters
    params.append("page", query.page.toString());
    params.append("limit", query.limit.toString());

    // Add optional parameters
    if (query.filter) {
      params.append("filter", query.filter);
    }
    if (query.sorting) {
      params.append("sorting", query.sorting);
    }
    if (query.category_ids?.length) {
      query.category_ids.forEach((id) =>
        params.append("category_ids[]", id.toString())
      );
    }

    const url = `${this.baseUrl}?${params.toString()}`;
    return ApiClient.get<ListPaginate<BlogPostDto>>(url);
  }

  /**
   * Get published blog posts only
   */
  async getPublishedBlogPosts(
    query: QueryBlogPost
  ): Promise<ApiResult<ListPaginate<BlogPostDto>>> {
    const params = new URLSearchParams();

    // Add pagination parameters
    params.append("page", query.page.toString());
    params.append("limit", query.limit.toString());
    params.append("status", "1"); // Only published posts

    // Add optional parameters
    if (query.filter) {
      params.append("filter", query.filter);
    }
    if (query.sorting) {
      params.append("sorting", query.sorting);
    }
    if (query.category_ids?.length) {
      query.category_ids.forEach((id) =>
        params.append("category_ids[]", id.toString())
      );
    }

    const url = `${this.baseUrl}?${params.toString()}`;
    return ApiClient.get<ListPaginate<BlogPostDto>>(url);
  }

  /**
   * Get recent blog posts
   */
  async getRecentPosts(limit: number = 5): Promise<ApiResult<BlogPostDto[]>> {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("status", "1"); // Only published posts
    params.append("sorting", "published_at:desc");

    const url = `${this.baseUrl}/recent?${params.toString()}`;
    return ApiClient.get<BlogPostDto[]>(url);
  }

  /**
   * Get related blog posts by category
   */
  async getRelatedPosts(
    categoryId: number,
    excludeId: string | number,
    limit: number = 5
  ): Promise<ApiResult<BlogPostDto[]>> {
    const params = new URLSearchParams();
    params.append("category_id", categoryId.toString());
    params.append("exclude_id", excludeId.toString());
    params.append("limit", limit.toString());
    params.append("status", "1"); // Only published posts

    const url = `${this.baseUrl}/related?${params.toString()}`;
    return ApiClient.get<BlogPostDto[]>(url);
  }
}

export const blogPostService = new BlogPostService();
