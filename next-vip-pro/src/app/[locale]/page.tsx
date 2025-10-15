import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    url: "/",
    locale,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      {/* <LatestBlog />∏ */}
    </div>
  );
}
