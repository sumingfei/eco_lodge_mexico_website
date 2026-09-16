import Image, { type ImageProps } from "next/image";
import { blurProps } from "@/lib/images";

type Props = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & { src: string };

/**
 * next/image with automatic blur-up placeholder for local images listed in the
 * generated manifest. Use `fill` + `sizes` for art-directed layouts.
 */
export function Picture({ src, alt, ...rest }: Props) {
  return <Image src={src} alt={alt} {...blurProps(src)} {...rest} />;
}
