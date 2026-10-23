"use client";

import { Check, Link2, Mail } from "lucide-react";
import { useState } from "react";

const iconBtn =
  "inline-flex size-11 items-center justify-center rounded-lg border border-line bg-mist text-navy transition-colors hover:border-blueprint hover:text-blueprint-ink";

/** Share links for LinkedIn, X and email, plus copy-link. Uses plain share URLs: no third-party scripts. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-body-sm text-body">Share:</span>
      <a className={iconBtn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z" />
        </svg>
      </a>
      <a className={iconBtn} href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
        </svg>
      </a>
      <a className={iconBtn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email">
        <Mail aria-hidden="true" className="size-4" />
      </a>
      <button type="button" onClick={copy} className={iconBtn} aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check aria-hidden="true" className="size-4 text-accent-ink" /> : <Link2 aria-hidden="true" className="size-4" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
