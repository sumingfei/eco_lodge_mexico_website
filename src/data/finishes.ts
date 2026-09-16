/**
 * Facade and interior options for the design/customization page.
 * `swatch` is a CSS color or gradient used for the selector; `image` is a
 * representative photo. Replace images with real material photography.
 */
import type { L } from "@/i18n/config";

const W = (es: string, en: string): L => ({ es, en });

export type FacadeOption = {
  id: "madera" | "metal" | "estuco" | "concreto" | "piedra";
  name: L;
  text: L;
  swatch: string;
  image: string;
  bestFor: L[];
};

const landscapes = {
  forest: W("Bosque", "Forest"),
  country: W("Campo", "Countryside"),
  coastUV: W("Costa (con protección UV)", "Coast (with UV protection)"),
  desert: W("Desierto", "Desert"),
  city: W("Ciudad", "City"),
};

export const facadeOptions: FacadeOption[] = [
  {
    id: "madera",
    name: W("Madera", "Timber"),
    text: W("Duelas de madera termotratada en fachada ventilada. Calidez y envejecimiento noble.", "Heat-treated timber boards on a ventilated facade. Warmth and graceful ageing."),
    swatch: "linear-gradient(90deg,#a97a50 0 14%,#b98a5e 14% 28%,#9c6f47 28% 42%,#b5865b 42% 56%,#a3754c 56% 70%,#bd8e63 70% 84%,#a0724a 84%)",
    image: "/images/sections/fachada-madera.jpg",
    bestFor: [landscapes.forest, landscapes.country, landscapes.coastUV],
  },
  {
    id: "metal",
    name: W("Metal", "Metal"),
    text: W("Lámina acanalada o perforada en acero prepintado. Ligera, precisa y de mantenimiento mínimo.", "Corrugated or perforated pre-painted steel sheet. Light, precise and minimal maintenance."),
    swatch: "repeating-linear-gradient(90deg,#3b3733 0 6px,#4a4541 6px 12px)",
    image: "/images/sections/fachada-metal.jpg",
    bestFor: [landscapes.desert, landscapes.city, landscapes.country],
  },
  {
    id: "estuco",
    name: W("Estuco", "Stucco"),
    text: W("Aplanado mineral en tonos limestone, arena o terracota. La textura de la arquitectura mexicana.", "Mineral render in limestone, sand or terracotta tones. The texture of Mexican architecture."),
    swatch: "#e3d5bd",
    image: "/images/sections/fachada-estuco.jpg",
    bestFor: [landscapes.city, landscapes.desert, landscapes.country],
  },
  {
    id: "concreto",
    name: W("Apariencia de concreto", "Concrete look"),
    text: W("Paneles de fibrocemento de gran formato con textura de concreto aparente, sin el peso del colado en sitio.", "Large-format fiber-cement panels with an exposed-concrete texture, without the weight of pouring on site."),
    swatch: "linear-gradient(135deg,#8b8378,#a29a8f)",
    image: "/images/sections/fachada-concreto.jpg",
    bestFor: [landscapes.city, landscapes.forest],
  },
  {
    id: "piedra",
    name: W("Piedra", "Stone"),
    text: W("Chapa de piedra regional (cantera, laja o basalto) en zócalos y muros de acento.", "Regional stone veneer (cantera, flagstone or basalt) on plinths and accent walls."),
    swatch: "linear-gradient(45deg,#6b6157 0 25%,#8a7e72 25% 50%,#5e554c 50% 75%,#7c7166 75%)",
    image: "/images/sections/fachada-piedra.jpg",
    bestFor: [landscapes.country, landscapes.forest, landscapes.desert],
  },
];

export type InteriorOption = {
  id: "minimal" | "calido" | "natural" | "contemporaneo";
  name: L;
  text: L;
  palette: string[];
  materials: L[];
  images: string[];
};

export const interiorOptions: InteriorOption[] = [
  {
    id: "minimal",
    name: W("Minimal", "Minimal"),
    text: W("Blancos cálidos, concreto pulido y carpintería sin jaladeras. Luz y silencio.", "Warm whites, polished concrete and handleless joinery. Light and silence."),
    palette: ["#f4efe6", "#d9d4cb", "#8b8378", "#2a2724"],
    materials: [W("Concreto pulido", "Polished concrete"), W("Laca blanca mate", "Matte white lacquer"), W("Acero negro", "Black steel"), W("Vidrio claro", "Clear glass")],
    images: ["/images/interiors/minimal-01.jpg", "/images/interiors/minimal-02.jpg"],
  },
  {
    id: "calido",
    name: W("Cálido", "Warm"),
    text: W("Maderas miel, textiles en arena y terracota, iluminación indirecta. La casa que abraza.", "Honey-toned woods, sand and terracotta textiles, indirect lighting. The house that embraces you."),
    palette: ["#e3d5bd", "#a97a50", "#b5573a", "#3b3733"],
    materials: [W("Madera de encino", "Oak"), W("Porcelanato arena", "Sand porcelain tile"), W("Latón cepillado", "Brushed brass"), W("Lino", "Linen")],
    images: ["/images/interiors/calido-01.jpg", "/images/interiors/calido-02.jpg"],
  },
  {
    id: "natural",
    name: W("Natural", "Natural"),
    text: W("Tonos tierra, fibras naturales, piedra y verde agave. Materiales que se sienten.", "Earth tones, natural fibers, stone and agave green. Materials you can feel."),
    palette: ["#ece4d6", "#c0a97f", "#55604a", "#8c6340"],
    materials: [W("Piedra caliza", "Limestone"), W("Madera de parota", "Parota wood"), W("Fibras tejidas", "Woven fibers"), W("Barro", "Clay")],
    images: ["/images/interiors/natural-01.jpg", "/images/interiors/natural-02.jpg"],
  },
  {
    id: "contemporaneo",
    name: W("Contemporáneo", "Contemporary"),
    text: W("Contrastes marcados, superficies de gran formato y detalles en negro. Precisión y carácter.", "Strong contrasts, large-format surfaces and black details. Precision and character."),
    palette: ["#faf7f1", "#1a1816", "#a97a50", "#55604a"],
    materials: [W("Porcelanato gran formato", "Large-format porcelain"), W("Madera de nogal", "Walnut"), W("Cuarzo", "Quartz"), W("Aluminio negro", "Black aluminum")],
    images: ["/images/interiors/contemporaneo-01.jpg", "/images/interiors/contemporaneo-02.jpg"],
  },
];
