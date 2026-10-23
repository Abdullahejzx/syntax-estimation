import { getAllPosts, paginate, toMeta } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata = pageMetadata({
  title: "Construction Estimating Blog: Takeoff & Bidding Guides",
  description:
    "Construction cost guides, quantity takeoff checklists and bidding strategies for subcontractors and general contractors, from the estimators at Syntax Estimation.",
  path: "/blog/",
});

export default function BlogPage() {
  const { items, totalPages } = paginate(getAllPosts().map(toMeta), 1);
  return <BlogIndex posts={items} page={1} totalPages={totalPages} />;
}
