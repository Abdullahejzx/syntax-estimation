import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS_PER_PAGE, categoryHref, getAllPosts, getCategories, paginate, toMeta } from "@/lib/blog";
import { BlogIndex } from "@/components/blog/BlogIndex";

type Props = { params: Promise<{ category: string; page: string }> };

export const dynamicParams = false;

// Page 1 is also generated (canonical points to the category root) so the route always has params
export function generateStaticParams() {
  return getCategories().flatMap((c) => {
    const total = Math.max(1, Math.ceil(c.count / POSTS_PER_PAGE));
    return Array.from({ length: total }, (_, i) => ({ category: c.slug, page: String(i + 1) }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page } = await params;
  const cat = getCategories().find((c) => c.slug === category);
  return {
    title: `${cat?.name ?? "Blog"} Articles – Page ${page}`,
    alternates: { canonical: page === "1" ? categoryHref(category) : `${categoryHref(category)}page/${page}/` },
  };
}

export default async function BlogCategoryPagedPage({ params }: Props) {
  const { category, page } = await params;
  const posts = getAllPosts().filter((p) => p.categorySlug === category).map(toMeta);
  const { items, totalPages } = paginate(posts, Number(page));
  if (!items.length) notFound();
  return <BlogIndex posts={items} page={Number(page)} totalPages={totalPages} category={category} />;
}
