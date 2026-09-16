import { IMAGE_MANIFEST, type ImageMeta } from "@/data/images.generated";

/**
 * Returns intrinsic size + blur placeholder for a local image, if the manifest
 * knows it. Regenerate the manifest with `node scripts/generate-image-manifest.mjs`.
 */
export function imageMeta(src: string): Partial<ImageMeta> {
  return IMAGE_MANIFEST[src] ?? {};
}

/** Props to spread into <Image> for blur-up loading when metadata exists. */
export function blurProps(src: string) {
  const meta = IMAGE_MANIFEST[src];
  return meta ? ({ placeholder: "blur", blurDataURL: meta.blurDataURL } as const) : {};
}
