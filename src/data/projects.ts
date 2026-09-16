/**
 * Project gallery.
 * `status: "concept"` marks renders/concept studies; `"built"` marks real projects.
 * The UI labels concepts explicitly so no delivered project is implied.
 *
 * TODO: replace with real projects and photography as they are completed.
 */
import type { L } from "@/i18n/config";

const W = (es: string, en: string): L => ({ es, en });

export type ProjectRegion = "Desierto" | "Costa" | "Bosque" | "Ciudad" | "Campo";

export const projectRegions: ProjectRegion[] = ["Desierto", "Costa", "Bosque", "Ciudad", "Campo"];

export const projectRegionLabels: Record<ProjectRegion, L> = {
  Desierto: W("Desierto", "Desert"),
  Costa: W("Costa", "Coast"),
  Bosque: W("Bosque", "Forest"),
  Ciudad: W("Ciudad", "City"),
  Campo: W("Campo", "Countryside"),
};

export type Project = {
  slug: string;
  title: L;
  region: ProjectRegion;
  location: string;
  /** Model slug (links to /modelos/[slug]). */
  model: string;
  modelName: string;
  areaM2: number;
  image: string;
  alt: L;
  status: "concept" | "built";
  size?: "large" | "tall" | "wide";
};

export const projects: Project[] = [
  { slug: "casa-en-el-valle", title: W("Casa en el valle", "House in the valley"), region: "Campo", location: "Valle de Guadalupe, Baja California", model: "patio-140", modelName: "PATIO 140", areaM2: 140, image: "/images/projects/campo-02.jpg", alt: W("Casa con patio y recubrimiento de madera en un valle", "House with courtyard and timber cladding in a valley"), status: "concept", size: "large" },
  { slug: "refugio-de-arena", title: W("Refugio de arena", "Sand refuge"), region: "Desierto", location: "San Miguel de Allende, Guanajuato", model: "casa-85", modelName: "CASA 85", areaM2: 85, image: "/images/projects/desierto-01.jpg", alt: W("Casa blanca con volumen terracota en paisaje semidesértico", "White house with terracotta volume in a semi-desert landscape"), status: "concept" },
  { slug: "casa-frente-al-mar", title: W("Casa frente al mar", "House by the sea"), region: "Costa", location: "Riviera Nayarit, Nayarit", model: "patio-180", modelName: "PATIO 180", areaM2: 180, image: "/images/projects/costa-01.jpg", alt: W("Casa blanca de dos niveles con alberca y palmeras", "Two-story white house with pool and palm trees"), status: "concept", size: "tall" },
  { slug: "cabana-entre-pinos", title: W("Cabaña entre pinos", "Cabin among pines"), region: "Bosque", location: "Valle de Bravo, Estado de México", model: "nido-65", modelName: "NIDO 65", areaM2: 65, image: "/images/projects/bosque-01.jpg", alt: W("Casa con fachada oscura bajo un árbol al anochecer", "House with dark facade under a tree at dusk"), status: "concept" },
  { slug: "casa-de-luz", title: W("Casa de luz", "House of light"), region: "Ciudad", location: "Querétaro, Querétaro", model: "casa-110", modelName: "CASA 110", areaM2: 110, image: "/images/projects/ciudad-01.jpg", alt: W("Casa blanca minimalista con jardín frontal", "Minimalist white house with front garden"), status: "concept", size: "wide" },
  { slug: "celosia-del-desierto", title: W("Celosía del desierto", "Desert screen"), region: "Desierto", location: "Hermosillo, Sonora", model: "casa-110", modelName: "CASA 110", areaM2: 110, image: "/images/projects/desierto-02.jpg", alt: W("Casa con celosía metálica perforada iluminada al anochecer", "House with perforated metal screen lit at dusk"), status: "concept" },
  { slug: "casa-palmar", title: W("Casa palmar", "Palm house"), region: "Costa", location: "Mérida, Yucatán", model: "patio-140", modelName: "PATIO 140", areaM2: 140, image: "/images/projects/costa-02.jpg", alt: W("Casa blanca con terraza, palmera y alberca", "White house with terrace, palm tree and pool"), status: "concept" },
  { slug: "casa-de-piedra", title: W("Casa de piedra", "Stone house"), region: "Campo", location: "Tequisquiapan, Querétaro", model: "casa-85", modelName: "CASA 85", areaM2: 85, image: "/images/projects/campo-01.jpg", alt: W("Casa con zócalo de piedra y recubrimiento de madera", "House with stone plinth and timber cladding"), status: "concept", size: "wide" },
  { slug: "casa-en-el-bosque", title: W("Casa en el bosque", "House in the forest"), region: "Bosque", location: "Mazamitla, Jalisco", model: "nido-45", modelName: "NIDO 45", areaM2: 45, image: "/images/projects/bosque-02.jpg", alt: W("Cabaña de madera con grandes ventanales en el bosque", "Timber cabin with large windows in the forest"), status: "concept" },
  { slug: "casa-patio-urbano", title: W("Patio urbano", "Urban courtyard"), region: "Ciudad", location: "Guadalajara, Jalisco", model: "patio-140", modelName: "PATIO 140", areaM2: 140, image: "/images/projects/ciudad-02.jpg", alt: W("Casa gris con celosía de madera en contexto urbano", "Grey house with timber screen in an urban setting"), status: "concept" },
];
