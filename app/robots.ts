import type { MetadataRoute } from "next";
import { absoluteUrl, isPreview } from "@/config/site";

// Written to out/robots.txt at build time
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // The GitHub Pages preview is for the client only, so keep search engines out
  if (isPreview) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
