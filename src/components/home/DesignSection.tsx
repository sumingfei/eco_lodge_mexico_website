import { customizationAreas } from "@/data/features";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { href, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function DesignSection() {
  const { locale, dict } = await getI18n();
  const d = dict.home.design;
  return (
    <section className="bg-limestone py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <SectionHeading eyebrow={d.eyebrow} title={d.title} intro={d.intro} size="xl" />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-12 lg:mt-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] sm:col-span-7 sm:aspect-auto sm:row-span-2">
            {/* TODO: replace with real facade material photography */}
            <Picture src="/images/sections/fachada-detalle.jpg" alt={d.alt1} fill sizes="(min-width: 640px) 58vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:col-span-5">
            <Picture src="/images/interiors/cocina-madera.jpg" alt={d.alt2} fill sizes="(min-width: 640px) 42vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:col-span-5">
            <Picture src="/images/interiors/bano-marmol.jpg" alt={d.alt3} fill sizes="(min-width: 640px) 42vw, 100vw" className="object-cover" />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="font-serif text-3xl text-ink">{d.subtitle}</h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{d.subtext}</p>
            <Button href={href(locale, "design")} variant="outline" className="mt-8" icon={<ArrowRight size={16} />}>
              {d.cta}
            </Button>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {customizationAreas.map((c, i) => (
              <Reveal as="li" key={c.title.es} delay={(i % 2) * 0.05} className="border-t border-ink/15 pt-4">
                <h4 className="font-semibold text-ink">{t(c.title, locale)}</h4>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-700/75">{t(c.text, locale)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
