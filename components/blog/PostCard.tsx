import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { withBasePath } from "@/config/site";
import { type PostMeta, formatDate, postHref } from "@/lib/blog-shared";
import { cn } from "@/lib/cn";

/** Blog card: cover image with category tag, title, excerpt, date and read time. */
export function PostCard({ post, compact, className }: { post: PostMeta; compact?: boolean; className?: string }) {
  return (
    <article className={cn("card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card", className)}>
      <div className="relative aspect-[16/9] overflow-hidden bg-blue-50">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export; covers are lightweight SVGs */}
        <img
          src={withBasePath(post.image)}
          alt={post.imageAlt}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        <span className="absolute top-3 left-3 rounded bg-navy px-2 py-0.5 text-[0.6875rem] font-semibold text-white">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {compact && (
          <p className="mb-2 flex items-center gap-1.5 text-caption text-body">
            <Clock aria-hidden="true" className="size-3.5" />
            {post.readTime}
          </p>
        )}
        <h3 className="text-headline-sm leading-snug font-bold">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {!compact && <p className="mt-2 text-body-sm sm:text-body-md">{post.description}</p>}
        <div className="mt-auto pt-5">
          {compact ? (
            <span className="inline-flex items-center gap-1 text-caption font-bold text-accent-ink transition-[gap] group-hover:gap-2">
              Read guide <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
          ) : (
            <p className="flex items-center justify-between text-caption text-body">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-3.5" />
                {post.readTime}
              </span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
