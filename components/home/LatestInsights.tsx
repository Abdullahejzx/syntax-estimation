import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { latestPosts } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SwipeItem, SwipeRow } from "@/components/ui/SwipeRow";

/** Three newest articles. TODO (Phase 6): read real posts from /content/blog and link to each one. */
export function LatestInsights() {
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
          {latestPosts.map((post) => (
            <SwipeItem key={post.title}>
              <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card">
                <div className="bg-blueprint-grid relative flex h-40 items-center justify-center bg-blue-50 sm:h-44">
                  <post.icon aria-hidden="true" className="size-12 text-blueprint opacity-50" strokeWidth={1.5} />
                  <span className="absolute bottom-3 left-3 rounded bg-navy px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-caption text-body">{post.readTime}</p>
                  <h3 className="mb-3 text-headline-sm font-bold">
                    <Link href="/blog/" className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mb-4 text-body-sm sm:text-body-md">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-caption font-bold text-accent-ink transition-[gap] group-hover:gap-2">
                    Read article <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </div>
              </article>
            </SwipeItem>
          ))}
        </SwipeRow>
      </Container>
    </Section>
  );
}
