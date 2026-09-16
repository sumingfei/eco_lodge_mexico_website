import { pricing } from "@/data/pricing";
import type { HomeModel } from "@/data/models";
import { roundTo } from "./format";

/** Public “Desde …” price for a model (MXN). */
export function getModelStartingPrice(model: HomeModel) {
  if (model.priceFromOverride) return model.priceFromOverride;
  return roundTo(model.areaM2 * pricing.pricePerM2[pricing.startingPriceFinish], pricing.roundTo);
}

/** Lowest public price per m² (MXN). Used for the hero claim. */
export function getStartingPricePerM2() {
  return Math.min(...Object.values(pricing.pricePerM2));
}
