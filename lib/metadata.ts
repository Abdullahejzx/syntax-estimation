import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** URL of a share image generated from lib/og.ts ("default", "services/drafting", "blog/<slug>"…). */
export const ogImagePath = (key: string) => `/og/${key}.png`;

/** Open Graph and X card fields shared by every page. Pass the key of the page's share image. */
export function socialMetadata({ title, description, path, image = "default", type = "website" }: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = ogImagePath(image);
  return {
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [{ url, width: 1200, height: 630, alt: title, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [url] },
  };
}

/** Title, description, canonical URL and social tags for an inner page. */
export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...socialMetadata({ title, description, path, image }),
  };
}
