import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS_PER_PAGE, getAllPosts, paginate, toMeta } from "@/lib/blog";
import { BlogIndex } from "@/components/blog/BlogIndex";

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

// Page 1 is also generated (as a duplicate of /blog/ with a canonical link) so the route always has params
export function generateStaticParams() {
  const total = Math.max(1, Math.ceil(getAllPosts().length / POSTS_PER_PAGE));
  return Array.from({ length: total }, (_, i) => ({ page: String(i + 1) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = Number((await params).page);
  return {
    title: `Construction Estimating Blog – Page ${page}`,
    description: "More construction cost guides, takeoff checklists and bidding strategies from Syntax Estimation.",
    alternates: { canonical: page === 1 ? "/blog/" : `/blog/page/${page}/` },
  };
}

export default async function BlogPagedPage({ params }: Props) {
  const page = Number((await params).page);
  const { items, totalPages } = paginate(getAllPosts().map(toMeta), page);
  if (!items.length) notFound();
  return <BlogIndex posts={items} page={page} totalPages={totalPages} />;
}
