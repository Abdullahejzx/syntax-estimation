import { withBasePath } from "@/config/site";
import images from "@/content/images.json";

type Entry = { id: string; alt: string };
const entries = images as unknown as Record<string, Entry>;

/** Keys in content/images.json, e.g. "hero-estimating", "service-drafting", "trade-concrete", "bg-cta". */
export type PhotoKey = string;

/**
 * A stock photo from public/images/. "lg" (1600px) is for full-width backgrounds,
 * "sm" (800px) for cards. Unknown keys fall back to a generic construction photo,
 * so a new service or trade still renders before its photo is added.
 */
export function photo(key: PhotoKey, size: "lg" | "sm" = "sm") {
  const k = key in entries ? key : "bg-services";
  return { src: withBasePath(`/images/${k}-${size}.webp`), alt: entries[k].alt };
}
