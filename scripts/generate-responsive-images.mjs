/**
 * Pre-generates responsive WebP variants for every image in public/images into
 * public/_img/<path-without-ext>/<width>.webp. Runs before `next dev`/`next build`
 * (see package.json pre-scripts) and is incremental: a variant is only rebuilt
 * when the source is newer.
 *
 * Together with image-loader.ts this replaces runtime image optimization, so the
 * site serves plain static files (no Worker CPU, no Cloudflare Images charges).
 */
import sharp from "sharp";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export const WIDTHS = [256, 360, 480, 640, 828, 1080, 1280, 1600, 1920];
const QUALITY = 75;
const SRC = path.resolve("public/images");
const OUT = path.resolve("public/_img");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function isFresh(target, sourceMtime) {
  try {
    return (await stat(target)).mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

const files = await walk(SRC);
let generated = 0;
const started = Date.now();

await Promise.all(
  files.map(async (file) => {
    const rel = path.relative(SRC, file).replace(/\.[^.]+$/, "");
    const outDir = path.join(OUT, rel);
    await mkdir(outDir, { recursive: true });
    const source = sharp(file);
    const { width: srcWidth = 0, mtimeMs } = { ...(await source.metadata()), mtimeMs: (await stat(file)).mtimeMs };
    for (const w of WIDTHS) {
      const target = path.join(outDir, `${w}.webp`);
      if (await isFresh(target, mtimeMs)) continue;
      const buf = await source.clone().resize({ width: Math.min(w, srcWidth), withoutEnlargement: true }).webp({ quality: QUALITY }).toBuffer();
      await writeFile(target, buf);
      generated++;
    }
  }),
);

console.log(`Responsive images: ${files.length} sources, ${generated} variants generated in ${((Date.now() - started) / 1000).toFixed(1)}s`);
