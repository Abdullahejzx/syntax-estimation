import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, CalendarDays, CircleCheck, Clock, FileSpreadsheet, Headset, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getAuthor } from "@/content/authors";
import { quoteHref } from "@/content/navigation";
import { categoryHref, formatDate, getAllPosts, getHeadings, getPost, getRelatedPosts, postHref, toMeta } from "@/lib/blog";
import { articleSchema } from "@/lib/schema";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = postHref(post.slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },
    twitter: { title: post.title, description: post.description },
  };
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

/** Right-hand CTA card (moves below the article on phones and tablets). */
function PostSidebar() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line bg-white p-6 shadow-card">
        <Eyebrow className="mb-1">Need an estimate?</Eyebrow>
        <h2 className="text-headline-md font-bold">Done-for-you takeoffs</h2>
        {/* TODO: confirm turnaround claim */}
        <ul className="mt-4 space-y-3 text-body-sm text-ink">
          {["Itemized quantities with waste factors", "24–72 hour typical turnaround", "Unlocked Excel plus marked-up PDFs"].map((item) => (
            <li key={item} className="flex gap-2">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
              {item}
            </li>
          ))}
        </ul>
        <ButtonLink href={quoteHref} className="mt-5 w-full">
          Upload Plans for a Quote
        </ButtonLink>
        <p className="mt-3 flex items-center gap-1.5 text-caption text-body">
          <BadgeCheck aria-hidden="true" className="size-3.5 text-accent-ink" />
          Free, fixed quote. NDA on request.
        </p>
      </div>
      <div className="rounded-xl bg-blue-50 p-6">
        <FileSpreadsheet aria-hidden="true" className="size-7 text-blueprint" />
        <h2 className="mt-3 text-headline-sm font-bold">See a real deliverable</h2>
        <p className="mt-1 text-body-sm">Get our sample package: an unlocked estimate workbook with linked markups.</p>
        <Link href="/#sample-estimate" className="mt-3 inline-flex min-h-11 items-center gap-1 text-body-sm font-semibold text-accent-ink hover:underline">
          Get the free sample <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <a href={siteConfig.phoneHref} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-card hover:border-blueprint">
        <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-blue-50 text-blueprint">
          <Phone className="size-5" />
        </span>
        <span>
          <span className="block text-caption font-semibold uppercase tracking-wider text-body">Talk to an estimator</span>
          <span className="block font-display font-bold text-navy">{siteConfig.phone}</span>
        </span>
      </a>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const path = postHref(post.slug);
  const url = new URL(path, siteConfig.url).toString();
  const author = getAuthor(post.author);
  const headings = getHeadings(post.content);
  const related = getRelatedPosts(post).map(toMeta);

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <JsonLd data={articleSchema({ ...post, path })} />

      <header className="border-b border-line bg-white pt-8 pb-8 sm:pt-12">
        <Container size="narrow" className="flex flex-col items-center text-center">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog/" },
              { label: post.category, href: categoryHref(post.categorySlug) },
              { label: post.title, href: path },
            ]}
          />
          <Link
            href={categoryHref(post.categorySlug)}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-3 py-1 text-caption font-bold uppercase tracking-[0.1em] text-accent-ink hover:bg-accent-50"
          >
            {post.category}
          </Link>
          <h1 className="text-display-mobile font-extrabold sm:text-headline-xl lg:text-[3rem] lg:leading-[1.15]">{post.title}</h1>
          <p className="mt-4 max-w-2xl sm:text-body-lg">{post.description}</p>

          <div className="mt-8 flex w-full flex-col gap-4 border-t border-line pt-6 text-left sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-white">
                {initials(author.name)}
              </span>
              <div>
                <p className="font-display font-bold text-navy">{author.name}</p>
                <p className="text-caption text-body">{author.role}</p>
              </div>
            </div>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-body">
              <span className="flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="size-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-4" />
                {post.readTime}
              </span>
            </p>
          </div>
          <div className="mt-4 self-start">
            <ShareButtons url={url} title={post.title} />
          </div>
        </Container>
      </header>

      <div className="bg-mist pt-8 sm:pt-10">
        <Container>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export; covers are lightweight SVGs */}
          <img
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={675}
            fetchPriority="high"
            className="mx-auto w-full max-w-5xl rounded-xl border border-line shadow-lift"
          />
        </Container>

        <Container className="py-10 lg:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 space-y-5">
                <TableOfContents headings={headings} variant="sidebar" />
                <div className="grid grid-cols-2 gap-2 text-center">
                  <p className="rounded-lg border border-line bg-white p-3">
                    <span className="tabular block font-display text-headline-sm font-bold text-navy">{post.wordCount.toLocaleString("en-US")}</span>
                    <span className="text-caption text-body">words</span>
                  </p>
                  <p className="rounded-lg border border-line bg-white p-3">
                    <span className="block font-display text-headline-sm font-bold text-navy">{post.readTime.replace(/\s*read$/, "")}</span>
                    <span className="text-caption text-body">to read</span>
                  </p>
                </div>
                <a href={siteConfig.phoneHref} className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 hover:bg-blue-100">
                  <Headset aria-hidden="true" className="size-6 shrink-0 text-accent-ink" />
                  <span className="text-caption">
                    <span className="block font-semibold text-navy">Bid due soon?</span>
                    <span className="text-body">Call {siteConfig.phone}</span>
                  </span>
                </a>
              </div>
            </aside>

            <article id="article-body" className="min-w-0 lg:col-span-6">
              <div className="mb-6 lg:hidden">
                <TableOfContents headings={headings} variant="dropdown" />
              </div>
              <PostBody source={post.content} />

              {post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-line pt-6">
                  <span className="mr-1 text-body-sm text-body">Related topics:</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-line bg-white px-2.5 py-1 text-caption font-medium text-navy">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-body-sm text-body">Found this useful? Share it with your team.</p>
                <ShareButtons url={url} title={post.title} />
              </div>

              {author.bio && (
                <section aria-label="About the author" className="mt-10 flex flex-col gap-4 rounded-xl border border-line bg-white p-6 shadow-card sm:flex-row sm:p-8">
                  <span aria-hidden="true" className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-navy font-display text-headline-md font-bold text-white">
                    {initials(author.name)}
                  </span>
                  <div>
                    <p className="font-display text-headline-sm font-bold text-navy">{author.name}</p>
                    <p className="text-body-sm font-semibold text-accent-ink">{author.role}</p>
                    <p className="mt-2 text-body-sm sm:text-body-md">{author.bio}</p>
                  </div>
                </section>
              )}
            </article>

            <aside aria-label="Estimating help" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <PostSidebar />
              </div>
            </aside>
          </div>
        </Container>
      </div>

      {post.faqs.length > 0 && <FaqSection items={post.faqs} tone="white" eyebrow="Frequently asked questions" title={`${post.category} FAQs`} />}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-mist py-14 lg:py-16">
          <Container>
            <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <Eyebrow className="mb-1">More estimating guides</Eyebrow>
                <h2 id="related-title" className="text-headline-xl-mobile font-bold lg:text-headline-lg">
                  Keep Reading
                </h2>
              </div>
              <Link href="/blog/" className="inline-flex min-h-11 items-center gap-1 font-display font-semibold text-accent-ink hover:text-navy">
                View all articles <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} compact />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaBand eyebrow="Stop guessing quantities" title="Get an Accurate Takeoff for Your Next Bid" text="Send us your drawings and get a fixed quote and delivery date, with every waste factor and line item accounted for." />
    </>
  );
}
