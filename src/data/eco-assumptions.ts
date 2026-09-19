/**
 * Assumptions behind the water & solar estimator (/eco-estimator).
 * Every number here is a reference value shown to the user as such.
 * TODO: calibrate with the company's real system prices and local tariffs.
 */
export const ecoAssumptions = {
  water: {
    /** Fraction of roof rainfall that reaches the cistern (runoff × first-flush/filter losses). */
    harvestEfficiency: 0.8,
    /** Litres per person per day used to suggest the monthly consumption. */
    litresPerPersonDay: 150,
    /** Reference price of water in MXN per m³ (1,000 L), municipal network. */
    pricePerM3: 25,
    /** Reference installed cost of the harvesting system (MXN): filter, pump and a cistern sized for a house. */
    systemCost: 46000,
    /** Extra cost per m³ of cistern above the base 5 m³ included above. */
    cisternBaseM3: 5,
    cisternCostPerM3: 4500,
  },
  solar: {
    /** Performance ratio: irradiance to AC output after temperature, wiring, inverter and soiling losses. */
    performanceRatio: 0.78,
    /** Roof area needed per kWp (panels + walkways). */
    m2PerKwp: 5.5,
    /** Nominal power of one panel (kWp). */
    panelKwp: 0.55,
    /** Reference installed cost in MXN per kWp (grid-tied, no batteries). */
    costPerKwp: 22000,
    /** Battery backup reference cost (MXN) for a small residential bank. */
    batteryCost: 90000,
    /** Grid emission factor, kg CO₂ per kWh. */
    kgCo2PerKwh: 0.435,
    /** System size limits offered in the slider (kWp). */
    minKwp: 1,
    maxKwp: 15,
    /**
     * CFE domestic tariff (reference blocks, MXN/kWh, monthly). The DAC
     * threshold varies by region and season; 500 kWh/month is a middle
     * value across tariffs 1–1F.
     */
    tariff: {
      blocks: [
        { upToKwh: 75, price: 0.95 },
        { upToKwh: 140, price: 1.15 },
        { upToKwh: Infinity, price: 3.4 },
      ],
      dacThresholdKwh: 500,
      dacPrice: 6.2,
    },
  },
} as const;
