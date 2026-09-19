import { ecoPillars, ecoStory } from "@/data/eco";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, IconRain, IconSolar } from "@/components/ui/Icons";
import { RainwaterDiagram, SolarDiagram } from "@/components/diagrams/Diagrams";
import { href, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

const visuals = {
  rain: { Icon: IconRain, Diagram: RainwaterDiagram, anchor: "agua" },
  solar: { Icon: IconSolar, Diagram: SolarDiagram, anchor: "energia-renovable" },
} as const;

/**
 * Homepage centrepiece: the ecological-design story (rainwater + solar),
 * shown right after the hero. Content lives in /data/eco.ts.
 */
export async function EcoStory() {
  const { locale, dict } = await getI18n();
  return (
    <section className="bg-limestone-50 py-20 sm:py-28 lg:py-36" aria-labelledby="eco-story-title">
      <div className="container-wide">
        <Reveal>
          <SectionHeading eyebrow={t(ecoStory.eyebrow, locale)} title={<span id="eco-story-title">{t(ecoStory.title, locale)}</span>} intro={t(ecoStory.intro, locale)} size="xl" className="max-w-4xl" />
          <Button href={href(locale, "ecoEstimator")} variant="primary" className="mt-8" icon={<ArrowRight size={16} />}>
            {t(ecoStory.calculatorCta, locale)}
          </Button>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2 lg:gap-8">
          {ecoPillars.map((pillar, i) => {
            const { Icon, Diagram, anchor } = visuals[pillar.id];
            return (
              <Reveal key={pillar.id} as="article" delay={i * 0.1} className="flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-limestone">
                <div className="border-b border-ink/10 bg-white/50 p-4 sm:p-6">
                  <Diagram className="h-auto w-full" labels={dict.diagrams} />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <Icon className="text-terracotta" />
                    <p className="eyebrow">{t(pillar.eyebrow, locale)}</p>
                  </div>
                  <h3 className="display mt-5 text-[2rem] leading-none text-ink sm:text-[2.5rem]">{t(pillar.title, locale)}</h3>
                  <p className="mt-5 text-base leading-relaxed text-charcoal-700/85">{t(pillar.story, locale)}</p>
                  <ul className="mt-7 space-y-4 border-t border-ink/10 pt-6">
                    {pillar.points.map((pt) => (
                      <li key={pt.title.es}>
                        <h4 className="font-semibold text-ink">{t(pt.title, locale)}</h4>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{t(pt.text, locale)}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 rounded-2xl bg-agave-100 p-5 text-agave-700">
                    <p className="font-serif text-[2rem] leading-none">{pillar.figure.value}</p>
                    <p className="mt-2 text-sm font-semibold">{t(pillar.figure.label, locale)}</p>
                    <p className="mt-2 text-xs leading-relaxed text-agave-700/80">{t(pillar.figure.note, locale)}</p>
                  </div>
                  <div className="mt-auto pt-8">
                    <Button href={`${href(locale, "sustainability")}#${anchor}`} variant="outline" size="sm" icon={<ArrowRight size={14} />}>
                      {t(ecoStory.cta, locale)}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
