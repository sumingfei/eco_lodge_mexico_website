"use client";

import { useState } from "react";
import type { ModelImage } from "@/data/models";
import { Picture } from "@/components/ui/Picture";
import { cn } from "@/lib/utils";
import { fill, t } from "@/i18n";
import { useI18n } from "@/i18n/LocaleProvider";

/** Main image + thumbnail strip. Keyboard accessible. */
export function ModelGallery({ images, name }: { images: ModelImage[]; name: string }) {
  const { locale, dict } = useI18n();
  const [index, setIndex] = useState(0);
  const current = images[index];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand sm:aspect-[16/10]">
        {images.map((img, i) => (
          <Picture
            key={img.src}
            src={img.src}
            alt={t(img.alt, locale)}
            fill
            priority={i === 0}
            sizes="(min-width: 1280px) 62vw, 100vw"
            className={cn("object-cover transition-opacity duration-500", i === index ? "opacity-100" : "opacity-0")}
            aria-hidden={i !== index}
          />
        ))}
        <p className="absolute bottom-4 left-4 rounded-full bg-ink/60 px-3 py-1 text-xs text-limestone backdrop-blur" aria-live="polite">
          {index + 1} / {images.length} · {t(current.alt, locale)}
        </p>
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-3" aria-label={fill(dict.modelPage.galleryAria, { name })}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={fill(dict.modelPage.viewImage, { n: i + 1, alt: t(img.alt, locale) })}
              aria-current={i === index}
              className={cn("relative block aspect-[4/3] w-full overflow-hidden rounded-xl transition-opacity", i === index ? "ring-2 ring-ink ring-offset-2 ring-offset-limestone" : "opacity-70 hover:opacity-100")}
            >
              <Picture src={img.src} alt="" fill sizes="(min-width: 1280px) 15vw, 25vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
