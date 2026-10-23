// Serves the static export in out/ the way Hostinger's Apache does, for checking a
// production build locally:  npm run build && npm run preview
// (PHP files are not executed here, so the forms only work on the real host.)
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

const root = join(import.meta.dirname, "..", "out");
const port = Number(process.env.PORT ?? 3200);
// Mirrors a GitHub Pages preview build, which lives under /<repo>/:
//   node scripts/serve-out.mjs /syntax-estimation
const base = process.argv[2] ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};
const compressible = new Set([".html", ".js", ".css", ".json", ".svg", ".xml", ".txt"]);

createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = base && url.pathname.startsWith(base) ? url.pathname.slice(base.length) || "/" : url.pathname;
  const path = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, path);

  if (existsSync(file) && statSync(file).isDirectory()) {
    // Same as Apache's DirectorySlash: /about -> /about/
    if (!url.pathname.endsWith("/")) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    file = join(file, "index.html");
  }

  let status = 200;
  if (!existsSync(file)) {
    status = 404;
    file = join(root, "404.html");
  }

  const ext = extname(file);
  const headers = { "Content-Type": types[ext] ?? "application/octet-stream" };
  if (url.pathname.startsWith("/_next/static/")) headers["Cache-Control"] = "public, max-age=31536000, immutable";
  const gzip = compressible.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  if (gzip) headers["Content-Encoding"] = "gzip";

  res.writeHead(status, headers);
  const stream = createReadStream(file);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}`));
