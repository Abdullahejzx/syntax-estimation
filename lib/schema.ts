import { absoluteUrl as absolute, siteConfig } from "@/config/site";
import type { AccordionItem } from "@/components/ui/Accordion";

/** schema.org LocalBusiness for the home and contact pages. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absolute("/#business"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.tagline,
    url: absolute("/"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: { "@type": "Country", name: "United States" },
    openingHours: siteConfig.openingHours,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/** schema.org BreadcrumbList for the visible breadcrumb trail. */
export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absolute(item.href),
    })),
  };
}

/** schema.org Service for service and trade pages. */
export function serviceSchema({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType ?? name,
    url: absolute(path),
    provider: {
      "@type": "ProfessionalService",
      "@id": absolute("/#business"),
      name: siteConfig.name,
      telephone: siteConfig.phone,
    },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

/** schema.org BlogPosting for blog articles. */
export function articleSchema(post: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
  updated?: string;
  author: string;
  wordCount?: number;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absolute(post.image),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      "@id": absolute("/#business"),
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absolute("/icon.svg") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(post.path) },
    articleSection: post.category,
    wordCount: post.wordCount,
  };
}

/** schema.org FAQPage built from the same items the accordion shows. */
export function faqSchema(items: AccordionItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
