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

export function formatBathrooms(n: number) {
  if (Number.isInteger(n)) return `${n} ${n === 1 ? "baño" : "baños"}`;
  const whole = Math.floor(n);
  return `${whole}.5 baños`;
}

export function formatBedrooms(n: number) {
  return `${n} ${n === 1 ? "recámara" : "recámaras"}`;
}

export function formatWeeks(min: number, max: number) {
  return `${min}–${max} semanas`;
}

export function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}
