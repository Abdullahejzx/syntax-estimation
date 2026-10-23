import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { fulfilmentPolicy, privacyPolicy, smsTerms } from "@/content/legal";
import { serviceHref, services } from "@/content/services";
import { tradeHref, trades } from "@/content/trades";
import { POSTS_PER_PAGE, categoryHref, getAllPosts, getCategories, postHref } from "@/lib/blog";

// Written to out/sitemap.xml at build time. New services, trades and posts are added automatically.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newestPost = posts[0]?.updated ?? posts[0]?.date;

  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified?: string) => ({
    url: absoluteUrl(path),
    priority,
    changeFrequency,
    ...(lastModified && { lastModified }),
  });

  const blogPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return [
    entry("/", 1, "weekly"),
    entry("/services/", 0.9),
    ...services.map((s) => entry(serviceHref(s.slug), 0.9)),
    entry("/trades/", 0.8),
    ...trades.map((t) => entry(tradeHref(t.slug), 0.8)),
    entry("/get-a-quote/", 0.8),
    entry("/about/", 0.6),
    entry("/blog/", 0.7, "weekly", newestPost),
    // Page 1 is /blog/ itself, so listing pages start at 2
    ...Array.from({ length: Math.max(0, blogPages - 1) }, (_, i) => entry(`/blog/page/${i + 2}/`, 0.4, "weekly")),
    ...getCategories().map((c) => entry(categoryHref(c.slug), 0.5, "weekly")),
    ...posts.map((p) => entry(postHref(p.slug), 0.7, "monthly", p.updated ?? p.date)),
    ...[privacyPolicy, smsTerms, fulfilmentPolicy].map((doc) => entry(doc.path, 0.2, "yearly")),
  ];
}
