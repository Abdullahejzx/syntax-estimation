// Downloads the site's stock photos listed in content/images.json from Unsplash's CDN,
// resized and converted to WebP by Unsplash itself, into public/images/:
//   <key>-lg.webp  1600px wide, for full-width backgrounds (shown under a dark overlay,
//                  so a lower quality setting keeps them small without visible loss)
//   <key>-sm.webp   800px wide, for cards
// Run with `npm run images`. Existing files are skipped; pass --force to redownload.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const outDir = join(root, "public", "images");
const force = process.argv.includes("--force");
const images = JSON.parse(readFileSync(join(root, "content", "images.json"), "utf8"));
const sizes = { lg: "w=1600&h=900&q=45", sm: "w=800&h=520&q=60" };

mkdirSync(outDir, { recursive: true });
let downloaded = 0;
for (const [key, { id }] of Object.entries(images)) {
  if (key.startsWith("_")) continue;
  for (const [size, params] of Object.entries(sizes)) {
    const file = join(outDir, `${key}-${size}.webp`);
    if (existsSync(file) && !force) continue;
    const res = await fetch(`https://images.unsplash.com/${id}?${params}&fit=crop&crop=entropy&fm=webp`);
    if (!res.ok) throw new Error(`${key} (${id}): HTTP ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    downloaded++;
    console.log(`${key}-${size}.webp`);
  }
}
console.log(`fetch-images: ${downloaded} file(s) downloaded`);
