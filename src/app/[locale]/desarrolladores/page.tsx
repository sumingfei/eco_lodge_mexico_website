import type { Metadata } from "next";
import { developerAdvantages, developerProcess, developerSegments } from "@/data/developers";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { whatsappDeveloperLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { LeadForm } from "@/components/calculator/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "developers", title: dict.developersPage.metaTitle, description: dict.developersPage.metaDescription, image: "/images/sections/desarrollo-resort.jpg" });
}

export default async function DevelopersPage() {
  const { locale, dict } = await getI18n();
  const d = dict.developersPage;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} image="/images/sections/desarrollo-resort.jpg" alt={d.alt}>
        <Button href={whatsappDeveloperLink(locale)} external variant="light" size="lg" icon={<WhatsApp size={18} />}>
          {d.cta}
        </Button>
      </PageHero>

      <section className="container-wide py-20 sm:py-28" aria-labelledby="para-quien">
        <Reveal>
          <SectionHeading eyebrow={d.forWhomEyebrow} title={d.forWhomTitle} />
        </Reveal>
        <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {developerSegments.map((s, i) => (
            <Reveal as="li" key={s.title.es} delay={(i % 3) * 0.05} className="border-t border-ink/15 pt-5">
              <h3 className="font-serif text-2xl text-ink">{t(s.title, locale)}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal-700/80">{t(s.text, locale)}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-ink py-20 text-limestone sm:py-28" aria-labelledby="ventajas">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading light eyebrow={d.advEyebrow} title={d.advTitle} intro={d.advIntro} />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.25rem]">
              {/* TODO: replace with photography of a multi-unit project */}
              <Picture src="/images/sections/desarrollo-lobby.jpg" alt={d.advAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {developerAdvantages.map((a, i) => (
              <Reveal as="li" key={a.title.es} delay={(i % 2) * 0.05} className="border-t border-white/15 pt-5">
                <h3 className="font-semibold">{t(a.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-limestone/70">{t(a.text, locale)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-wide py-20 sm:py-28" aria-labelledby="proceso-dev">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow={d.processEyebrow} title={d.processTitle} />
            </Reveal>
            <ol className="mt-10 space-y-6">
              {developerProcess.map((p) => (
                <Reveal as="li" key={p.number} className="flex gap-5 border-t border-ink/10 pt-5">
                  <span className="font-serif text-3xl text-terracotta">{p.number}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{t(p.title, locale)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-700/80">{t(p.text, locale)}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <LeadForm source="desarrolladores" title={d.formTitle} intro={d.formIntro} submitLabel={d.formSubmit} showMessage whatsappMessage={t(siteConfig.whatsapp.developerMessage, locale)} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
