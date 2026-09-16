/** Process content: homepage 5-step summary, full 12-step process page and timeline comparison. */
import type { L } from "@/i18n/config";

export type ProcessStep = {
  number: string;
  title: L;
  text: L;
  /** Who is responsible. "cliente" steps may depend on the client or local authorities. */
  owner: "empresa" | "cliente" | "compartido";
  duration?: L;
};

export const homeSteps: { number: string; title: L; text: L }[] = [
  { number: "01", title: { es: "Elige tu modelo", en: "Choose your model" }, text: { es: "Explora los modelos, compara tamaños y usa el cotizador para tener una estimación preliminar en minutos.", en: "Explore the models, compare sizes and use the estimator to get a preliminary figure in minutes." } },
  { number: "02", title: { es: "Adaptamos el proyecto", en: "We adapt the project" }, text: { es: "Ajustamos orientación, fachada y acabados a tu terreno y a tu forma de vivir. Recibes una cotización formal.", en: "We adjust orientation, facade and finishes to your land and the way you live. You receive a formal quote." } },
  { number: "03", title: { es: "Preparamos tu terreno", en: "We prepare your site" }, text: { es: "Estudio de suelo, cimentación y conexiones. Se ejecuta al mismo tiempo que la fabricación.", en: "Soil study, foundation and connections. Carried out at the same time as fabrication." } },
  { number: "04", title: { es: "Fabricamos tu casa", en: "We build your home" }, text: { es: "Los módulos se producen bajo techo, con instalaciones y acabados integrados y control de calidad por etapa.", en: "Modules are produced under a roof, with installations and finishes integrated and quality control at each stage." } },
  { number: "05", title: { es: "Instalamos y entregamos", en: "We install and hand over" }, text: { es: "Transporte, montaje con grúa, conexiones y detalles finales. Recibes tu casa lista para habitar.", en: "Transport, crane assembly, connections and final details. You receive your home ready to live in." } },
];

const W = (es: string, en: string): L => ({ es, en });

export const fullProcess: ProcessStep[] = [
  { number: "01", title: W("Consulta inicial", "Initial consultation"), owner: "empresa", duration: W("1 semana", "1 week"), text: W("Platicamos sobre tu terreno, tu presupuesto y cómo quieres vivir. Revisamos juntos qué modelo tiene sentido y qué implicaciones tiene tu ubicación.", "We talk about your land, your budget and how you want to live. Together we review which model makes sense and what your location implies.") },
  { number: "02", title: W("Evaluación del terreno", "Site evaluation"), owner: "compartido", duration: W("1–2 semanas", "1–2 weeks"), text: W("Analizamos acceso, pendiente, orientación, servicios disponibles y normativa local. Puede requerir un estudio de mecánica de suelos, que se cotiza por separado.", "We analyze access, slope, orientation, available utilities and local regulations. It may require a geotechnical study, quoted separately.") },
  { number: "03", title: W("Selección del modelo", "Model selection"), owner: "cliente", duration: W("1 semana", "1 week"), text: W("Confirmas el modelo, el nivel de acabado y los sistemas opcionales. Emitimos una cotización formal por escrito con alcances claros.", "You confirm the model, finish level and optional systems. We issue a written formal quote with a clear scope.") },
  { number: "04", title: W("Personalización", "Customization"), owner: "compartido", duration: W("2–3 semanas", "2–3 weeks"), text: W("Elegimos fachada, paleta interior, cocina y las opciones de distribución disponibles para el modelo. Se firma el contrato y se define el calendario.", "We choose facade, interior palette, kitchen and the layout options available for the model. The contract is signed and the schedule defined.") },
  { number: "05", title: W("Ingeniería", "Engineering"), owner: "empresa", duration: W("2–4 semanas", "2–4 weeks"), text: W("Desarrollamos el proyecto estructural y de instalaciones adaptado a tu terreno, junto con el proyecto de cimentación.", "We develop the structural and services engineering adapted to your site, along with the foundation design.") },
  { number: "06", title: W("Permisos", "Permits"), owner: "cliente", duration: W("Variable", "Variable"), text: W("La licencia de construcción y trámites municipales dependen de cada municipio. Entregamos los planos y documentos técnicos necesarios; el cliente o su gestor realiza el trámite ante la autoridad.", "The building permit and municipal procedures depend on each municipality. We deliver the necessary drawings and technical documents; the client or their agent files with the authority.") },
  { number: "07", title: W("Cimentación y preparación del sitio", "Foundation and site preparation"), owner: "compartido", duration: W("3–5 semanas", "3–5 weeks"), text: W("Se ejecuta la cimentación, acometidas de agua, drenaje y electricidad. Puede realizarse por nuestro equipo o por un contratista local bajo nuestras especificaciones.", "Foundation, water, drainage and electrical connections are built. This can be done by our team or by a local contractor to our specifications.") },
  { number: "08", title: W("Fabricación en planta", "Factory fabrication"), owner: "empresa", duration: W("6–12 semanas", "6–12 weeks"), text: W("Los módulos se producen bajo techo mientras avanza la cimentación. Estructura, aislamiento, instalaciones, cancelería y gran parte de los acabados se integran en fábrica.", "Modules are produced under a roof while the foundation advances. Structure, insulation, installations, windows and most finishes are integrated in the factory.") },
  { number: "09", title: W("Transporte", "Transport"), owner: "empresa", duration: W("1–3 días", "1–3 days"), text: W("Los módulos viajan en plataformas con permisos de carga. La ruta y el acceso al terreno se validan desde la evaluación inicial.", "Modules travel on flatbeds with load permits. The route and site access are validated during the initial evaluation.") },
  { number: "10", title: W("Montaje", "Assembly"), owner: "empresa", duration: W("1–3 días", "1–3 days"), text: W("Con grúa, los módulos se colocan sobre la cimentación y se unen estructuralmente. Es el momento en que la casa aparece en el terreno.", "With a crane, the modules are set on the foundation and structurally joined. This is the moment the house appears on the land.") },
  { number: "11", title: W("Conexiones y acabados finales", "Connections and final finishes"), owner: "empresa", duration: W("2–4 semanas", "2–4 weeks"), text: W("Se conectan instalaciones, se sellan juntas, se colocan pisos de terraza, pérgolas y sistemas opcionales, y se realizan pruebas de funcionamiento.", "Installations are connected, joints sealed, terrace floors, pergolas and optional systems installed, and everything is tested.") },
  { number: "12", title: W("Entrega", "Handover"), owner: "empresa", duration: W("1 día", "1 day"), text: W("Recorrido de entrega contigo, manual de mantenimiento y documentación técnica. Tu casa queda lista para habitar.", "Handover walkthrough with you, maintenance manual and technical documentation. Your home is ready to live in.") },
];

export const responsibilities: Record<"empresa" | "cliente" | "compartido", L[]> = {
  empresa: [
    W("Diseño arquitectónico y adaptación del modelo", "Architectural design and model adaptation"),
    W("Ingeniería estructural y de instalaciones", "Structural and services engineering"),
    W("Fabricación de módulos en planta", "Factory fabrication of modules"),
    W("Transporte y montaje", "Transport and assembly"),
    W("Conexiones interiores y acabados finales", "Interior connections and final finishes"),
    W("Documentación técnica y manual de mantenimiento", "Technical documentation and maintenance manual"),
  ],
  cliente: [
    W("Propiedad y documentación legal del terreno", "Land ownership and legal documentation"),
    W("Licencias y permisos municipales (con nuestros planos)", "Municipal licenses and permits (with our drawings)"),
    W("Contratación de servicios ante CFE, agua y drenaje municipal", "Utility contracts with CFE, water and municipal drainage"),
    W("Acceso al terreno para transporte y grúa", "Site access for transport and crane"),
    W("Estudios de suelo y topografía (pueden gestionarse con nosotros)", "Soil and topographic studies (can be arranged through us)"),
  ],
  compartido: [
    W("Cimentación y preparación del sitio: por nuestro equipo o contratista local bajo especificación", "Foundation and site preparation: by our team or a local contractor to specification"),
    W("Calendario de obra sujeto a permisos y clima", "Construction schedule subject to permits and weather"),
  ],
};

/**
 * Illustrative timeline comparison in weeks. Values are a schematic example of a
 * ~85 m² house and must be adjusted with real project data before publishing claims.
 */
export type TimelinePhase = { label: L; start: number; end: number; track?: number };

export const timelineComparison = {
  totalWeeks: 40,
  traditional: {
    label: W("Construcción tradicional", "Traditional construction"),
    totalLabel: W("≈ 36–40 semanas", "≈ 36–40 weeks"),
    phases: [
      { label: W("Proyecto y permisos", "Design and permits"), start: 0, end: 6 },
      { label: W("Cimentación", "Foundation"), start: 6, end: 10 },
      { label: W("Estructura y muros", "Structure and walls"), start: 10, end: 20 },
      { label: W("Instalaciones", "Installations"), start: 20, end: 26 },
      { label: W("Acabados", "Finishes"), start: 26, end: 36 },
      { label: W("Entrega", "Handover"), start: 36, end: 38 },
    ] as TimelinePhase[],
  },
  prefab: {
    label: W("Proceso prefabricado", "Prefab process"),
    totalLabel: W("≈ 16–20 semanas", "≈ 16–20 weeks"),
    tracks: [W("En sitio", "On site"), W("En planta", "In factory"), W("Trámites", "Permits")],
    phases: [
      { label: W("Ingeniería", "Engineering"), start: 0, end: 4, track: 0 },
      { label: W("Cimentación", "Foundation"), start: 6, end: 10, track: 0 },
      { label: W("Montaje y conexiones", "Assembly and connections"), start: 14, end: 18, track: 0 },
      { label: W("Entrega", "Handover"), start: 18, end: 19.5, track: 0 },
      { label: W("Fabricación en planta", "Factory fabrication"), start: 4, end: 14, track: 1 },
      { label: W("Permisos municipales", "Municipal permits"), start: 3, end: 8, track: 2 },
    ] as TimelinePhase[],
  },
};
