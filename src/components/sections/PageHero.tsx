import type { ReactNode } from "react";
import { Picture } from "@/components/ui/Picture";
import { HeaderOverlay } from "@/components/layout/header-theme";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  alt: string;
  children?: ReactNode;
  /** Focus point for the background image. */
  position?: string;
  compact?: boolean;
};

/** Full-bleed editorial hero for interior pages. Header renders light over it. */
export function PageHero({ eyebrow, title, intro, image, alt, children, position = "center", compact }: Props) {
  return (
    <section className={cn("relative flex items-end overflow-hidden bg-charcoal text-limestone", compact ? "min-h-[60svh]" : "min-h-[78svh]")}>
      <HeaderOverlay />
      {/* TODO: replace hero imagery with company photography */}
      <Picture src={image} alt={alt} fill priority sizes="100vw" quality={75} className="object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/25" aria-hidden />
      <div className="container-wide relative pb-14 pt-40 sm:pb-20">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-up text-limestone/70">{eyebrow}</p>
          <h1 className="display animate-fade-up mt-5 text-[2.75rem] text-limestone [animation-delay:100ms] sm:text-[3.75rem] lg:text-[5rem]">{title}</h1>
          {intro && <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-limestone/80 [animation-delay:200ms] sm:text-lg">{intro}</p>}
          {children && <div className="animate-fade-up mt-8 [animation-delay:300ms]">{children}</div>}
        </div>
      </div>
    </section>
  );
}
