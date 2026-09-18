import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { models, getModelBySlug } from "@/data/models";
import { modelPageFaqs } from "@/data/faqs";
import { getModelStartingPrice } from "@/lib/pricing";
import { formatArea, formatBathrooms, formatBedrooms, formatMeters, formatMXN, formatWeeks } from "@/lib/format";
import { buildMetadata, breadcrumbJsonLd, productJsonLd, faqJsonLd, localizeFaqs } from "@/lib/seo";
import { whatsappModelLink } from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/JsonLd";
import { ModelGallery } from "@/components/models/ModelGallery";
import { FloorPlan } from "@/components/models/FloorPlan";
import { ModelStickyCta } from "@/components/models/ModelStickyCta";
import { ModelCard } from "@/components/models/ModelCard";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Check, WhatsApp } from "@/components/ui/Icons";
import { fill, href, locales, t, tl } from "@/i18n";
import { getI18n } from "@/i18n/server";

export function generateStaticParams() {
  return locales.flatMap((locale) => models.map((m) => ({ locale, slug: m.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/models/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale, dict } = await getI18n();
  const model = getModelBySlug(slug);
  if (!model) return {};
  const mp = dict.modelPage;
  return buildMetadata({
    locale,
    route: "models",
    rest: `/${model.slug}`,
    title: fill(mp.metaTitle, { name: model.name, area: model.areaM2, bedrooms: formatBedrooms(model.bedrooms, locale) }),
    description: fill(mp.metaDescription, {
      tagline: t(model.tagline, locale),
      area: formatArea(model.areaM2),
      bedrooms: formatBedrooms(model.bedrooms, locale),
      bathrooms: formatBathrooms(model.bathrooms, locale),
      price: formatMXN(getModelStartingPrice(model)),
      weeks: formatWeeks(model.buildWeeks.min, model.buildWeeks.max, locale),
    }),
    image: model.images[0].src,
  });
}

export default async function ModelPage({ params }: PageProps<"/[locale]/models/[slug]">) {
  const { slug } = await params;
  const { locale, dict } = await getI18n();
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const mp = dict.modelPage;
  const price = getModelStartingPrice(model);
  const related = models.filter((m) => m.slug !== model.slug).sort((a, b) => Math.abs(a.areaM2 - model.areaM2) - Math.abs(b.areaM2 - model.areaM2)).slice(0, 3);
  const modelFaqs = localizeFaqs([...model.faq, ...modelPageFaqs], locale);
  const modelPath = href(locale, "models", `/${model.slug}`);

  const specs = [
    { label: mp.interiorSurface, value: formatArea(model.areaM2) },
    { label: mp.bedrooms, value: String(model.bedrooms) },
    { label: mp.bathrooms, value: String(model.bathrooms) },
    { label: mp.stories, value: model.stories === 2 ? mp.two : mp.one },
    { label: mp.dimensions, value: `${formatMeters(model.dimensions.width)} × ${formatMeters(model.dimensions.depth)}` },
    { label: mp.height, value: formatMeters(model.dimensions.height) },
    { label: mp.estimatedTime, value: formatWeeks(model.buildWeeks.min, model.buildWeeks.max, locale) },
  ];

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(model, locale),
          breadcrumbJsonLd([
            { name: dict.common.home, path: href(locale, "home") },
            { name: dict.nav.models, path: href(locale, "models") },
            { name: model.name, path: modelPath },
          ]),
          faqJsonLd(modelFaqs),
        ]}
      />

      <article className="container-wide pb-28 pt-28 sm:pt-36 lg:pb-32">
        <nav aria-label={dict.common.breadcrumbs} className="text-xs text-stone">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={href(locale, "home")} className="hover:text-ink">
                {dict.common.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={href(locale, "models")} className="hover:text-ink">
                {dict.nav.models}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {model.name}
            </li>
          </ol>
        </nav>

        <header className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="terracotta">{model.family}</Badge>
              <Badge>{model.stories === 2 ? dict.common.twoStory : dict.common.oneStory}</Badge>
            </div>
            <h1 className="display mt-5 text-[3rem] text-ink sm:text-[4.5rem] lg:text-[5.5rem]">{model.name}</h1>
            <p className="mt-4 max-w-xl font-serif text-2xl leading-snug text-charcoal-700/85 sm:text-3xl">{t(model.tagline, locale)}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-5 lg:col-span-4 lg:border-t-0 lg:pt-0">
            <div>
              <dt className="eyebrow">{mp.surface}</dt>
              <dd className="mt-1 font-serif text-2xl text-ink">{formatArea(model.areaM2)}</dd>
            </div>
            <div>
              <dt className="eyebrow">{mp.bedrooms}</dt>
              <dd className="mt-1 font-serif text-2xl text-ink">{model.bedrooms}</dd>
            </div>
            <div>
              <dt className="eyebrow">{mp.bathrooms}</dt>
              <dd className="mt-1 font-serif text-2xl text-ink">{model.bathrooms}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-20 lg:col-span-8">
            <ModelGallery images={model.images} name={model.name} />

            <section aria-labelledby="descripcion">
              <h2 id="descripcion" className="eyebrow">
                {mp.theModel}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-700/85">{t(model.description, locale)}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {tl(model.idealFor, locale).map((tag) => (
                  <li key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/80">
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="especificaciones">
              <h2 id="especificaciones" className="eyebrow">
                {mp.specs}
              </h2>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 sm:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-stone">{s.label}</dt>
                    <dd className="mt-1 font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="planta">
              <h2 id="planta" className="eyebrow">
                {mp.floorPlan}
              </h2>
              <div className="mt-5 grid gap-6">
                {model.floorPlan.map((floor) => (
                  <FloorPlan key={floor.name.es} floor={floor} locale={locale} labels={dict.floorPlan} />
                ))}
              </div>
            </section>

            <section aria-labelledby="caracteristicas" className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 id="caracteristicas" className="eyebrow">
                  {mp.features}
                </h2>
                <List items={tl(model.features, locale)} />
              </div>
              <div>
                <h2 className="eyebrow">{mp.included}</h2>
                <List items={tl(model.includedFinishes, locale)} />
              </div>
            </section>

            <section aria-labelledby="mejoras" className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 id="mejoras" className="eyebrow">
                  {mp.upgrades}
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tl(model.upgrades, locale).map((u) => (
                    <li key={u} className="rounded-full bg-ink/5 px-3 py-1.5 text-sm text-ink">
                      {u}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-stone">{mp.upgradesNote}</p>
              </div>
              <div>
                <h2 className="eyebrow">{mp.sustainability}</h2>
                <List items={tl(model.sustainability, locale)} tone="agave" />
              </div>
            </section>

            <section aria-labelledby="faq">
              <h2 id="faq" className="eyebrow">
                {fill(mp.faq, { name: model.name })}
              </h2>
              <Accordion items={modelFaqs} className="mt-5" />
            </section>
          </div>

          {/* Desktop sticky summary */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 rounded-[1.25rem] border border-ink/10 bg-limestone-50 p-7">
              <p className="eyebrow">{dict.common.from}</p>
              <p className="mt-2 font-serif text-4xl text-ink">{formatMXN(price)}</p>
              <p className="mt-2 text-xs leading-relaxed text-stone">{mp.priceNote}</p>
              <dl className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-sm">
                <Row label={mp.surface} value={formatArea(model.areaM2)} />
                <Row label={mp.program} value={`${formatBedrooms(model.bedrooms, locale)} · ${formatBathrooms(model.bathrooms, locale)}`} />
                <Row label={mp.estimatedTime} value={formatWeeks(model.buildWeeks.min, model.buildWeeks.max, locale)} />
              </dl>
              <div className="mt-7 grid gap-3">
                <Button href={href(locale, "estimator", `?model=${model.slug}`)} size="lg" icon={<ArrowRight size={16} />}>
                  {dict.common.quoteThisModel}
                </Button>
                <Button href={whatsappModelLink(model.name, locale)} external variant="outline" size="lg" icon={<WhatsApp size={16} />}>
                  {dict.common.askWhatsapp}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 border-t border-ink/10 pt-16" aria-labelledby="relacionados">
          <div className="flex items-end justify-between gap-6">
            <h2 id="relacionados" className="display text-3xl text-ink sm:text-4xl">
              {mp.otherModels}
            </h2>
            <Link href={href(locale, "models")} className="text-sm font-semibold text-ink hover:text-terracotta">
              {dict.common.seeAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((m) => (
              <ModelCard key={m.slug} model={m} />
            ))}
          </div>
        </section>
      </article>

      <ModelStickyCta slug={model.slug} name={model.name} price={price} />
    </>
  );
}

function List({ items, tone = "ink" }: { items: string[]; tone?: "ink" | "agave" }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal-700/85">
          <Check size={16} className={tone === "agave" ? "mt-1 shrink-0 text-agave" : "mt-1 shrink-0 text-terracotta"} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-stone">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
