/**
 * Facade and interior options for the design/customization page.
 * `swatch` is a CSS color or gradient used for the selector; `image` is a
 * representative photo. Replace images with real material photography.
 */

export type FacadeOption = {
  id: "madera" | "metal" | "estuco" | "concreto" | "piedra";
  name: string;
  text: string;
  swatch: string;
  image: string;
  bestFor: string[];
};

export const facadeOptions: FacadeOption[] = [
  {
    id: "madera",
    name: "Madera",
    text: "Duelas de madera termotratada en fachada ventilada. Calidez y envejecimiento noble.",
    swatch: "linear-gradient(90deg,#a97a50 0 14%,#b98a5e 14% 28%,#9c6f47 28% 42%,#b5865b 42% 56%,#a3754c 56% 70%,#bd8e63 70% 84%,#a0724a 84%)",
    image: "/images/sections/fachada-madera.jpg",
    bestFor: ["Bosque", "Campo", "Costa (con protección UV)"],
  },
  {
    id: "metal",
    name: "Metal",
    text: "Lámina acanalada o perforada en acero prepintado. Ligera, precisa y de mantenimiento mínimo.",
    swatch: "repeating-linear-gradient(90deg,#3b3733 0 6px,#4a4541 6px 12px)",
    image: "/images/sections/fachada-metal.jpg",
    bestFor: ["Desierto", "Ciudad", "Campo"],
  },
  {
    id: "estuco",
    name: "Estuco",
    text: "Aplanado mineral en tonos limestone, arena o terracota. La textura de la arquitectura mexicana.",
    swatch: "#e3d5bd",
    image: "/images/sections/fachada-estuco.jpg",
    bestFor: ["Ciudad", "Desierto", "Campo"],
  },
  {
    id: "concreto",
    name: "Apariencia de concreto",
    text: "Paneles de fibrocemento de gran formato con textura de concreto aparente, sin el peso del colado en sitio.",
    swatch: "linear-gradient(135deg,#8b8378,#a29a8f)",
    image: "/images/sections/fachada-concreto.jpg",
    bestFor: ["Ciudad", "Bosque"],
  },
  {
    id: "piedra",
    name: "Piedra",
    text: "Chapa de piedra regional (cantera, laja o basalto) en zócalos y muros de acento.",
    swatch: "linear-gradient(45deg,#6b6157 0 25%,#8a7e72 25% 50%,#5e554c 50% 75%,#7c7166 75%)",
    image: "/images/sections/fachada-piedra.jpg",
    bestFor: ["Campo", "Bosque", "Desierto"],
  },
];

export type InteriorOption = {
  id: "minimal" | "calido" | "natural" | "contemporaneo";
  name: string;
  text: string;
  palette: string[];
  materials: string[];
  images: string[];
};

export const interiorOptions: InteriorOption[] = [
  {
    id: "minimal",
    name: "Minimal",
    text: "Blancos cálidos, concreto pulido y carpintería sin jaladeras. Luz y silencio.",
    palette: ["#f4efe6", "#d9d4cb", "#8b8378", "#2a2724"],
    materials: ["Concreto pulido", "Laca blanca mate", "Acero negro", "Vidrio claro"],
    images: ["/images/interiors/minimal-01.jpg", "/images/interiors/minimal-02.jpg"],
  },
  {
    id: "calido",
    name: "Cálido",
    text: "Maderas miel, textiles en arena y terracota, iluminación indirecta. La casa que abraza.",
    palette: ["#e3d5bd", "#a97a50", "#b5573a", "#3b3733"],
    materials: ["Madera de encino", "Porcelanato arena", "Latón cepillado", "Lino"],
    images: ["/images/interiors/calido-01.jpg", "/images/interiors/calido-02.jpg"],
  },
  {
    id: "natural",
    name: "Natural",
    text: "Tonos tierra, fibras naturales, piedra y verde agave. Materiales que se sienten.",
    palette: ["#ece4d6", "#c0a97f", "#55604a", "#8c6340"],
    materials: ["Piedra caliza", "Madera de parota", "Fibras tejidas", "Barro"],
    images: ["/images/interiors/natural-01.jpg", "/images/interiors/natural-02.jpg"],
  },
  {
    id: "contemporaneo",
    name: "Contemporáneo",
    text: "Contrastes marcados, superficies de gran formato y detalles en negro. Precisión y carácter.",
    palette: ["#faf7f1", "#1a1816", "#a97a50", "#55604a"],
    materials: ["Porcelanato gran formato", "Madera de nogal", "Cuarzo", "Aluminio negro"],
    images: ["/images/interiors/contemporaneo-01.jpg", "/images/interiors/contemporaneo-02.jpg"],
  },
];
