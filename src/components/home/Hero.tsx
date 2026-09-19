import { Picture } from "@/components/ui/Picture";
import { HeaderOverlay } from "@/components/layout/header-theme";
import { Button } from "@/components/ui/Button";
import { ArrowRight, IconRain, IconSolar } from "@/components/ui/Icons";
import { ecoChips } from "@/data/eco";
import { getStartingPricePerM2 } from "@/lib/pricing";
import { formatMXN } from "@/lib/format";
import { href, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

/**
 * Full-bleed hero.
 * TODO: replace /images/hero/hero-courtyard.jpg with a real company render/photo
 * (ideally a short muted video with a poster) showing a home in a Mexican landscape.
 */
const chipIcons = { rain: IconRain, solar: IconSolar };

export async function Hero() {
  const { locale, dict } = await getI18n();
  const h = dict.home.hero;
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-limestone">
      <HeaderOverlay />
      <Picture src="/images/hero/hero-courtyard.jpg" alt={h.alt} fill priority fetchPriority="high" quality={75} sizes="100vw" className="object-cover object-[60%_center]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" aria-hidden />

      <div className="container-wide relative pb-14 pt-40 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          <p className="eyebrow animate-fade-up text-limestone/70">{h.eyebrow}</p>
          <h1 className="display animate-fade-up mt-6 text-[2.75rem] text-limestone [animation-delay:120ms] sm:text-[4rem] lg:text-[5.5rem]">
            {h.title1}
            <br />
            {h.title2}
          </h1>
          <p className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-limestone/80 [animation-delay:240ms] sm:text-lg">{h.text}</p>
          <ul aria-label={h.chipsAria} className="animate-fade-up mt-7 flex flex-wrap gap-2.5 [animation-delay:300ms]">
            {ecoChips.map((chip) => {
              const Icon = chipIcons[chip.id];
              return (
                <li key={chip.id} className="flex items-center gap-2 rounded-full border border-limestone/25 bg-ink/30 px-4 py-2 text-sm text-limestone backdrop-blur-sm">
                  <Icon size={18} className="text-sand-300" />
                  {t(chip.text, locale)}
                </li>
              );
            })}
          </ul>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:items-center">
            <Button href={href(locale, "models")} variant="light" size="lg" icon={<ArrowRight size={18} />}>
              {dict.common.exploreModels}
            </Button>
            <Button href={href(locale, "estimator")} variant="outline-light" size="lg">
              {dict.common.quoteMyHome}
            </Button>
          </div>
          <p className="animate-fade-up mt-8 text-sm text-limestone/60 [animation-delay:480ms]">
            {dict.common.from} {formatMXN(getStartingPricePerM2())}
            {dict.common.perM2} · {dict.common.priceNote}
          </p>
        </div>
      </div>
    </section>
  );
}
