/**
 * Project gallery.
 * `status: "concept"` marks renders/concept studies; `"built"` marks real projects.
 * The UI labels concepts explicitly so no delivered project is implied.
 *
 * TODO: replace with real projects and photography as they are completed.
 */

export type ProjectRegion = "Desierto" | "Costa" | "Bosque" | "Ciudad" | "Campo";

export type Project = {
  slug: string;
  title: string;
  region: ProjectRegion;
  location: string;
  model: string;
  areaM2: number;
  image: string;
  alt: string;
  status: "concept" | "built";
  size?: "large" | "tall" | "wide";
};

export const projectRegions: ProjectRegion[] = ["Desierto", "Costa", "Bosque", "Ciudad", "Campo"];

export const projects: Project[] = [
  { slug: "casa-en-el-valle", title: "Casa en el valle", region: "Campo", location: "Valle de Guadalupe, Baja California", model: "PATIO 140", areaM2: 140, image: "/images/projects/campo-02.jpg", alt: "Casa con patio y recubrimiento de madera en un valle", status: "concept", size: "large" },
  { slug: "refugio-de-arena", title: "Refugio de arena", region: "Desierto", location: "San Miguel de Allende, Guanajuato", model: "CASA 85", areaM2: 85, image: "/images/projects/desierto-01.jpg", alt: "Casa blanca con volumen terracota en paisaje semidesértico", status: "concept" },
  { slug: "casa-frente-al-mar", title: "Casa frente al mar", region: "Costa", location: "Riviera Nayarit, Nayarit", model: "PATIO 180", areaM2: 180, image: "/images/projects/costa-01.jpg", alt: "Casa blanca de dos niveles con alberca y palmeras", status: "concept", size: "tall" },
  { slug: "cabana-entre-pinos", title: "Cabaña entre pinos", region: "Bosque", location: "Valle de Bravo, Estado de México", model: "NIDO 65", areaM2: 65, image: "/images/projects/bosque-01.jpg", alt: "Casa con fachada oscura bajo un árbol al anochecer", status: "concept" },
  { slug: "casa-de-luz", title: "Casa de luz", region: "Ciudad", location: "Querétaro, Querétaro", model: "CASA 110", areaM2: 110, image: "/images/projects/ciudad-01.jpg", alt: "Casa blanca minimalista con jardín frontal", status: "concept", size: "wide" },
  { slug: "celosia-del-desierto", title: "Celosía del desierto", region: "Desierto", location: "Hermosillo, Sonora", model: "CASA 110", areaM2: 110, image: "/images/projects/desierto-02.jpg", alt: "Casa con celosía metálica perforada iluminada al anochecer", status: "concept" },
  { slug: "casa-palmar", title: "Casa palmar", region: "Costa", location: "Mérida, Yucatán", model: "PATIO 140", areaM2: 140, image: "/images/projects/costa-02.jpg", alt: "Casa blanca con terraza, palmera y alberca", status: "concept" },
  { slug: "casa-de-piedra", title: "Casa de piedra", region: "Campo", location: "Tequisquiapan, Querétaro", model: "CASA 85", areaM2: 85, image: "/images/projects/campo-01.jpg", alt: "Casa con zócalo de piedra y recubrimiento de madera", status: "concept", size: "wide" },
  { slug: "casa-en-el-bosque", title: "Casa en el bosque", region: "Bosque", location: "Mazamitla, Jalisco", model: "NIDO 45", areaM2: 45, image: "/images/projects/bosque-02.jpg", alt: "Cabaña de madera con grandes ventanales en el bosque", status: "concept" },
  { slug: "casa-patio-urbano", title: "Patio urbano", region: "Ciudad", location: "Guadalajara, Jalisco", model: "PATIO 140", areaM2: 140, image: "/images/projects/ciudad-02.jpg", alt: "Casa gris con celosía de madera en contexto urbano", status: "concept" },
];
