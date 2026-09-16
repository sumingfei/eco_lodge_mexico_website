/**
 * Home models catalogue.
 * Add, remove or edit models here — cards, filters, detail pages, sitemap and
 * structured data are all generated from this array.
 *
 * Text fields are bilingual `{ es, en }` objects (see /i18n/config.ts).
 * Prices are derived from /data/pricing.ts (area × price per m² of the
 * starting finish) unless `priceFromOverride` is set.
 *
 * TODO: replace placeholder renders in /public/images/models with real renders
 * or photography for each model, keeping the same file names.
 */
import type { L } from "@/i18n/config";

export type ModelFamily = "Nido" | "Casa" | "Patio";

export type Room = {
  name: L;
  /** Position and size in metres, relative to the floor’s top-left corner. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Open-air areas (patios, terraces) are drawn hatched and excluded from interior area. */
  open?: boolean;
};

export type Floor = { name: L; width: number; depth: number; rooms: Room[] };

export type ModelImage = { src: string; alt: L };

export type HomeModel = {
  slug: string;
  name: string;
  family: ModelFamily;
  tagline: L;
  description: L;
  idealFor: L[];
  areaM2: number;
  bedrooms: number;
  bathrooms: number;
  stories: 1 | 2;
  /** Overall dimensions in metres. */
  dimensions: { width: number; depth: number; height: number };
  /** Estimated fabrication + installation time in weeks (from approved engineering). */
  buildWeeks: { min: number; max: number };
  /** Optional explicit starting price (MXN). If omitted, computed from pricing config. */
  priceFromOverride?: number;
  images: ModelImage[];
  floorPlan: Floor[];
  features: L[];
  includedFinishes: L[];
  upgrades: L[];
  sustainability: L[];
  faq: { q: L; a: L }[];
  featured?: boolean;
};

/* ---------- Shared room / label vocabulary ---------- */
const R = {
  living: { es: "Estancia · Cocina", en: "Living · Kitchen" },
  livingDiningKitchen: { es: "Estancia · Comedor · Cocina", en: "Living · Dining · Kitchen" },
  livingDining: { es: "Sala · Comedor", en: "Living · Dining" },
  living2: { es: "Sala", en: "Living room" },
  dining: { es: "Comedor", en: "Dining" },
  kitchen: { es: "Cocina", en: "Kitchen" },
  bedroom: { es: "Recámara", en: "Bedroom" },
  bedroom1: { es: "Recámara 1", en: "Bedroom 1" },
  bedroom2: { es: "Recámara 2", en: "Bedroom 2" },
  bedroom3: { es: "Recámara 3", en: "Bedroom 3" },
  master: { es: "Recámara principal", en: "Main bedroom" },
  bath: { es: "Baño", en: "Bathroom" },
  bath2: { es: "Baño 2", en: "Bathroom 2" },
  masterBath: { es: "Baño principal", en: "Main bathroom" },
  halfBath: { es: "Medio baño", en: "Powder room" },
  laundry: { es: "Lavado", en: "Laundry" },
  laundryCloset: { es: "Lavado · Clóset", en: "Laundry · Closet" },
  closet: { es: "Vestidor", en: "Walk-in closet" },
  terrace: { es: "Terraza", en: "Terrace" },
  coveredTerrace: { es: "Terraza cubierta", en: "Covered terrace" },
  patio: { es: "Patio", en: "Courtyard" },
  hall: { es: "Pasillo", en: "Hallway" },
  stairs: { es: "Escalera", en: "Stairs" },
  study: { es: "Estudio · Recámara 4", en: "Study · Bedroom 4" },
  porch: { es: "Pórtico", en: "Porch" },
  singleFloor: { es: "Planta única", en: "Single floor" },
  groundFloor: { es: "Planta baja", en: "Ground floor" },
  upperFloor: { es: "Planta alta", en: "Upper floor" },
} satisfies Record<string, L>;

const commonIncluded: L[] = [
  { es: "Estructura de acero galvanizado y paneles estructurales fabricados en planta", en: "Galvanized steel structure and factory-built structural panels" },
  { es: "Aislamiento térmico en muros, losa y cubierta", en: "Thermal insulation in walls, floor and roof" },
  { es: "Cancelería de aluminio con doble vidrio", en: "Aluminum windows with double glazing" },
  { es: "Instalaciones eléctricas, hidráulicas y sanitarias listas para conexión", en: "Electrical, plumbing and drainage installations ready for connection" },
  { es: "Muebles de baño y grifería ahorradora de agua", en: "Bathroom fixtures and water-saving faucets" },
  { es: "Iluminación LED en todos los espacios", en: "LED lighting throughout" },
  { es: "Cocina con cubierta, tarja y muebles bajos y altos", en: "Kitchen with countertop, sink, base and wall cabinets" },
  { es: "Puertas interiores, clósets y pintura", en: "Interior doors, closets and paint" },
  { es: "Preparación para paneles solares", en: "Solar-ready roof and conduits" },
];

const commonSustainability: L[] = [
  { es: "Envolvente térmica con aislamiento continuo", en: "Thermal envelope with continuous insulation" },
  { es: "Ventilación cruzada con ventanas enfrentadas", en: "Cross ventilation with opposing windows" },
  { es: "Aleros y volados calculados para sombrear el vidrio en verano", en: "Eaves and overhangs sized to shade glazing in summer" },
  { es: "Preparación eléctrica para sistema fotovoltaico", en: "Electrical provision for a photovoltaic system" },
  { es: "Bajantes pluviales listas para conectar a captación", en: "Downpipes ready to connect to rainwater harvesting" },
  { es: "Grifería y sanitarios de bajo consumo", en: "Low-flow fixtures and toilets" },
];

const U = {
  deck: { es: "Deck exterior", en: "Outdoor deck" },
  deckWood: { es: "Terraza con deck de madera", en: "Terrace with timber deck" },
  pergola: { es: "Pérgola", en: "Pergola" },
  pergolaSteel: { es: "Pérgola de acero y madera", en: "Steel and timber pergola" },
  pergolaPatio: { es: "Pérgola sobre patio", en: "Pergola over the courtyard" },
  solar: { es: "Paneles solares", en: "Solar panels" },
  rain: { es: "Captación pluvial", en: "Rainwater harvesting" },
  grey: { es: "Reúso de aguas grises", en: "Greywater reuse" },
  ac: { es: "Aire acondicionado", en: "Air conditioning" },
  acMini: { es: "Aire acondicionado mini split", en: "Mini-split air conditioning" },
  smart: { es: "Casa inteligente", en: "Smart home" },
  island: { es: "Cocina con isla", en: "Kitchen island" },
  carport: { es: "Cochera techada", en: "Covered carport" },
  pool: { es: "Alberca", en: "Pool" },
  poolCompact: { es: "Alberca compacta", en: "Compact pool" },
  lift: { es: "Elevador residencial", en: "Residential lift" },
  pitchedRoof: { es: "Cubierta inclinada", en: "Pitched roof" },
  porchDeck: { es: "Pórtico con deck", en: "Porch with deck" },
  cladding: { es: "Recubrimiento exterior de madera", en: "Exterior timber cladding" },
  oneBedLayout: { es: "Distribución de una recámara", en: "One-bedroom layout" },
} satisfies Record<string, L>;

export const models: HomeModel[] = [
  {
    // Expandable 20 ft unit. Spec source: supplier product sheet (ShengStart).
    // TODO: confirm delivery timeframe and pricing for this unit.
    slug: "casa-37",
    name: "CASA 37",
    family: "Casa",
    tagline: { es: "Una casa expandible que llega lista y se despliega en tu terreno.", en: "An expandable home that arrives ready and unfolds on your land." },
    description: {
      es: "CASA 37 es nuestra unidad expandible: viaja plegada como un módulo de 20 pies y en sitio se despliega a 37 m² con dos recámaras, baño completo, cocina y estancia. Llega con instalaciones precableadas, cancelería de aluminio con doble vidrio, cocina y baño terminados. Con cubierta inclinada y pórtico opcionales, es la opción más rápida para una casa de descanso, una unidad de renta o una casa de huéspedes.",
      en: "CASA 37 is our expandable unit: it travels folded as a 20 ft module and unfolds on site to 37 m² with two bedrooms, a full bathroom, kitchen and living area. It arrives with pre-wired installations, double-glazed aluminum windows, and a finished kitchen and bathroom. With an optional pitched roof and porch, it's the fastest option for a weekend home, a rental unit or a guest house.",
    },
    idealFor: [
      { es: "Casa de descanso", en: "Weekend home" },
      { es: "Airbnb / renta", en: "Airbnb / rental" },
      { es: "Casa de huéspedes", en: "Guest house" },
      { es: "Desarrollos por lotes", en: "Multi-unit developments" },
    ],
    areaM2: 37,
    bedrooms: 2,
    bathrooms: 1,
    stories: 1,
    dimensions: { width: 6.32, depth: 5.9, height: 2.48 },
    buildWeeks: { min: 6, max: 10 },
    images: [
      { src: "/images/models/casa-37-01.jpg", alt: { es: "CASA 37 desplegada con cubierta inclinada y pórtico frente a montañas", en: "CASA 37 unfolded with pitched roof and porch in front of mountains" } },
      { src: "/images/models/casa-37-02.jpg", alt: { es: "Pórtico con deck, escalera y barandal de acero de CASA 37", en: "CASA 37 porch with deck, steps and steel railing" } },
      { src: "/images/models/casa-37-03.jpg", alt: { es: "Baño con regadera de puerta corrediza, lavabo y muros tipo mármol", en: "Bathroom with sliding-door shower, basin and marble-look walls" } },
      { src: "/images/models/casa-37-04.jpg", alt: { es: "Cocina en L con gabinetes blancos, tarja doble y ventana", en: "L-shaped kitchen with white cabinets, double sink and window" } },
    ],
    floorPlan: [
      {
        name: R.singleFloor,
        width: 6.32,
        depth: 5.9,
        rooms: [
          { name: R.livingDining, x: 2.06, y: 0, w: 2.2, h: 5.9 },
          { name: R.bedroom1, x: 0, y: 0, w: 2.06, h: 3.5 },
          { name: R.bath, x: 0, y: 3.5, w: 2.06, h: 2.4 },
          { name: R.bedroom2, x: 4.26, y: 0, w: 2.06, h: 3.5 },
          { name: R.kitchen, x: 4.26, y: 3.5, w: 2.06, h: 2.4 },
          { name: R.porch, x: 2.06, y: 5.9, w: 2.2, h: 1.8, open: true },
        ],
      },
    ],
    features: [
      { es: "Módulo expandible: viaja plegado (5.9 × 2.2 × 2.48 m, ≈ 3,000 kg) y se despliega en sitio", en: "Expandable module: travels folded (5.9 × 2.2 × 2.48 m, ≈ 3,000 kg) and unfolds on site" },
      { es: "Dos distribuciones: una o dos recámaras", en: "Two layouts: one or two bedrooms" },
      { es: "Altura interior de 2.24 m", en: "2.24 m interior ceiling height" },
      { es: "Muros de panel sándwich EPS/PU de 75 mm y cubierta con 50 mm de aislamiento", en: "75 mm EPS/PU sandwich-panel walls and roof with 50 mm insulation" },
      { es: "Puertas y ventanas de aluminio con rotura de puente térmico, doble vidrio y mosquitero", en: "Thermally broken aluminum doors and windows with double glazing and fly screens" },
      { es: "Dos unidades caben en un contenedor de 40 pies HQ para transporte", en: "Two units fit in one 40 ft HQ container for transport" },
    ],
    includedFinishes: [
      { es: "Estructura de acero galvanizado con recubrimiento en polvo anticorrosivo", en: "Galvanized steel frame with anti-corrosion powder coating" },
      { es: "Subpiso de panel compuesto de magnesio, resistente a agua, pudrición e insectos", en: "Magnesium composite subfloor, water, rot and insect resistant" },
      { es: "Piso vinílico con patrón de madera", en: "Timber-pattern vinyl flooring" },
      { es: "Cocina con gabinetes de cierre suave, cubierta de piedra de ingeniería y tarja de acero inoxidable", en: "Kitchen with soft-close cabinets, engineered stone countertop and stainless sink" },
      { es: "Baño con regadera de lluvia de ancho completo, WC, lavabo de porcelana y muros con acabado tipo mármol", en: "Bathroom with full-width rain shower, toilet, porcelain basin and marble-look walls" },
      { es: "Instalación eléctrica precableada e iluminación LED", en: "Pre-wired electrical installation and LED lighting" },
      { es: "Conexiones de agua y drenaje en la fachada posterior", en: "Water and drainage connections on the rear wall" },
      { es: "Puerta de baño de vidrio esmerilado", en: "Frosted glass bathroom door" },
    ],
    upgrades: [U.pitchedRoof, U.porchDeck, U.cladding, U.oneBedLayout, U.solar, U.rain, U.ac, U.smart],
    sustainability: [
      { es: "Envolvente aislada en muros, piso y cubierta", en: "Insulated envelope in walls, floor and roof" },
      { es: "Doble vidrio en toda la cancelería", en: "Double glazing throughout" },
      { es: "Iluminación LED incluida", en: "LED lighting included" },
      { es: "Fabricación completa en planta: obra en sitio mínima", en: "Fully factory-built: minimal site work" },
      { es: "Transporte plegado: dos casas por contenedor", en: "Ships folded: two homes per container" },
      { es: "Preparación para paneles solares y captación pluvial", en: "Ready for solar panels and rainwater harvesting" },
    ],
    faq: [
      {
        q: { es: "¿Cómo llega y se instala CASA 37?", en: "How does CASA 37 arrive and get installed?" },
        a: { es: "Llega plegada en un solo módulo de 20 pies. En sitio se coloca sobre la cimentación o pilotes ajustables, se despliegan las dos alas y el equipo conecta agua, drenaje y electricidad.", en: "It arrives folded as a single 20 ft module. On site it's set on the foundation or adjustable footings, the two wings unfold and the team connects water, drainage and electricity." },
      },
      {
        q: { es: "¿Qué cimentación necesita?", en: "What foundation does it need?" },
        a: { es: "Por su peso ligero puede apoyarse sobre pilotes ajustables, dados de concreto o una losa sencilla, según el estudio del terreno.", en: "Because it's lightweight, it can sit on adjustable footings, concrete piers or a simple slab, depending on the site study." },
      },
      {
        q: { es: "¿Puedo elegir una sola recámara?", en: "Can I choose a single bedroom?" },
        a: { es: "Sí. La distribución de una recámara amplía la estancia y la cocina manteniendo el baño completo.", en: "Yes. The one-bedroom layout enlarges the living area and kitchen while keeping the full bathroom." },
      },
    ],
    featured: true,
  },
  {
    slug: "nido-45",
    name: "NIDO 45",
    family: "Nido",
    tagline: { es: "Un refugio compacto con una gran terraza.", en: "A compact retreat with a generous terrace." },
    description: {
      es: "NIDO 45 concentra lo esencial en un solo volumen: una estancia con cocina integrada que se abre por completo a la terraza, una recámara con vista y un baño completo. Es la casa ideal para un terreno pequeño, una casa de descanso o una unidad de renta.",
      en: "NIDO 45 concentrates the essentials in a single volume: a living space with an integrated kitchen that opens fully onto the terrace, a bedroom with a view and a full bathroom. It's the ideal home for a small lot, a weekend house or a rental unit.",
    },
    idealFor: [
      { es: "Casa de descanso", en: "Weekend home" },
      { es: "Airbnb / renta", en: "Airbnb / rental" },
      { es: "Primera vivienda", en: "First home" },
      { es: "Casa de huéspedes", en: "Guest house" },
    ],
    areaM2: 45,
    bedrooms: 1,
    bathrooms: 1,
    stories: 1,
    dimensions: { width: 9.0, depth: 5.0, height: 3.4 },
    buildWeeks: { min: 10, max: 14 },
    images: [
      { src: "/images/models/nido-45-01.jpg", alt: { es: "Fachada de NIDO 45 con recubrimiento de madera al atardecer", en: "NIDO 45 facade with timber cladding at dusk" } },
      { src: "/images/models/nido-45-02.jpg", alt: { es: "Recámara de NIDO 45 abierta a la terraza", en: "NIDO 45 bedroom opening onto the terrace" } },
      { src: "/images/models/nido-45-03.jpg", alt: { es: "Recámara con ventana de piso a techo", en: "Bedroom with floor-to-ceiling window" } },
      { src: "/images/models/nido-45-04.jpg", alt: { es: "Cocina integrada con acabados en madera", en: "Integrated kitchen with timber finishes" } },
    ],
    floorPlan: [
      {
        name: R.singleFloor,
        width: 9.0,
        depth: 5.0,
        rooms: [
          { name: R.living, x: 0, y: 0, w: 4.8, h: 5.0 },
          { name: R.bedroom, x: 4.8, y: 0, w: 4.2, h: 3.4 },
          { name: R.bath, x: 4.8, y: 3.4, w: 2.0, h: 1.6 },
          { name: R.laundry, x: 6.8, y: 3.4, w: 2.2, h: 1.6 },
          { name: R.terrace, x: 0, y: 5.0, w: 4.8, h: 2.2, open: true },
        ],
      },
    ],
    features: [
      { es: "Estancia con altura libre de 2.9 m", en: "Living space with 2.9 m clear height" },
      { es: "Ventanal corredizo de 4.8 m hacia la terraza", en: "4.8 m sliding glass wall onto the terrace" },
      { es: "Recámara con clóset integrado", en: "Bedroom with built-in closet" },
      { es: "Cubierta con pendiente ligera y canalón oculto", en: "Gently sloped roof with concealed gutter" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deckWood, U.pergolaSteel, U.solar, U.rain, U.acMini, U.island],
    sustainability: commonSustainability,
    faq: [
      {
        q: { es: "¿Puedo poner dos NIDO 45 en un mismo terreno?", en: "Can I place two NIDO 45 units on the same lot?" },
        a: { es: "Sí. Es una configuración común para renta vacacional. El equipo revisa la normativa local de densidad y las separaciones mínimas del terreno.", en: "Yes. It's a common setup for vacation rentals. The team reviews local density rules and minimum setbacks for the lot." },
      },
      {
        q: { es: "¿Se puede ampliar después?", en: "Can it be extended later?" },
        a: { es: "El módulo está pensado para crecer: la terraza puede cerrarse o puede adosarse un módulo adicional de recámara con conexión por pasillo.", en: "The module is designed to grow: the terrace can be enclosed, or an additional bedroom module can be attached via a hallway." },
      },
    ],
    featured: true,
  },
  {
    slug: "nido-65",
    name: "NIDO 65",
    family: "Nido",
    tagline: { es: "Dos recámaras, un solo gesto de luz.", en: "Two bedrooms, one gesture of light." },
    description: {
      es: "NIDO 65 amplía el módulo compacto con una segunda recámara sin perder la relación directa entre estancia y exterior. La cocina lineal, el área de lavado y un baño completo resuelven el día a día de una pareja o una familia pequeña.",
      en: "NIDO 65 extends the compact module with a second bedroom without losing the direct relationship between living space and outdoors. The linear kitchen, laundry area and a full bathroom cover the daily life of a couple or a small family.",
    },
    idealFor: [
      { es: "Primera vivienda", en: "First home" },
      { es: "Casa de fin de semana", en: "Weekend house" },
      { es: "Renta a largo plazo", en: "Long-term rental" },
    ],
    areaM2: 65,
    bedrooms: 2,
    bathrooms: 1,
    stories: 1,
    dimensions: { width: 10.8, depth: 6.0, height: 3.4 },
    buildWeeks: { min: 11, max: 15 },
    images: [
      { src: "/images/models/nido-65-01.jpg", alt: { es: "NIDO 65 con muro de madera y patio de acceso al anochecer", en: "NIDO 65 with timber wall and entry courtyard at dusk" } },
      { src: "/images/models/nido-65-02.jpg", alt: { es: "Sala con muro de vidrio hacia el jardín", en: "Living room with glass wall onto the garden" } },
      { src: "/images/models/nido-65-03.jpg", alt: { es: "Cocina con barra y acabados blancos y madera", en: "Kitchen with breakfast bar in white and timber" } },
      { src: "/images/models/nido-65-04.jpg", alt: { es: "Baño con lavabo doble y ventana al exterior", en: "Bathroom with double basin and window" } },
    ],
    floorPlan: [
      {
        name: R.singleFloor,
        width: 10.8,
        depth: 6.0,
        rooms: [
          { name: R.livingDiningKitchen, x: 0, y: 0, w: 5.2, h: 6.0 },
          { name: R.bedroom1, x: 5.2, y: 0, w: 2.8, h: 3.6 },
          { name: R.bedroom2, x: 8.0, y: 0, w: 2.8, h: 3.6 },
          { name: R.bath, x: 5.2, y: 3.6, w: 2.2, h: 2.4 },
          { name: R.laundryCloset, x: 7.4, y: 3.6, w: 3.4, h: 2.4 },
          { name: R.terrace, x: 0, y: 6.0, w: 5.2, h: 2.4, open: true },
        ],
      },
    ],
    features: [
      { es: "Muro de vidrio de 5.2 m en la estancia", en: "5.2 m glass wall in the living space" },
      { es: "Recámaras con ventanas enfrentadas para ventilación cruzada", en: "Bedrooms with opposing windows for cross ventilation" },
      { es: "Área de lavado independiente", en: "Separate laundry area" },
      { es: "Fachada ventilada en madera o metal", en: "Ventilated facade in timber or metal" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart],
    sustainability: commonSustainability,
    faq: [
      {
        q: { es: "¿Las recámaras se pueden unir en una sola?", en: "Can the bedrooms be merged into one?" },
        a: { es: "Sí. El muro divisorio no es estructural, por lo que puede omitirse desde fábrica para crear una recámara principal con vestidor.", en: "Yes. The dividing wall isn't structural, so it can be omitted at the factory to create a main bedroom with a walk-in closet." },
      },
    ],
    featured: false, // hidden from the homepage grid to keep 6 cards; still in the catalogue
  },
  {
    slug: "casa-85",
    name: "CASA 85",
    family: "Casa",
    tagline: { es: "La casa familiar en su expresión más clara.", en: "The family home in its clearest form." },
    description: {
      es: "CASA 85 organiza dos recámaras, dos baños completos y una estancia generosa alrededor de un eje de luz. La cocina se separa ligeramente de la sala sin cerrarse, y la recámara principal tiene baño propio. Es nuestro modelo más solicitado para vivienda principal.",
      en: "CASA 85 arranges two bedrooms, two full bathrooms and a generous living space around an axis of light. The kitchen is slightly set apart from the living room without being closed off, and the main bedroom has its own bathroom. It's our most requested model for a primary residence.",
    },
    idealFor: [
      { es: "Vivienda principal", en: "Primary residence" },
      { es: "Familia joven", en: "Young family" },
      { es: "Casa de campo", en: "Country house" },
    ],
    areaM2: 85,
    bedrooms: 2,
    bathrooms: 2,
    stories: 1,
    dimensions: { width: 12.0, depth: 7.1, height: 3.6 },
    buildWeeks: { min: 12, max: 16 },
    images: [
      { src: "/images/models/casa-85-01.jpg", alt: { es: "CASA 85 con fachada de vidrio y madera bajo un árbol", en: "CASA 85 with glass and timber facade under a tree" } },
      { src: "/images/models/casa-85-02.jpg", alt: { es: "Sala con muro de madera y vista al jardín", en: "Living room with timber wall and garden view" } },
      { src: "/images/models/casa-85-03.jpg", alt: { es: "Comedor con puertas corredizas de piso a techo", en: "Dining room with floor-to-ceiling sliding doors" } },
      { src: "/images/models/casa-85-04.jpg", alt: { es: "Estancia luminosa con doble altura parcial", en: "Bright living space with partial double height" } },
    ],
    floorPlan: [
      {
        name: R.singleFloor,
        width: 12.0,
        depth: 7.1,
        rooms: [
          { name: R.kitchen, x: 0, y: 0, w: 5.6, h: 2.6 },
          { name: R.livingDining, x: 0, y: 2.6, w: 5.6, h: 4.5 },
          { name: R.master, x: 5.6, y: 0, w: 3.6, h: 4.0 },
          { name: R.masterBath, x: 5.6, y: 4.0, w: 2.0, h: 3.1 },
          { name: R.laundry, x: 7.6, y: 4.0, w: 1.6, h: 3.1 },
          { name: R.bedroom2, x: 9.2, y: 0, w: 2.8, h: 4.0 },
          { name: R.bath2, x: 9.2, y: 4.0, w: 2.8, h: 3.1 },
          { name: R.terrace, x: 0, y: 7.1, w: 5.6, h: 2.6, open: true },
        ],
      },
    ],
    features: [
      { es: "Recámara principal con baño y clóset vestidor", en: "Main bedroom with en-suite bathroom and walk-in closet" },
      { es: "Cocina con barra hacia el comedor", en: "Kitchen with bar facing the dining room" },
      { es: "Altura libre de 3.0 m en estancia", en: "3.0 m clear height in the living space" },
      { es: "Alero corrido de 1.2 m sobre la terraza", en: "Continuous 1.2 m eave over the terrace" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart, U.island],
    sustainability: commonSustainability,
    faq: [
      {
        q: { es: "¿Puedo convertir la Recámara 2 en estudio?", en: "Can Bedroom 2 become a study?" },
        a: { es: "Sí. Puede entregarse sin clóset y con un ventanal adicional para usarla como estudio o consultorio.", en: "Yes. It can be delivered without a closet and with an extra window to use as a study or home office." },
      },
      {
        q: { es: "¿Se puede agregar una tercera recámara?", en: "Can a third bedroom be added?" },
        a: { es: "CASA 110 es la versión de tres recámaras del mismo esquema. También puede adosarse un módulo posterior a CASA 85.", en: "CASA 110 is the three-bedroom version of the same scheme. A rear module can also be attached to CASA 85." },
      },
    ],
    featured: true,
  },
  {
    slug: "casa-110",
    name: "CASA 110",
    family: "Casa",
    tagline: { es: "Tres recámaras y una estancia que se extiende al jardín.", en: "Three bedrooms and a living space that extends into the garden." },
    description: {
      es: "CASA 110 está pensada para una familia que quiere espacio sin complicaciones: tres recámaras, dos baños, cocina con área de lavado y una sala-comedor con más de seis metros de frente al jardín. El volumen se puede girar para orientar las recámaras al norte.",
      en: "CASA 110 is designed for a family that wants space without complications: three bedrooms, two bathrooms, a kitchen with laundry area and a living-dining room with more than six metres facing the garden. The volume can be rotated to orient the bedrooms north.",
    },
    idealFor: [
      { es: "Vivienda principal", en: "Primary residence" },
      { es: "Familia con hijos", en: "Family with children" },
      { es: "Casa de campo", en: "Country house" },
    ],
    areaM2: 110,
    bedrooms: 3,
    bathrooms: 2,
    stories: 1,
    dimensions: { width: 14.0, depth: 7.9, height: 3.6 },
    buildWeeks: { min: 13, max: 18 },
    images: [
      { src: "/images/models/casa-110-01.jpg", alt: { es: "CASA 110 con fachada blanca y volumen en terracota", en: "CASA 110 with white facade and terracotta volume" } },
      { src: "/images/models/casa-110-02.jpg", alt: { es: "Vista frontal de CASA 110 con acceso y cochera", en: "Front view of CASA 110 with entrance and carport" } },
      { src: "/images/models/casa-110-03.jpg", alt: { es: "Sala con muro de madera y cocina integrada", en: "Living room with timber wall and integrated kitchen" } },
      { src: "/images/models/casa-110-04.jpg", alt: { es: "Estancia con puertas de vidrio abiertas hacia la terraza", en: "Living space with glass doors open to the terrace" } },
    ],
    floorPlan: [
      {
        name: R.singleFloor,
        width: 14.0,
        depth: 7.9,
        rooms: [
          { name: R.kitchen, x: 0, y: 0, w: 4.6, h: 3.0 },
          { name: R.laundry, x: 4.6, y: 0, w: 1.6, h: 3.0 },
          { name: R.livingDining, x: 0, y: 3.0, w: 6.2, h: 4.9 },
          { name: R.master, x: 6.2, y: 0, w: 4.0, h: 4.2 },
          { name: R.masterBath, x: 6.2, y: 4.2, w: 2.0, h: 3.7 },
          { name: R.bath2, x: 8.2, y: 4.2, w: 2.0, h: 3.7 },
          { name: R.bedroom2, x: 10.2, y: 0, w: 3.8, h: 3.9 },
          { name: R.bedroom3, x: 10.2, y: 3.9, w: 3.8, h: 4.0 },
          { name: R.terrace, x: 0, y: 7.9, w: 6.2, h: 2.8, open: true },
        ],
      },
    ],
    features: [
      { es: "Sala-comedor con 6.2 m de ventanal hacia el jardín", en: "Living-dining room with 6.2 m of glazing onto the garden" },
      { es: "Recámara principal con baño propio", en: "Main bedroom with en-suite bathroom" },
      { es: "Cocina cerrada opcional", en: "Optional closed kitchen" },
      { es: "Cubierta preparada para 12 paneles solares", en: "Roof prepared for 12 solar panels" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart, U.carport],
    sustainability: commonSustainability,
    faq: [
      {
        q: { es: "¿Se puede entregar con la cocina cerrada?", en: "Can it be delivered with a closed kitchen?" },
        a: { es: "Sí. La cocina puede cerrarse con un muro ligero y puerta corrediza sin afectar la estructura.", en: "Yes. The kitchen can be closed with a lightweight wall and sliding door without affecting the structure." },
      },
    ],
    featured: true,
  },
  {
    slug: "patio-140",
    name: "PATIO 140",
    family: "Patio",
    tagline: { es: "Una casa organizada alrededor de su patio.", en: "A house organized around its courtyard." },
    description: {
      es: "PATIO 140 recupera la tradición de la casa mexicana con patio central: todos los espacios miran hacia un jardín interior protegido que ventila e ilumina la casa. Tres recámaras, dos baños y medio, cocina abierta y una estancia de doble frente.",
      en: "PATIO 140 revives the tradition of the Mexican courtyard house: every space looks onto a protected inner garden that ventilates and lights the home. Three bedrooms, two and a half bathrooms, an open kitchen and a living space with two fronts.",
    },
    idealFor: [
      { es: "Vivienda principal", en: "Primary residence" },
      { es: "Terrenos urbanos con colindancias", en: "Urban lots with party walls" },
      { es: "Casa de descanso", en: "Weekend home" },
    ],
    areaM2: 140,
    bedrooms: 3,
    bathrooms: 2.5,
    stories: 1,
    dimensions: { width: 16.0, depth: 9.0, height: 3.8 },
    buildWeeks: { min: 14, max: 20 },
    images: [
      { src: "/images/models/patio-140-01.jpg", alt: { es: "PATIO 140 con cubierta volada y jardín al anochecer", en: "PATIO 140 with cantilevered roof and garden at dusk" } },
      { src: "/images/models/patio-140-02.jpg", alt: { es: "Fachada de PATIO 140 bajo un árbol", en: "PATIO 140 facade under a tree" } },
      { src: "/images/models/patio-140-03.jpg", alt: { es: "Sala en madera abierta al patio interior", en: "Timber living room open to the inner courtyard" } },
      { src: "/images/models/patio-140-04.jpg", alt: { es: "Estancia con deck exterior y cocina integrada", en: "Living space with outdoor deck and integrated kitchen" } },
    ],
    floorPlan: [
      {
        name: R.singleFloor,
        width: 16.0,
        depth: 9.0,
        rooms: [
          { name: R.livingDining, x: 0, y: 0, w: 5.4, h: 9.0 },
          { name: R.kitchen, x: 5.4, y: 0, w: 4.2, h: 3.0 },
          { name: R.patio, x: 5.4, y: 3.0, w: 4.2, h: 3.6, open: true },
          { name: R.hall, x: 5.4, y: 6.6, w: 4.2, h: 2.4 },
          { name: R.master, x: 9.6, y: 0, w: 3.8, h: 4.4 },
          { name: R.bedroom2, x: 13.4, y: 0, w: 2.6, h: 4.4 },
          { name: R.masterBath, x: 9.6, y: 4.4, w: 2.0, h: 2.2 },
          { name: R.halfBath, x: 9.6, y: 6.6, w: 2.0, h: 2.4 },
          { name: R.bath2, x: 11.6, y: 4.4, w: 1.8, h: 4.6 },
          { name: R.bedroom3, x: 13.4, y: 4.4, w: 2.6, h: 4.6 },
        ],
      },
    ],
    features: [
      { es: "Patio central de 15 m² con vegetación", en: "15 m² planted central courtyard" },
      { es: "Estancia con doble frente: jardín y patio", en: "Living space with two fronts: garden and courtyard" },
      { es: "Medio baño para visitas", en: "Powder room for guests" },
      { es: "Cubierta a un agua con alero de 1.5 m", en: "Mono-pitch roof with 1.5 m eave" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergolaPatio, U.solar, U.rain, U.grey, U.ac, U.smart, U.poolCompact],
    sustainability: [...commonSustainability, { es: "Patio interior que enfría por convección y sombrea la estancia", en: "Inner courtyard that cools by convection and shades the living space" }],
    faq: [
      {
        q: { es: "¿El patio se puede techar?", en: "Can the courtyard be roofed?" },
        a: { es: "Puede cubrirse parcialmente con una pérgola de lamas o un vidrio, manteniendo la ventilación.", en: "It can be partially covered with a louvered pergola or glass while keeping the ventilation." },
      },
    ],
    featured: true,
  },
  {
    slug: "patio-180",
    name: "PATIO 180",
    family: "Patio",
    tagline: { es: "Dos niveles, cuatro recámaras y una terraza sobre el paisaje.", en: "Two stories, four bedrooms and a terrace over the landscape." },
    description: {
      es: "PATIO 180 es nuestra casa de dos niveles: en planta baja la vida social se abre al jardín con sala, comedor, cocina y un estudio que puede ser cuarta recámara; en planta alta, tres recámaras con la principal en suite y una terraza cubierta. Pensada para familias grandes o para quien recibe visitas con frecuencia.",
      en: "PATIO 180 is our two-story home: on the ground floor, social life opens to the garden with living room, dining room, kitchen and a study that can become a fourth bedroom; upstairs, three bedrooms with the main one en suite and a covered terrace. Designed for large families or frequent hosts.",
    },
    idealFor: [
      { es: "Familia grande", en: "Large family" },
      { es: "Casa de descanso para varias familias", en: "Weekend home for several families" },
      { es: "Terreno con vistas", en: "Lot with views" },
    ],
    areaM2: 180,
    bedrooms: 4,
    bathrooms: 3,
    stories: 2,
    dimensions: { width: 12.0, depth: 8.0, height: 6.8 },
    buildWeeks: { min: 16, max: 22 },
    images: [
      { src: "/images/models/patio-180-01.jpg", alt: { es: "PATIO 180 de dos niveles con terraza y alberca", en: "Two-story PATIO 180 with terrace and pool" } },
      { src: "/images/models/patio-180-02.jpg", alt: { es: "Vista del jardín y la fachada blanca con madera", en: "View of the garden and the white and timber facade" } },
      { src: "/images/models/patio-180-03.jpg", alt: { es: "Estancia de doble altura con escalera y vista a la alberca", en: "Double-height living space with staircase and pool view" } },
      { src: "/images/models/patio-180-04.jpg", alt: { es: "Escalera de madera y acero con iluminación natural", en: "Timber and steel staircase with natural light" } },
    ],
    floorPlan: [
      {
        name: R.groundFloor,
        width: 12.0,
        depth: 8.0,
        rooms: [
          { name: R.living2, x: 0, y: 0, w: 5.0, h: 8.0 },
          { name: R.dining, x: 5.0, y: 0, w: 4.0, h: 4.0 },
          { name: R.kitchen, x: 5.0, y: 4.0, w: 4.0, h: 4.0 },
          { name: R.halfBath, x: 9.0, y: 0, w: 1.6, h: 2.2 },
          { name: R.laundry, x: 9.0, y: 2.2, w: 1.6, h: 2.0 },
          { name: R.study, x: 9.0, y: 4.2, w: 3.0, h: 3.8 },
          { name: R.stairs, x: 10.6, y: 0, w: 1.4, h: 4.2 },
          { name: R.terrace, x: 0, y: 8.0, w: 9.0, h: 3.0, open: true },
        ],
      },
      {
        name: R.upperFloor,
        width: 12.0,
        depth: 7.0,
        rooms: [
          { name: R.master, x: 0, y: 0, w: 5.0, h: 4.5 },
          { name: R.closet, x: 0, y: 4.5, w: 2.5, h: 2.5 },
          { name: R.masterBath, x: 2.5, y: 4.5, w: 2.5, h: 2.5 },
          { name: R.bedroom2, x: 5.0, y: 0, w: 3.5, h: 4.0 },
          { name: R.bedroom3, x: 8.5, y: 0, w: 3.5, h: 4.0 },
          { name: R.bath2, x: 5.0, y: 4.0, w: 2.5, h: 3.0 },
          { name: R.hall, x: 7.5, y: 4.0, w: 3.1, h: 3.0 },
          { name: R.stairs, x: 10.6, y: 4.0, w: 1.4, h: 3.0 },
          { name: R.coveredTerrace, x: 12.0, y: 0, w: 3.0, h: 4.0, open: true },
        ],
      },
    ],
    features: [
      { es: "Sala de doble altura con ventanal de 8 m", en: "Double-height living room with 8 m of glazing" },
      { es: "Recámara principal en suite con vestidor", en: "En-suite main bedroom with walk-in closet" },
      { es: "Estudio en planta baja convertible en recámara", en: "Ground-floor study convertible into a bedroom" },
      { es: "Terraza cubierta en planta alta", en: "Covered terrace on the upper floor" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart, U.pool, U.lift],
    sustainability: [...commonSustainability, { es: "Terraza cubierta que sombrea el ventanal de planta baja", en: "Covered terrace that shades the ground-floor glazing" }],
    faq: [
      {
        q: { es: "¿Cómo se transporta una casa de dos niveles?", en: "How is a two-story house transported?" },
        a: { es: "Se fabrica por módulos independientes por nivel; planta alta y planta baja viajan por separado y se ensamblan en sitio con grúa.", en: "It's fabricated as independent modules per floor; the upper and ground floors travel separately and are assembled on site with a crane." },
      },
    ],
    featured: true,
  },
];

export const getModelBySlug = (slug: string) => models.find((m) => m.slug === slug);
export const featuredModels = models.filter((m) => m.featured);
