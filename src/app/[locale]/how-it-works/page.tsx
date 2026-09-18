import type { Metadata } from "next";
import { fullProcess, responsibilities } from "@/data/process";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { TimelineComparison } from "@/components/sections/TimelineComparison";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { href, t, tl } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "process", title: dict.processPage.metaTitle, description: dict.processPage.metaDescription, image: "/images/hero/hero-dusk.jpg" });
}

const ownerTone = { empresa: "terracotta", cliente: "neutral", compartido: "agave" } as const;

export default async function HowItWorksPage() {
  const { locale, dict } = await getI18n();
  const pp = dict.processPage;
  return (
    <>
      <PageHero eyebrow={pp.eyebrow} title={pp.title} intro={pp.intro} image="/images/hero/hero-dusk.jpg" alt={pp.alt} />

      <section className="container-wide py-16 sm:py-24">
        <Reveal>
          <TimelineComparison headingLevel="h2" />
        </Reveal>
      </section>

      <section className="container-wide pb-20 sm:pb-28" aria-labelledby="proceso">
        <h2 id="proceso" className="display text-3xl text-ink sm:text-5xl">
          {pp.fullProcess}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-stone">
          <span className="inline-flex items-center gap-2">
            <Badge tone="terracotta">{pp.owner.empresa}</Badge> {pp.legendUs}
          </span>
          <span className="inline-flex items-center gap-2">
            <Badge tone="agave">{pp.owner.compartido}</Badge> {pp.legendShared}
          </span>
          <span className="inline-flex items-center gap-2">
            <Badge>{pp.owner.cliente}</Badge> {pp.legendClient}
          </span>
        </div>

        <ol className="relative mt-12 border-l border-ink/15 lg:mt-16">
          {fullProcess.map((step, i) => (
            <Reveal as="li" key={step.number} delay={Math.min(i, 4) * 0.04} className="relative pb-12 pl-8 last:pb-0 sm:pl-14">
              <span className={cn("absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full", step.owner === "empresa" ? "bg-terracotta" : step.owner === "compartido" ? "bg-agave" : "bg-stone-300")} aria-hidden />
              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <span className="font-serif text-4xl text-stone-300">{step.number}</span>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge tone={ownerTone[step.owner]}>{pp.owner[step.owner]}</Badge>
                    {step.duration && <span className="text-xs text-stone">{t(step.duration, locale)}</span>}
                  </div>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="font-serif text-2xl text-ink sm:text-3xl">{t(step.title, locale)}</h3>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-charcoal-700/85">{t(step.text, locale)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-limestone-50 py-20 sm:py-28" aria-labelledby="responsabilidades">
        <div className="container-wide">
          <h2 id="responsabilidades" className="display text-3xl text-ink sm:text-5xl">
            {pp.whoTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-charcoal-700/80">{pp.whoText}</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <ResponsibilityCard title={pp.cardUs} items={tl(responsibilities.empresa, locale)} tone="terracotta" />
            <ResponsibilityCard title={pp.cardShared} items={tl(responsibilities.compartido, locale)} tone="agave" />
            <ResponsibilityCard title={pp.cardClient} items={tl(responsibilities.cliente, locale)} tone="neutral" />
          </div>
          <p className="mt-8 text-xs leading-relaxed text-stone">{pp.whoNote}</p>
        </div>
      </section>

      <section className="container-wide py-20 sm:py-28">
        <div className="rounded-[1.5rem] bg-ink px-6 py-14 text-center text-limestone sm:px-12 sm:py-20">
          <h2 className="display text-3xl sm:text-5xl">{pp.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-lg text-limestone/75">{pp.ctaText}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={href(locale, "estimator")} variant="light" icon={<ArrowRight size={16} />}>
              {dict.common.quoteMyHome}
            </Button>
            <Button href={href(locale, "models")} variant="outline-light">
              {dict.common.exploreModels}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function ResponsibilityCard({ title, items, tone }: { title: string; items: string[]; tone: "terracotta" | "agave" | "neutral" }) {
  return (
    <div className="rounded-[1.25rem] border border-ink/10 bg-limestone p-7">
      <Badge tone={tone}>{title}</Badge>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal-700/85">
            <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", tone === "terracotta" ? "bg-terracotta" : tone === "agave" ? "bg-agave" : "bg-stone-300")} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
