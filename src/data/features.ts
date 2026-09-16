/** Value proposition and customization content used on the homepage and design page. */

export type ValueProp = {
  id: "diseno" | "precio" | "tiempo" | "sustentabilidad";
  title: string;
  text: string;
};

export const valueProps: ValueProp[] = [
  {
    id: "diseno",
    title: "Diseño",
    text: "Arquitectura contemporánea sin pagar el precio de una casa completamente personalizada.",
  },
  {
    id: "precio",
    title: "Precio",
    text: "Procesos industrializados que reducen desperdicios, retrasos y costos inesperados.",
  },
  {
    id: "tiempo",
    title: "Tiempo",
    text: "Gran parte de la vivienda se fabrica en planta mientras se prepara el terreno.",
  },
  {
    id: "sustentabilidad",
    title: "Sustentabilidad",
    text: "Diseños eficientes que reducen materiales, energía y consumo de agua.",
  },
];

export type CustomizationArea = { title: string; text: string };

export const customizationAreas: CustomizationArea[] = [
  { title: "Materiales de fachada", text: "Madera, metal, estuco, apariencia de concreto o piedra." },
  { title: "Acabados interiores", text: "Cuatro paletas curadas: minimal, cálida, natural y contemporánea." },
  { title: "Cocina", text: "Lineal, con barra o con isla; cubiertas de cuarzo o piedra natural." },
  { title: "Pisos", text: "Concreto pulido, porcelanato, madera de ingeniería o piedra." },
  { title: "Baños", text: "Muebles, grifería y recubrimientos por nivel de acabado." },
  { title: "Terrazas y decks", text: "Decks de madera o compuesto, integrados a la estructura." },
  { title: "Pérgolas", text: "Estructuras de acero y madera para sombrear terrazas y patios." },
  { title: "Sistemas solares", text: "Fotovoltaico interconectado o aislado, y calentamiento solar de agua." },
  { title: "Sistemas de agua", text: "Captación pluvial, cisterna, filtración y reúso de aguas grises." },
  { title: "Distribución", text: "Opciones definidas por modelo: cocina cerrada, recámaras unidas, estudio." },
];

export type ComparisonCriterion = {
  id: string;
  title: string;
  traditional: string;
  prefab: string;
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
    title: "Tiempo de construcción",
    traditional: "Todo ocurre en secuencia y en sitio: cimentación, estructura, muros, instalaciones, acabados. El clima y la disponibilidad de cuadrillas alargan el calendario.",
    prefab: "La fabricación en planta corre en paralelo con la preparación del terreno. La casa llega con instalaciones y acabados avanzados; en sitio se ensambla y se conecta.",
    score: { traditional: 2, prefab: 4 },
  },
  {
    id: "costo",
    title: "Predictibilidad del costo",
    traditional: "El presupuesto suele crecer con cambios sobre la marcha, imprevistos de obra y variación de precios durante meses de construcción.",
    prefab: "La casa se cotiza por modelo y nivel de acabado antes de fabricar. Las variables abiertas son las del terreno y se separan claramente en la cotización.",
    score: { traditional: 2, prefab: 5 },
  },
  {
    id: "desperdicio",
    title: "Desperdicio de material",
    traditional: "Cortes en obra, sobrantes de mezcla y materiales expuestos a la intemperie generan escombro en cada etapa.",
    prefab: "Los paneles se cortan con precisión en planta, los sobrantes se reaprovechan entre proyectos y el terreno recibe menos escombro.",
    score: { traditional: 2, prefab: 4 },
  },
  {
    id: "mano-de-obra",
    title: "Mano de obra en sitio",
    traditional: "Meses de personal en el terreno, con la logística, supervisión y variabilidad que eso implica.",
    prefab: "Cuadrillas especializadas por semanas, no meses. Menos tránsito, menos ruido y menos coordinación para el cliente.",
    score: { traditional: 2, prefab: 4 },
  },
  {
    id: "calidad",
    title: "Control de calidad",
    traditional: "Depende del maestro de obra y de la supervisión disponible en cada visita.",
    prefab: "Cada módulo se fabrica bajo techo con plantillas, tolerancias milimétricas y revisiones por etapa antes de salir de planta.",
    score: { traditional: 3, prefab: 5 },
  },
  {
    id: "diseno",
    title: "Opciones de diseño",
    traditional: "Libertad total, pero cada decisión implica un proyecto ejecutivo y un costo difícil de anticipar.",
    prefab: "Modelos diseñados por arquitectos con opciones definidas de fachada, acabados y distribución. Menos decisiones, mejor resueltas.",
    score: { traditional: 5, prefab: 4 },
  },
];
