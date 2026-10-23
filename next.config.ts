import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export so the site runs on Hostinger shared hosting (Apache, no Node server).
  output: "export",
  // Emits /about/index.html instead of /about.html, which Apache serves without rewrite rules.
  trailingSlash: true,
  // Empty for Hostinger; "/<repo>" for the GitHub Pages preview (see config/site.ts)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: {
    // The Next.js image optimizer needs a server; images are pre-optimized at build time instead.
    unoptimized: true,
  },
  // This project sits inside another folder that has its own lockfile; pin the root here.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
