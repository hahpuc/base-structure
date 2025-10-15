import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import { CheckCircle, Star, Users, Zap } from "lucide-react";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata({
    title: "Products",
    description:
      "Discover our range of professional products designed to help your business grow.",
    url: "/products",
    locale,
  });
}

const products = [
  {
    name: "Business Management Suite",
    description:
      "Complete business management solution with CRM, project management, and analytics.",
    price: "From $99/month",
    features: [
      "Customer Relationship Management",
      "Project & Task Management",
      "Advanced Analytics & Reports",
      "Team Collaboration Tools",
      "Mobile Apps (iOS & Android)",
      "24/7 Priority Support",
    ],
    popular: true,
  },
  {
    name: "E-commerce Platform",
    description:
      "Powerful e-commerce platform to build and scale your online store.",
    price: "From $149/month",
    features: [
      "Multi-channel Sales",
      "Inventory Management",
      "Payment Gateway Integration",
      "SEO & Marketing Tools",
      "Custom Theme Builder",
      "Advanced Security",
    ],
    popular: false,
  },
  {
    name: "Enterprise Solution",
    description:
      "Scalable enterprise solution for large organizations with custom requirements.",
    price: "Custom Pricing",
    features: [
      "Custom Development",
      "Enterprise Integration",
      "Dedicated Account Manager",
      "Advanced Security & Compliance",
      "Unlimited Users & Storage",
      "On-site Training & Support",
    ],
    popular: false,
  },
];

export default async function ProductsPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Our Products
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover our range of professional products designed to help your
            business grow, streamline operations, and achieve success in
            today&apos;s competitive market.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-8 lg:gap-x-8">
          {products.map((product) => (
            <div
              key={product.name}
              className={`relative rounded-3xl p-8 ring-1 ${
                product.popular
                  ? "bg-primary/5 ring-primary"
                  : "bg-background ring-border"
              }`}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-foreground">
                  {product.name}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>

              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {product.price}
                </span>
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckCircle className="h-6 w-5 flex-none text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full rounded-md px-3 py-2 text-center text-sm font-semibold ${
                    product.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-background text-foreground ring-1 ring-border hover:bg-accent"
                  } focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-40">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Our Products?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our products are built with the latest technology and best
              practices to ensure your business gets the most value and
              performance.
            </p>
          </div>

          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-foreground">
                <Zap className="absolute left-1 top-1 h-5 w-5 text-primary" />
                High Performance
              </dt>
              <dd className="inline">
                {" "}
                Our products are optimized for speed and reliability, ensuring
                your business operations run smoothly.
              </dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-foreground">
                <Users className="absolute left-1 top-1 h-5 w-5 text-primary" />
                User Friendly
              </dt>
              <dd className="inline">
                {" "}
                Intuitive interfaces designed with user experience in mind,
                making it easy for your team to adopt and use.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
