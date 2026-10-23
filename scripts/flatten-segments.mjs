// Runs automatically after `npm run build` (the "postbuild" script).
//
// The static export writes Next's per-segment prefetch data into nested folders, e.g.
//   out/blog/my-post/__next.blog/$d$slug/__PAGE__.txt
// but the browser requests the same data with dots instead of slashes:
//   /blog/my-post/__next.blog.$d$slug.__PAGE__.txt
// Without this copy every link prefetch would 404 on Apache. This writes the
// flat-named copy next to each nested file.
import { copyFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = join(import.meta.dirname, "..", "out");
let copied = 0;

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? filesIn(join(dir, e.name)) : [join(dir, e.name)]));
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of filesIn(path)) {
        const flat = `${entry.name}.${relative(path, file).split(sep).join(".")}`;
        copyFileSync(file, join(dir, flat));
        copied++;
      }
    } else {
      walk(path);
    }
  }
}

walk(out);
console.log(`flatten-segments: wrote ${copied} prefetch file copies`);
