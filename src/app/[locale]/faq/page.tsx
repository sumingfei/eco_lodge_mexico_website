import type { Metadata } from "next";
import { faqCategories, faqs } from "@/data/faqs";
import { buildMetadata, faqJsonLd, localizeFaqs } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { whatsappDefaultLink } from "@/lib/whatsapp";
import { href, t } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "faq", title: dict.faqPage.metaTitle, description: dict.faqPage.metaDescription });
}

export default async function FaqPage() {
  const { locale, dict } = await getI18n();
  const fp = dict.faqPage;
  return (
    <>
      <JsonLd data={faqJsonLd(localizeFaqs(faqs, locale))} />
      <section className="container-wide pb-12 pt-32 sm:pt-40">
        <SectionHeading as="h1" eyebrow={fp.eyebrow} title={fp.title} intro={fp.intro} />
      </section>

      <div className="container-wide grid gap-12 pb-24 lg:grid-cols-12 lg:pb-32">
        <nav aria-label={fp.categoriesAria} className="min-w-0 lg:col-span-3">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:gap-0 lg:pb-0">
            {faqCategories.map((c) => (
              <li key={c.id} className="shrink-0">
                <a href={`#${c.id}`} className="block rounded-full bg-ink/5 px-4 py-2 text-sm font-medium text-ink/80 hover:bg-ink/10 lg:rounded-none lg:border-t lg:border-ink/10 lg:bg-transparent lg:px-0 lg:py-3 lg:hover:bg-transparent lg:hover:text-ink">
                  {t(c.label, locale)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 space-y-16 lg:col-span-9">
          {faqCategories.map((c) => {
            const items = localizeFaqs(
              faqs.filter((f) => f.category === c.id),
              locale,
            );
            if (!items.length) return null;
            return (
              <section key={c.id} id={c.id} className="scroll-mt-28" aria-labelledby={`faq-${c.id}`}>
                <h2 id={`faq-${c.id}`} className="font-serif text-3xl text-ink">
                  {t(c.label, locale)}
                </h2>
                <Accordion items={items} className="mt-6" />
              </section>
            );
          })}
        </div>
      </div>

      <section className="bg-limestone-50 py-20">
        <div className="container-narrow text-center">
          <h2 className="display text-3xl text-ink sm:text-4xl">{fp.ctaTitle}</h2>
          <p className="mt-4 text-charcoal-700/80">{fp.ctaText}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={whatsappDefaultLink(locale)} external icon={<WhatsApp size={16} />}>
              {dict.common.whatsapp}
            </Button>
            <Button href={href(locale, "estimator")} variant="outline" icon={<ArrowRight size={16} />}>
              {dict.common.quoteMyHome}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
