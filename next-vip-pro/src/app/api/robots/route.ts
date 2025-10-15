import { env } from "@/services/env.service";
import { NextResponse } from "next/server";

const baseUrl = env.app.url;

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-static.xml
Sitemap: ${baseUrl}/sitemap-blog.xml
Sitemap: ${baseUrl}/sitemap-categories.xml

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow specific bot access
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Crawl delay
Crawl-delay: 1`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
