"use client";

import { useMemo, useState } from "react";
import type { HomeModel } from "@/data/models";
import { ModelCard } from "./ModelCard";
import { formatMXNCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LocaleProvider";

type Props = { models: (HomeModel & { priceFrom: number })[] };

type Filters = {
  maxPrice: number;
  maxArea: number;
  bedrooms: number | null;
  bathrooms: number | null;
  stories: 1 | 2 | null;
};

/** Client-side filtering of the catalogue by price, area, bedrooms, bathrooms and stories. */
export function ModelsExplorer({ models }: Props) {
  const { dict } = useI18n();
  const m = dict.modelsPage;
  const maxPriceAll = Math.max(...models.map((m) => m.priceFrom));
  const minPriceAll = Math.min(...models.map((m) => m.priceFrom));
  const maxAreaAll = Math.max(...models.map((m) => m.areaM2));
  const minAreaAll = Math.min(...models.map((m) => m.areaM2));
  const bedroomOptions = [...new Set(models.map((m) => m.bedrooms))].sort((a, b) => a - b);
  const bathroomOptions = [...new Set(models.map((m) => Math.ceil(m.bathrooms)))].sort((a, b) => a - b);

  const [filters, setFilters] = useState<Filters>({ maxPrice: maxPriceAll, maxArea: maxAreaAll, bedrooms: null, bathrooms: null, stories: null });

  const results = useMemo(
    () =>
      models.filter(
        (m) =>
          m.priceFrom <= filters.maxPrice &&
          m.areaM2 <= filters.maxArea &&
          (filters.bedrooms === null || m.bedrooms >= filters.bedrooms) &&
          (filters.bathrooms === null || m.bathrooms >= filters.bathrooms) &&
          (filters.stories === null || m.stories === filters.stories),
      ),
    [models, filters],
  );

  const reset = () => setFilters({ maxPrice: maxPriceAll, maxArea: maxAreaAll, bedrooms: null, bathrooms: null, stories: null });
  const isFiltered = filters.maxPrice !== maxPriceAll || filters.maxArea !== maxAreaAll || filters.bedrooms !== null || filters.bathrooms !== null || filters.stories !== null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="eyebrow">{m.filter}</h2>
            {isFiltered && (
              <button type="button" onClick={reset} className="text-xs font-semibold text-terracotta hover:underline">
                {m.clear}
              </button>
            )}
          </div>

          <div className="mt-6 space-y-8">
            <Range
              id="precio"
              label={m.budget}
              value={filters.maxPrice}
              min={minPriceAll}
              max={maxPriceAll}
              step={50000}
              display={`${m.upTo} ${formatMXNCompact(filters.maxPrice)}`}
              onChange={(v) => setFilters((f) => ({ ...f, maxPrice: v }))}
            />
            <Range
              id="area"
              label={m.area}
              value={filters.maxArea}
              min={minAreaAll}
              max={maxAreaAll}
              step={5}
              display={`${m.upTo} ${filters.maxArea} m²`}
              onChange={(v) => setFilters((f) => ({ ...f, maxArea: v }))}
            />
            <Chips label={m.bedrooms} options={bedroomOptions.map((n) => ({ value: n, label: `${n}+` }))} value={filters.bedrooms} onChange={(v) => setFilters((f) => ({ ...f, bedrooms: v }))} />
            <Chips label={m.bathrooms} options={bathroomOptions.map((n) => ({ value: n, label: `${n}+` }))} value={filters.bathrooms} onChange={(v) => setFilters((f) => ({ ...f, bathrooms: v }))} />
            <Chips
              label={m.stories}
              options={[
                { value: 1 as const, label: dict.common.oneStory },
                { value: 2 as const, label: dict.common.twoStory },
              ]}
              value={filters.stories}
              onChange={(v) => setFilters((f) => ({ ...f, stories: v }))}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 lg:col-span-9">
        <p className="text-sm text-stone" aria-live="polite">
          {results.length} {results.length === 1 ? m.resultOne : m.resultMany}
        </p>
        <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((m, i) => (
            <ModelCard key={m.slug} model={m} priority={i < 2} />
          ))}
        </div>
        {results.length === 0 && (
          <div className="mt-10 rounded-[1.25rem] bg-limestone-50 p-10 text-center">
            <p className="font-serif text-2xl text-ink">{m.emptyTitle}</p>
            <p className="mt-2 text-sm text-stone">{m.emptyText}</p>
            <button type="button" onClick={reset} className="mt-6 text-sm font-semibold text-terracotta hover:underline">
              {m.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Range({ id, label, value, min, max, step, display, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <span className="text-xs text-stone">{display}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 w-full" />
    </div>
  );
}

function Chips<T extends number>({ label, options, value, onChange }: { label: string; options: { value: T; label: string }[]; value: T | null; onChange: (v: T | null) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? null : o.value)}
              className={cn("rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors", selected ? "bg-ink text-limestone" : "bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink")}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
