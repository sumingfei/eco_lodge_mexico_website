"use client";

import type { Estimate, EstimatorInput } from "@/lib/estimator";
import { purposes } from "@/lib/estimator";
import { pricing, finishLevels } from "@/data/pricing";
import { formatMXN } from "@/lib/format";
import { LeadForm } from "./LeadForm";
import { ArrowLeft } from "@/components/ui/Icons";

type Props = {
  input: EstimatorInput;
  result: Estimate;
  hasLand: string;
  stateName: string;
  modelName?: string;
  onEdit: () => void;
};

export function EstimateResult({ input, result, hasLand, stateName, modelName, onEdit }: Props) {
  const finish = finishLevels.find((f) => f.id === input.finish)!;
  const purpose = purposes.find((p) => p.id === input.purpose)!;
  const size = pricing.sizeRanges.find((s) => s.id === input.sizeRange)!;

  const summaryText = [
    `Hola, hice una estimación preliminar en su sitio${modelName ? ` para el modelo ${modelName}` : ""}:`,
    `• Ubicación: ${[input.city, stateName].filter(Boolean).join(", ")}`,
    `• Uso: ${purpose.title}`,
    `• Tamaño: ${size.label} · ${input.bedrooms} recámaras · acabado ${finish.name}`,
    input.options.length ? `• Opcionales: ${result.optionLines.map((l) => l.label).join(", ")}` : null,
    `• Inversión estimada: ${formatMXN(result.range.low)} – ${formatMXN(result.range.high)}`,
    "¿Me pueden ayudar con una cotización formal?",
  ]
    .filter(Boolean)
    .join("\n");

  const lines = [
    { label: "Casa (fabricación, transporte y montaje)", amount: result.home, note: `${result.areaM2} m² × ${formatMXN(pricing.pricePerM2[input.finish!])}/m² · acabado ${finish.name}` },
    { label: "Preparación del terreno y cimentación", amount: result.sitePrep, note: `Estimación con factor logístico ${stateName} (×${result.regionFactor.toFixed(2)})` },
    ...result.optionLines.map((l) => ({ label: l.label, amount: l.amount, note: "Sistema opcional" })),
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-7">
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink">
          <ArrowLeft size={16} /> Editar respuestas
        </button>

        <div className="mt-6 rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-terracotta-100 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-terracotta-600">Estimación preliminar</span>
            <span className="text-xs text-stone">No es una cotización.</span>
          </div>
          <p className="mt-6 eyebrow">Inversión total estimada</p>
          <p className="mt-2 font-serif text-[2.25rem] leading-none text-ink sm:text-[3rem]">
            {formatMXN(result.range.low, { suffix: false })} <span className="text-stone-300">–</span> {formatMXN(result.range.high)}
          </p>
          <p className="mt-3 text-sm text-charcoal-700/75">
            Tiempo estimado de fabricación e instalación: <strong className="text-ink">{result.weeks.min} – {result.weeks.max} semanas</strong> a partir de ingeniería aprobada.
          </p>

          <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {lines.map((l) => (
              <div key={l.label} className="flex items-start justify-between gap-6 py-4">
                <div>
                  <dt className="font-medium text-ink">{l.label}</dt>
                  <dd className="mt-0.5 text-xs text-stone">{l.note}</dd>
                </div>
                <dd className="shrink-0 font-medium text-ink">{formatMXN(l.amount)}</dd>
              </div>
            ))}
            <div className="flex items-start justify-between gap-6 py-4">
              <dt className="font-semibold text-ink">Total estimado (referencia central)</dt>
              <dd className="shrink-0 font-semibold text-ink">{formatMXN(result.total)}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-xl bg-sand/40 p-4 text-xs leading-relaxed text-charcoal-700/85">
            <p className="font-semibold text-ink">Qué puede cambiar el precio final</p>
            <p className="mt-1">
              La cotización formal depende de la ubicación exacta, las condiciones del suelo, el transporte y acceso al terreno, el tipo de cimentación, los permisos municipales y la personalización que elijas. Esta estimación se calcula automáticamente con precios de referencia y no constituye una oferta vinculante.
              {hasLand !== "si" && " Como aún no tienes terreno, la partida de preparación del sitio es especialmente orientativa."}
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-0 lg:col-span-5">
        <LeadForm
          source="cotizador"
          title="Solicitar cotización formal"
          intro="Déjanos tus datos y revisamos tu terreno para preparar una propuesta con alcances y precio cerrados."
          defaults={{ location: input.city, hasLand, stateCode: input.stateCode }}
          extra={{
            modelName,
            stateCode: input.stateCode,
            city: input.city,
            purpose: input.purpose,
            sizeRange: input.sizeRange,
            bedrooms: input.bedrooms,
            finish: input.finish,
            options: input.options,
            areaM2: result.areaM2,
            home: result.home,
            sitePrep: result.sitePrep,
            optionsTotal: result.optionsTotal,
            total: result.total,
            range: result.range,
            weeks: result.weeks,
          }}
          whatsappMessage={summaryText}
          compact
        />
      </div>
    </div>
  );
}
