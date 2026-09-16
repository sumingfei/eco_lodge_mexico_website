import type { Locale } from "@/i18n/config";

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

/** "$1,250,000 MXN" — currency with explicit suffix for clarity in a bilingual context. */
export function formatMXN(amount: number, { suffix = true }: { suffix?: boolean } = {}) {
  const base = mxn.format(amount).replace(/\s?MX\$|\$/, "$");
  return suffix ? `${base} MXN` : base;
}

/** Compact currency for tight UI: "$1.25 M" */
export function formatMXNCompact(amount: number) {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2).replace(/\.?0+$/, "")} M MXN`;
  return formatMXN(amount);
}

export function formatArea(m2: number) {
  return `${new Intl.NumberFormat("es-MX").format(m2)} m²`;
}

export function formatMeters(m: number) {
  return `${m.toFixed(1).replace(/\.0$/, "")} m`;
}

const words = {
  es: { bathroom: "baño", bathrooms: "baños", bedroom: "recámara", bedrooms: "recámaras", weeks: "semanas" },
  en: { bathroom: "bathroom", bathrooms: "bathrooms", bedroom: "bedroom", bedrooms: "bedrooms", weeks: "weeks" },
} satisfies Record<Locale, Record<string, string>>;

export function formatBathrooms(n: number, locale: Locale = "es") {
  const w = words[locale];
  if (Number.isInteger(n)) return `${n} ${n === 1 ? w.bathroom : w.bathrooms}`;
  return `${Math.floor(n)}.5 ${w.bathrooms}`;
}

export function formatBedrooms(n: number, locale: Locale = "es") {
  const w = words[locale];
  return `${n} ${n === 1 ? w.bedroom : w.bedrooms}`;
}

export function formatWeeks(min: number, max: number, locale: Locale = "es") {
  return `${min}–${max} ${words[locale].weeks}`;
}

export function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}
