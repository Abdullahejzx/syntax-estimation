import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, toMeta } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SwipeItem, SwipeRow } from "@/components/ui/SwipeRow";

/** The three newest blog posts: a swipeable row on phones, three columns from 768px. */
export function LatestInsights() {
  const posts = getAllPosts().slice(0, 3).map(toMeta);
  if (!posts.length) return null;

  return (
    <Section labelledBy="insights-title">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-12">
          <div>
            <Eyebrow className="mb-2">Estimating insights</Eyebrow>
            <h2 id="insights-title" className="text-headline-xl-mobile font-bold lg:text-headline-xl">
              Latest From the Blog
            </h2>
          </div>
          <Link
            href="/blog/"
            className="inline-flex min-h-11 items-center gap-1 font-display text-[0.875rem] font-semibold text-accent-ink hover:text-navy"
          >
            View all articles <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <SwipeRow gridClassName="md:grid-cols-3 md:gap-6 lg:gap-8" label="Latest articles, swipe for more">
          {posts.map((post) => (
            <SwipeItem key={post.slug}>
              <PostCard post={post} />
            </SwipeItem>
          ))}
        </SwipeRow>
      </Container>
    </Section>
  );
}
