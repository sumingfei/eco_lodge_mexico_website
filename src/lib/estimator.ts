import { pricing, type FinishLevel } from "@/data/pricing";
import { mexicanStates } from "@/data/locations";
import { roundTo } from "./format";

export type Purpose = "principal" | "descanso" | "inversion" | "desarrollo";
export type OptionKey = keyof typeof pricing.options;
export type SizeRangeId = (typeof pricing.sizeRanges)[number]["id"];

export type EstimatorInput = {
  stateCode: string;
  city: string;
  purpose: Purpose | null;
  sizeRange: SizeRangeId | null;
  bedrooms: number | null;
  finish: FinishLevel | null;
  options: OptionKey[];
};

export type EstimateLine = { key: string; label: string; amount: number };

export type Estimate = {
  areaM2: number;
  regionFactor: number;
  home: number;
  sitePrep: number;
  optionsTotal: number;
  optionLines: EstimateLine[];
  total: number;
  range: { low: number; high: number };
  weeks: { min: number; max: number };
};

export const purposes: { id: Purpose; title: string; text: string }[] = [
  { id: "principal", title: "Casa principal", text: "Donde vas a vivir todos los días." },
  { id: "descanso", title: "Casa de descanso", text: "Fines de semana y vacaciones." },
  { id: "inversion", title: "Airbnb / inversión", text: "Renta vacacional o de largo plazo." },
  { id: "desarrollo", title: "Desarrollo", text: "Varias unidades en un mismo terreno." },
];

export const initialEstimatorInput: EstimatorInput = {
  stateCode: "",
  city: "",
  purpose: null,
  sizeRange: null,
  bedrooms: null,
  finish: null,
  options: [],
};

export function isComplete(input: EstimatorInput) {
  return Boolean(input.stateCode && input.purpose && input.sizeRange && input.bedrooms && input.finish);
}

/**
 * Pure preliminary estimate. All numbers come from /data/pricing.ts and
 * /data/locations.ts. This is NOT a quote: final pricing depends on site
 * conditions, transport, foundation, permits and customization.
 */
export function estimate(input: EstimatorInput): Estimate | null {
  if (!isComplete(input)) return null;

  const size = pricing.sizeRanges.find((s) => s.id === input.sizeRange)!;
  const bedrooms = input.bedrooms!;
  const finish = input.finish!;
  const areaM2 = Math.max(size.m2, pricing.sharedAreaM2 + bedrooms * pricing.minM2PerBedroom);

  const region = mexicanStates.find((s) => s.code === input.stateCode);
  const regionFactor = region?.factor ?? pricing.defaultRegionFactor;

  const home = roundTo(areaM2 * pricing.pricePerM2[finish], pricing.roundTo);
  const sitePrep = roundTo((pricing.sitePrep.fixed + pricing.sitePrep.perM2 * areaM2) * regionFactor, pricing.roundTo);

  const optionLines: EstimateLine[] = input.options.map((key) => {
    const opt = pricing.options[key];
    const units = "perUnit" in opt && opt.perUnit === "bedroom" ? bedrooms : 1;
    return { key, label: opt.label, amount: opt.price * units };
  });
  const optionsTotal = optionLines.reduce((sum, l) => sum + l.amount, 0);

  const total = home + sitePrep + optionsTotal;

  const optionWeeks = input.options.reduce((sum, key) => sum + pricing.options[key].weeks, 0);
  const baseWeeks =
    pricing.timeline.baseWeeks + pricing.timeline.weeksPerM2 * areaM2 + pricing.timeline.finishExtraWeeks[finish] + optionWeeks;

  return {
    areaM2,
    regionFactor,
    home,
    sitePrep,
    optionsTotal,
    optionLines,
    total,
    range: {
      low: roundTo(total * pricing.estimateRange.low, pricing.roundTo),
      high: roundTo(total * pricing.estimateRange.high, pricing.roundTo),
    },
    weeks: { min: Math.round(baseWeeks), max: Math.round(baseWeeks + 4) },
  };
}
