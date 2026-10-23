import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Download, FileSpreadsheet, Mail, Star, TrendingUp } from "lucide-react";
import { getAuthor } from "@/content/authors";
import {
  type PostMeta,
  categoryHref,
  formatDate,
  getAllPosts,
  getCategories,
  getFeaturedPost,
  postHref,
  toMeta,
} from "@/lib/blog";
import { cn } from "@/lib/cn";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { BlogSearch } from "./BlogSearch";
import { NewsletterForm } from "./NewsletterForm";
import { PostCard } from "./PostCard";

type BlogIndexProps = {
  /** Posts for this page, already filtered and paginated */
  posts: PostMeta[];
  page: number;
  totalPages: number;
  /** Category slug when viewing /blog/category/[slug]/ */
  category?: string;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

function pageHref(page: number, category?: string) {
  const base = category ? categoryHref(category) : "/blog/";
  return page <= 1 ? base : `${base}page/${page}/`;
}

/** Page numbers with ellipses, e.g. 1 2 3 … 8 */
function pageList(current: number, total: number): (number | "…")[] {
  const pages = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

function Pagination({ page, totalPages, category }: { page: number; totalPages: number; category?: string }) {
  if (totalPages <= 1) return null;
  const linkClass = "inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-lg border border-line bg-white px-3 text-body-sm font-semibold text-navy hover:border-line-strong";
  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={pageHref(page - 1, category)} className={linkClass} rel="prev">
          <ArrowLeft aria-hidden="true" className="size-4" /> Previous
        </Link>
      )}
      {pageList(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-body">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p, category)}
            aria-current={p === page ? "page" : undefined}
            className={cn(linkClass, p === page && "border-navy bg-navy text-white hover:border-navy")}
          >
            {p}
          </Link>
        ),
      )}
      {page < totalPages && (
        <Link href={pageHref(page + 1, category)} className={linkClass} rel="next">
          Next <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </nav>
  );
}

function FeaturedPost({ post }: { post: PostMeta }) {
  const author = getAuthor(post.author);
  return (
    <article className="card-lift group relative grid overflow-hidden rounded-xl border border-line bg-white shadow-lift lg:grid-cols-2">
      <div className="relative aspect-[16/9] bg-blue-50 lg:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export; covers are lightweight SVGs */}
        <img src={post.image} alt={post.imageAlt} width={1200} height={675} className="size-full object-cover" />
        <span className="absolute top-4 left-4 rounded bg-navy px-2.5 py-1 text-caption font-semibold text-white">{post.category}</span>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="flex items-center gap-2 text-caption font-semibold">
          <span className="rounded bg-accent-100 px-2 py-0.5 text-accent-ink">{post.category}</span>
          <span className="flex items-center gap-1 text-body">
            <Star aria-hidden="true" className="size-3.5" /> Featured guide
          </span>
        </p>
        <h2 className="mt-4 text-headline-lg-mobile font-bold sm:text-headline-lg">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 sm:text-body-lg">{post.description}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-blue-50 font-display font-bold text-navy">
              {initials(author.name)}
            </span>
            <div className="text-caption">
              <p className="font-semibold text-navy">{author.name}</p>
              <p className="flex items-center gap-1 text-body">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · <Clock aria-hidden="true" className="size-3" /> {post.readTime}
              </p>
            </div>
          </div>
          <span className="hidden items-center gap-1 font-display font-semibold text-accent-ink sm:inline-flex">
            Read article <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * Shared layout for /blog, /blog/page/[n], /blog/category/[slug] and their pages:
 * hero with search, category chips, featured post, grid, pagination and sign-up blocks.
 */
export function BlogIndex({ posts, page, totalPages, category }: BlogIndexProps) {
  const all = getAllPosts().map(toMeta);
  const categories = getCategories();
  const featured = !category && page === 1 ? toMeta(getFeaturedPost()) : null;
  const gridPosts = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;
  const activeName = categories.find((c) => c.slug === category)?.name;
  const popular = all.slice(0, 5);

  return (
    <>
      <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line bg-mist py-10 sm:py-14">
        <div aria-hidden="true" className="bg-blueprint-grid pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog/" },
              ...(category && activeName ? [{ label: activeName, href: categoryHref(category) }] : []),
            ]}
          />
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-3 py-1 text-caption font-bold uppercase tracking-[0.1em] text-accent-ink">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            Insights & guides
          </p>
          <h1 id="page-title" className="text-display-mobile font-extrabold sm:text-headline-xl lg:text-[3.25rem] lg:leading-[1.15]">
            {activeName ? `${activeName} Articles` : "Estimating Insights for Contractors"}
          </h1>
          <p className="mt-4 max-w-3xl sm:text-body-lg">
            Cost guides, takeoff tips and bidding strategies to help subcontractors and general contractors win
            profitable work.
            {page > 1 && ` Page ${page} of ${totalPages}.`}
          </p>
          <div className="mt-8">
            <BlogSearch posts={all.map(({ slug, title, description, category: c, tags, readTime }) => ({ slug, title, description, category: c, tags, readTime }))} />
          </div>
        </Container>
      </section>

      {/* Category chips: swipe sideways on phones */}
      <nav aria-label="Blog categories" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur lg:top-20">
        <Container>
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ name: "All", slug: "" }, ...categories].map((c) => {
              const active = (c.slug || undefined) === category;
              return (
                <li key={c.name} className="shrink-0">
                  <Link
                    href={c.slug ? categoryHref(c.slug) : "/blog/"}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-10 items-center rounded-full border px-4 text-body-sm font-semibold transition-colors",
                      active ? "border-navy bg-navy text-white" : "border-line bg-mist text-navy hover:border-line-strong",
                    )}
                  >
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      <section aria-label="Articles" className="bg-white py-10 lg:py-14">
        <Container>
          {featured && <FeaturedPost post={featured} />}
          {gridPosts.length > 0 && (
            <>
              <h2 className="sr-only">{featured ? "More articles" : "Articles"}</h2>
              <ul className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8", featured && "mt-10")}>
                {gridPosts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </>
          )}
          <Pagination page={page} totalPages={totalPages} category={category} />
        </Container>
      </section>

      <section aria-label="Popular guides and newsletter" className="bg-mist py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-8 lg:col-span-7">
              <div className="flex items-start justify-between">
                <div>
                  <Eyebrow className="mb-1">Editor&apos;s picks</Eyebrow>
                  <h2 className="text-headline-md font-bold">Popular Estimating Guides</h2>
                </div>
                <TrendingUp aria-hidden="true" className="size-6 text-blueprint-ink" />
              </div>
              <ol className="mt-6 divide-y divide-line">
                {popular.map((p, i) => (
                  <li key={p.slug}>
                    <Link href={postHref(p.slug)} className="group flex gap-4 py-4">
                      <span className="tabular font-display text-headline-md font-bold text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block text-caption font-semibold text-accent-ink">
                          {p.category} · {p.readTime}
                        </span>
                        <span className="block font-display font-bold text-navy group-hover:text-blueprint-ink">{p.title}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-navy p-6 text-navy-200 shadow-lift sm:p-8 lg:col-span-5">
              <div aria-hidden="true" className="bg-blueprint-grid-light pointer-events-none absolute inset-0" />
              <div className="relative">
                <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-lg bg-navy-800 text-accent">
                  <Mail className="size-6" />
                </span>
                <Eyebrow inverted className="mt-5">
                  Twice a month
                </Eyebrow>
                <h2 className="mt-1 text-headline-lg-mobile font-bold text-white sm:text-headline-lg">Get Estimating Tips in Your Inbox</h2>
                <p className="mt-3">Bidding tactics, pricing updates and takeoff best practices for contractors and estimators.</p>
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-6 rounded-xl border border-accent/20 bg-accent-50 p-6 sm:p-8 lg:grid-cols-12">
            <div aria-hidden="true" className="lg:col-span-5">
              <div className="mx-auto max-w-sm rounded-xl border border-line bg-white p-4 shadow-lift">
                <div className="flex items-center gap-1.5 rounded-md bg-mist px-3 py-2">
                  <span className="size-2.5 rounded-full bg-[#f87171]" />
                  <span className="size-2.5 rounded-full bg-accent" />
                  <span className="size-2.5 rounded-full bg-navy-300" />
                  <span className="ml-auto font-mono text-[0.6875rem] text-body">SAMPLE_PACKAGE.XLSX</span>
                </div>
                <div className="mt-3 flex gap-3">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy text-accent">
                    <FileSpreadsheet className="size-6" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-navy">Complete sample takeoff</span>
                    <span className="block text-caption text-body">Unlocked Excel workbook and marked-up PDFs</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="inline-block rounded bg-accent-100 px-2.5 py-1 text-caption font-semibold uppercase tracking-[0.1em] text-accent-ink">
                Free resource
              </span>
              <h2 className="mt-3 text-headline-lg-mobile font-bold sm:text-headline-lg">See What a Bid-Ready Estimate Looks Like</h2>
              <p className="mt-2">Get our sample package: an unlocked CSI MasterFormat workbook with live formulas and color-coded plan markups.</p>
              <div className="mt-5">
                <ButtonLink href="/#sample-estimate" fullOnMobile>
                  <Download aria-hidden="true" className="size-4" />
                  Get the Free Sample
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Ready to bid?"
        title="Need an Estimate Instead of Reading About One?"
        text="Send us your drawings and our estimators will review your scope and reply with a fixed quote."
      />
    </>
  );
}
