"use client";

import { CheckCircle, Users, Zap, Shield, Target, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
  {
    icon: CheckCircle,
    key: "quality",
    title: "Quality Assurance",
    description:
      "We ensure the highest quality in all our deliverables and services.",
  },
  {
    icon: Users,
    key: "support",
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to help you whenever you need it.",
  },
  {
    icon: Zap,
    key: "performance",
    title: "High Performance",
    description:
      "Optimized solutions that deliver exceptional performance and reliability.",
  },
  {
    icon: Shield,
    key: "security",
    title: "Enterprise Security",
    description: "Bank-level security measures to protect your business data.",
  },
  {
    icon: Target,
    key: "results",
    title: "Results Driven",
    description:
      "Focused on delivering measurable results that grow your business.",
  },
  {
    icon: Clock,
    key: "delivery",
    title: "Fast Delivery",
    description: "Quick turnaround times without compromising on quality.",
  },
];

export function Features() {
  const t = useTranslations("home.features");

  return (
    <section className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.key} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
