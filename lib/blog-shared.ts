/**
 * Blog types and helpers that are safe to use in browser (client) components.
 * Anything that reads files lives in lib/blog.ts, which re-exports everything here.
 */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  categorySlug: string;
  author: string;
  image: string;
  imageAlt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  faqs: { question: string; answer: string }[];
};

export const postHref = (slug: string) => `/blog/${slug}/`;
export const categoryHref = (slug: string) => `/blog/category/${slug}/`;

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });
