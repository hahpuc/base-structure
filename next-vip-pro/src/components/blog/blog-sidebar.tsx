"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/routing";
import { Search, Calendar } from "lucide-react";
import { categoryService } from "@/services/category.service";
import { blogPostService } from "@/services/blog-post.service";
import { CategoryDto } from "@/types/category";
import { BlogPostDto } from "@/types/blog-post";
import { formatDate } from "@/lib/utils";

interface BlogSidebarProps {
  currentCategory?: string;
  searchQuery?: string;
}

export function BlogSidebar({
  currentCategory,
  searchQuery,
}: BlogSidebarProps) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPostDto[]>([]);
  const [search, setSearch] = useState(searchQuery || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResult = await categoryService.getList({
          page: 1,
          limit: 10,
        });
        if (categoriesResult?.isSuccess && categoriesResult.data?.data) {
          setCategories(categoriesResult.data.data);
        }

        // Fetch recent posts
        const recentResult = await blogPostService.getRecentPosts(5);
        if (recentResult?.isSuccess && recentResult.data) {
          setRecentPosts(recentResult.data);
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/blog?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {tCommon("search")}
        </h3>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </form>
      </div>

      {/* Categories */}
      <div className="rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {tCommon("categories")}
        </h3>
        <div className="space-y-2">
          <Link
            href="/blog"
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              !currentCategory
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {t("allCategories")}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog?category=${category.slug}`}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                currentCategory === category.slug
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t("recentPosts")}
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <h4 className="font-medium text-sm text-foreground group-hover:text-primary mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <time dateTime={post.created_at?.toString()}>
                    {formatDate(post.created_at?.toString() || "")}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="rounded-lg border border-border p-6 bg-muted/50">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Subscribe to our newsletter for the latest updates and insights.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
