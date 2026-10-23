import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryHref, getAllPosts, getCategories, paginate, toMeta } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { BlogIndex } from "@/components/blog/BlogIndex";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).category;
  const cat = getCategories().find((c) => c.slug === slug);
  if (!cat) return {};
  return pageMetadata({
    title: `${cat.name} Articles & Guides`,
    description: `${cat.name} guides, checklists and tips for contractors from the estimators at Syntax Estimation.`,
    path: categoryHref(slug),
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const slug = (await params).category;
  const posts = getAllPosts().filter((p) => p.categorySlug === slug).map(toMeta);
  if (!posts.length) notFound();
  const { items, totalPages } = paginate(posts, 1);
  return <BlogIndex posts={items} page={1} totalPages={totalPages} category={slug} />;
}
