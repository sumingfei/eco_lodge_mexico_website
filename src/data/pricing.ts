/**
 * Pricing configuration — single source of truth for every peso shown on the site.
 * All amounts are MXN. All areas are m².
 *
 * TODO: replace every value with real, current company pricing before launch.
 * The estimator (lib/estimator.ts) and model cards read exclusively from this file.
 */

import type { L } from "@/i18n/config";

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
    solar: { label: { es: "Paneles solares", en: "Solar panels" }, price: 98000, weeks: 1 },
    rainwater: { label: { es: "Captación de agua de lluvia", en: "Rainwater harvesting" }, price: 46000, weeks: 0.5 },
    greywater: { label: { es: "Reúso de aguas grises", en: "Greywater reuse" }, price: 39000, weeks: 0.5 },
    deck: { label: { es: "Deck exterior", en: "Outdoor deck" }, price: 68000, weeks: 1 },
    pergola: { label: { es: "Pérgola", en: "Pergola" }, price: 52000, weeks: 0.5 },
    smartHome: { label: { es: "Casa inteligente", en: "Smart home" }, price: 42000, weeks: 0.5 },
    ac: { label: { es: "Aire acondicionado", en: "Air conditioning" }, price: 24000, perUnit: "bedroom" as const, weeks: 0.5 },
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
    { id: "40-60", label: { es: "40 – 60 m²", en: "40 – 60 m²" }, m2: 50, hint: { es: "CASA 37 · NIDO 45 · un refugio o una unidad de renta", en: "CASA 37 · NIDO 45 · a retreat or a rental unit" } },
    { id: "60-90", label: { es: "60 – 90 m²", en: "60 – 90 m²" }, m2: 75, hint: { es: "NIDO 65 · CASA 85 · pareja o familia pequeña", en: "NIDO 65 · CASA 85 · couple or small family" } },
    { id: "90-120", label: { es: "90 – 120 m²", en: "90 – 120 m²" }, m2: 105, hint: { es: "CASA 110 · familia con hijos", en: "CASA 110 · family with children" } },
    { id: "120-160", label: { es: "120 – 160 m²", en: "120 – 160 m²" }, m2: 140, hint: { es: "PATIO 140 · casa con patio central", en: "PATIO 140 · courtyard house" } },
    { id: "160+", label: { es: "160 m² o más", en: "160 m² or more" }, m2: 190, hint: { es: "PATIO 180 · dos niveles, cuatro recámaras", en: "PATIO 180 · two stories, four bedrooms" } },
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

export const finishLevels: { id: FinishLevel; name: L; description: L; highlights: L[] }[] = [
  {
    id: "esencial",
    name: { es: "Esencial", en: "Essential" },
    description: {
      es: "Lo necesario, bien resuelto. Acabados durables y sobrios con la misma envolvente de alto desempeño.",
      en: "The essentials, well resolved. Durable, understated finishes with the same high-performance envelope.",
    },
    highlights: [
      { es: "Piso de concreto pulido o porcelanato básico", en: "Polished concrete or basic porcelain tile floors" },
      { es: "Cocina con cubierta de cuarzo estándar", en: "Kitchen with standard quartz countertop" },
      { es: "Carpintería de MDF laminado", en: "Laminated MDF joinery" },
      { es: "Cancelería de aluminio con doble vidrio", en: "Aluminum windows with double glazing" },
    ],
  },
  {
    id: "confort",
    name: { es: "Confort", en: "Comfort" },
    description: {
      es: "El equilibrio que más eligen nuestros clientes: mejores texturas, más luz y detalles en madera.",
      en: "The balance most clients choose: richer textures, more light and timber details.",
    },
    highlights: [
      { es: "Porcelanato gran formato o madera de ingeniería", en: "Large-format porcelain or engineered wood" },
      { es: "Cocina con cubierta de cuarzo y despensa", en: "Kitchen with quartz countertop and pantry" },
      { es: "Carpintería de madera chapada", en: "Wood-veneer joinery" },
      { es: "Cancelería de aluminio negro con doble vidrio bajo emisivo", en: "Black aluminum windows with low-e double glazing" },
    ],
  },
  {
    id: "premium",
    name: { es: "Premium", en: "Premium" },
    description: {
      es: "Materiales de especificación arquitectónica: piedra natural, maderas sólidas y grifería de diseño.",
      en: "Architect-spec materials: natural stone, solid timber and designer fixtures.",
    },
    highlights: [
      { es: "Piedra natural o madera sólida", en: "Natural stone or solid wood" },
      { es: "Cocina de diseño con isla y electrodomésticos integrados", en: "Designer kitchen with island and integrated appliances" },
      { es: "Carpintería de madera sólida a medida", en: "Custom solid-wood joinery" },
      { es: "Cancelería de gran formato y vidrio de control solar", en: "Large-format glazing with solar-control glass" },
    ],
  },
];
