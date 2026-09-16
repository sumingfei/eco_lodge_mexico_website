/**
 * Home models catalogue.
 * Add, remove or edit models here — cards, filters, detail pages, sitemap and
 * structured data are all generated from this array.
 *
 * Prices are derived from /data/pricing.ts (area × price per m² of the
 * starting finish) unless `priceFromOverride` is set.
 *
 * TODO: replace placeholder renders in /public/images/models with real renders
 * or photography for each model, keeping the same file names.
 */

export type ModelFamily = "Nido" | "Casa" | "Patio";

export type Room = {
  name: string;
  /** Position and size in metres, relative to the floor’s top-left corner. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Open-air areas (patios, terraces) are drawn hatched and excluded from interior area. */
  open?: boolean;
};

export type Floor = {
  name: string;
  width: number;
  depth: number;
  rooms: Room[];
};

export type ModelImage = { src: string; alt: string };

export type HomeModel = {
  slug: string;
  name: string;
  family: ModelFamily;
  tagline: string;
  description: string;
  idealFor: string[];
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
  features: string[];
  includedFinishes: string[];
  upgrades: string[];
  sustainability: string[];
  faq: { q: string; a: string }[];
  featured?: boolean;
};

const commonIncluded = [
  "Estructura de acero galvanizado y paneles estructurales fabricados en planta",
  "Aislamiento térmico en muros, losa y cubierta",
  "Cancelería de aluminio con doble vidrio",
  "Instalaciones eléctricas, hidráulicas y sanitarias listas para conexión",
  "Muebles de baño y grifería ahorradora de agua",
  "Iluminación LED en todos los espacios",
  "Cocina con cubierta, tarja y muebles bajos y altos",
  "Puertas interiores, clósets y pintura",
  "Preparación para paneles solares",
];

const commonSustainability = [
  "Envolvente térmica con aislamiento continuo",
  "Ventilación cruzada con ventanas enfrentadas",
  "Aleros y volados calculados para sombrear el vidrio en verano",
  "Preparación eléctrica para sistema fotovoltaico",
  "Bajantes pluviales listas para conectar a captación",
  "Grifería y sanitarios de bajo consumo",
];

export const models: HomeModel[] = [
  {
    slug: "nido-45",
    name: "NIDO 45",
    family: "Nido",
    tagline: "Un refugio compacto con una gran terraza.",
    description:
      "NIDO 45 concentra lo esencial en un solo volumen: una estancia con cocina integrada que se abre por completo a la terraza, una recámara con vista y un baño completo. Es la casa ideal para un terreno pequeño, una casa de descanso o una unidad de renta.",
    idealFor: ["Casa de descanso", "Airbnb / renta", "Primera vivienda", "Casa de huéspedes"],
    areaM2: 45,
    bedrooms: 1,
    bathrooms: 1,
    stories: 1,
    dimensions: { width: 9.0, depth: 5.0, height: 3.4 },
    buildWeeks: { min: 10, max: 14 },
    images: [
      { src: "/images/models/nido-45-01.jpg", alt: "Fachada de NIDO 45 con recubrimiento de madera al atardecer" },
      { src: "/images/models/nido-45-02.jpg", alt: "Recámara de NIDO 45 abierta a la terraza" },
      { src: "/images/models/nido-45-03.jpg", alt: "Recámara con ventana de piso a techo" },
      { src: "/images/models/nido-45-04.jpg", alt: "Cocina integrada con acabados en madera" },
    ],
    floorPlan: [
      {
        name: "Planta única",
        width: 9.0,
        depth: 5.0,
        rooms: [
          { name: "Estancia · Cocina", x: 0, y: 0, w: 4.8, h: 5.0 },
          { name: "Recámara", x: 4.8, y: 0, w: 4.2, h: 3.4 },
          { name: "Baño", x: 4.8, y: 3.4, w: 2.0, h: 1.6 },
          { name: "Lavado", x: 6.8, y: 3.4, w: 2.2, h: 1.6 },
          { name: "Terraza", x: 0, y: 5.0, w: 4.8, h: 2.2, open: true },
        ],
      },
    ],
    features: [
      "Estancia con altura libre de 2.9 m",
      "Ventanal corredizo de 4.8 m hacia la terraza",
      "Recámara con clóset integrado",
      "Cubierta con pendiente ligera y canalón oculto",
    ],
    includedFinishes: commonIncluded,
    upgrades: ["Terraza con deck de madera", "Pérgola de acero y madera", "Paneles solares", "Captación pluvial", "Aire acondicionado mini split", "Cocina con isla"],
    sustainability: commonSustainability,
    faq: [
      { q: "¿Puedo poner dos NIDO 45 en un mismo terreno?", a: "Sí. Es una configuración común para renta vacacional. El equipo revisa la normativa local de densidad y las separaciones mínimas del terreno." },
      { q: "¿Se puede ampliar después?", a: "El módulo está pensado para crecer: la terraza puede cerrarse o puede adosarse un módulo adicional de recámara con conexión por pasillo." },
    ],
    featured: true,
  },
  {
    slug: "nido-65",
    name: "NIDO 65",
    family: "Nido",
    tagline: "Dos recámaras, un solo gesto de luz.",
    description:
      "NIDO 65 amplía el módulo compacto con una segunda recámara sin perder la relación directa entre estancia y exterior. La cocina lineal, el área de lavado y un baño completo resuelven el día a día de una pareja o una familia pequeña.",
    idealFor: ["Primera vivienda", "Casa de fin de semana", "Renta a largo plazo"],
    areaM2: 65,
    bedrooms: 2,
    bathrooms: 1,
    stories: 1,
    dimensions: { width: 10.8, depth: 6.0, height: 3.4 },
    buildWeeks: { min: 11, max: 15 },
    images: [
      { src: "/images/models/nido-65-01.jpg", alt: "NIDO 65 con muro de madera y patio de acceso al anochecer" },
      { src: "/images/models/nido-65-02.jpg", alt: "Sala con muro de vidrio hacia el jardín" },
      { src: "/images/models/nido-65-03.jpg", alt: "Cocina con barra y acabados blancos y madera" },
      { src: "/images/models/nido-65-04.jpg", alt: "Baño con lavabo doble y ventana al exterior" },
    ],
    floorPlan: [
      {
        name: "Planta única",
        width: 10.8,
        depth: 6.0,
        rooms: [
          { name: "Estancia · Comedor · Cocina", x: 0, y: 0, w: 5.2, h: 6.0 },
          { name: "Recámara 1", x: 5.2, y: 0, w: 2.8, h: 3.6 },
          { name: "Recámara 2", x: 8.0, y: 0, w: 2.8, h: 3.6 },
          { name: "Baño", x: 5.2, y: 3.6, w: 2.2, h: 2.4 },
          { name: "Lavado · Clóset", x: 7.4, y: 3.6, w: 3.4, h: 2.4 },
          { name: "Terraza", x: 0, y: 6.0, w: 5.2, h: 2.4, open: true },
        ],
      },
    ],
    features: [
      "Muro de vidrio de 5.2 m en la estancia",
      "Recámaras con ventanas enfrentadas para ventilación cruzada",
      "Área de lavado independiente",
      "Fachada ventilada en madera o metal",
    ],
    includedFinishes: commonIncluded,
    upgrades: ["Deck exterior", "Pérgola", "Paneles solares", "Captación pluvial", "Reúso de aguas grises", "Aire acondicionado", "Casa inteligente"],
    sustainability: commonSustainability,
    faq: [
      { q: "¿Las recámaras se pueden unir en una sola?", a: "Sí. El muro divisorio no es estructural, por lo que puede omitirse desde fábrica para crear una recámara principal con vestidor." },
    ],
    featured: true,
  },
  {
    slug: "casa-85",
    name: "CASA 85",
    family: "Casa",
    tagline: "La casa familiar en su expresión más clara.",
    description:
      "CASA 85 organiza dos recámaras, dos baños completos y una estancia generosa alrededor de un eje de luz. La cocina se separa ligeramente de la sala sin cerrarse, y la recámara principal tiene baño propio. Es nuestro modelo más solicitado para vivienda principal.",
    idealFor: ["Vivienda principal", "Familia joven", "Casa de campo"],
    areaM2: 85,
    bedrooms: 2,
    bathrooms: 2,
    stories: 1,
    dimensions: { width: 12.0, depth: 7.1, height: 3.6 },
    buildWeeks: { min: 12, max: 16 },
    images: [
      { src: "/images/models/casa-85-01.jpg", alt: "CASA 85 con fachada de vidrio y madera bajo un árbol" },
      { src: "/images/models/casa-85-02.jpg", alt: "Sala con muro de madera y vista al jardín" },
      { src: "/images/models/casa-85-03.jpg", alt: "Comedor con puertas corredizas de piso a techo" },
      { src: "/images/models/casa-85-04.jpg", alt: "Estancia luminosa con doble altura parcial" },
    ],
    floorPlan: [
      {
        name: "Planta única",
        width: 12.0,
        depth: 7.1,
        rooms: [
          { name: "Cocina", x: 0, y: 0, w: 5.6, h: 2.6 },
          { name: "Sala · Comedor", x: 0, y: 2.6, w: 5.6, h: 4.5 },
          { name: "Recámara principal", x: 5.6, y: 0, w: 3.6, h: 4.0 },
          { name: "Baño principal", x: 5.6, y: 4.0, w: 2.0, h: 3.1 },
          { name: "Lavado", x: 7.6, y: 4.0, w: 1.6, h: 3.1 },
          { name: "Recámara 2", x: 9.2, y: 0, w: 2.8, h: 4.0 },
          { name: "Baño 2", x: 9.2, y: 4.0, w: 2.8, h: 3.1 },
          { name: "Terraza", x: 0, y: 7.1, w: 5.6, h: 2.6, open: true },
        ],
      },
    ],
    features: [
      "Recámara principal con baño y clóset vestidor",
      "Cocina con barra hacia el comedor",
      "Altura libre de 3.0 m en estancia",
      "Alero corrido de 1.2 m sobre la terraza",
    ],
    includedFinishes: commonIncluded,
    upgrades: ["Deck exterior", "Pérgola", "Paneles solares", "Captación pluvial", "Reúso de aguas grises", "Aire acondicionado", "Casa inteligente", "Cocina con isla"],
    sustainability: commonSustainability,
    faq: [
      { q: "¿Puedo convertir la Recámara 2 en estudio?", a: "Sí. Puede entregarse sin clóset y con un ventanal adicional para usarla como estudio o consultorio." },
      { q: "¿Se puede agregar una tercera recámara?", a: "CASA 110 es la versión de tres recámaras del mismo esquema. También puede adosarse un módulo posterior a CASA 85." },
    ],
    featured: true,
  },
  {
    slug: "casa-110",
    name: "CASA 110",
    family: "Casa",
    tagline: "Tres recámaras y una estancia que se extiende al jardín.",
    description:
      "CASA 110 está pensada para una familia que quiere espacio sin complicaciones: tres recámaras, dos baños, cocina con área de lavado y una sala-comedor con más de seis metros de frente al jardín. El volumen se puede girar para orientar las recámaras al norte.",
    idealFor: ["Vivienda principal", "Familia con hijos", "Casa de campo"],
    areaM2: 110,
    bedrooms: 3,
    bathrooms: 2,
    stories: 1,
    dimensions: { width: 14.0, depth: 7.9, height: 3.6 },
    buildWeeks: { min: 13, max: 18 },
    images: [
      { src: "/images/models/casa-110-01.jpg", alt: "CASA 110 con fachada blanca y volumen en terracota" },
      { src: "/images/models/casa-110-02.jpg", alt: "Vista frontal de CASA 110 con acceso y cochera" },
      { src: "/images/models/casa-110-03.jpg", alt: "Sala con muro de madera y cocina integrada" },
      { src: "/images/models/casa-110-04.jpg", alt: "Estancia con puertas de vidrio abiertas hacia la terraza" },
    ],
    floorPlan: [
      {
        name: "Planta única",
        width: 14.0,
        depth: 7.9,
        rooms: [
          { name: "Cocina", x: 0, y: 0, w: 4.6, h: 3.0 },
          { name: "Lavado", x: 4.6, y: 0, w: 1.6, h: 3.0 },
          { name: "Sala · Comedor", x: 0, y: 3.0, w: 6.2, h: 4.9 },
          { name: "Recámara principal", x: 6.2, y: 0, w: 4.0, h: 4.2 },
          { name: "Baño principal", x: 6.2, y: 4.2, w: 2.0, h: 3.7 },
          { name: "Baño 2", x: 8.2, y: 4.2, w: 2.0, h: 3.7 },
          { name: "Recámara 2", x: 10.2, y: 0, w: 3.8, h: 3.9 },
          { name: "Recámara 3", x: 10.2, y: 3.9, w: 3.8, h: 4.0 },
          { name: "Terraza", x: 0, y: 7.9, w: 6.2, h: 2.8, open: true },
        ],
      },
    ],
    features: [
      "Sala-comedor con 6.2 m de ventanal hacia el jardín",
      "Recámara principal con baño propio",
      "Cocina cerrada opcional",
      "Cubierta preparada para 12 paneles solares",
    ],
    includedFinishes: commonIncluded,
    upgrades: ["Deck exterior", "Pérgola", "Paneles solares", "Captación pluvial", "Reúso de aguas grises", "Aire acondicionado", "Casa inteligente", "Cochera techada"],
    sustainability: commonSustainability,
    faq: [
      { q: "¿Se puede entregar con la cocina cerrada?", a: "Sí. La cocina puede cerrarse con un muro ligero y puerta corrediza sin afectar la estructura." },
    ],
    featured: true,
  },
  {
    slug: "patio-140",
    name: "PATIO 140",
    family: "Patio",
    tagline: "Una casa organizada alrededor de su patio.",
    description:
      "PATIO 140 recupera la tradición de la casa mexicana con patio central: todos los espacios miran hacia un jardín interior protegido que ventila e ilumina la casa. Tres recámaras, dos baños y medio, cocina abierta y una estancia de doble frente.",
    idealFor: ["Vivienda principal", "Terrenos urbanos con colindancias", "Casa de descanso"],
    areaM2: 140,
    bedrooms: 3,
    bathrooms: 2.5,
    stories: 1,
    dimensions: { width: 16.0, depth: 9.0, height: 3.8 },
    buildWeeks: { min: 14, max: 20 },
    images: [
      { src: "/images/models/patio-140-01.jpg", alt: "PATIO 140 con cubierta volada y jardín al anochecer" },
      { src: "/images/models/patio-140-02.jpg", alt: "Fachada de PATIO 140 bajo un árbol" },
      { src: "/images/models/patio-140-03.jpg", alt: "Sala en madera abierta al patio interior" },
      { src: "/images/models/patio-140-04.jpg", alt: "Estancia con deck exterior y cocina integrada" },
    ],
    floorPlan: [
      {
        name: "Planta única",
        width: 16.0,
        depth: 9.0,
        rooms: [
          { name: "Sala · Comedor", x: 0, y: 0, w: 5.4, h: 9.0 },
          { name: "Cocina", x: 5.4, y: 0, w: 4.2, h: 3.0 },
          { name: "Patio", x: 5.4, y: 3.0, w: 4.2, h: 3.6, open: true },
          { name: "Pasillo", x: 5.4, y: 6.6, w: 4.2, h: 2.4 },
          { name: "Recámara principal", x: 9.6, y: 0, w: 3.8, h: 4.4 },
          { name: "Recámara 2", x: 13.4, y: 0, w: 2.6, h: 4.4 },
          { name: "Baño principal", x: 9.6, y: 4.4, w: 2.0, h: 2.2 },
          { name: "Medio baño", x: 9.6, y: 6.6, w: 2.0, h: 2.4 },
          { name: "Baño 2", x: 11.6, y: 4.4, w: 1.8, h: 4.6 },
          { name: "Recámara 3", x: 13.4, y: 4.4, w: 2.6, h: 4.6 },
        ],
      },
    ],
    features: [
      "Patio central de 15 m² con vegetación",
      "Estancia con doble frente: jardín y patio",
      "Medio baño para visitas",
      "Cubierta a un agua con alero de 1.5 m",
    ],
    includedFinishes: commonIncluded,
    upgrades: ["Deck exterior", "Pérgola sobre patio", "Paneles solares", "Captación pluvial", "Reúso de aguas grises", "Aire acondicionado", "Casa inteligente", "Alberca compacta"],
    sustainability: [...commonSustainability, "Patio interior que enfría por convección y sombrea la estancia"],
    faq: [
      { q: "¿El patio se puede techar?", a: "Puede cubrirse parcialmente con una pérgola de lamas o un vidrio, manteniendo la ventilación." },
    ],
    featured: true,
  },
  {
    slug: "patio-180",
    name: "PATIO 180",
    family: "Patio",
    tagline: "Dos niveles, cuatro recámaras y una terraza sobre el paisaje.",
    description:
      "PATIO 180 es nuestra casa de dos niveles: en planta baja la vida social se abre al jardín con sala, comedor, cocina y un estudio que puede ser cuarta recámara; en planta alta, tres recámaras con la principal en suite y una terraza cubierta. Pensada para familias grandes o para quien recibe visitas con frecuencia.",
    idealFor: ["Familia grande", "Casa de descanso para varias familias", "Terreno con vistas"],
    areaM2: 180,
    bedrooms: 4,
    bathrooms: 3,
    stories: 2,
    dimensions: { width: 12.0, depth: 8.0, height: 6.8 },
    buildWeeks: { min: 16, max: 22 },
    images: [
      { src: "/images/models/patio-180-01.jpg", alt: "PATIO 180 de dos niveles con terraza y alberca" },
      { src: "/images/models/patio-180-02.jpg", alt: "Vista del jardín y la fachada blanca con madera" },
      { src: "/images/models/patio-180-03.jpg", alt: "Estancia de doble altura con escalera y vista a la alberca" },
      { src: "/images/models/patio-180-04.jpg", alt: "Escalera de madera y acero con iluminación natural" },
    ],
    floorPlan: [
      {
        name: "Planta baja",
        width: 12.0,
        depth: 8.0,
        rooms: [
          { name: "Sala", x: 0, y: 0, w: 5.0, h: 8.0 },
          { name: "Comedor", x: 5.0, y: 0, w: 4.0, h: 4.0 },
          { name: "Cocina", x: 5.0, y: 4.0, w: 4.0, h: 4.0 },
          { name: "Medio baño", x: 9.0, y: 0, w: 1.6, h: 2.2 },
          { name: "Lavado", x: 9.0, y: 2.2, w: 1.6, h: 2.0 },
          { name: "Estudio · Recámara 4", x: 9.0, y: 4.2, w: 3.0, h: 3.8 },
          { name: "Escalera", x: 10.6, y: 0, w: 1.4, h: 4.2 },
          { name: "Terraza", x: 0, y: 8.0, w: 9.0, h: 3.0, open: true },
        ],
      },
      {
        name: "Planta alta",
        width: 12.0,
        depth: 7.0,
        rooms: [
          { name: "Recámara principal", x: 0, y: 0, w: 5.0, h: 4.5 },
          { name: "Vestidor", x: 0, y: 4.5, w: 2.5, h: 2.5 },
          { name: "Baño principal", x: 2.5, y: 4.5, w: 2.5, h: 2.5 },
          { name: "Recámara 2", x: 5.0, y: 0, w: 3.5, h: 4.0 },
          { name: "Recámara 3", x: 8.5, y: 0, w: 3.5, h: 4.0 },
          { name: "Baño 2", x: 5.0, y: 4.0, w: 2.5, h: 3.0 },
          { name: "Pasillo", x: 7.5, y: 4.0, w: 3.1, h: 3.0 },
          { name: "Escalera", x: 10.6, y: 4.0, w: 1.4, h: 3.0 },
          { name: "Terraza cubierta", x: 12.0, y: 0, w: 3.0, h: 4.0, open: true },
        ],
      },
    ],
    features: [
      "Sala de doble altura con ventanal de 8 m",
      "Recámara principal en suite con vestidor",
      "Estudio en planta baja convertible en recámara",
      "Terraza cubierta en planta alta",
    ],
    includedFinishes: commonIncluded,
    upgrades: ["Deck exterior", "Pérgola", "Paneles solares", "Captación pluvial", "Reúso de aguas grises", "Aire acondicionado", "Casa inteligente", "Alberca", "Elevador residencial"],
    sustainability: [...commonSustainability, "Terraza cubierta que sombrea el ventanal de planta baja"],
    faq: [
      { q: "¿Cómo se transporta una casa de dos niveles?", a: "Se fabrica por módulos independientes por nivel; planta alta y planta baja viajan por separado y se ensamblan en sitio con grúa." },
    ],
    featured: true,
  },
];

export const getModelBySlug = (slug: string) => models.find((m) => m.slug === slug);
export const featuredModels = models.filter((m) => m.featured);
