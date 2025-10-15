"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import Image from "next/image";
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { blogPostService } from "@/services/blog-post.service";
import { BlogPostDto } from "@/types/blog-post";
import { ListPaginate } from "@/types/base";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { getMediaUrl } from "@/utils/media.util";

interface BlogListProps {
  page: number;
  search?: string;
  category?: string;
}

export function BlogList({ page, search, category }: BlogListProps) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
  const [posts, setPosts] = useState<BlogPostDto[]>([]);
  const [pagination, setPagination] =
    useState<ListPaginate<BlogPostDto> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const result = await blogPostService.getBlogPosts({
          page,
          limit: 6,
          filter: search,
          category_ids: category ? [parseInt(category)] : undefined,
        });

        if (result?.isSuccess && result.data) {
          setPosts(result.data.data);
          setPagination(result.data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, search, category]);

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[16/9] bg-muted rounded-lg mb-4" />
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">{t("noPostsFound")}</p>
      </div>
    );
  }

  const totalPages = pagination
    ? Math.ceil(pagination.total_records / pagination.limit)
    : 1;

  return (
    <div>
      {/* Blog Posts */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted mb-6">
              <Link href={`/blog/${post.id}`}>
                <Image
                  src={getMediaUrl(post?.thumbnail)}
                  alt={post?.title}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.created_at?.toString()}>
                  {formatDate(post.created_at?.toString() || "")}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Admin</span>
              </div>
              <span>
                {calculateReadingTime(post.content)} {t("readTime")}
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary mb-4">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.description}
            </p>

            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
            >
              {tCommon("readMore")}
              <span className="ml-1">→</span>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {tCommon("page")} {page} {tCommon("of")} {totalPages}
          </div>

          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}${search ? `&search=${search}` : ""}${
                  category ? `&category=${category}` : ""
                }`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent"
              >
                <ChevronLeft className="h-4 w-4" />
                {tCommon("previous")}
              </Link>
            )}

            {page < totalPages && (
              <Link
                href={`?page=${page + 1}${search ? `&search=${search}` : ""}${
                  category ? `&category=${category}` : ""
                }`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent"
              >
                {tCommon("next")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
