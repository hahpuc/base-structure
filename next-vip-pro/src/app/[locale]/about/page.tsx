import { generateSEOMetadata } from "@/lib/seo";
import { Award, Globe, Target, Users } from "lucide-react";
import { Metadata } from "next";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata({
    title: "About Us",
    description:
      "Learn more about VIP Pro and our mission to provide professional business solutions.",
    url: "/about",
    locale,
  });
}

const stats = [
  { name: "Years of Experience", value: "10+" },
  { name: "Happy Clients", value: "500+" },
  { name: "Projects Completed", value: "1000+" },
  { name: "Team Members", value: "50+" },
];

const values = [
  {
    icon: Users,
    name: "Customer First",
    description: "We put our customers at the center of everything we do.",
  },
  {
    icon: Target,
    name: "Results Driven",
    description:
      "We focus on delivering measurable results that drive business growth.",
  },
  {
    icon: Award,
    name: "Excellence",
    description:
      "We strive for excellence in every project and service we deliver.",
  },
  {
    icon: Globe,
    name: "Global Reach",
    description:
      "We serve clients worldwide with our comprehensive business solutions.",
  },
];

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            About VIP Pro
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            We are a leading provider of professional business solutions,
            dedicated to helping companies grow and succeed in today&apos;s
            competitive marketplace.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-muted p-8 sm:w-3/5 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
              <p className="flex-none text-3xl font-bold tracking-tight text-foreground">
                {stats[0].value}
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold leading-6 text-foreground">
                  {stats[0].name}
                </p>
                <p className="mt-2 text-base leading-7 text-muted-foreground">
                  Delivering professional solutions with extensive industry
                  experience.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-primary p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
              <p className="flex-none text-3xl font-bold tracking-tight text-primary-foreground">
                {stats[1].value}
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold leading-6 text-primary-foreground">
                  {stats[1].name}
                </p>
                <p className="mt-2 text-base leading-7 text-primary-foreground/80">
                  Trusted by businesses worldwide for our reliable services.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-secondary p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
              <p className="flex-none text-3xl font-bold tracking-tight text-secondary-foreground">
                {stats[2].value}
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold leading-6 text-secondary-foreground">
                  {stats[2].name}
                </p>
                <p className="mt-2 text-base leading-7 text-secondary-foreground/80">
                  Successfully completed projects across various industries.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mx-auto mt-32 max-w-7xl sm:mt-40">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                At VIP Pro, our mission is to empower businesses with innovative
                solutions that drive growth, improve efficiency, and create
                lasting value. We believe in building long-term partnerships
                with our clients and delivering results that exceed
                expectations.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mx-auto mt-32 max-w-7xl sm:mt-40">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Values
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                These core values guide everything we do and help us maintain
                the highest standards of service and integrity.
              </p>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.name} className="relative pl-9">
                    <dt className="inline font-semibold text-foreground">
                      <Icon className="absolute left-1 top-1 h-5 w-5 text-primary" />
                      {value.name}
                    </dt>
                    <dd className="inline"> {value.description}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
