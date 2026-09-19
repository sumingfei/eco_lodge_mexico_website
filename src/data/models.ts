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

export type ModelFamily = "Casa" | "Villa";

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
  studyOnly: { es: "Estudio", en: "Study" },
  study5: { es: "Estudio · Recámara 5", en: "Study · Bedroom 5" },
  bedroom4: { es: "Recámara 4", en: "Bedroom 4" },
  bath3: { es: "Baño 3", en: "Bathroom 3" },
  guestRoom: { es: "Recámara de huéspedes", en: "Guest bedroom" },
  porch: { es: "Pórtico", en: "Porch" },
  entry: { es: "Acceso", en: "Entry" },
  storage: { es: "Bodega", en: "Storage" },
  roofTerrace: { es: "Terraza sobre planta baja", en: "Roof terrace" },
  bath1: { es: "Baño 1", en: "Bathroom 1" },
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
  { es: "Captación pluvial: canalones, bajantes y filtro listos para conectar a cisterna", en: "Rainwater harvesting: gutters, downpipes and filter ready to connect to a cistern" },
  { es: "Cubierta estructurada y canalización eléctrica para sistema fotovoltaico", en: "Roof structured and electrical conduits for a photovoltaic system" },
  { es: "Envolvente térmica con aislamiento continuo", en: "Thermal envelope with continuous insulation" },
  { es: "Ventilación cruzada con ventanas enfrentadas", en: "Cross ventilation with opposing windows" },
  { es: "Aleros y volados calculados para sombrear el vidrio en verano", en: "Eaves and overhangs sized to shade glazing in summer" },
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
      { es: "Captación pluvial: techo a dos aguas con canalones y bajantes listos para cisterna", en: "Rainwater harvesting: pitched roof with gutters and downpipes ready for a cistern" },
      { es: "Cubierta preparada para paneles solares y canalización hasta el tablero", en: "Roof prepared for solar panels with conduits to the panel board" },
      { es: "Envolvente aislada en muros, piso y cubierta", en: "Insulated envelope in walls, floor and roof" },
      { es: "Doble vidrio en toda la cancelería", en: "Double glazing throughout" },
      { es: "Iluminación LED incluida", en: "LED lighting included" },
      { es: "Fabricación completa en planta: obra en sitio mínima", en: "Fully factory-built: minimal site work" },
      { es: "Transporte plegado: dos casas por contenedor", en: "Ships folded: two homes per container" },
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
    // Two stacked expandable units: 30 ft (ground floor, 52 m²) + 20 ft (upper floor, 37 m², 2.4 m ceiling).
    // Spec source: supplier product sheets (ShengStart). Stacked configuration and stair are our design.
    // TODO: confirm structural approval for stacking, delivery timeframe and pricing.
    slug: "casa-90",
    name: "CASA 90",
    family: "Casa",
    tagline: { es: "Dos módulos expandibles, una casa de dos niveles con terraza.", en: "Two expandable modules, a two-story home with a roof terrace." },
    description: {
      es: "CASA 90 apila dos unidades expandibles: en planta baja, un módulo de 30 pies con sala, comedor, cocina, una recámara y baño completo; en planta alta, un módulo de 20 pies con dos recámaras, segundo baño y altura interior de 2.4 m. Como el módulo superior es más corto, el resto de la cubierta de planta baja se convierte en una terraza. Ambos módulos llegan plegados, con instalaciones, cocina y baños terminados de fábrica.",
      en: "CASA 90 stacks two expandable units: on the ground floor, a 30 ft module with living room, dining, kitchen, one bedroom and a full bathroom; upstairs, a 20 ft module with two bedrooms, a second bathroom and a 2.4 m ceiling. Because the upper module is shorter, the rest of the ground-floor roof becomes a terrace. Both modules arrive folded, with installations, kitchen and bathrooms finished at the factory.",
    },
    idealFor: [
      { es: "Vivienda principal", en: "Primary residence" },
      { es: "Familia con hijos", en: "Family with children" },
      { es: "Casa de descanso para varias familias", en: "Weekend home for several families" },
      { es: "Terrenos angostos", en: "Narrow lots" },
    ],
    areaM2: 90,
    bedrooms: 3,
    bathrooms: 2,
    stories: 2,
    dimensions: { width: 9.0, depth: 6.75, height: 5.04 },
    buildWeeks: { min: 8, max: 12 },
    images: [
      { src: "/images/models/casa-90-01.jpg", alt: { es: "CASA 90: dos módulos expandibles apilados con balcón en planta alta", en: "CASA 90: two stacked expandable modules with an upstairs balcony" } },
      { src: "/images/models/casa-90-02.jpg", alt: { es: "Interior con cocina de madera, sala y muros en terracota", en: "Interior with timber kitchen, living area and terracotta walls" } },
      { src: "/images/models/casa-90-03.jpg", alt: { es: "Sala con sofá y cocina al fondo", en: "Living room with sofa and kitchen beyond" } },
      { src: "/images/models/casa-90-04.jpg", alt: { es: "Baño con regadera de vidrio esmerilado y WC", en: "Bathroom with frosted-glass shower and toilet" } },
    ],
    floorPlan: [
      {
        name: R.groundFloor,
        width: 9.0,
        depth: 6.24,
        rooms: [
          { name: R.bedroom1, x: 0, y: 0, w: 3.4, h: 2.07 },
          { name: R.bath1, x: 3.4, y: 0, w: 2.0, h: 2.07 },
          { name: R.kitchen, x: 5.4, y: 0, w: 3.6, h: 2.07 },
          { name: R.living2, x: 0, y: 2.07, w: 5.6, h: 2.1 },
          { name: R.stairs, x: 5.6, y: 2.07, w: 1.4, h: 2.1 },
          { name: R.laundry, x: 7.0, y: 2.07, w: 2.0, h: 2.1 },
          { name: R.dining, x: 0, y: 4.17, w: 5.0, h: 2.07 },
          { name: R.entry, x: 5.0, y: 4.17, w: 2.0, h: 2.07 },
          { name: R.storage, x: 7.0, y: 4.17, w: 2.0, h: 2.07 },
          { name: R.porch, x: 0, y: 6.24, w: 5.0, h: 1.8, open: true },
        ],
      },
      {
        name: R.upperFloor,
        width: 5.9,
        depth: 6.75,
        rooms: [
          { name: R.master, x: 0, y: 0, w: 3.6, h: 2.28 },
          { name: R.bath2, x: 3.6, y: 0, w: 2.3, h: 2.28 },
          { name: R.hall, x: 0, y: 2.28, w: 3.0, h: 2.2 },
          { name: R.stairs, x: 3.0, y: 2.28, w: 1.4, h: 2.2 },
          { name: R.closet, x: 4.4, y: 2.28, w: 1.5, h: 2.2 },
          { name: R.bedroom3, x: 0, y: 4.48, w: 3.4, h: 2.27 },
          { name: R.studyOnly, x: 3.4, y: 4.48, w: 2.5, h: 2.27 },
          { name: R.roofTerrace, x: 5.9, y: 0, w: 3.1, h: 6.24, open: true },
        ],
      },
    ],
    features: [
      { es: "Planta baja: módulo expandible de 30 pies (52 m²), 9.0 × 6.24 m, altura interior 2.2 m", en: "Ground floor: 30 ft expandable module (52 m²), 9.0 × 6.24 m, 2.2 m ceiling" },
      { es: "Planta alta: módulo expandible de 20 pies (37 m²), 5.9 × 6.75 m, altura interior 2.4 m", en: "Upper floor: 20 ft expandable module (37 m²), 5.9 × 6.75 m, 2.4 m ceiling" },
      { es: "Terraza de ≈ 19 m² sobre la planta baja", en: "≈ 19 m² roof terrace over the ground floor" },
      { es: "Recámara y baño completo en planta baja; dos recámaras y baño en planta alta", en: "Bedroom and full bathroom downstairs; two bedrooms and a bathroom upstairs" },
      { es: "Ambos módulos viajan plegados (9.0 × 2.1 m y 5.9 × 2.2 m, ≈ 7,200 kg en total)", en: "Both modules travel folded (9.0 × 2.1 m and 5.9 × 2.2 m, ≈ 7,200 kg total)" },
      { es: "Muros de panel sándwich EPS/PU de 75 mm y cubiertas con 50 mm de aislamiento", en: "75 mm EPS/PU sandwich-panel walls and roofs with 50 mm insulation" },
      { es: "Puertas y ventanas de aluminio con rotura de puente térmico, doble vidrio y mosquitero", en: "Thermally broken aluminum doors and windows with double glazing and fly screens" },
    ],
    includedFinishes: [
      { es: "Estructura de acero galvanizado con recubrimiento en polvo anticorrosivo", en: "Galvanized steel frame with anti-corrosion powder coating" },
      { es: "Subpiso de panel compuesto de magnesio, resistente a agua, pudrición e insectos", en: "Magnesium composite subfloor, water, rot and insect resistant" },
      { es: "Piso vinílico con patrón de madera", en: "Timber-pattern vinyl flooring" },
      { es: "Cocina con gabinetes de cierre suave, cubierta de piedra de ingeniería y tarja de acero inoxidable", en: "Kitchen with soft-close cabinets, engineered stone countertop and stainless sink" },
      { es: "Dos baños con regadera de lluvia, WC, lavabo de porcelana y muros con acabado tipo mármol", en: "Two bathrooms with rain shower, toilet, porcelain basin and marble-look walls" },
      { es: "Instalación eléctrica precableada e iluminación LED en ambos niveles", en: "Pre-wired electrical installation and LED lighting on both floors" },
      { es: "Conexiones de agua y drenaje en la fachada posterior", en: "Water and drainage connections on the rear wall" },
      { es: "Escalera interior y barandal de terraza", en: "Interior staircase and terrace railing" },
    ],
    upgrades: [U.pitchedRoof, U.porchDeck, U.cladding, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart],
    sustainability: [
      { es: "Captación pluvial: cubierta plana con bajantes listos para cisterna", en: "Rainwater harvesting: flat roof with downpipes ready for a cistern" },
      { es: "Cubierta plana estructurada para paneles solares y canalización hasta el tablero", en: "Flat roof structured for solar panels with conduits to the panel board" },
      { es: "Envolvente aislada en muros, piso y cubierta de ambos módulos", en: "Insulated envelope in walls, floor and roof of both modules" },
      { es: "Doble vidrio en toda la cancelería", en: "Double glazing throughout" },
      { es: "Iluminación LED incluida", en: "LED lighting included" },
      { es: "Fabricación completa en planta: obra en sitio mínima", en: "Fully factory-built: minimal site work" },
      { es: "Huella compacta: dos niveles sobre 9 × 6.75 m de terreno", en: "Compact footprint: two floors on 9 × 6.75 m of land" },
    ],
    faq: [
      {
        q: { es: "¿Cómo se instala una casa de dos módulos apilados?", en: "How is a stacked two-module house installed?" },
        a: { es: "El módulo de 30 pies se coloca sobre la cimentación y se despliega; después, con grúa, se apila el módulo de 20 pies, se despliega y se unen estructuralmente. La escalera interior y la terraza se rematan en sitio.", en: "The 30 ft module is set on the foundation and unfolded; then the 20 ft module is craned on top, unfolded and structurally joined. The interior stair and the terrace are finished on site." },
      },
      {
        q: { es: "¿Por qué la planta alta es más pequeña?", en: "Why is the upper floor smaller?" },
        a: { es: "Porque usa un módulo de 20 pies sobre uno de 30. La diferencia de 3.1 m se aprovecha como terraza en planta alta.", en: "Because it uses a 20 ft module on top of a 30 ft one. The 3.1 m difference becomes an upstairs terrace." },
      },
      {
        q: { es: "¿Se pueden cambiar las distribuciones?", en: "Can the layouts be changed?" },
        a: { es: "Sí. Cada módulo tiene sus propias variantes (por ejemplo, tres recámaras en el de 30 pies), así que la casa puede llegar hasta cuatro o cinco recámaras.", en: "Yes. Each module has its own layout variants (for example, three bedrooms in the 30 ft unit), so the house can go up to four or five bedrooms." },
      },
    ],
    featured: true,
  },
  {
    slug: "casa-110",
    name: "CASA 110",
    family: "Casa",
    tagline: { es: "La casa familiar de dos niveles en su expresión más clara.", en: "The two-story family home in its clearest form." },
    description: {
      es: "CASA 110 separa la vida social de la privada en dos niveles: en planta baja, una estancia de doble frente, comedor, cocina abierta y un baño completo; en planta alta, la recámara principal con baño y vestidor y dos recámaras más. La huella compacta de 9 × 6.4 m deja más jardín en el terreno. Es nuestro modelo más solicitado para vivienda principal.",
      en: "CASA 110 separates social and private life across two floors: on the ground floor, a living space with two fronts, dining room, open kitchen and a full bathroom; upstairs, the main bedroom with en-suite bathroom and walk-in closet plus two more bedrooms. The compact 9 × 6.4 m footprint leaves more garden on the lot. It's our most requested model for a primary residence.",
    },
    idealFor: [
      { es: "Vivienda principal", en: "Primary residence" },
      { es: "Familia joven", en: "Young family" },
      { es: "Casa de campo", en: "Country house" },
    ],
    areaM2: 110,
    bedrooms: 3,
    bathrooms: 2,
    stories: 2,
    dimensions: { width: 9.0, depth: 6.4, height: 6.8 },
    buildWeeks: { min: 13, max: 18 },
    images: [
      { src: "/images/models/casa-110-01.jpg", alt: { es: "CASA 110 con fachada de vidrio y madera bajo un árbol", en: "CASA 110 with glass and timber facade under a tree" } },
      { src: "/images/models/casa-110-02.jpg", alt: { es: "Sala con muro de madera y vista al jardín", en: "Living room with timber wall and garden view" } },
      { src: "/images/models/casa-110-03.jpg", alt: { es: "Comedor con puertas corredizas de piso a techo", en: "Dining room with floor-to-ceiling sliding doors" } },
      { src: "/images/models/casa-110-04.jpg", alt: { es: "Estancia luminosa con doble altura parcial", en: "Bright living space with partial double height" } },
    ],
    floorPlan: [
      {
        name: R.groundFloor,
        width: 9.0,
        depth: 6.4,
        rooms: [
          { name: R.living2, x: 0, y: 0, w: 4.5, h: 6.4 },
          { name: R.dining, x: 4.5, y: 0, w: 3.0, h: 3.2 },
          { name: R.kitchen, x: 4.5, y: 3.2, w: 3.0, h: 3.2 },
          { name: R.bath1, x: 7.5, y: 0, w: 1.5, h: 2.4 },
          { name: R.laundry, x: 7.5, y: 2.4, w: 1.5, h: 1.6 },
          { name: R.stairs, x: 7.5, y: 4.0, w: 1.5, h: 2.4 },
          { name: R.terrace, x: 0, y: 6.4, w: 4.5, h: 2.5, open: true },
        ],
      },
      {
        name: R.upperFloor,
        width: 9.0,
        depth: 6.0,
        rooms: [
          { name: R.master, x: 0, y: 0, w: 4.0, h: 3.6 },
          { name: R.masterBath, x: 0, y: 3.6, w: 2.0, h: 2.4 },
          { name: R.closet, x: 2.0, y: 3.6, w: 2.0, h: 2.4 },
          { name: R.bedroom2, x: 4.0, y: 0, w: 2.7, h: 3.6 },
          { name: R.bedroom3, x: 6.7, y: 0, w: 2.3, h: 3.6 },
          { name: R.hall, x: 4.0, y: 3.6, w: 3.5, h: 2.4 },
          { name: R.stairs, x: 7.5, y: 3.6, w: 1.5, h: 2.4 },
        ],
      },
    ],
    features: [
      { es: "Estancia de doble frente con 4.5 m de ventanal hacia la terraza", en: "Living space with two fronts and 4.5 m of glazing onto the terrace" },
      { es: "Baño completo en planta baja para visitas", en: "Full bathroom on the ground floor for guests" },
      { es: "Recámara principal en suite con vestidor en planta alta", en: "Upstairs en-suite main bedroom with walk-in closet" },
      { es: "Cocina con barra hacia el comedor, cerrada opcional", en: "Kitchen with bar facing the dining room, optionally closed" },
      { es: "Huella compacta de 9 × 6.4 m", en: "Compact 9 × 6.4 m footprint" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart, U.island, U.carport],
    sustainability: commonSustainability,
    faq: [
      {
        q: { es: "¿Puedo convertir la Recámara 3 en estudio?", en: "Can Bedroom 3 become a study?" },
        a: { es: "Sí. Puede entregarse sin clóset y con un ventanal adicional para usarla como estudio o consultorio.", en: "Yes. It can be delivered without a closet and with an extra window to use as a study or home office." },
      },
      {
        q: { es: "¿Se puede agregar una cuarta recámara?", en: "Can a fourth bedroom be added?" },
        a: { es: "CASA 150 es la versión de cuatro recámaras y tres baños del mismo esquema. También puede adosarse un módulo posterior a CASA 110.", en: "CASA 150 is the four-bedroom, three-bathroom version of the same scheme. A rear module can also be attached to CASA 110." },
      },
      {
        q: { es: "¿Cómo se transporta una casa de dos niveles?", en: "How is a two-story house transported?" },
        a: { es: "Se fabrica por módulos independientes por nivel; planta alta y planta baja viajan por separado y se ensamblan en sitio con grúa.", en: "It's fabricated as independent modules per floor; the upper and ground floors travel separately and are assembled on site with a crane." },
      },
    ],
    featured: true,
  },
  {
    slug: "casa-150",
    name: "CASA 150",
    family: "Casa",
    tagline: { es: "Cuatro recámaras y tres baños en dos niveles.", en: "Four bedrooms and three bathrooms across two floors." },
    description: {
      es: "CASA 150 está pensada para una familia grande: en planta baja, una sala de 31 m², comedor, cocina, una recámara de huéspedes con baño completo y la terraza; en planta alta, la recámara principal con baño y vestidor, dos recámaras más, un tercer baño y el área de lavado. La huella de 11 × 7 m se puede girar para orientar las recámaras al norte.",
      en: "CASA 150 is designed for a large family: on the ground floor, a 31 m² living room, dining room, kitchen, a guest bedroom with full bathroom and the terrace; upstairs, the main bedroom with en-suite bathroom and walk-in closet, two more bedrooms, a third bathroom and the laundry. The 11 × 7 m footprint can be rotated to orient the bedrooms north.",
    },
    idealFor: [
      { es: "Vivienda principal", en: "Primary residence" },
      { es: "Familia grande", en: "Large family" },
      { es: "Casa de campo", en: "Country house" },
    ],
    areaM2: 150,
    bedrooms: 4,
    bathrooms: 3,
    stories: 2,
    dimensions: { width: 11.0, depth: 7.0, height: 6.8 },
    buildWeeks: { min: 15, max: 20 },
    images: [
      { src: "/images/models/casa-150-01.jpg", alt: { es: "CASA 150 con fachada blanca y volumen en terracota", en: "CASA 150 with white facade and terracotta volume" } },
      { src: "/images/models/casa-150-02.jpg", alt: { es: "Vista frontal de CASA 150 con acceso y cochera", en: "Front view of CASA 150 with entrance and carport" } },
      { src: "/images/models/casa-150-03.jpg", alt: { es: "Sala con muro de madera y cocina integrada", en: "Living room with timber wall and integrated kitchen" } },
      { src: "/images/models/casa-150-04.jpg", alt: { es: "Estancia con puertas de vidrio abiertas hacia la terraza", en: "Living space with glass doors open to the terrace" } },
    ],
    floorPlan: [
      {
        name: R.groundFloor,
        width: 11.0,
        depth: 7.0,
        rooms: [
          { name: R.living2, x: 0, y: 0, w: 4.5, h: 7.0 },
          { name: R.dining, x: 4.5, y: 0, w: 3.0, h: 3.5 },
          { name: R.kitchen, x: 4.5, y: 3.5, w: 3.0, h: 3.5 },
          { name: R.guestRoom, x: 7.5, y: 0, w: 3.5, h: 3.8 },
          { name: R.bath1, x: 7.5, y: 3.8, w: 2.0, h: 3.2 },
          { name: R.stairs, x: 9.5, y: 3.8, w: 1.5, h: 3.2 },
          { name: R.terrace, x: 0, y: 7.0, w: 4.5, h: 2.8, open: true },
        ],
      },
      {
        name: R.upperFloor,
        width: 11.0,
        depth: 6.6,
        rooms: [
          { name: R.master, x: 0, y: 0, w: 4.5, h: 3.8 },
          { name: R.closet, x: 0, y: 3.8, w: 2.2, h: 2.8 },
          { name: R.masterBath, x: 2.2, y: 3.8, w: 2.3, h: 2.8 },
          { name: R.bedroom2, x: 4.5, y: 0, w: 3.3, h: 3.8 },
          { name: R.bedroom3, x: 7.8, y: 0, w: 3.2, h: 3.8 },
          { name: R.bath3, x: 4.5, y: 3.8, w: 2.2, h: 2.8 },
          { name: R.laundry, x: 6.7, y: 3.8, w: 1.3, h: 2.8 },
          { name: R.hall, x: 8.0, y: 3.8, w: 1.5, h: 2.8 },
          { name: R.stairs, x: 9.5, y: 3.8, w: 1.5, h: 2.8 },
        ],
      },
    ],
    features: [
      { es: "Sala de 31 m² con 4.5 m de ventanal hacia la terraza", en: "31 m² living room with 4.5 m of glazing onto the terrace" },
      { es: "Recámara de huéspedes con baño completo en planta baja", en: "Ground-floor guest bedroom with full bathroom" },
      { es: "Recámara principal en suite con vestidor en planta alta", en: "Upstairs en-suite main bedroom with walk-in closet" },
      { es: "Tres baños completos y área de lavado en planta alta", en: "Three full bathrooms and an upstairs laundry" },
      { es: "Cocina cerrada opcional", en: "Optional closed kitchen" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart, U.island, U.carport, U.poolCompact],
    sustainability: commonSustainability,
    faq: [
      {
        q: { es: "¿Se puede entregar con la cocina cerrada?", en: "Can it be delivered with a closed kitchen?" },
        a: { es: "Sí. La cocina puede cerrarse con un muro ligero y puerta corrediza sin afectar la estructura.", en: "Yes. The kitchen can be closed with a lightweight wall and sliding door without affecting the structure." },
      },
      {
        q: { es: "¿Cabe en un terreno angosto?", en: "Does it fit a narrow lot?" },
        a: { es: "Sí: al crecer en dos niveles, la huella es de solo 11 × 7 m, por lo que funciona en terrenos de 8 m de frente.", en: "Yes: by growing over two floors, the footprint is only 11 × 7 m, so it works on lots with an 8 m frontage." },
      },
      {
        q: { es: "¿Cómo se transporta una casa de dos niveles?", en: "How is a two-story house transported?" },
        a: { es: "Se fabrica por módulos independientes por nivel; planta alta y planta baja viajan por separado y se ensamblan en sitio con grúa.", en: "It's fabricated as independent modules per floor; the upper and ground floors travel separately and are assembled on site with a crane." },
      },
    ],
    featured: true,
  },
  {
    slug: "villa-200",
    name: "VILLA 200",
    family: "Villa",
    tagline: { es: "Una villa de dos niveles organizada alrededor de su patio.", en: "A two-story villa organized around its courtyard." },
    description: {
      es: "VILLA 200 recupera la tradición de la casa mexicana con patio central en dos niveles: en planta baja, una estancia de 45 m², cocina abierta, estudio, medio baño y el patio de doble altura que ventila e ilumina toda la casa; en planta alta, cuatro recámaras con la principal en suite y dos baños completos más. Pensada para familias grandes en terrenos urbanos con colindancias.",
      en: "VILLA 200 revives the tradition of the Mexican courtyard house over two floors: on the ground floor, a 45 m² living space, open kitchen, study, powder room and a double-height courtyard that ventilates and lights the whole home; upstairs, four bedrooms with the main one en suite and two more full bathrooms. Designed for large families on urban lots with party walls.",
    },
    idealFor: [
      { es: "Vivienda principal", en: "Primary residence" },
      { es: "Familia grande", en: "Large family" },
      { es: "Casa de descanso", en: "Weekend home" },
      { es: "Terrenos urbanos con colindancias", en: "Urban lots with party walls" },
    ],
    areaM2: 200,
    bedrooms: 4,
    bathrooms: 3.5,
    stories: 2,
    dimensions: { width: 14.0, depth: 7.5, height: 7.2 },
    buildWeeks: { min: 18, max: 24 },
    images: [
      { src: "/images/models/villa-200-01.jpg", alt: { es: "VILLA 200 con cubierta volada y jardín al anochecer", en: "VILLA 200 with cantilevered roof and garden at dusk" } },
      { src: "/images/models/villa-200-02.jpg", alt: { es: "Fachada de VILLA 200 bajo un árbol", en: "VILLA 200 facade under a tree" } },
      { src: "/images/models/villa-200-03.jpg", alt: { es: "Sala en madera abierta al patio interior", en: "Timber living room open to the inner courtyard" } },
      { src: "/images/models/villa-200-04.jpg", alt: { es: "Estancia con deck exterior y cocina integrada", en: "Living space with outdoor deck and integrated kitchen" } },
    ],
    floorPlan: [
      {
        name: R.groundFloor,
        width: 14.0,
        depth: 7.5,
        rooms: [
          { name: R.livingDining, x: 0, y: 0, w: 6.0, h: 7.5 },
          { name: R.kitchen, x: 6.0, y: 0, w: 4.0, h: 3.5 },
          { name: R.patio, x: 6.0, y: 3.5, w: 4.0, h: 4.0, open: true },
          { name: R.studyOnly, x: 10.0, y: 0, w: 4.0, h: 3.5 },
          { name: R.halfBath, x: 10.0, y: 3.5, w: 1.8, h: 2.0 },
          { name: R.laundry, x: 11.8, y: 3.5, w: 2.2, h: 2.0 },
          { name: R.stairs, x: 10.0, y: 5.5, w: 1.6, h: 2.0 },
          { name: R.storage, x: 11.6, y: 5.5, w: 2.4, h: 2.0 },
          { name: R.terrace, x: 0, y: 7.5, w: 6.0, h: 3.0, open: true },
        ],
      },
      {
        name: R.upperFloor,
        width: 14.0,
        depth: 7.0,
        rooms: [
          { name: R.master, x: 0, y: 0, w: 5.0, h: 4.2 },
          { name: R.closet, x: 0, y: 4.2, w: 2.5, h: 2.8 },
          { name: R.masterBath, x: 2.5, y: 4.2, w: 2.5, h: 2.8 },
          { name: R.bedroom2, x: 5.0, y: 0, w: 3.2, h: 4.0 },
          { name: R.bedroom3, x: 8.2, y: 0, w: 3.2, h: 4.0 },
          { name: R.bedroom4, x: 11.4, y: 0, w: 2.6, h: 4.0 },
          { name: R.bath2, x: 5.0, y: 4.0, w: 2.2, h: 3.0 },
          { name: R.bath3, x: 7.2, y: 4.0, w: 2.2, h: 3.0 },
          { name: R.hall, x: 9.4, y: 4.0, w: 2.6, h: 3.0 },
          { name: R.stairs, x: 12.0, y: 4.0, w: 2.0, h: 3.0 },
        ],
      },
    ],
    features: [
      { es: "Patio central de 16 m² a doble altura con vegetación", en: "16 m² double-height planted central courtyard" },
      { es: "Estancia de 45 m² con doble frente: jardín y patio", en: "45 m² living space with two fronts: garden and courtyard" },
      { es: "Cuatro recámaras en planta alta, la principal en suite con vestidor", en: "Four upstairs bedrooms, the main one en suite with walk-in closet" },
      { es: "Estudio y medio baño para visitas en planta baja", en: "Ground-floor study and powder room for guests" },
      { es: "Huella de 14 × 7.5 m apta para terrenos con colindancias", en: "14 × 7.5 m footprint suited to lots with party walls" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergolaPatio, U.solar, U.rain, U.grey, U.ac, U.smart, U.pool, U.carport],
    sustainability: [...commonSustainability, { es: "Patio interior que enfría por convección y sombrea la estancia", en: "Inner courtyard that cools by convection and shades the living space" }],
    faq: [
      {
        q: { es: "¿El patio se puede techar?", en: "Can the courtyard be roofed?" },
        a: { es: "Puede cubrirse parcialmente con una pérgola de lamas o un vidrio, manteniendo la ventilación.", en: "It can be partially covered with a louvered pergola or glass while keeping the ventilation." },
      },
      {
        q: { es: "¿Cuántos módulos forman VILLA 200?", en: "How many modules make up VILLA 200?" },
        a: { es: "La casa se fabrica en varios módulos por nivel que se unen en sitio alrededor del patio; el número exacto depende del acceso al terreno y se define en ingeniería.", en: "The house is built as several modules per floor, joined on site around the courtyard; the exact number depends on site access and is defined during engineering." },
      },
      {
        q: { es: "¿Cómo se transporta una casa de dos niveles?", en: "How is a two-story house transported?" },
        a: { es: "Se fabrica por módulos independientes por nivel; planta alta y planta baja viajan por separado y se ensamblan en sitio con grúa.", en: "It's fabricated as independent modules per floor; the upper and ground floors travel separately and are assembled on site with a crane." },
      },
    ],
    featured: true,
  },
  {
    slug: "villa-250",
    name: "VILLA 250",
    family: "Villa",
    tagline: { es: "Dos niveles, cinco recámaras y una terraza sobre el paisaje.", en: "Two stories, five bedrooms and a terrace over the landscape." },
    description: {
      es: "VILLA 250 es nuestra casa más amplia: en planta baja la vida social se abre al jardín con una sala de doble altura, comedor, cocina, medio baño y un estudio que puede ser quinta recámara; en planta alta, cuatro recámaras con la principal en suite, dos baños completos adicionales y una terraza cubierta. Pensada para familias grandes, casas de descanso compartidas o quien recibe visitas con frecuencia.",
      en: "VILLA 250 is our largest home: on the ground floor, social life opens to the garden with a double-height living room, dining room, kitchen, powder room and a study that can become a fifth bedroom; upstairs, four bedrooms with the main one en suite, two additional full bathrooms and a covered terrace. Designed for large families, shared weekend homes or frequent hosts.",
    },
    idealFor: [
      { es: "Familia grande", en: "Large family" },
      { es: "Casa de descanso para varias familias", en: "Weekend home for several families" },
      { es: "Terreno con vistas", en: "Lot with views" },
      { es: "Renta vacacional de alto nivel", en: "High-end vacation rental" },
    ],
    areaM2: 250,
    bedrooms: 5,
    bathrooms: 3.5,
    stories: 2,
    dimensions: { width: 14.0, depth: 9.5, height: 7.0 },
    buildWeeks: { min: 20, max: 28 },
    images: [
      { src: "/images/models/villa-250-01.jpg", alt: { es: "VILLA 250 de dos niveles con terraza y alberca", en: "Two-story VILLA 250 with terrace and pool" } },
      { src: "/images/models/villa-250-02.jpg", alt: { es: "Vista del jardín y la fachada blanca con madera", en: "View of the garden and the white and timber facade" } },
      { src: "/images/models/villa-250-03.jpg", alt: { es: "Estancia de doble altura con escalera y vista a la alberca", en: "Double-height living space with staircase and pool view" } },
      { src: "/images/models/villa-250-04.jpg", alt: { es: "Escalera de madera y acero con iluminación natural", en: "Timber and steel staircase with natural light" } },
    ],
    floorPlan: [
      {
        name: R.groundFloor,
        width: 14.0,
        depth: 9.5,
        rooms: [
          { name: R.living2, x: 0, y: 0, w: 6.0, h: 9.5 },
          { name: R.dining, x: 6.0, y: 0, w: 4.5, h: 4.5 },
          { name: R.kitchen, x: 6.0, y: 4.5, w: 4.5, h: 5.0 },
          { name: R.halfBath, x: 10.5, y: 0, w: 2.0, h: 2.5 },
          { name: R.laundry, x: 10.5, y: 2.5, w: 2.0, h: 2.5 },
          { name: R.stairs, x: 12.5, y: 0, w: 1.5, h: 5.0 },
          { name: R.study5, x: 10.5, y: 5.0, w: 3.5, h: 4.5 },
          { name: R.terrace, x: 0, y: 9.5, w: 10.5, h: 3.0, open: true },
        ],
      },
      {
        name: R.upperFloor,
        width: 14.0,
        depth: 8.5,
        rooms: [
          { name: R.master, x: 0, y: 0, w: 5.0, h: 4.5 },
          { name: R.bedroom2, x: 5.0, y: 0, w: 3.5, h: 4.5 },
          { name: R.bedroom3, x: 8.5, y: 0, w: 3.5, h: 4.5 },
          { name: R.stairs, x: 12.0, y: 0, w: 2.0, h: 4.5 },
          { name: R.closet, x: 0, y: 4.5, w: 2.5, h: 4.0 },
          { name: R.masterBath, x: 2.5, y: 4.5, w: 2.5, h: 4.0 },
          { name: R.bath2, x: 5.0, y: 4.5, w: 2.0, h: 4.0 },
          { name: R.bath3, x: 7.0, y: 4.5, w: 2.0, h: 4.0 },
          { name: R.hall, x: 9.0, y: 4.5, w: 1.5, h: 4.0 },
          { name: R.bedroom4, x: 10.5, y: 4.5, w: 3.5, h: 4.0 },
          { name: R.coveredTerrace, x: 14.0, y: 0, w: 3.0, h: 4.5, open: true },
        ],
      },
    ],
    features: [
      { es: "Sala de doble altura con ventanal de 9.5 m", en: "Double-height living room with 9.5 m of glazing" },
      { es: "Recámara principal en suite con vestidor", en: "En-suite main bedroom with walk-in closet" },
      { es: "Estudio en planta baja convertible en quinta recámara", en: "Ground-floor study convertible into a fifth bedroom" },
      { es: "Dos baños completos adicionales en planta alta", en: "Two additional full bathrooms upstairs" },
      { es: "Terraza cubierta en planta alta", en: "Covered terrace on the upper floor" },
    ],
    includedFinishes: commonIncluded,
    upgrades: [U.deck, U.pergola, U.solar, U.rain, U.grey, U.ac, U.smart, U.pool, U.lift, U.carport],
    sustainability: [...commonSustainability, { es: "Terraza cubierta que sombrea el ventanal de planta baja", en: "Covered terrace that shades the ground-floor glazing" }],
    faq: [
      {
        q: { es: "¿Cómo se transporta una casa de dos niveles?", en: "How is a two-story house transported?" },
        a: { es: "Se fabrica por módulos independientes por nivel; planta alta y planta baja viajan por separado y se ensamblan en sitio con grúa.", en: "It's fabricated as independent modules per floor; the upper and ground floors travel separately and are assembled on site with a crane." },
      },
      {
        q: { es: "¿Se puede entregar con elevador?", en: "Can it be delivered with a lift?" },
        a: { es: "Sí. El hueco del elevador residencial se prevé junto a la escalera desde la etapa de ingeniería.", en: "Yes. The residential lift shaft is planned next to the stairs from the engineering stage." },
      },
    ],
    featured: true,
  },

];

export const getModelBySlug = (slug: string) => models.find((m) => m.slug === slug);
export const featuredModels = models.filter((m) => m.featured);
