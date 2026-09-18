import type { Metadata } from "next";
import { customizationAreas } from "@/data/features";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Configurator } from "@/components/design/Configurator";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "design", title: dict.designPage.metaTitle, description: dict.designPage.metaDescription, image: "/images/sections/fachada-detalle.jpg" });
}

const refImages = ["/images/sections/recamara-terraza.jpg", "/images/sections/comedor.jpg", "/images/sections/sala-vidrio.jpg"];

export default async function DesignPage() {
  const { locale, dict } = await getI18n();
  const dp = dict.designPage;
  return (
    <>
      <PageHero eyebrow={dp.eyebrow} title={dp.title} intro={dp.intro} image="/images/sections/fachada-detalle.jpg" alt={dp.alt} />

      <section className="container-wide py-16 sm:py-24" aria-labelledby="configurador">
        <Reveal>
          <SectionHeading as="h2" eyebrow={dp.exploreEyebrow} title={dp.exploreTitle} intro={dp.exploreIntro} className="mb-12" />
        </Reveal>
        <Reveal>
          <Configurator />
        </Reveal>
      </section>

      <section className="bg-limestone-50 py-20 sm:py-28" aria-labelledby="inspiracion">
        <div className="container-wide">
          <Reveal>
            <SectionHeading eyebrow={dp.refEyebrow} title={dp.refTitle} intro={dp.refIntro} />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {dp.refs.map((ref, i) => (
              <Reveal key={refImages[i]} delay={i * 0.08} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand">
                  {/* TODO: replace with renders of the company’s own models */}
                  <Picture src={refImages[i]} alt={ref.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 text-sm text-charcoal-700/80">{ref.caption}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-20 sm:py-28" aria-labelledby="decides">
        <Reveal>
          <SectionHeading eyebrow={dp.decideEyebrow} title={dp.decideTitle} />
        </Reveal>
        <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {customizationAreas.map((c, i) => (
            <Reveal as="li" key={c.title.es} delay={(i % 3) * 0.05} className="border-t border-ink/15 pt-5">
              <span className="font-serif text-sm text-stone">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-semibold text-ink">{t(c.title, locale)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-700/75">{t(c.text, locale)}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
