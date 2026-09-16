/**
 * Pricing configuration — single source of truth for every peso shown on the site.
 * All amounts are MXN. All areas are m².
 *
 * TODO: replace every value with real, current company pricing before launch.
 * The estimator (lib/estimator.ts) and model cards read exclusively from this file.
 */

export type FinishLevel = "esencial" | "confort" | "premium";

export const pricing = {
  currency: "MXN",

  /** Base price per m² by finish level. Used for the “Desde $X/m²” claim and the estimator. */
  pricePerM2: {
    esencial: 19500,
    confort: 24500,
    premium: 31000,
  } satisfies Record<FinishLevel, number>,

  /** Which finish level backs the public “Desde …” starting prices. */
  startingPriceFinish: "esencial" as FinishLevel,

  /**
   * Site preparation & foundation estimate (NOT included in the house price).
   * fixed + perM2 × built area. Multiplied by terrain factor.
   */
  sitePrep: {
    fixed: 95000,
    perM2: 2200,
  },

  /** Rough logistics multiplier applied to site prep, by state. 1 = base. */
  defaultRegionFactor: 1,

  /** Optional systems & equipment. `perUnit` items multiply by `units` (e.g. per recámara). */
  options: {
    solar: { label: "Paneles solares", price: 98000, weeks: 1 },
    rainwater: { label: "Captación de agua de lluvia", price: 46000, weeks: 0.5 },
    greywater: { label: "Reúso de aguas grises", price: 39000, weeks: 0.5 },
    deck: { label: "Deck exterior", price: 68000, weeks: 1 },
    pergola: { label: "Pérgola", price: 52000, weeks: 0.5 },
    smartHome: { label: "Casa inteligente", price: 42000, weeks: 0.5 },
    ac: { label: "Aire acondicionado", price: 24000, perUnit: "bedroom" as const, weeks: 0.5 },
  },

  /** Rough construction timeline model (weeks). */
  timeline: {
    baseWeeks: 10, // engineering + permits + fabrication start
    weeksPerM2: 0.045, // scales with size
    finishExtraWeeks: { esencial: 0, confort: 1, premium: 3 } satisfies Record<FinishLevel, number>,
  },

  /** Rounding applied to public figures so estimates don’t look falsely precise. */
  roundTo: 5000,

  /** The preliminary estimate is shown as a range around the computed figure. */
  estimateRange: { low: 0.92, high: 1.12 },

  /** Size ranges offered in the estimator with the m² used for calculation. */
  sizeRanges: [
    { id: "40-60", label: "40 – 60 m²", m2: 50 },
    { id: "60-90", label: "60 – 90 m²", m2: 75 },
    { id: "90-120", label: "90 – 120 m²", m2: 105 },
    { id: "120-160", label: "120 – 160 m²", m2: 140 },
    { id: "160+", label: "160 m² o más", m2: 190 },
  ],

  /** Minimum m² assumed per bedroom (plus shared areas) so bedroom count and size stay coherent. */
  minM2PerBedroom: 20,
  sharedAreaM2: 25,

  /**
   * Optional configured savings claims for the comparison section.
   * Leave `null` to avoid showing unsupported percentages.
   * Example: { time: "hasta 50 % menos tiempo de obra", waste: "…" }
   */
  comparisonClaims: {
    time: null as string | null,
    waste: null as string | null,
    cost: null as string | null,
  },
} as const;

export const finishLevels: { id: FinishLevel; name: string; description: string; highlights: string[] }[] = [
  {
    id: "esencial",
    name: "Esencial",
    description: "Lo necesario, bien resuelto. Acabados durables y sobrios con la misma envolvente de alto desempeño.",
    highlights: ["Piso de concreto pulido o porcelanato básico", "Cocina con cubierta de cuarzo estándar", "Carpintería de MDF laminado", "Cancelería de aluminio con doble vidrio"],
  },
  {
    id: "confort",
    name: "Confort",
    description: "El equilibrio que más eligen nuestros clientes: mejores texturas, más luz y detalles en madera.",
    highlights: ["Porcelanato gran formato o madera de ingeniería", "Cocina con cubierta de cuarzo y despensa", "Carpintería de madera chapada", "Cancelería de aluminio negro con doble vidrio bajo emisivo"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Materiales de especificación arquitectónica: piedra natural, maderas sólidas y grifería de diseño.",
    highlights: ["Piedra natural o madera sólida", "Cocina de diseño con isla y electrodomésticos integrados", "Carpintería de madera sólida a medida", "Cancelería de gran formato y vidrio de control solar"],
  },
];
