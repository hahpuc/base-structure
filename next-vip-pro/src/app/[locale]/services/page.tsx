import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import {
  Code,
  Globe,
  Smartphone,
  Database,
  Shield,
  Headphones,
} from "lucide-react";

interface ServicesPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: ServicesPageProps): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Services",
    description:
      "Professional services to help your business grow. From web development to digital marketing.",
    url: "/services",
    locale,
  });
}

const services = [
  {
    icon: Code,
    name: "Web Development",
    description:
      "Custom web applications built with modern technologies for optimal performance and user experience.",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "Progressive Web Apps",
      "API Development & Integration",
    ],
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android devices.",
    features: [
      "Native iOS & Android Apps",
      "Cross-platform Development",
      "Mobile UI/UX Design",
      "App Store Optimization",
    ],
  },
  {
    icon: Globe,
    name: "Digital Marketing",
    description:
      "Comprehensive digital marketing strategies to increase your online presence and drive growth.",
    features: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Pay-per-Click Advertising",
      "Content Marketing Strategy",
    ],
  },
  {
    icon: Database,
    name: "Data Analytics",
    description:
      "Transform your data into actionable insights with our advanced analytics and reporting solutions.",
    features: [
      "Business Intelligence",
      "Custom Dashboard Development",
      "Data Visualization",
      "Predictive Analytics",
    ],
  },
  {
    icon: Shield,
    name: "Cybersecurity",
    description:
      "Protect your business with comprehensive security solutions and best practices.",
    features: [
      "Security Audits & Assessment",
      "Penetration Testing",
      "Compliance Management",
      "Security Training",
    ],
  },
  {
    icon: Headphones,
    name: "Consulting",
    description:
      "Expert consulting services to help you make informed technology and business decisions.",
    features: [
      "Technology Strategy",
      "Digital Transformation",
      "Process Optimization",
      "Project Management",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We start by understanding your business goals, challenges, and requirements.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Our team develops a comprehensive strategy tailored to your specific needs.",
  },
  {
    step: "03",
    title: "Implementation",
    description:
      "We execute the plan with precision, keeping you informed throughout the process.",
  },
  {
    step: "04",
    title: "Support",
    description:
      "Ongoing support and maintenance to ensure continued success and growth.",
  },
];

export default async function ServicesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Professional services to help your business grow, innovate, and
            succeed in the digital age. From development to marketing,
            we&apos;ve got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="relative rounded-2xl bg-background p-8 ring-1 ring-border hover:ring-primary/50 transition-all duration-200"
              >
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-foreground">
                    {service.name}
                  </h3>
                </div>

                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-40">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Process
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We follow a proven methodology to ensure project success and
              client satisfaction.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {process.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <span className="text-sm font-bold text-primary-foreground">
                      {step.step}
                    </span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block flex-1 h-0.5 bg-border ml-4" />
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-32 max-w-2xl text-center sm:mt-40">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Contact us today to discuss your project requirements and see how we
            can help your business succeed.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/contact"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
