import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { OG_SIZE, getOgCards } from "@/lib/og";
import { OgImage } from "@/components/seo/OgImage";

// Rendered once at build time into out/og/**/*.png (see lib/og.ts for the list)
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(getOgCards()).map((key) => ({ image: `${key}.png`.split("/") }));
}

const fontFile = (pkg: string, file: string) => readFile(path.join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

async function loadFonts() {
  const [manrope600, manrope800, inter400, inter600] = await Promise.all([
    fontFile("manrope", "manrope-latin-600-normal.woff"),
    fontFile("manrope", "manrope-latin-800-normal.woff"),
    fontFile("inter", "inter-latin-400-normal.woff"),
    fontFile("inter", "inter-latin-600-normal.woff"),
  ]);
  return [
    { name: "Manrope", data: manrope600, weight: 600 as const, style: "normal" as const },
    { name: "Manrope", data: manrope800, weight: 800 as const, style: "normal" as const },
    { name: "Inter", data: inter400, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: inter600, weight: 600 as const, style: "normal" as const },
  ];
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string[] }> }) {
  const key = (await params).image.join("/").replace(/\.png$/, "");
  const card = getOgCards()[key];
  if (!card) return new Response("Not found", { status: 404 });
  return new ImageResponse(<OgImage {...card} />, { ...OG_SIZE, fonts: await loadFonts() });
}
