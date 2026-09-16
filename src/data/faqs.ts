/**
 * Frequently asked questions.
 * Answers avoid legal, financing, warranty and engineering claims that require
 * company-specific verification; those are marked with TODO comments and phrased
 * as process descriptions rather than guarantees.
 */
import type { L } from "@/i18n/config";

const W = (es: string, en: string): L => ({ es, en });

export type FaqCategory = "precios" | "proceso" | "diseno" | "terreno" | "sustentabilidad" | "vida-util";
export type FaqItem = { q: L; a: L; category: FaqCategory };

export const faqCategories: { id: FaqCategory; label: L }[] = [
  { id: "precios", label: W("Precios", "Prices") },
  { id: "proceso", label: W("Proceso", "Process") },
  { id: "diseno", label: W("Diseño", "Design") },
  { id: "terreno", label: W("Terreno y permisos", "Land and permits") },
  { id: "sustentabilidad", label: W("Sustentabilidad", "Sustainability") },
  { id: "vida-util", label: W("Vida útil", "Lifespan") },
];

export const faqs: FaqItem[] = [
  {
    category: "precios",
    q: W("¿Cuánto cuesta una casa prefabricada?", "How much does a prefab house cost?"),
    a: W(
      "Depende del modelo, el nivel de acabado y los sistemas opcionales. Publicamos precios de referencia por m² y un precio 'desde' por modelo; el cotizador en línea te da una estimación preliminar en minutos, y la cotización formal se emite después de evaluar tu terreno.",
      "It depends on the model, the finish level and the optional systems. We publish reference prices per m² and a starting price per model; the online estimator gives you a preliminary figure in minutes, and the formal quote is issued after evaluating your site.",
    ),
  },
  {
    category: "precios",
    q: W("¿Qué incluye el precio de la casa?", "What does the house price include?"),
    a: W(
      "La casa completa fabricada en planta: estructura, envolvente aislada, cancelería, instalaciones eléctricas, hidráulicas y sanitarias, cocina, baños, pisos, carpintería y pintura según el nivel de acabado, además del transporte y montaje en sitio dentro del alcance cotizado.",
      "The complete factory-built house: structure, insulated envelope, windows, electrical, plumbing and drainage installations, kitchen, bathrooms, floors, joinery and paint according to the finish level, plus transport and on-site assembly within the quoted scope.",
    ),
  },
  {
    category: "precios",
    q: W("¿El precio incluye el terreno?", "Does the price include the land?"),
    a: W(
      "No. Construimos sobre un terreno que ya sea tuyo o que estés por adquirir. Si aún no tienes terreno, podemos orientarte sobre qué características conviene buscar para tu modelo.",
      "No. We build on land you already own or are about to acquire. If you don't have land yet, we can advise you on what features to look for given your model.",
    ),
  },
  {
    category: "precios",
    q: W("¿El precio incluye la cimentación?", "Does the price include the foundation?"),
    a: W(
      "El precio del modelo no incluye cimentación ni preparación del sitio, porque dependen del suelo, la pendiente y los servicios disponibles en cada terreno. Se cotizan por separado después de la evaluación del terreno, y el cotizador muestra un rango estimado para que lo consideres desde el inicio.",
      "The model price doesn't include foundation or site preparation, because they depend on the soil, slope and utilities available on each lot. They're quoted separately after the site evaluation, and the estimator shows an estimated range so you can factor it in from the start.",
    ),
  },
  {
    category: "precios",
    q: W("¿Cómo funciona el financiamiento?", "How does financing work?"),
    // TODO: describe the company's real options (mortgage lenders that accept prefab, staged payments, financial partners).
    a: W(
      "Las condiciones de pago y las opciones de financiamiento disponibles se explican en la cotización formal. Si estás tramitando un crédito hipotecario, cuéntanoslo desde el inicio para alinear la documentación técnica que la institución requiera.",
      "Payment terms and available financing options are explained in the formal quote. If you're applying for a mortgage, tell us from the start so we can align the technical documentation your lender requires.",
    ),
  },
  {
    category: "proceso",
    q: W("¿Cuánto tiempo tarda la construcción?", "How long does construction take?"),
    a: W(
      "Cada modelo indica un rango estimado de semanas desde la aprobación de ingeniería hasta la entrega. El tiempo total también depende de los permisos municipales y del estado del terreno, que pueden avanzar en paralelo con la fabricación.",
      "Each model shows an estimated range of weeks from engineering approval to handover. The total time also depends on municipal permits and the state of the land, which can advance in parallel with fabrication.",
    ),
  },
  {
    category: "proceso",
    q: W("¿Cómo se transporta la casa?", "How is the house transported?"),
    a: W(
      "Los módulos se transportan en plataformas de carga con los permisos correspondientes. Desde la evaluación del terreno verificamos el acceso, el ancho de caminos y la maniobra de la grúa para el montaje.",
      "Modules are transported on flatbed trucks with the required permits. During the site evaluation we verify access, road width and the crane maneuver for assembly.",
    ),
  },
  {
    category: "proceso",
    q: W("¿Construyen en cualquier parte de México?", "Do you build anywhere in Mexico?"),
    a: W(
      "Atendemos proyectos en toda la República sujeto a evaluación logística: distancia desde la planta, acceso al terreno y disponibilidad de grúa en la zona. En el cotizador puedes indicar tu estado para considerarlo en la estimación.",
      "We take on projects across the country subject to a logistics evaluation: distance from the factory, site access and crane availability in the area. In the estimator you can select your state so it's factored into the estimate.",
    ),
  },
  {
    category: "proceso",
    q: W("¿Qué tipo de cimentación se usa?", "What kind of foundation is used?"),
    a: W(
      "Generalmente losa de cimentación o zapatas con dados de concreto, según el estudio de suelo. El proyecto de cimentación se define en la etapa de ingeniería y puede ejecutarlo nuestro equipo o un contratista local bajo nuestras especificaciones.",
      "Usually a slab foundation or footings with concrete piers, depending on the soil study. The foundation design is defined during engineering and can be built by our team or by a local contractor to our specifications.",
    ),
  },
  {
    category: "diseno",
    q: W("¿Puedo modificar el diseño?", "Can I modify the design?"),
    a: W(
      "Sí, dentro de las opciones de cada modelo: fachada, paleta interior, cocina, pisos, baños, terrazas, pérgolas y sistemas. Algunas distribuciones también tienen variantes. Los cambios estructurales fuera del catálogo se evalúan caso por caso.",
      "Yes, within each model's options: facade, interior palette, kitchen, floors, bathrooms, decks, pergolas and systems. Some layouts also have variants. Structural changes outside the catalogue are evaluated case by case.",
    ),
  },
  {
    category: "diseno",
    q: W("¿Se puede ampliar la casa después?", "Can the house be expanded later?"),
    a: W(
      "Los modelos están pensados para crecer por módulos: se puede añadir una recámara, un estudio o cerrar una terraza. Conviene decirlo desde el inicio para prever la conexión estructural y de instalaciones.",
      "The models are designed to grow by modules: you can add a bedroom or a study, or enclose a terrace. It helps to say so from the start so we can plan the structural and services connections.",
    ),
  },
  {
    category: "terreno",
    q: W("¿Se necesitan permisos?", "Are permits required?"),
    a: W(
      "Sí. Una casa prefabricada es una construcción y requiere licencia de construcción municipal, además de los trámites que apliquen en cada localidad (uso de suelo, alineamiento, conexión a servicios).",
      "Yes. A prefab house is a building and requires a municipal construction license, plus whatever procedures apply locally (land use, alignment, utility connections).",
    ),
  },
  {
    category: "terreno",
    q: W("¿Quién gestiona los permisos?", "Who handles the permits?"),
    // TODO: confirm the exact permit-management scope the company offers.
    a: W(
      "Entregamos los planos arquitectónicos y estructurales y la documentación técnica necesaria. El trámite ante la autoridad municipal lo realiza el cliente o un gestor local; en algunas zonas podemos recomendarte gestores con experiencia en este tipo de construcción.",
      "We deliver the architectural and structural drawings and the required technical documentation. Filing with the municipal authority is done by the client or a local agent; in some areas we can recommend agents experienced with this type of construction.",
    ),
  },
  {
    category: "sustentabilidad",
    q: W("¿Se pueden instalar paneles solares?", "Can solar panels be installed?"),
    a: W(
      "Sí. Todos los modelos se entregan preparados: cubierta estructurada y canalizaciones. El sistema fotovoltaico se dimensiona según tu consumo y la tarifa de tu zona, y puede instalarse desde el inicio o más adelante.",
      "Yes. Every model is delivered solar-ready: structured roof and conduits. The photovoltaic system is sized to your consumption and your area's tariff, and can be installed from the start or later.",
    ),
  },
  {
    category: "sustentabilidad",
    q: W("¿La casa puede captar agua de lluvia?", "Can the house collect rainwater?"),
    a: W(
      "Sí. Las bajantes llegan a un punto de conexión previsto para cisterna y filtro. La capacidad se calcula con la superficie de techo y la lluvia de tu región.",
      "Yes. The downpipes end at a connection point planned for a cistern and filter. Capacity is calculated from the roof area and your region's rainfall.",
    ),
  },
  {
    category: "vida-util",
    q: W("¿Cuánto dura una casa prefabricada?", "How long does a prefab house last?"),
    // TODO: add the design life and the contractual structural warranty once defined.
    a: W(
      "Una casa con estructura de acero galvanizado, envolvente protegida y mantenimiento básico está diseñada para la misma vida útil que una casa convencional bien construida. Los términos de garantía se detallan por escrito en el contrato.",
      "A house with a galvanized steel structure, a protected envelope and basic maintenance is designed for the same service life as a well-built conventional house. Warranty terms are set out in writing in the contract.",
    ),
  },
  {
    category: "vida-util",
    q: W("¿Cómo es el mantenimiento?", "What about maintenance?"),
    a: W(
      "Similar al de cualquier casa: revisión anual de sellos y canalones, limpieza de fachadas ventiladas, cuidado de maderas exteriores según el clima. Entregamos un manual de mantenimiento con cada casa.",
      "Similar to any house: annual check of seals and gutters, cleaning of ventilated facades, care of exterior timber according to the climate. We deliver a maintenance manual with every house.",
    ),
  },
];

/** General FAQs surfaced on every model page. */
export const modelPageFaqs = faqs.filter((f) => f.q.es === "¿Qué incluye el precio de la casa?" || f.q.es === "¿El precio incluye la cimentación?" || f.q.es === "¿Cuánto tiempo tarda la construcción?");
