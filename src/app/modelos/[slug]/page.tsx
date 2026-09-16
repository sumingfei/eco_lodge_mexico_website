import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { models, getModelBySlug } from "@/data/models";
import { faqs } from "@/data/faqs";
import { getModelStartingPrice } from "@/lib/pricing";
import { formatArea, formatBathrooms, formatBedrooms, formatMeters, formatMXN, formatWeeks } from "@/lib/format";
import { buildMetadata, breadcrumbJsonLd, productJsonLd, faqJsonLd } from "@/lib/seo";
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

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/modelos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};
  return buildMetadata({
    title: `${model.name} — casa prefabricada de ${model.areaM2} m², ${formatBedrooms(model.bedrooms)}`,
    description: `${model.tagline} ${formatArea(model.areaM2)}, ${formatBedrooms(model.bedrooms)}, ${formatBathrooms(model.bathrooms)}. Desde ${formatMXN(getModelStartingPrice(model))}. Tiempo estimado ${formatWeeks(model.buildWeeks.min, model.buildWeeks.max)}.`,
    path: `/modelos/${model.slug}`,
    image: model.images[0].src,
  });
}

export default async function ModelPage({ params }: PageProps<"/modelos/[slug]">) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const price = getModelStartingPrice(model);
  const related = models.filter((m) => m.slug !== model.slug).sort((a, b) => Math.abs(a.areaM2 - model.areaM2) - Math.abs(b.areaM2 - model.areaM2)).slice(0, 3);
  const generalFaqs = faqs.filter((f) => ["¿Qué incluye el precio de la casa?", "¿El precio incluye la cimentación?", "¿Cuánto tiempo tarda la construcción?"].includes(f.q));
  const modelFaqs = [...model.faq, ...generalFaqs];

  const specs = [
    { label: "Superficie interior", value: formatArea(model.areaM2) },
    { label: "Recámaras", value: String(model.bedrooms) },
    { label: "Baños", value: formatBathrooms(model.bathrooms).replace(/ baños?$/, "") },
    { label: "Niveles", value: model.stories === 2 ? "Dos" : "Uno" },
    { label: "Dimensiones", value: `${formatMeters(model.dimensions.width)} × ${formatMeters(model.dimensions.depth)}` },
    { label: "Altura", value: formatMeters(model.dimensions.height) },
    { label: "Tiempo estimado", value: formatWeeks(model.buildWeeks.min, model.buildWeeks.max) },
  ];

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(model),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Modelos", path: "/modelos" },
            { name: model.name, path: `/modelos/${model.slug}` },
          ]),
          faqJsonLd(modelFaqs),
        ]}
      />

      <article className="container-wide pb-28 pt-28 sm:pt-36 lg:pb-32">
        <nav aria-label="Migas de pan" className="text-xs text-stone">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink">
                Inicio
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/modelos" className="hover:text-ink">
                Modelos
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
              <Badge>{model.stories === 2 ? "Dos niveles" : "Un nivel"}</Badge>
            </div>
            <h1 className="display mt-5 text-[3rem] text-ink sm:text-[4.5rem] lg:text-[5.5rem]">{model.name}</h1>
            <p className="mt-4 max-w-xl font-serif text-2xl leading-snug text-charcoal-700/85 sm:text-3xl">{model.tagline}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-5 lg:col-span-4 lg:border-t-0 lg:pt-0">
            <div>
              <dt className="eyebrow">Superficie</dt>
              <dd className="mt-1 font-serif text-2xl text-ink">{formatArea(model.areaM2)}</dd>
            </div>
            <div>
              <dt className="eyebrow">Recámaras</dt>
              <dd className="mt-1 font-serif text-2xl text-ink">{model.bedrooms}</dd>
            </div>
            <div>
              <dt className="eyebrow">Baños</dt>
              <dd className="mt-1 font-serif text-2xl text-ink">{model.bathrooms}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-20 lg:col-span-8">
            <ModelGallery images={model.images} name={model.name} />

            <section aria-labelledby="descripcion">
              <h2 id="descripcion" className="eyebrow">
                El modelo
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal-700/85">{model.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {model.idealFor.map((tag) => (
                  <li key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/80">
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="especificaciones">
              <h2 id="especificaciones" className="eyebrow">
                Especificaciones
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
                Planta arquitectónica
              </h2>
              <div className="mt-5 grid gap-6">
                {model.floorPlan.map((floor) => (
                  <FloorPlan key={floor.name} floor={floor} />
                ))}
              </div>
            </section>

            <section aria-labelledby="caracteristicas" className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 id="caracteristicas" className="eyebrow">
                  Características
                </h2>
                <List items={model.features} />
              </div>
              <div>
                <h2 className="eyebrow">Acabados incluidos</h2>
                <List items={model.includedFinishes} />
              </div>
            </section>

            <section aria-labelledby="mejoras" className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 id="mejoras" className="eyebrow">
                  Mejoras disponibles
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {model.upgrades.map((u) => (
                    <li key={u} className="rounded-full bg-ink/5 px-3 py-1.5 text-sm text-ink">
                      {u}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-stone">Los precios de las mejoras se cotizan por proyecto. Consulta el cotizador para una referencia.</p>
              </div>
              <div>
                <h2 className="eyebrow">Sustentabilidad</h2>
                <List items={model.sustainability} tone="agave" />
              </div>
            </section>

            <section aria-labelledby="faq">
              <h2 id="faq" className="eyebrow">
                Preguntas sobre {model.name}
              </h2>
              <Accordion items={modelFaqs} className="mt-5" />
            </section>
          </div>

          {/* Desktop sticky summary */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 rounded-[1.25rem] border border-ink/10 bg-limestone-50 p-7">
              <p className="eyebrow">Desde</p>
              <p className="mt-2 font-serif text-4xl text-ink">{formatMXN(price)}</p>
              <p className="mt-2 text-xs leading-relaxed text-stone">Nivel de acabado Esencial. No incluye terreno, cimentación, permisos ni conexiones a servicios.</p>
              <dl className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-sm">
                <Row label="Superficie" value={formatArea(model.areaM2)} />
                <Row label="Programa" value={`${formatBedrooms(model.bedrooms)} · ${formatBathrooms(model.bathrooms)}`} />
                <Row label="Tiempo estimado" value={formatWeeks(model.buildWeeks.min, model.buildWeeks.max)} />
              </dl>
              <div className="mt-7 grid gap-3">
                <Button href={`/cotizador?modelo=${model.slug}`} size="lg" icon={<ArrowRight size={16} />}>
                  Cotizar este modelo
                </Button>
                <Button href={whatsappModelLink(model.name)} external variant="outline" size="lg" icon={<WhatsApp size={16} />}>
                  Preguntar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 border-t border-ink/10 pt-16" aria-labelledby="relacionados">
          <div className="flex items-end justify-between gap-6">
            <h2 id="relacionados" className="display text-3xl text-ink sm:text-4xl">
              Otros modelos
            </h2>
            <Link href="/modelos" className="text-sm font-semibold text-ink hover:text-terracotta">
              Ver todos
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
