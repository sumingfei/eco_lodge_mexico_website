/**
 * Ecological-design story: rainwater harvesting and solar energy.
 * This is the content behind the homepage "Agua y sol" section and the
 * eco chips in the hero. Figures are illustrative physics (1 mm of rain on
 * 1 m² = 1 L; typical irradiance in Mexico) and are labelled as such — do
 * not add performance guarantees here without verifiable data.
 */
import type { L } from "@/i18n/config";

const W = (es: string, en: string): L => ({ es, en });

export type EcoPillar = {
  id: "rain" | "solar";
  eyebrow: L;
  title: L;
  story: L;
  points: { title: L; text: L }[];
  /** Big number + label + fine print shown as an illustrative figure. */
  figure: { value: string; label: L; note: L };
};

export const ecoStory = {
  eyebrow: W("Diseño ecológico", "Ecological design"),
  title: W("Una casa que capta la lluvia y vive del sol.", "A home that harvests the rain and runs on the sun."),
  intro: W(
    "En México el agua escasea y el sol sobra. Por eso cada casa se diseña desde el techo hacia abajo: la cubierta capta la lluvia que cae sobre ella y sostiene los paneles que la alimentan de energía. No son accesorios; son el punto de partida del diseño.",
    "In Mexico water is scarce and sun is abundant. That's why every home is designed from the roof down: the roof harvests the rain that falls on it and carries the panels that power the house. They aren't add-ons; they're where the design starts.",
  ),
  cta: W("Ver cómo funciona", "See how it works"),
  calculatorCta: W("Calcular para mi ciudad", "Calculate for my city"),
} as const;

export const ecoPillars: EcoPillar[] = [
  {
    id: "rain",
    eyebrow: W("Agua de lluvia", "Rainwater"),
    title: W("Cada techo es un captador.", "Every roof is a catchment."),
    story: W(
      "La cubierta de la casa está dimensionada, inclinada y canalizada para llevar el agua de lluvia a un filtro de primeras lluvias y a una cisterna enterrada. Esa agua abastece sanitarios, lavado y riego, y con filtración adicional puede cubrir toda la casa.",
      "The roof is sized, sloped and channelled to send rainwater through a first-flush filter into a buried cistern. That water supplies toilets, laundry and irrigation, and with additional filtration can serve the whole house.",
    ),
    points: [
      { title: W("Incluido en cada modelo", "Included in every model"), text: W("Canalones, bajantes y filtro de primeras lluvias vienen de fábrica en todos los modelos.", "Gutters, downpipes and a first-flush filter come from the factory on every model.") },
      { title: W("Cisterna a la medida", "Cistern sized to your site"), text: W("La capacidad se calcula con la superficie de tu techo y la lluvia de tu región, no con un tamaño único.", "Capacity is calculated from your roof area and your region's rainfall, not a one-size tank.") },
      { title: W("Menos dependencia de la red", "Less dependence on the network"), text: W("Menos pipas, menos pozo y una reserva propia en temporada seca.", "Fewer water trucks, less well use and your own reserve in the dry season.") },
    ],
    figure: {
      value: "1 mm = 1 L",
      label: W("por cada metro cuadrado de techo", "for every square metre of roof"),
      note: W("Un techo de 100 m² en una zona con 800 mm de lluvia al año recibe cerca de 80,000 litros, antes de pérdidas por evaporación y filtrado.", "A 100 m² roof in an area with 800 mm of annual rainfall receives close to 80,000 litres before evaporation and filtering losses."),
    },
  },
  {
    id: "solar",
    eyebrow: W("Energía solar", "Solar energy"),
    title: W("La cubierta también es tu planta de energía.", "The roof is also your power plant."),
    story: W(
      "Las cubiertas se orientan e inclinan pensando en los paneles: estructura calculada para su peso, canalización hasta el tablero y espacio para inversor y baterías. Primero reducimos la demanda con aislamiento y sombra; después la casa genera lo que consume.",
      "Roofs are oriented and pitched with the panels in mind: structure sized for their weight, conduits to the panel board and space for inverter and batteries. First we cut demand with insulation and shade; then the house generates what it uses.",
    ),
    points: [
      { title: W("Lista para paneles desde fábrica", "Panel-ready from the factory"), text: W("Cubierta estructurada y canalización eléctrica incluidas; los paneles se instalan al inicio o cuando decidas.", "Structured roof and electrical conduits included; panels go in at the start or whenever you decide.") },
      { title: W("Interconectada o autónoma", "Grid-tied or off-grid"), text: W("Medidor bidireccional con CFE, o baterías para terrenos sin red o con cortes frecuentes.", "Bidirectional meter with CFE, or batteries for sites without grid or with frequent outages.") },
      { title: W("Agua caliente con el sol", "Hot water from the sun"), text: W("Calentador solar con respaldo, para que el gas sea la excepción y no la regla.", "Solar water heater with backup, so gas is the exception rather than the rule.") },
    ],
    figure: {
      value: "5+ kWh/m²",
      label: W("de radiación solar al día en gran parte de México", "of solar irradiance per day across much of Mexico"),
      note: W("Entre las más altas del mundo. El sistema se dimensiona con tu consumo estimado y tu tarifa de CFE, no con promesas de recibo cero.", "Among the highest in the world. The system is sized to your estimated consumption and CFE tariff, not to zero-bill promises."),
    },
  },
];

/** Short chips shown over the hero image. */
export const ecoChips: { id: EcoPillar["id"]; text: L }[] = [
  { id: "rain", text: W("Captación de lluvia en cada casa", "Rainwater harvesting in every home") },
  { id: "solar", text: W("Lista para energía solar", "Solar-ready") },
];
