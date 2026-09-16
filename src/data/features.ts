/** Value proposition and customization content used on the homepage and design page. */
import type { L } from "@/i18n/config";

export type ValueProp = { id: "diseno" | "precio" | "tiempo" | "sustentabilidad"; title: L; text: L };

export const valueProps: ValueProp[] = [
  {
    id: "diseno",
    title: { es: "Diseño", en: "Design" },
    text: { es: "Arquitectura contemporánea sin pagar el precio de una casa completamente personalizada.", en: "Contemporary architecture without paying the price of a fully custom home." },
  },
  {
    id: "precio",
    title: { es: "Precio", en: "Price" },
    text: { es: "Procesos industrializados que reducen desperdicios, retrasos y costos inesperados.", en: "Industrialized processes that reduce waste, delays and unexpected costs." },
  },
  {
    id: "tiempo",
    title: { es: "Tiempo", en: "Time" },
    text: { es: "Gran parte de la vivienda se fabrica en planta mientras se prepara el terreno.", en: "Most of the home is built in the factory while the site is being prepared." },
  },
  {
    id: "sustentabilidad",
    title: { es: "Sustentabilidad", en: "Sustainability" },
    text: { es: "Diseños eficientes que reducen materiales, energía y consumo de agua.", en: "Efficient designs that reduce materials, energy and water consumption." },
  },
];

export type CustomizationArea = { title: L; text: L };

export const customizationAreas: CustomizationArea[] = [
  { title: { es: "Materiales de fachada", en: "Facade materials" }, text: { es: "Madera, metal, estuco, apariencia de concreto o piedra.", en: "Timber, metal, stucco, concrete-look or stone." } },
  { title: { es: "Acabados interiores", en: "Interior finishes" }, text: { es: "Cuatro paletas curadas: minimal, cálida, natural y contemporánea.", en: "Four curated palettes: minimal, warm, natural and contemporary." } },
  { title: { es: "Cocina", en: "Kitchen" }, text: { es: "Lineal, con barra o con isla; cubiertas de cuarzo o piedra natural.", en: "Linear, with a bar or an island; quartz or natural-stone countertops." } },
  { title: { es: "Pisos", en: "Flooring" }, text: { es: "Concreto pulido, porcelanato, madera de ingeniería o piedra.", en: "Polished concrete, porcelain tile, engineered wood or stone." } },
  { title: { es: "Baños", en: "Bathrooms" }, text: { es: "Muebles, grifería y recubrimientos por nivel de acabado.", en: "Fixtures, faucets and cladding by finish level." } },
  { title: { es: "Terrazas y decks", en: "Terraces & decks" }, text: { es: "Decks de madera o compuesto, integrados a la estructura.", en: "Timber or composite decks, integrated with the structure." } },
  { title: { es: "Pérgolas", en: "Pergolas" }, text: { es: "Estructuras de acero y madera para sombrear terrazas y patios.", en: "Steel and timber structures to shade terraces and courtyards." } },
  { title: { es: "Sistemas solares", en: "Solar systems" }, text: { es: "Fotovoltaico interconectado o aislado, y calentamiento solar de agua.", en: "Grid-tied or off-grid photovoltaics, and solar water heating." } },
  { title: { es: "Sistemas de agua", en: "Water systems" }, text: { es: "Captación pluvial, cisterna, filtración y reúso de aguas grises.", en: "Rainwater harvesting, cistern, filtration and greywater reuse." } },
  { title: { es: "Distribución", en: "Layout" }, text: { es: "Opciones definidas por modelo: cocina cerrada, recámaras unidas, estudio.", en: "Options defined per model: closed kitchen, merged bedrooms, study." } },
];

export type ComparisonCriterion = {
  id: string;
  title: L;
  traditional: L;
  prefab: L;
  /** Qualitative 1–5 score for the visual meter (higher = better for the client). Not a percentage. */
  score: { traditional: number; prefab: number };
};

/**
 * Traditional vs. industrialized comparison.
 * Scores are qualitative. Do not add percentages here; configure them in
 * pricing.comparisonClaims if the company can substantiate them.
 */
export const comparisonCriteria: ComparisonCriterion[] = [
  {
    id: "tiempo",
    title: { es: "Tiempo de construcción", en: "Construction time" },
    traditional: {
      es: "Todo ocurre en secuencia y en sitio: cimentación, estructura, muros, instalaciones, acabados. El clima y la disponibilidad de cuadrillas alargan el calendario.",
      en: "Everything happens in sequence and on site: foundation, structure, walls, installations, finishes. Weather and crew availability stretch the schedule.",
    },
    prefab: {
      es: "La fabricación en planta corre en paralelo con la preparación del terreno. La casa llega con instalaciones y acabados avanzados; en sitio se ensambla y se conecta.",
      en: "Factory fabrication runs in parallel with site preparation. The house arrives with installations and finishes well advanced; on site it's assembled and connected.",
    },
    score: { traditional: 2, prefab: 4 },
  },
  {
    id: "costo",
    title: { es: "Predictibilidad del costo", en: "Cost predictability" },
    traditional: {
      es: "El presupuesto suele crecer con cambios sobre la marcha, imprevistos de obra y variación de precios durante meses de construcción.",
      en: "Budgets tend to grow with on-the-fly changes, site surprises and price variation over months of construction.",
    },
    prefab: {
      es: "La casa se cotiza por modelo y nivel de acabado antes de fabricar. Las variables abiertas son las del terreno y se separan claramente en la cotización.",
      en: "The house is priced by model and finish level before fabrication. The open variables are the site's, and they're clearly separated in the quote.",
    },
    score: { traditional: 2, prefab: 5 },
  },
  {
    id: "desperdicio",
    title: { es: "Desperdicio de material", en: "Material waste" },
    traditional: {
      es: "Cortes en obra, sobrantes de mezcla y materiales expuestos a la intemperie generan escombro en cada etapa.",
      en: "On-site cutting, leftover mix and weather-exposed materials generate debris at every stage.",
    },
    prefab: {
      es: "Los paneles se cortan con precisión en planta, los sobrantes se reaprovechan entre proyectos y el terreno recibe menos escombro.",
      en: "Panels are cut precisely in the factory, offcuts are reused across projects and the site receives far less debris.",
    },
    score: { traditional: 2, prefab: 4 },
  },
  {
    id: "mano-de-obra",
    title: { es: "Mano de obra en sitio", en: "On-site labor" },
    traditional: {
      es: "Meses de personal en el terreno, con la logística, supervisión y variabilidad que eso implica.",
      en: "Months of crews on the land, with all the logistics, supervision and variability that implies.",
    },
    prefab: {
      es: "Cuadrillas especializadas por semanas, no meses. Menos tránsito, menos ruido y menos coordinación para el cliente.",
      en: "Specialized crews for weeks, not months. Less traffic, less noise and less coordination for the client.",
    },
    score: { traditional: 2, prefab: 4 },
  },
  {
    id: "calidad",
    title: { es: "Control de calidad", en: "Quality control" },
    traditional: {
      es: "Depende del maestro de obra y de la supervisión disponible en cada visita.",
      en: "Depends on the foreman and on the supervision available at each visit.",
    },
    prefab: {
      es: "Cada módulo se fabrica bajo techo con plantillas, tolerancias milimétricas y revisiones por etapa antes de salir de planta.",
      en: "Every module is built under a roof with jigs, millimetre tolerances and stage inspections before leaving the factory.",
    },
    score: { traditional: 3, prefab: 5 },
  },
  {
    id: "diseno",
    title: { es: "Opciones de diseño", en: "Design options" },
    traditional: {
      es: "Libertad total, pero cada decisión implica un proyecto ejecutivo y un costo difícil de anticipar.",
      en: "Total freedom, but every decision implies construction drawings and a cost that's hard to anticipate.",
    },
    prefab: {
      es: "Modelos diseñados por arquitectos con opciones definidas de fachada, acabados y distribución. Menos decisiones, mejor resueltas.",
      en: "Architect-designed models with defined facade, finish and layout options. Fewer decisions, better resolved.",
    },
    score: { traditional: 5, prefab: 4 },
  },
];
