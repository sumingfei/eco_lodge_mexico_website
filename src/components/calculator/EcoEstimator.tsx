"use client";

import { useMemo, useState } from "react";
import { climateByState } from "@/data/climate";
import { ecoAssumptions as A } from "@/data/eco-assumptions";
import { mexicanStates } from "@/data/locations";
import { models } from "@/data/models";
import { estimateEco, initialEcoInput, suggestWaterM3, type EcoInput } from "@/lib/eco-estimator";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowRight, IconRain, IconSolar } from "@/components/ui/Icons";
import { fill, href } from "@/i18n";
import { useI18n } from "@/i18n/LocaleProvider";

const fieldClass = "mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-[0.9375rem] text-ink focus:border-ink focus:outline-none";
const num = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 });
const pct = (v: number) => `${Math.round(v * 100)} %`;

/** Roof footprint of a model: ground-floor plan × its own dimensions. */
const modelRoof = (slug: string) => {
  const m = models.find((x) => x.slug === slug);
  return m ? Math.round(m.dimensions.width * m.dimensions.depth) : null;
};

export function EcoEstimator({ defaultModel }: { defaultModel?: string }) {
  const { locale, dict } = useI18n();
  const e = dict.ecoEstimator;
  const f = e.form;
  const r = e.results;

  const initialModel = defaultModel && modelRoof(defaultModel) ? defaultModel : "casa-90";
  const [modelSlug, setModelSlug] = useState<string>(initialModel);
  const [input, setInput] = useState<EcoInput>({ ...initialEcoInput, roofM2: modelRoof(initialModel) ?? initialEcoInput.roofM2 });
  const update = <K extends keyof EcoInput>(key: K, value: EcoInput[K]) => setInput((s) => ({ ...s, [key]: value }));

  const cities = climateByState[input.stateCode] ?? [];
  const result = useMemo(() => estimateEco(input), [input]);

  const chooseModel = (slug: string) => {
    setModelSlug(slug);
    const roof = modelRoof(slug);
    if (roof) update("roofM2", roof);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Inputs */}
      <div className="min-w-0 space-y-8 lg:col-span-6">
        <Group title={f.locationTitle}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="eco-state" className="text-sm font-medium text-ink">{f.state}</label>
              <select
                id="eco-state"
                value={input.stateCode}
                onChange={(ev) => {
                  const code = ev.target.value;
                  setInput((s) => ({ ...s, stateCode: code, city: climateByState[code]?.[0]?.name ?? "" }));
                }}
                className={fieldClass}
              >
                <option value="">{f.selectState}</option>
                {mexicanStates.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="eco-city" className="text-sm font-medium text-ink">{f.city}</label>
              <select id="eco-city" value={input.city} onChange={(ev) => update("city", ev.target.value)} disabled={!cities.length} className={cn(fieldClass, "disabled:opacity-50")}>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          {result && <p className="mt-4 text-sm text-charcoal-700/75">{fill(f.climateNote, { city: result.climate.name, rain: num.format(result.climate.rainMm), ghi: result.climate.ghi.toFixed(1) })}</p>}
        </Group>

        <Group title={f.roofTitle} hint={f.roofHint}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="eco-model" className="text-sm font-medium text-ink">{f.model}</label>
              <select id="eco-model" value={modelSlug} onChange={(ev) => chooseModel(ev.target.value)} className={fieldClass}>
                {models.map((m) => (
                  <option key={m.slug} value={m.slug}>{m.name} · {modelRoof(m.slug)} m²</option>
                ))}
                <option value="custom">{f.customRoof}</option>
              </select>
            </div>
            <div>
              <label htmlFor="eco-roof" className="text-sm font-medium text-ink">{f.roofArea}</label>
              <div className="relative">
                <input
                  id="eco-roof"
                  type="number"
                  min={20}
                  max={1000}
                  step={5}
                  value={input.roofM2}
                  onChange={(ev) => {
                    setModelSlug("custom");
                    update("roofM2", Math.max(0, Number(ev.target.value)));
                  }}
                  className={cn(fieldClass, "pr-12")}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone">m²</span>
              </div>
            </div>
          </div>
        </Group>

        <Group title={f.householdTitle}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="eco-people" className="text-sm font-medium text-ink">{f.people}</label>
              <select
                id="eco-people"
                value={input.people}
                onChange={(ev) => {
                  const people = Number(ev.target.value);
                  setInput((s) => ({ ...s, people, monthlyWaterM3: suggestWaterM3(people) }));
                }}
                className={fieldClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="eco-water" className="text-sm font-medium text-ink">{f.monthlyWater}</label>
              <div className="relative">
                <input id="eco-water" type="number" min={0} max={500} step={1} value={input.monthlyWaterM3} onChange={(ev) => update("monthlyWaterM3", Math.max(0, Number(ev.target.value)))} className={cn(fieldClass, "pr-24")} />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone">m³ / mes</span>
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone">
                {fill(f.waterSuggest, { people: input.people, m3: suggestWaterM3(input.people) })}
                {suggestWaterM3(input.people) !== input.monthlyWaterM3 && (
                  <button type="button" onClick={() => update("monthlyWaterM3", suggestWaterM3(input.people))} className="font-semibold text-ink underline underline-offset-2">
                    {f.useSuggested}
                  </button>
                )}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-stone">{f.waterHint}</p>
        </Group>

        <Group title={f.energyTitle}>
          <div>
            <label htmlFor="eco-kwh" className="text-sm font-medium text-ink">{f.monthlyKwh}</label>
            <div className="relative">
              <input id="eco-kwh" type="number" min={0} max={5000} step={10} value={input.monthlyKwh} onChange={(ev) => update("monthlyKwh", Math.max(0, Number(ev.target.value)))} className={cn(fieldClass, "pr-24")} />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone">kWh / mes</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-stone">{f.kwhHint}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="eco-kwp" className="text-sm font-medium text-ink">{f.systemKwp}</label>
              <span className="font-serif text-2xl text-ink">{input.systemKwp.toFixed(1)} kWp</span>
            </div>
            <input id="eco-kwp" type="range" min={A.solar.minKwp} max={A.solar.maxKwp} step={0.5} value={input.systemKwp} onChange={(ev) => update("systemKwp", Number(ev.target.value))} className="mt-3 w-full" />
            {result && (
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone">
                {fill(f.suggest, { kwp: result.solar.suggestedKwp.toFixed(1) })}
                {result.solar.suggestedKwp !== input.systemKwp && (
                  <button type="button" onClick={() => update("systemKwp", result.solar.suggestedKwp)} className="font-semibold text-ink underline underline-offset-2">
                    {f.useSuggested}
                  </button>
                )}
              </p>
            )}
          </div>
          <label className="mt-6 flex items-start gap-3 text-sm text-ink">
            <input type="checkbox" checked={input.battery} onChange={(ev) => update("battery", ev.target.checked)} className="mt-0.5 h-4 w-4 accent-ink" />
            <span>
              {f.battery}
              <span className="block text-xs text-stone">{f.batteryHint}</span>
            </span>
          </label>
        </Group>
      </div>

      {/* Results */}
      <div className="min-w-0 lg:col-span-6">
        <div className="space-y-5 lg:sticky lg:top-28">
          {!result ? (
            <div className="rounded-[1.5rem] border border-dashed border-ink/20 p-10 text-center text-sm text-stone">{r.empty}</div>
          ) : (
            <>
              <ResultCard icon={<IconRain className="text-terracotta" />} title={r.waterTitle} value={num.format(result.water.collectedLitres)} unit={r.litres} caption={r.collected} coverage={result.water.coverage} coverageLabel={r.waterCoverage}>
                <li>{fill(r.litresPerM2, { n: num.format(result.water.litresPerM2) })}</li>
                <li>{r.cistern}: {result.water.cisternM3} m³</li>
              </ResultCard>

              <ResultCard icon={<IconSolar className="text-terracotta" />} title={r.solarTitle} value={num.format(result.solar.generationKwh)} unit={r.kwh} caption={r.generated} coverage={result.solar.coverage} coverageLabel={r.solarCoverage}>
                <li>{fill(r.panels, { n: result.solar.panels, m2: num.format(result.solar.roofM2Needed) })}</li>
                <li>{fill(r.co2, { t: (result.solar.co2Kg / 1000).toFixed(1) })}</li>
                {result.solar.dac && <li className="text-agave-700">{r.dacNote}</li>}
                {!result.solar.fitsRoof && <li className="text-terracotta">{r.roofWarning}</li>}
              </ResultCard>

              <div className="rounded-[1.5rem] bg-agave-700 p-7 text-limestone sm:p-9">
                <p className="eyebrow text-limestone/60">{r.savingsTitle}</p>
                <dl className="mt-5 space-y-3">
                  <SavingsRow label={r.water} amount={result.water.savingsMxn} investment={result.water.systemCost} payback={result.water.paybackYears} r={r} />
                  <SavingsRow label={r.solar} amount={result.solar.savingsMxn} investment={result.solar.systemCost} payback={result.solar.paybackYears} r={r} />
                  <div className="flex items-baseline justify-between gap-4 border-t border-limestone/20 pt-4">
                    <dt className="font-semibold">{r.total}</dt>
                    <dd className="font-serif text-3xl sm:text-4xl">{formatMXN(Math.round(result.totalSavingsMxn / 100) * 100)}</dd>
                  </div>
                </dl>
                <div className="mt-8 border-t border-limestone/20 pt-6">
                  <p className="font-semibold">{r.ctaTitle}</p>
                  <p className="mt-1 text-sm text-limestone/75">{r.ctaText}</p>
                  <Button href={href(locale, "estimator", modelSlug !== "custom" ? `?model=${modelSlug}` : "")} variant="light" className="mt-5" icon={<ArrowRight size={16} />}>
                    {r.ctaButton}
                  </Button>
                </div>
              </div>

              <details className="rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-6 text-sm">
                <summary className="cursor-pointer font-semibold text-ink">{r.assumptionsTitle}</summary>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-charcoal-700/80">
                  {r.assumptions.map((a) => (
                    <li key={a}>
                      {fill(a, {
                        eff: Math.round(A.water.harvestEfficiency * 100),
                        lpp: A.water.litresPerPersonDay,
                        price: A.water.pricePerM3,
                        pr: Math.round(A.solar.performanceRatio * 100),
                        dac: A.solar.tariff.dacThresholdKwh,
                        waterCost: num.format(A.water.systemCost),
                        cisternBase: A.water.cisternBaseM3,
                        cisternExtra: num.format(A.water.cisternCostPerM3),
                        solarCost: num.format(A.solar.costPerKwp),
                      })}
                    </li>
                  ))}
                </ul>
              </details>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Group({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-6 sm:p-8">
      <legend className="sr-only">{title}</legend>
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      {hint && <p className="mt-1 text-sm text-charcoal-700/75">{hint}</p>}
      <div className="mt-5">{children}</div>
    </fieldset>
  );
}

function ResultCard({ icon, title, value, unit, caption, coverage, coverageLabel, children }: { icon: React.ReactNode; title: string; value: string; unit: string; caption: string; coverage: number; coverageLabel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-white p-7 sm:p-9">
      <div className="flex items-center gap-3">
        {icon}
        <p className="eyebrow">{title}</p>
      </div>
      <p className="mt-5 font-serif text-[2.5rem] leading-none text-ink sm:text-[3rem]">
        {value} <span className="text-xl text-stone">{unit}</span>
      </p>
      <p className="mt-1 text-sm text-charcoal-700/75">{caption}</p>
      <div className="mt-5">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-ink">{pct(coverage)}</span>
          <span className="text-stone">{coverageLabel}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-agave-100" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(coverage * 100)} aria-label={coverageLabel}>
          <div className="h-full rounded-full bg-agave transition-[width] duration-500" style={{ width: pct(coverage) }} />
        </div>
      </div>
      <ul className="mt-5 space-y-1.5 border-t border-ink/10 pt-4 text-sm text-charcoal-700/80">{children}</ul>
    </div>
  );
}

function SavingsRow({ label, amount, investment, payback, r }: { label: string; amount: number; investment: number; payback: number | null; r: { investment: string; payback: string; paybackNa: string; perYear: string } }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt>
        <span className="font-semibold">{label}</span>
        <span className="block text-xs text-limestone/60">
          {r.investment}: {formatMXN(investment)} · {payback ? fill(r.payback, { years: payback < 10 ? payback.toFixed(1) : Math.round(payback) }) : r.paybackNa}
        </span>
      </dt>
      <dd className="shrink-0 text-right font-serif text-2xl">
        {formatMXN(Math.round(amount / 100) * 100)}
        <span className="block font-sans text-xs text-limestone/60">{r.perYear}</span>
      </dd>
    </div>
  );
}
