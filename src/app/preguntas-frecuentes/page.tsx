import type { Metadata } from "next";
import { faqCategories, faqs } from "@/data/faqs";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Preguntas frecuentes sobre casas prefabricadas",
  description:
    "Cuánto cuesta una casa prefabricada, qué incluye el precio, si incluye terreno o cimentación, cuánto tarda, permisos, transporte, paneles solares, captación de lluvia, ampliaciones, financiamiento y mantenimiento.",
  path: "/preguntas-frecuentes",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="container-wide pb-12 pt-32 sm:pt-40">
        <SectionHeading as="h1" eyebrow="Preguntas frecuentes" title="Lo que todos preguntan antes de construir." intro="Respuestas directas sobre precio, proceso, terreno, permisos y vida útil. Si tu duda no está aquí, escríbenos por WhatsApp." />
      </section>

      <div className="container-wide grid gap-12 pb-24 lg:grid-cols-12 lg:pb-32">
        <nav aria-label="Categorías" className="min-w-0 lg:col-span-3">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:gap-0 lg:pb-0">
            {faqCategories.map((c) => (
              <li key={c} className="shrink-0">
                <a href={`#${slugify(c)}`} className="block rounded-full bg-ink/5 px-4 py-2 text-sm font-medium text-ink/80 hover:bg-ink/10 lg:rounded-none lg:border-t lg:border-ink/10 lg:bg-transparent lg:px-0 lg:py-3 lg:hover:bg-transparent lg:hover:text-ink">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 space-y-16 lg:col-span-9">
          {faqCategories.map((c) => {
            const items = faqs.filter((f) => f.category === c);
            if (!items.length) return null;
            return (
              <section key={c} id={slugify(c)} className="scroll-mt-28" aria-labelledby={`faq-${slugify(c)}`}>
                <h2 id={`faq-${slugify(c)}`} className="font-serif text-3xl text-ink">
                  {c}
                </h2>
                <Accordion items={items} className="mt-6" />
              </section>
            );
          })}
        </div>
      </div>

      <section className="bg-limestone-50 py-20">
        <div className="container-narrow text-center">
          <h2 className="display text-3xl text-ink sm:text-4xl">¿Tienes otra pregunta?</h2>
          <p className="mt-4 text-charcoal-700/80">Escríbenos y te respondemos con la información de tu caso.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={whatsappLink()} external icon={<WhatsApp size={16} />}>
              WhatsApp
            </Button>
            <Button href="/cotizador" variant="outline" icon={<ArrowRight size={16} />}>
              Cotizar mi casa
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
