"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { type PostMeta, postHref } from "@/lib/blog-shared";

type SearchItem = Pick<PostMeta, "slug" | "title" | "description" | "category" | "tags" | "readTime">;

/** Instant search across every post's title, description, category and tags (runs in the browser). */
export function BlogSearch({ posts }: { posts: SearchItem[] }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (q.length < 2) return [];
    const words = q.split(/\s+/);
    return posts.filter((p) => {
      const haystack = [p.title, p.description, p.category, ...p.tags].join(" ").toLowerCase();
      return words.every((w) => haystack.includes(w));
    });
  }, [q, posts]);

  return (
    <div className="relative w-full max-w-2xl">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex gap-2 rounded-xl border border-line bg-white p-2 shadow-card">
        <label htmlFor={`${id}-q`} className="sr-only">
          Search articles
        </label>
        <span className="flex flex-1 items-center gap-2 pl-2">
          <Search aria-hidden="true" className="size-5 shrink-0 text-body" />
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, trades, CSI divisions…"
            autoComplete="off"
            aria-controls={`${id}-results`}
            className="min-h-11 w-full bg-transparent text-[1rem] text-navy placeholder:text-placeholder focus:outline-none"
          />
        </span>
        <button type="submit" className="min-h-11 rounded-lg bg-navy px-5 font-display font-semibold text-white hover:bg-navy-800">
          Search
        </button>
      </form>

      <div id={`${id}-results`} aria-live="polite">
        {q.length >= 2 && (
          <div className="absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-xl border border-line bg-white p-2 shadow-float">
            {results.length === 0 ? (
              <p className="p-3 text-body-sm">No articles match &ldquo;{query}&rdquo; yet. Try a trade or a topic like &ldquo;rebar&rdquo; or &ldquo;bid&rdquo;.</p>
            ) : (
              <ul>
                <li className="px-3 py-1 text-caption text-body">
                  {results.length} article{results.length === 1 ? "" : "s"} found
                </li>
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link href={postHref(p.slug)} className="group flex items-start justify-between gap-3 rounded-lg p-3 hover:bg-mist">
                      <span>
                        <span className="block text-caption font-semibold text-accent-ink">
                          {p.category} · {p.readTime}
                        </span>
                        <span className="block font-display font-bold text-navy">{p.title}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className="mt-5 size-4 shrink-0 text-blueprint" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
