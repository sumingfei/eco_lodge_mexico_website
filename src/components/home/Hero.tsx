import { Picture } from "@/components/ui/Picture";
import { HeaderOverlay } from "@/components/layout/header-theme";
import { getI18n } from "@/i18n/server";

/**
 * Full-bleed video hero. The video autoplays muted and loops; the courtyard
 * photo underneath doubles as poster and as the still shown when the visitor
 * prefers reduced motion. The headline is kept for screen readers and SEO only.
 */
export async function Hero() {
  const { dict } = await getI18n();
  const h = dict.home.hero;
  return (
    <section className="relative h-[100svh] overflow-hidden bg-charcoal text-limestone" aria-label={h.videoAria}>
      <HeaderOverlay />
      <Picture src="/images/hero/hero-courtyard.jpg" alt="" fill priority fetchPriority="high" quality={75} sizes="100vw" className="object-cover object-[60%_center]" />
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src="/videos/hero_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/50 to-transparent" aria-hidden />
      <h1 className="sr-only">
        {h.title1} {h.title2}
      </h1>
      <a href="#content-start" className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-limestone/40 p-3 text-limestone/80 transition-colors hover:bg-limestone hover:text-ink motion-safe:animate-bounce" aria-label={h.scroll}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
