import { services } from "@/content/services";
import { trades } from "@/content/trades";
import { getAllPosts } from "@/lib/blog";

/**
 * Social share images (Open Graph / X cards). Each entry becomes a 1200×630 PNG at
 * /og/<key>.png, rendered at build time by app/og/[...image]/route.tsx. Pages pick
 * theirs with pageMetadata({ image: "<key>" }); anything else uses "default".
 * New services, trades and blog posts get an image automatically.
 */
export type OgCard = { eyebrow: string; title: string; subtitle: string };

export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Shortens text to a whole word so the subtitle fits on two lines. */
function clip(text: string, max = 118) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[,;:.]$/, "")}…`;
}

export function getOgCards(): Record<string, OgCard> {
  const cards: Record<string, OgCard> = {
    default: {
      eyebrow: "Estimating & takeoffs",
      title: "Construction Cost Estimating & Quantity Takeoffs",
      subtitle: "Accurate, bid-ready estimates for contractors in all 50 states.",
    },
  };
  for (const s of services) {
    cards[`services/${s.slug}`] = { eyebrow: "Service", title: s.name, subtitle: clip(s.seo.description) };
  }
  for (const t of trades) {
    cards[`trades/${t.slug}`] = { eyebrow: t.group === "client" ? "Who we serve" : "Trade", title: t.name, subtitle: t.summary };
  }
  for (const p of getAllPosts()) {
    cards[`blog/${p.slug}`] = { eyebrow: `Blog · ${p.category}`, title: p.title, subtitle: `${p.readTime} · ${p.author}` };
  }
  return cards;
}
