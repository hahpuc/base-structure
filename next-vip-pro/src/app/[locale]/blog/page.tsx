import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import { BlogList } from "@/components/blog/blog-list";
import { BlogSidebar } from "@/components/blog/blog-sidebar";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata({
    title: "Blog",
    description:
      "Read our latest articles, insights, and expert advice on business growth and professional solutions.",
    url: "/blog",
    locale,
  });
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = await params;
  const { page, search, category } = await searchParams;

  const currentPage = parseInt(page || "1");
  const searchQuery = search || "";
  const categorySlug = category || "";

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Stay updated with our latest insights, industry trends, and expert
            advice to help your business grow and succeed.
          </p>
        </div>

        {/* Blog Content */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BlogList
              page={currentPage}
              search={searchQuery}
              category={categorySlug}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              currentCategory={categorySlug}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
