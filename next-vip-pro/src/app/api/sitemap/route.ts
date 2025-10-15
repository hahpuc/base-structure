import { NextResponse } from "next/server";
import { blogPostService } from "@/services/blog-post.service";
import { categoryService } from "@/services/category.service";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://vippro.com";
const locales = ["en", "vi", "ja"];

async function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages sitemap
  sitemap += `
  <sitemap>
    <loc>${baseUrl}/sitemap-static.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;

  // Add blog posts sitemap
  sitemap += `
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;

  // Add categories sitemap
  sitemap += `
  <sitemap>
    <loc>${baseUrl}/sitemap-categories.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;

  sitemap += `
</sitemapindex>`;

  return sitemap;
}

async function generateStaticSitemap() {
  const staticPages = [
    "",
    "/about",
    "/products",
    "/services",
    "/contact",
    "/blog",
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  for (const page of staticPages) {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>`;

    // Add alternate language versions
    for (const locale of locales) {
      const hreflang = locale;
      const url =
        locale === "en" ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`;
      sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${url}" />`;
    }

    sitemap += `
  </url>`;
  }

  sitemap += `
</urlset>`;
  return sitemap;
}

async function generateBlogSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  try {
    // Get published blog posts
    const blogPostsResult = await blogPostService.getPublishedBlogPosts({
      page: 1,
      limit: 1000,
    });

    if (blogPostsResult?.isSuccess && blogPostsResult.data?.data) {
      for (const post of blogPostsResult.data.data) {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>`;

        // Add alternate language versions
        for (const locale of locales) {
          const hreflang = locale;
          const url =
            locale === "en"
              ? `${baseUrl}/blog/${post.slug}`
              : `${baseUrl}/${locale}/blog/${post.slug}`;
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${url}" />`;
        }

        sitemap += `
  </url>`;
      }
    }
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
  }

  sitemap += `
</urlset>`;
  return sitemap;
}

async function generateCategoriesSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  try {
    // Get categories
    const categoriesResult = await categoryService.getList({
      page: 1,
      limit: 100,
    });

    if (categoriesResult?.isSuccess && categoriesResult.data?.data) {
      for (const category of categoriesResult.data.data) {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/category/${category.slug}</loc>
    <lastmod>${category.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>`;

        // Add alternate language versions
        for (const locale of locales) {
          const hreflang = locale;
          const url =
            locale === "en"
              ? `${baseUrl}/blog/category/${category.slug}`
              : `${baseUrl}/${locale}/blog/category/${category.slug}`;
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${url}" />`;
        }

        sitemap += `
  </url>`;
      }
    }
  } catch (error) {
    console.error("Error generating categories sitemap:", error);
  }

  sitemap += `
</urlset>`;
  return sitemap;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let content: string;

  switch (type) {
    case "static":
      content = await generateStaticSitemap();
      break;
    case "blog":
      content = await generateBlogSitemap();
      break;
    case "categories":
      content = await generateCategoriesSitemap();
      break;
    default:
      content = await generateSitemap();
      break;
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
