/**
 * Sustainability content. Every item describes a concrete design or material decision.
 * No certifications, percentages or performance figures are claimed here on purpose:
 * add them only with verifiable data.
 */
import type { L } from "@/i18n/config";

const W = (es: string, en: string): L => ({ es, en });

export type SustainabilityStrategy = { title: L; text: L };

export const homeStrategies: SustainabilityStrategy[] = [
  { title: W("Captación de agua de lluvia", "Rainwater harvesting"), text: W("Canalones, bajantes y filtro de primeras lluvias incluidos; cisterna dimensionada según tu techo y tu región.", "Gutters, downpipes and first-flush filter included; cistern sized to your roof and your region.") },
  { title: W("Energía solar", "Solar energy"), text: W("Cubierta estructurada y canalizaciones listas para un sistema fotovoltaico, interconectado o con baterías.", "Structured roof and conduits ready for a photovoltaic system, grid-tied or with batteries.") },
  { title: W("Calentamiento solar de agua", "Solar water heating"), text: W("Calentador solar con respaldo de gas o eléctrico en cualquier nivel de acabado.", "Solar water heater with gas or electric backup at any finish level.") },
  { title: W("Orientación solar pasiva", "Passive solar orientation"), text: W("Cada modelo se gira según el terreno para proteger el vidrio del sol de la tarde.", "Each model is rotated on its site to protect glazing from the afternoon sun.") },
  { title: W("Aislamiento de alto desempeño", "High-performance insulation"), text: W("Muros, losa y cubierta con aislamiento continuo que reduce la necesidad de climatización.", "Walls, floor and roof with continuous insulation that reduces the need for heating and cooling.") },
  { title: W("Ventilación natural", "Natural ventilation"), text: W("Ventanas enfrentadas y patios que generan corrientes cruzadas en cada espacio.", "Opposing windows and courtyards that create cross breezes in every room.") },
  { title: W("Grifería de bajo consumo", "Low-flow fixtures"), text: W("Sanitarios, regaderas y llaves ahorradoras incluidos en todos los niveles de acabado.", "Water-saving toilets, showers and faucets included at every finish level.") },
  { title: W("Reúso de aguas grises (opcional)", "Greywater reuse (optional)"), text: W("Sistema para tratar el agua de regaderas y lavabos y reutilizarla en riego.", "A system to treat shower and basin water and reuse it for irrigation.") },
  { title: W("Menos desperdicio en obra", "Less construction waste"), text: W("Corte de precisión en planta y reaprovechamiento de sobrantes entre proyectos.", "Precision cutting in the factory and reuse of offcuts across projects.") },
  { title: W("Materiales apropiados al lugar", "Locally appropriate materials"), text: W("Recubrimientos y protecciones seleccionados según clima: costa, desierto, bosque o ciudad.", "Cladding and protection selected by climate: coast, desert, forest or city.") },
];

export type SustainabilitySection = {
  id: string;
  title: L;
  intro: L;
  points: SustainabilityStrategy[];
  diagram?: "orientation" | "ventilation" | "shading" | "insulation" | "rainwater" | "solar";
  /** Photo shown when the section has no diagram. TODO: replace with company photography. */
  image?: { src: string; alt: L };
};

export const sustainabilitySections: SustainabilitySection[] = [
  {
    id: "agua",
    title: W("Agua de lluvia", "Rainwater"),
    intro: W("En gran parte de México el agua es el recurso más escaso. Por eso cada casa nace con la captación resuelta: el techo recoge, el filtro limpia y la cisterna guarda. Es el primer sistema que diseñamos, no el último que agregamos.", "Across much of Mexico, water is the scarcest resource. So every home is born with harvesting solved: the roof collects, the filter cleans and the cistern stores. It's the first system we design, not the last one we add."),
    diagram: "rainwater",
    points: [
      { title: W("Captación pluvial incluida", "Rainwater harvesting included"), text: W("Canalones, bajantes y filtro de primeras lluvias vienen de fábrica; la cisterna se dimensiona según la superficie de techo y la precipitación local.", "Gutters, downpipes and first-flush filter come from the factory; the cistern is sized to roof area and local rainfall.") },
      { title: W("Del techo a la llave", "From roof to tap"), text: W("El agua captada abastece sanitarios, lavado y riego; con filtración adicional puede cubrir toda la casa.", "Harvested water supplies toilets, laundry and irrigation; with additional filtration it can serve the whole house.") },
      { title: W("Grifería de bajo consumo", "Low-flow fixtures"), text: W("Incluida en todos los niveles de acabado.", "Included at every finish level.") },
      { title: W("Reúso de aguas grises", "Greywater reuse"), text: W("Sistema opcional que trata agua de regaderas y lavabos para riego de jardín.", "Optional system that treats shower and basin water for garden irrigation.") },
      { title: W("Biodigestor", "Biodigester"), text: W("Para terrenos sin drenaje municipal, en lugar de fosa séptica convencional.", "For sites without municipal drainage, instead of a conventional septic tank.") },
    ],
  },
  {
    id: "energia-renovable",
    title: W("Energía solar", "Solar energy"),
    intro: W("México tiene uno de los mejores recursos solares del mundo. Cada cubierta se orienta, inclina y estructura pensando en los paneles; el sistema se dimensiona según tu consumo estimado y la tarifa de CFE de tu zona, y puede instalarse desde el inicio o más adelante.", "Mexico has one of the best solar resources in the world. Every roof is oriented, pitched and structured with panels in mind; the system is sized to your estimated consumption and your area's CFE tariff, and can be installed from the start or later."),
    diagram: "solar",
    points: [
      { title: W("Cubierta lista para paneles", "Panel-ready roof"), text: W("Estructura calculada para el peso de los paneles y canalización eléctrica hasta el tablero, incluidas en todos los modelos.", "Structure sized for panel loads and electrical conduits to the panel board, included in every model.") },
      { title: W("Interconectado a la red", "Grid-tied"), text: W("La opción más común: la casa genera de día y compensa con la red de noche mediante medidor bidireccional.", "The most common option: the house generates by day and offsets with the grid at night through a bidirectional meter.") },
      { title: W("Con respaldo de baterías", "With battery backup"), text: W("Para terrenos con cortes frecuentes o sin acceso a la red.", "For sites with frequent outages or no grid access.") },
      { title: W("Dimensionamiento honesto", "Honest sizing"), text: W("Cotizamos el sistema con base en el consumo real esperado, no en promesas de 'cero recibo'.", "We size the system on realistic expected consumption, not on 'zero bill' promises.") },
    ],
  },
  {
    id: "energia",
    title: W("Menos demanda de energía", "Lower energy demand"),
    intro: W("Menos demanda primero; después, generación. Cuanto menos consume la casa, más pequeño y accesible es el sistema solar que la cubre.", "Lower demand first; then generation. The less the house consumes, the smaller and more affordable the solar system that covers it."),
    image: { src: "/images/hero/hero-garden.jpg", alt: W("Casa con cubierta plana preparada para paneles solares y grandes ventanales sombreados", "House with a flat roof prepared for solar panels and large shaded windows") },
    points: [
      { title: W("Iluminación LED", "LED lighting"), text: W("Incluida en todos los espacios, con circuitos separados para exteriores.", "Included in every room, with separate circuits for exteriors.") },
      { title: W("Calentamiento solar de agua", "Solar water heating"), text: W("Opción de calentador solar con respaldo de gas o eléctrico.", "Optional solar water heater with gas or electric backup.") },
      { title: W("Electrodomésticos eficientes", "Efficient appliances"), text: W("Recomendamos equipos con etiqueta de eficiencia energética en cocina y lavado.", "We recommend energy-labelled appliances for kitchen and laundry.") },
    ],
  },
  {
    id: "diseno-pasivo",
    title: W("Diseño pasivo", "Passive design"),
    intro: W("Antes de instalar cualquier sistema, la casa misma debe trabajar a favor del clima. La orientación, las proporciones de las ventanas y la profundidad de los aleros se resuelven en la adaptación de cada proyecto.", "Before installing any system, the house itself must work with the climate. Orientation, window proportions and eave depth are resolved when each project is adapted."),
    diagram: "orientation",
    points: [
      { title: W("Orientación según el terreno", "Orientation to the site"), text: W("Los espacios de estar miran hacia el norte o el sur según la latitud y el paisaje; los muros más cerrados reciben el sol del poniente.", "Living spaces face north or south depending on latitude and landscape; the most closed walls take the western sun.") },
      { title: W("Proporción de vidrio controlada", "Controlled glazing ratio"), text: W("Ventanales grandes donde hay sombra; ventanas altas y estrechas donde el sol es más agresivo.", "Large glazing where there's shade; tall, narrow windows where the sun is harshest.") },
      { title: W("Masa térmica donde conviene", "Thermal mass where it helps"), text: W("Pisos de concreto pulido en zonas con noches frías; acabados ligeros en clima cálido húmedo.", "Polished concrete floors in areas with cold nights; lightweight finishes in hot, humid climates.") },
    ],
  },
  {
    id: "confort-termico",
    title: W("Confort térmico", "Thermal comfort"),
    intro: W("Una envolvente bien aislada mantiene la temperatura interior estable y hace que el aire acondicionado, si se instala, trabaje mucho menos.", "A well-insulated envelope keeps the indoor temperature stable and makes air conditioning, if installed, work far less."),
    diagram: "insulation",
    points: [
      { title: W("Aislamiento continuo", "Continuous insulation"), text: W("Paneles con núcleo aislante en muros, piso y cubierta, sin puentes térmicos en la estructura de acero.", "Insulated-core panels in walls, floor and roof, with no thermal bridges through the steel structure.") },
      { title: W("Cubierta ventilada", "Ventilated roof"), text: W("Cámara de aire entre la lámina exterior y el aislamiento para disipar el calor antes de que entre a la casa.", "An air cavity between the outer sheet and the insulation dissipates heat before it enters the house.") },
      { title: W("Vidrio doble", "Double glazing"), text: W("Cancelería con doble vidrio en todos los modelos; control solar bajo emisivo en Confort y Premium.", "Double glazing on every model; low-e solar control on Comfort and Premium.") },
    ],
  },
  {
    id: "ventilacion",
    title: W("Ventilación cruzada", "Cross ventilation"),
    intro: W("Cada espacio habitable tiene al menos dos aberturas en fachadas opuestas o hacia un patio, de modo que el aire fresco entre por un lado y el caliente salga por el otro.", "Every habitable room has at least two openings on opposite facades or onto a courtyard, so cool air enters on one side and hot air leaves on the other."),
    diagram: "ventilation",
    points: [
      { title: W("Ventanas enfrentadas", "Opposing windows"), text: W("La distribución de cada modelo coloca aberturas en lados opuestos de los espacios principales.", "Each model's layout places openings on opposite sides of the main rooms.") },
      { title: W("Ventilación nocturna", "Night ventilation"), text: W("Ventanas altas operables que permiten enfriar la casa de noche sin comprometer la seguridad.", "Operable high windows that cool the house at night without compromising security.") },
      { title: W("Patios y terrazas", "Courtyards and terraces"), text: W("En los modelos Villa, el jardín interior actúa como chimenea térmica que extrae el aire caliente.", "In the Villa models, the inner garden acts as a thermal chimney that draws hot air out.") },
    ],
  },
  {
    id: "sombreado",
    title: W("Sombreado de cubierta y fachadas", "Roof and facade shading"),
    intro: W("Los aleros, pérgolas y celosías se dimensionan para bloquear el sol alto de verano y dejar entrar el sol bajo de invierno.", "Eaves, pergolas and screens are sized to block the high summer sun and let the low winter sun in."),
    diagram: "shading",
    points: [
      { title: W("Aleros calculados", "Calculated eaves"), text: W("Entre 1.2 y 1.5 m de volado sobre los ventanales principales, según la orientación.", "1.2 to 1.5 m of overhang above the main glazing, depending on orientation.") },
      { title: W("Celosías y pérgolas", "Screens and pergolas"), text: W("Elementos de madera o metal que filtran la luz en terrazas y fachadas poniente.", "Timber or metal elements that filter light on terraces and west facades.") },
      { title: W("Vegetación como sombra", "Vegetation as shade"), text: W("Recomendamos árboles de hoja caduca al poniente y enredaderas en pérgolas.", "We recommend deciduous trees to the west and climbers on pergolas.") },
    ],
  },
  {
    id: "materiales",
    title: W("Materiales", "Materials"),
    intro: W("Elegimos materiales por durabilidad, mantenimiento y comportamiento en cada clima, no por moda.", "We choose materials for durability, maintenance and performance in each climate, not for fashion."),
    image: { src: "/images/sections/fachada-madera.jpg", alt: W("Fachada de madera termotratada y acero oscuro", "Facade of heat-treated timber and dark steel") },
    points: [
      { title: W("Acero galvanizado", "Galvanized steel"), text: W("Estructura ligera, reciclable y de dimensiones exactas.", "Lightweight, recyclable structure with exact dimensions.") },
      { title: W("Madera certificada", "Certified timber"), text: W("Recubrimientos y carpinterías de madera con origen verificable; solicitamos documentación a nuestros proveedores.", "Timber cladding and joinery of verifiable origin; we request documentation from our suppliers.") },
      { title: W("Acabados de bajo mantenimiento", "Low-maintenance finishes"), text: W("Fachadas ventiladas que se limpian con agua y no necesitan pintura periódica.", "Ventilated facades that clean with water and need no periodic painting.") },
      { title: W("Pinturas de baja emisión", "Low-emission paints"), text: W("Interiores con pinturas de bajo contenido de compuestos orgánicos volátiles.", "Interiors painted with low-VOC paints.") },
    ],
  },
  {
    id: "residuos",
    title: W("Reducción de residuos", "Waste reduction"),
    intro: W("Fabricar bajo techo cambia la ecuación del desperdicio: lo que en obra termina en escombro, en planta se planifica.", "Building under a roof changes the waste equation: what ends up as debris on site is planned for in the factory."),
    image: { src: "/images/sections/fachada-metal.jpg", alt: W("Fachada de paneles metálicos perforados fabricados con precisión", "Facade of precisely fabricated perforated metal panels") },
    points: [
      { title: W("Corte de precisión", "Precision cutting"), text: W("Los paneles se cortan con maquinaria a partir de planos de fabricación, con nesting para aprovechar el material.", "Panels are machine-cut from fabrication drawings, nested to make the most of the material.") },
      { title: W("Sobrantes reutilizados", "Reused offcuts"), text: W("Los recortes de un proyecto se emplean en el siguiente.", "Offcuts from one project are used in the next.") },
      { title: W("Menos escombro en tu terreno", "Less debris on your land"), text: W("La obra en sitio se limita a cimentación, conexiones y remates.", "Site work is limited to foundation, connections and finishing touches.") },
    ],
  },
];
