"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import Image from "next/image";
import { useEffect, useState } from "react";
import { blogPostService } from "@/services/blog-post.service";
import { BlogPostDto } from "@/types/blog-post";
import { formatDate } from "@/lib/utils";

export function LatestBlog() {
  const t = useTranslations("home.latestBlog");
  const tCommon = useTranslations("common");
  const [posts, setPosts] = useState<BlogPostDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await blogPostService.getRecentPosts(3);
        if (result?.isSuccess && result.data) {
          setPosts(result.data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-lg">{tCommon("loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Blog
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <Image
                src={post.thumbnail || "/images/blog-placeholder.jpg"}
                alt={post.title}
                fill
                className="absolute inset-0 -z-10 object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <div className="flex items-center gap-x-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.created_at?.toString()}>
                    {formatDate(post.created_at?.toString() || "", "en")}
                  </time>
                </div>
              </div>

              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link href={`/blog/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>

              <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                {post.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {tCommon("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
