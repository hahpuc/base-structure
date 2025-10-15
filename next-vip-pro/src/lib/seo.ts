import { env } from "@/services/env.service";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  locale?: string;
}

export async function generateSEOMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  locale = "en",
}: SEOProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });

  const baseUrl = env.app.url;
  const defaultImage = `${baseUrl}/images/og-image.jpg`;

  const seoTitle = title ? `${title} - VIP Pro` : t("defaultTitle");
  const seoDescription = description || t("defaultDescription");
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${baseUrl}${url}` : baseUrl;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: tags?.join(", "),
    authors: author ? [{ name: author }] : undefined,

    // Open Graph
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: "VIP Pro",
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: locale,
      type: type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: author ? `@${author}` : "@vippro",
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Language alternates
    alternates: {
      canonical: seoUrl,
      languages: {
        en: `${baseUrl}/en${url || ""}`,
        vi: `${baseUrl}/vi${url || ""}`,
        ja: `${baseUrl}/ja${url || ""}`,
        "x-default": `${baseUrl}${url || ""}`,
      },
    },
  };

  return metadata;
}

export function generateStructuredData(data: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    ...data,
  };
}

export function generateOrganizationSchema() {
  return generateStructuredData({
    "@type": "Organization",
    name: "VIP Pro",
    url: env.app.url,
    logo: `${env.app.url}/images/logo.png`,
    description: "Leading provider of professional business solutions",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business Street",
      addressLocality: "Business City",
      postalCode: "12345",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://facebook.com/vippro",
      "https://twitter.com/vippro",
      "https://linkedin.com/company/vippro",
    ],
  });
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}) {
  const baseUrl = env.app.url;

  return generateStructuredData({
    "@type": "Article",
    headline: title,
    description,
    image: image || `${baseUrl}/images/og-image.jpg`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "VIP Pro",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${url}`,
    },
  });
}
