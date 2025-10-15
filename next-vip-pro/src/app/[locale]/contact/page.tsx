import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMetadata({
    title: "Contact Us",
    description:
      "Get in touch with our team. We are here to help with your business needs.",
    url: "/contact",
    locale,
  });
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "123 Business Street",
      "Business City, BC 12345",
      "United States",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["contact@vippro.com", "support@vippro.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 4:00 PM",
      "Sunday: Closed",
    ],
  },
];

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Get in touch with our team. We&apos;re here to help with your
            business needs and answer any questions you may have.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Get In Touch
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>

            <dl className="mt-10 space-y-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} className="flex gap-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground">
                        {info.title}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-muted-foreground">
                        {info.details.map((detail, index) => (
                          <div key={index}>{detail}</div>
                        ))}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-muted/50 p-8">
            <h3 className="text-lg font-semibold leading-8 text-foreground">
              Send us a message
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
            Find Us
          </h2>
          <div className="aspect-[2/1] w-full rounded-2xl bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                Interactive Map
              </p>
              <p className="text-sm text-muted-foreground">
                Map integration would go here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
