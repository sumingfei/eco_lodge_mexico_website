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

export type ModelFamily = "Casa";

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
  livingDining: { es: "Sala · Comedor", en: "Living · Dining" },
  living2: { es: "Sala", en: "Living room" },
  dining: { es: "Comedor", en: "Dining" },
  kitchen: { es: "Cocina", en: "Kitchen" },
  bedroom1: { es: "Recámara 1", en: "Bedroom 1" },
  bedroom2: { es: "Recámara 2", en: "Bedroom 2" },
  bedroom3: { es: "Recámara 3", en: "Bedroom 3" },
  master: { es: "Recámara principal", en: "Main bedroom" },
  bath: { es: "Baño", en: "Bathroom" },
  bath2: { es: "Baño 2", en: "Bathroom 2" },
  laundry: { es: "Lavado", en: "Laundry" },
  closet: { es: "Vestidor", en: "Walk-in closet" },
  hall: { es: "Pasillo", en: "Hallway" },
  stairs: { es: "Escalera", en: "Stairs" },
  studyOnly: { es: "Estudio", en: "Study" },
  porch: { es: "Pórtico", en: "Porch" },
  entry: { es: "Acceso", en: "Entry" },
  storage: { es: "Bodega", en: "Storage" },
  roofTerrace: { es: "Terraza sobre planta baja", en: "Roof terrace" },
  bath1: { es: "Baño 1", en: "Bathroom 1" },
  singleFloor: { es: "Planta única", en: "Single floor" },
  groundFloor: { es: "Planta baja", en: "Ground floor" },
  upperFloor: { es: "Planta alta", en: "Upper floor" },
} satisfies Record<string, L>;

const U = {
  pergola: { es: "Pérgola", en: "Pergola" },
  solar: { es: "Paneles solares", en: "Solar panels" },
  rain: { es: "Captación pluvial", en: "Rainwater harvesting" },
  grey: { es: "Reúso de aguas grises", en: "Greywater reuse" },
  ac: { es: "Aire acondicionado", en: "Air conditioning" },
  smart: { es: "Casa inteligente", en: "Smart home" },
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

];

export const getModelBySlug = (slug: string) => models.find((m) => m.slug === slug);
export const featuredModels = models.filter((m) => m.featured);
