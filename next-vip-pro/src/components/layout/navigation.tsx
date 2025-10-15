"use client";

import { Link, usePathname } from "@/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const navigationItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export function Navigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  // Get the pathname without locale for comparison (next-intl's usePathname already removes locale)
  const currentPath = pathname;

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navigationItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            currentPath === item.href ? "text-foreground" : "text-foreground/60"
          )}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}
