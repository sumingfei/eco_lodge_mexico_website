import type { ImageLoaderProps } from "next/image";

/**
 * Serves pre-generated WebP variants (see scripts/generate-responsive-images.mjs)
 * as static files instead of optimizing at request time.
 * Keep WIDTHS in sync with the generator script.
 */
const WIDTHS = [256, 360, 480, 640, 828, 1080, 1280, 1600, 1920];

export default function staticLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/")) return src;
  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  const rel = src.slice("/images/".length).replace(/\.[^.]+$/, "");
  return `/_img/${rel}/${target}.webp`;
}
