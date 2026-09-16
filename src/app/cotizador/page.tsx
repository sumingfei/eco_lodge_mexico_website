import type { Metadata } from "next";
import { getModelBySlug } from "@/data/models";
import { pricing } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";
import { Estimator, type EstimatorDefaults } from "@/components/calculator/Estimator";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SizeRangeId } from "@/lib/estimator";

export const metadata: Metadata = buildMetadata({
  title: "Cotizador de casas prefabricadas — estimación preliminar en minutos",
  description:
    "Calcula una estimación preliminar de tu casa prefabricada: ubicación, tamaño, recámaras, nivel de acabado y sistemas opcionales. Precios de referencia en MXN. Solicita después una cotización formal.",
  path: "/cotizador",
});

function sizeRangeForArea(areaM2: number): SizeRangeId {
  const ranges = pricing.sizeRanges;
  if (areaM2 <= 60) return ranges[0].id;
  if (areaM2 <= 90) return ranges[1].id;
  if (areaM2 <= 120) return ranges[2].id;
  if (areaM2 <= 160) return ranges[3].id;
  return ranges[4].id;
}

export default async function EstimatorPage({ searchParams }: PageProps<"/cotizador">) {
  const params = await searchParams;
  const modelSlug = typeof params.modelo === "string" ? params.modelo : undefined;
  const terreno = typeof params.terreno === "string" ? params.terreno : undefined;
  const model = modelSlug ? getModelBySlug(modelSlug) : undefined;

  const defaults: EstimatorDefaults = {
    sizeRange: model ? sizeRangeForArea(model.areaM2) : undefined,
    bedrooms: model?.bedrooms,
    hasLand: terreno === "no" ? "no" : undefined,
    modelName: model?.name,
  };

  return (
    <>
      <section className="container-wide pb-12 pt-32 sm:pt-40">
        <SectionHeading
          as="h1"
          eyebrow="Cotizador"
          title={model ? <>Estima tu {model.name}.</> : <>Estima tu casa en cinco minutos.</>}
          intro="Seis preguntas para darte un rango de inversión y un tiempo estimado. Sin registro. Al final puedes solicitar una cotización formal."
        />
      </section>
      <section className="container-wide pb-24 sm:pb-32">
        <Estimator defaults={defaults} key={modelSlug ?? "default"} />
      </section>
    </>
  );
}
