"use client";

import type { Estimate, EstimatorInput } from "@/lib/estimator";
import { purposes } from "@/lib/estimator";
import { pricing, finishLevels } from "@/data/pricing";
import { formatMXN } from "@/lib/format";
import { LeadForm } from "./LeadForm";
import { ArrowLeft } from "@/components/ui/Icons";
import { fill, t } from "@/i18n";
import { useI18n } from "@/i18n/LocaleProvider";

type Props = {
  input: EstimatorInput;
  result: Estimate;
  hasLand: string;
  stateName: string;
  modelName?: string;
  onEdit: () => void;
};

export function EstimateResult({ input, result, hasLand, stateName, modelName, onEdit }: Props) {
  const { locale, dict } = useI18n();
  const r = dict.estimator.result;
  const finish = finishLevels.find((f) => f.id === input.finish)!;
  const purpose = purposes.find((p) => p.id === input.purpose)!;
  const size = pricing.sizeRanges.find((s) => s.id === input.sizeRange)!;

  const summaryText = [
    fill(r.waIntro, { model: modelName ? fill(r.waModel, { model: modelName }) : "" }),
    `• ${r.waLocation}: ${[input.city, stateName].filter(Boolean).join(", ")}`,
    `• ${r.waUse}: ${t(purpose.title, locale)}`,
    `• ${r.waSize}: ${t(size.label, locale)} · ${input.bedrooms} ${dict.common.bedrooms} · ${r.waFinish} ${t(finish.name, locale)}`,
    input.options.length ? `• ${r.waOptions}: ${result.optionLines.map((l) => t(l.label, locale)).join(", ")}` : null,
    `• ${r.waTotal}: ${formatMXN(result.range.low)} – ${formatMXN(result.range.high)}`,
    r.waAsk,
  ]
    .filter(Boolean)
    .join("\n");

  const lines = [
    { label: r.homeLine, amount: result.home, note: fill(r.homeNote, { area: result.areaM2, price: formatMXN(pricing.pricePerM2[input.finish!]), finish: t(finish.name, locale) }) },
    { label: r.siteLine, amount: result.sitePrep, note: fill(r.siteNote, { state: stateName, factor: result.regionFactor.toFixed(2) }) },
    ...result.optionLines.map((l) => ({ label: t(l.label, locale), amount: l.amount, note: r.optionNote })),
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-7">
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink">
          <ArrowLeft size={16} /> {r.edit}
        </button>

        <div className="mt-6 rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-terracotta-100 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-terracotta-600">{r.badge}</span>
            <span className="text-xs text-stone">{r.notQuote}</span>
          </div>
          <p className="mt-6 eyebrow">{r.totalLabel}</p>
          <p className="mt-2 font-serif text-[2.25rem] leading-none text-ink sm:text-[3rem]">
            {formatMXN(result.range.low, { suffix: false })} <span className="text-stone-300">–</span> {formatMXN(result.range.high)}
          </p>
          <p className="mt-3 text-sm text-charcoal-700/75">
            {r.timeline} <strong className="text-ink">{result.weeks.min} – {result.weeks.max} {dict.common.weeks}</strong> {r.timelineSuffix}
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
              <dt className="font-semibold text-ink">{r.total}</dt>
              <dd className="shrink-0 font-semibold text-ink">{formatMXN(result.total)}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-xl bg-sand/40 p-4 text-xs leading-relaxed text-charcoal-700/85">
            <p className="font-semibold text-ink">{r.whatChangesTitle}</p>
            <p className="mt-1">
              {r.whatChanges}
              {hasLand !== "si" && ` ${r.noLandNote}`}
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-0 lg:col-span-5">
        <LeadForm
          source="cotizador"
          title={r.formTitle}
          intro={r.formIntro}
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
