import { ecoAssumptions as A } from "@/data/eco-assumptions";
import { getClimate, type ClimateCity } from "@/data/climate";

export type EcoInput = {
  stateCode: string;
  city: string;
  roofM2: number;
  people: number;
  /** Household water consumption, m³ per month. */
  monthlyWaterM3: number;
  monthlyKwh: number;
  /** Photovoltaic system size the user chose (kWp). */
  systemKwp: number;
  battery: boolean;
};

export const initialEcoInput: EcoInput = {
  stateCode: "",
  city: "",
  roofM2: 100,
  people: 4,
  monthlyWaterM3: 18,
  monthlyKwh: 300,
  systemKwp: 3,
  battery: false,
};

export type EcoResult = {
  climate: ClimateCity;
  water: {
    collectedLitres: number;
    demandLitres: number;
    usedLitres: number;
    coverage: number; // 0–1 of household demand
    savingsMxn: number;
    cisternM3: number;
    systemCost: number;
    paybackYears: number | null;
    litresPerM2: number;
  };
  solar: {
    generationKwh: number;
    consumptionKwh: number;
    offsetKwh: number;
    coverage: number; // 0–1 of consumption
    savingsMxn: number;
    panels: number;
    roofM2Needed: number;
    fitsRoof: boolean;
    systemCost: number;
    paybackYears: number | null;
    co2Kg: number;
    dac: boolean;
    suggestedKwp: number;
  };
  totalSavingsMxn: number;
};

const S = A.solar;
const W = A.water;

/** Suggested monthly water consumption (m³) for a household size. */
export function suggestWaterM3(people: number): number {
  return Math.round((people * W.litresPerPersonDay * 30.4) / 1000);
}

/** Monthly CFE bill (MXN) for a consumption, using the reference block tariff or DAC. */
export function monthlyBill(kwh: number): number {
  if (kwh <= 0) return 0;
  if (kwh > S.tariff.dacThresholdKwh) return kwh * S.tariff.dacPrice;
  let cost = 0;
  let prev = 0;
  for (const b of S.tariff.blocks) {
    const inBlock = Math.max(0, Math.min(kwh, b.upToKwh) - prev);
    cost += inBlock * b.price;
    prev = b.upToKwh;
    if (kwh <= b.upToKwh) break;
  }
  return cost;
}

/** kWp needed to cover a monthly consumption at a given irradiance, rounded to 0.5. */
export function suggestKwp(monthlyKwh: number, ghi: number): number {
  const annual = monthlyKwh * 12;
  const perKwp = ghi * 365 * S.performanceRatio;
  const raw = annual / perKwp;
  return Math.min(S.maxKwp, Math.max(S.minKwp, Math.round(raw * 2) / 2));
}

export function estimateEco(input: EcoInput): EcoResult | null {
  const climate = getClimate(input.stateCode, input.city);
  if (!climate) return null;

  // --- Water ---
  const litresPerM2 = climate.rainMm * W.harvestEfficiency;
  const collectedLitres = input.roofM2 * litresPerM2;
  const demandLitres = input.monthlyWaterM3 * 1000 * 12;
  const usedLitres = Math.min(collectedLitres, demandLitres);
  const waterSavings = (usedLitres / 1000) * W.pricePerM3;
  // Cistern sized to hold roughly three weeks of demand, capped by what the roof yields in a month.
  const cisternM3 = Math.max(W.cisternBaseM3, Math.min(Math.ceil((demandLitres / 365) * 21 / 1000), Math.ceil(collectedLitres / 12 / 1000), 20));
  const waterCost = W.systemCost + Math.max(0, cisternM3 - W.cisternBaseM3) * W.cisternCostPerM3;

  // --- Solar ---
  const consumptionKwh = input.monthlyKwh * 12;
  const generationKwh = input.systemKwp * climate.ghi * 365 * S.performanceRatio;
  const offsetKwh = Math.min(generationKwh, consumptionKwh);
  // Net metering: the offset removes the most expensive kWh first, month by month.
  const monthlyOffset = offsetKwh / 12;
  const solarSavings = (monthlyBill(input.monthlyKwh) - monthlyBill(input.monthlyKwh - monthlyOffset)) * 12;
  const panels = Math.ceil(input.systemKwp / S.panelKwp);
  const roofM2Needed = input.systemKwp * S.m2PerKwp;
  const solarCost = input.systemKwp * S.costPerKwp + (input.battery ? S.batteryCost : 0);

  return {
    climate,
    water: {
      collectedLitres,
      demandLitres,
      usedLitres,
      coverage: demandLitres ? Math.min(1, collectedLitres / demandLitres) : 0,
      savingsMxn: waterSavings,
      cisternM3,
      systemCost: waterCost,
      paybackYears: waterSavings > 0 ? waterCost / waterSavings : null,
      litresPerM2,
    },
    solar: {
      generationKwh,
      consumptionKwh,
      offsetKwh,
      coverage: consumptionKwh ? Math.min(1, generationKwh / consumptionKwh) : 0,
      savingsMxn: solarSavings,
      panels,
      roofM2Needed,
      fitsRoof: roofM2Needed <= input.roofM2 * 0.7,
      systemCost: solarCost,
      paybackYears: solarSavings > 0 ? solarCost / solarSavings : null,
      co2Kg: generationKwh * S.kgCo2PerKwh,
      dac: input.monthlyKwh > S.tariff.dacThresholdKwh,
      suggestedKwp: suggestKwp(input.monthlyKwh, climate.ghi),
    },
    totalSavingsMxn: waterSavings + solarSavings,
  };
}
