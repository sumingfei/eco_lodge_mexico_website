/** Content for the developers / B2B page. */
import type { L } from "@/i18n/config";

const W = (es: string, en: string): L => ({ es, en });

export const developerSegments: { title: L; text: L }[] = [
  { title: W("Desarrolladores inmobiliarios", "Real-estate developers"), text: W("Fraccionamientos y conjuntos de vivienda con modelos repetibles y calendario predecible.", "Subdivisions and housing clusters with repeatable models and a predictable schedule.") },
  { title: W("Hoteles boutique", "Boutique hotels"), text: W("Habitaciones y villas independientes con acabados de hospitalidad, entregadas por fases.", "Free-standing rooms and villas with hospitality finishes, delivered in phases.") },
  { title: W("Eco resorts", "Eco resorts"), text: W("Unidades ligeras de bajo impacto para terrenos naturales, con sistemas de agua y energía autónomos.", "Lightweight, low-impact units for natural sites, with autonomous water and energy systems.") },
  { title: W("Desarrollos para renta vacacional", "Vacation-rental developments"), text: W("Conjuntos de CASA 37 para operación tipo Airbnb con costos y tiempos por unidad claros.", "CASA 37 clusters for Airbnb-style operation with clear per-unit costs and timelines.") },
  { title: W("Conjuntos habitacionales", "Housing developments"), text: W("Vivienda de calidad con volumen: la repetición reduce el costo unitario y el riesgo de obra.", "Quality housing at volume: repetition lowers unit cost and construction risk.") },
  { title: W("Propietarios de tierra", "Landowners"), text: W("Convertir un terreno en un activo rentable con varias unidades sin una obra tradicional de años.", "Turn a piece of land into an income-producing asset with several units, without years of traditional construction.") },
];

export const developerAdvantages: { title: L; text: L }[] = [
  { title: W("Repetición que reduce costo", "Repetition that cuts cost"), text: W("Un mismo modelo fabricado varias veces amortiza ingeniería, plantillas y compras. El costo por unidad baja con el volumen.", "The same model built several times amortizes engineering, jigs and purchasing. Unit cost falls with volume.") },
  { title: W("Entregas por fase", "Phased deliveries"), text: W("Las unidades se fabrican y montan en lotes. Puedes empezar a operar las primeras mientras se producen las siguientes.", "Units are built and assembled in batches. You can start operating the first while the next are in production.") },
  { title: W("Calendario predecible", "Predictable schedule"), text: W("La fabricación bajo techo no depende del clima ni de la rotación de cuadrillas en sitio.", "Factory fabrication doesn't depend on weather or on-site crew turnover.") },
  { title: W("Un solo interlocutor técnico", "One technical counterpart"), text: W("Ingeniería, fabricación, transporte y montaje coordinados por el mismo equipo.", "Engineering, fabrication, transport and assembly coordinated by the same team.") },
  { title: W("Menos impacto en el terreno", "Less impact on the land"), text: W("Obra en sitio corta y limpia: importante en terrenos naturales, reservas y destinos turísticos.", "Short, clean site work: important on natural land, reserves and tourist destinations.") },
  { title: W("Variantes sin rediseño", "Variants without redesign"), text: W("Fachadas e interiores distintos sobre la misma estructura para evitar la monotonía del conjunto.", "Different facades and interiors on the same structure to avoid a monotonous cluster.") },
];

export const developerProcess: { number: string; title: L; text: L }[] = [
  { number: "01", title: W("Reunión técnica", "Technical meeting"), text: W("Terreno, número de unidades, uso, calendario y presupuesto objetivo.", "Land, number of units, use, schedule and target budget.") },
  { number: "02", title: W("Propuesta de conjunto", "Site proposal"), text: W("Selección de modelos, implantación preliminar y estimación por unidad.", "Model selection, preliminary siting and per-unit estimate.") },
  { number: "03", title: W("Ingeniería y prototipo", "Engineering and prototype"), text: W("Proyecto ejecutivo y, si se requiere, una primera unidad para validar acabados.", "Construction documents and, if required, a first unit to validate finishes.") },
  { number: "04", title: W("Producción por lotes", "Batch production"), text: W("Fabricación, transporte y montaje en fases acordadas.", "Fabrication, transport and assembly in agreed phases.") },
];
