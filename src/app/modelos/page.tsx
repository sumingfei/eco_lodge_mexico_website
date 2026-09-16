import type { Metadata } from "next";
import { models } from "@/data/models";
import { getModelStartingPrice, getStartingPricePerM2 } from "@/lib/pricing";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { formatMXN } from "@/lib/format";
import { ModelsExplorer } from "@/components/models/ModelsExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Modelos de casas prefabricadas modernas",
  description:
    "Seis modelos de casas prefabricadas de 45 a 180 m², de uno y dos niveles, con precios desde en MXN y tiempos de construcción estimados. Filtra por precio, superficie, recámaras y baños.",
  path: "/modelos",
  image: "/images/models/casa-85-01.jpg",
});

export default function ModelsPage() {
  const withPrices = models.map((m) => ({ ...m, priceFrom: getModelStartingPrice(m) }));

  return (
    <>
      <JsonLd data={itemListJsonLd(models)} />
      <section className="container-wide pb-12 pt-32 sm:pt-40">
        <SectionHeading
          as="h1"
          eyebrow="Modelos"
          title="Casas diseñadas para fabricarse. Y para vivirse."
          intro={
            <>
              Seis modelos de un solo esquema estructural, de 45 a 180 m². Todos incluyen envolvente aislada, instalaciones y acabados de fábrica. Precios de referencia desde {formatMXN(getStartingPricePerM2())}/m²; el
              precio “desde” de cada modelo corresponde al nivel de acabado Esencial y no incluye terreno, cimentación ni permisos.
            </>
          }
        />
      </section>
      <section className="container-wide pb-24 sm:pb-32">
        <ModelsExplorer models={withPrices} />
      </section>
      <section className="bg-limestone-50 py-20">
        <div className="container-narrow text-center">
          <h2 className="display text-3xl text-ink sm:text-4xl">¿No sabes cuál te conviene?</h2>
          <p className="mt-4 text-charcoal-700/80">Cuéntanos tu terreno, tus necesidades y tu presupuesto. El cotizador te da una estimación preliminar en cinco minutos.</p>
          <Button href="/cotizador" className="mt-8" icon={<ArrowRight size={16} />}>
            Ir al cotizador
          </Button>
        </div>
      </section>
    </>
  );
}
