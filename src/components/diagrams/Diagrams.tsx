import type { Dictionary } from "@/i18n";
/**
 * Explanatory line diagrams for the sustainability page.
 * Pure SVG, no client JS. Colors follow the design tokens.
 */

const INK = "#1a1816";
const STONE = "#6d655a";
const TERRA = "#b5573a";
const AGAVE = "#55604a";
const SAND = "#e3d5bd";
const FONT = "var(--font-manrope), sans-serif";

type Labels = Dictionary["diagrams"];
export type DiagramProps = { className?: string; labels: Labels };

function Frame({ children, title, className, viewBox = "0 0 600 360" }: { className?: string; title: string; children: React.ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} className={className} fontFamily={FONT}>
      {children}
    </svg>
  );
}

function Label({ x, y, children, anchor = "start", color = STONE, size = 11 }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; color?: string; size?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontWeight={500}>
      {children}
    </text>
  );
}

/** Plan view: sun path, glazing towards the protected side, closed wall to the west. */
export function SolarOrientationDiagram({ className, labels }: DiagramProps) {
  const l = labels.orientation;
  return (
    <Frame title={l.aria} className={className}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill={TERRA} />
        </marker>
      </defs>
      {/* Sun path */}
      <path d="M90 250 A210 210 0 0 1 510 250" fill="none" stroke={TERRA} strokeWidth={1.5} strokeDasharray="4 5" />
      <circle cx={90} cy={250} r={9} fill="none" stroke={TERRA} strokeWidth={1.5} />
      <circle cx={300} cy={40} r={11} fill={TERRA} />
      <circle cx={510} cy={250} r={9} fill={TERRA} />
      <Label x={90} y={280} anchor="middle" color={TERRA}>{l.sunrise}</Label>
      <Label x={300} y={24} anchor="middle" color={TERRA}>{l.noon}</Label>
      <Label x={510} y={280} anchor="middle" color={TERRA}>{l.sunset}</Label>

      {/* House plan */}
      <rect x={200} y={120} width={200} height={110} fill="#faf7f1" stroke={INK} strokeWidth={2.5} />
      {/* Glazing on north (top) and south (bottom, with eave) */}
      <line x1={220} y1={120} x2={380} y2={120} stroke={AGAVE} strokeWidth={6} />
      <line x1={220} y1={230} x2={380} y2={230} stroke={AGAVE} strokeWidth={6} />
      <rect x={200} y={230} width={200} height={16} fill={SAND} stroke={INK} strokeWidth={1} strokeDasharray="3 3" />
      {/* Closed west wall */}
      <rect x={392} y={120} width={8} height={110} fill={INK} />
      <Label x={300} y={180} anchor="middle" color={INK} size={12}>{l.living}</Label>
      <Label x={300} y={110} anchor="middle" color={AGAVE}>{l.north}</Label>
      <Label x={300} y={262} anchor="middle" color={AGAVE}>{l.south}</Label>
      <Label x={412} y={178} color={INK}>{l.west}</Label>

      {/* North arrow */}
      <line x1={60} y1={140} x2={60} y2={90} stroke={INK} strokeWidth={1.5} markerEnd="url(#arrow)" />
      <Label x={60} y={158} anchor="middle" color={INK} size={12}>N</Label>
      <Label x={20} y={340} color={STONE} size={10}>{l.note}</Label>
    </Frame>
  );
}

/** Section: air enters low on the windward side and exits high on the opposite side. */
export function CrossVentilationDiagram({ className, labels }: DiagramProps) {
  const l = labels.ventilation;
  return (
    <Frame title={l.aria} className={className}>
      <defs>
        <marker id="arrow-agave" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 10 5 0 10z" fill={AGAVE} />
        </marker>
      </defs>
      {/* Ground */}
      <line x1={40} y1={300} x2={560} y2={300} stroke={INK} strokeWidth={2} />
      {/* House section */}
      <path d="M150 300 V150 L170 120 H430 L450 150 V300" fill="#faf7f1" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      {/* Roof overhang */}
      <path d="M120 150 L170 120 H430 L480 150" fill="none" stroke={INK} strokeWidth={2.5} />
      {/* Low window left */}
      <rect x={144} y={210} width={12} height={70} fill={AGAVE} />
      {/* High window right (clerestory) */}
      <rect x={444} y={130} width={12} height={50} fill={AGAVE} />
      {/* Patio/tree hint */}
      <circle cx={90} cy={240} r={26} fill="none" stroke={STONE} strokeWidth={1.5} />
      <line x1={90} y1={266} x2={90} y2={300} stroke={STONE} strokeWidth={1.5} />

      {/* Air flow */}
      <path d="M60 250 C120 250, 150 250, 200 245 S 320 210, 400 170 S 440 155, 500 150" fill="none" stroke={AGAVE} strokeWidth={2.5} markerEnd="url(#arrow-agave)" />
      <path d="M60 275 C130 275, 180 270, 240 262 S 340 235, 410 195" fill="none" stroke={AGAVE} strokeWidth={1.5} strokeDasharray="5 5" />
      <Label x={40} y={200} color={AGAVE}>{l.fresh}</Label>
      <Label x={560} y={112} color={AGAVE} anchor="end">{l.hot}</Label>
      <Label x={300} y={330} anchor="middle" color={STONE} size={10}>{l.note}</Label>
    </Frame>
  );
}

/** Section: eave blocks high summer sun, lets low winter sun in. */
export function RoofShadingDiagram({ className, labels }: DiagramProps) {
  const l = labels.shading;
  return (
    <Frame title={l.aria} className={className}>
      <line x1={40} y1={300} x2={560} y2={300} stroke={INK} strokeWidth={2} />
      {/* Wall + glass */}
      <rect x={300} y={130} width={180} height={170} fill="#faf7f1" stroke={INK} strokeWidth={2.5} />
      <rect x={294} y={150} width={10} height={150} fill={AGAVE} />
      {/* Roof + eave */}
      <path d="M210 128 H490 V116 H210 Z" fill={INK} />
      <Label x={215} y={108} color={INK}>{l.eave}</Label>
      {/* Summer sun (high) */}
      <circle cx={120} cy={40} r={12} fill={TERRA} />
      <line x1={132} y1={52} x2={250} y2={128} stroke={TERRA} strokeWidth={2} />
      <line x1={250} y1={128} x2={250} y2={300} stroke={TERRA} strokeWidth={1} strokeDasharray="3 4" />
      <Label x={60} y={48} color={TERRA}>{l.summer}</Label>
      <Label x={140} y={140} color={TERRA} size={10}>{l.summerShade}</Label>
      {/* Winter sun (low) */}
      <circle cx={70} cy={190} r={10} fill="none" stroke={TERRA} strokeWidth={2} />
      <line x1={82} y1={196} x2={294} y2={252} stroke={TERRA} strokeWidth={2} strokeDasharray="6 4" />
      <path d="M304 254 L420 285" stroke={TERRA} strokeWidth={2} strokeDasharray="6 4" />
      <Label x={40} y={230} color={TERRA}>{l.winter}</Label>
      <Label x={330} y={235} color={TERRA} size={10}>{l.winterSun}</Label>
      <Label x={300} y={330} anchor="middle" color={STONE} size={10}>{l.note}</Label>
    </Frame>
  );
}

/** Wall section layers. */
export function InsulationDiagram({ className, labels }: DiagramProps) {
  const l = labels.insulation;
  const layers = [
    { w: 18, fill: "#a97a50", label: l.layers[0] },
    { w: 22, fill: "#faf7f1", label: l.layers[1], dashed: true },
    { w: 60, fill: SAND, label: l.layers[2] },
    { w: 14, fill: STONE, label: l.layers[3] },
    { w: 16, fill: "#ece4d6", label: l.layers[4] },
  ];
  let x = 120;
  return (
    <Frame title={l.aria} className={className}>
      <Label x={60} y={60} color={TERRA} size={12}>{l.exterior}</Label>
      <Label x={540} y={60} color={AGAVE} size={12} anchor="end">{l.interior}</Label>
      {layers.map((l, i) => {
        const rect = (
          <g key={l.label}>
            <rect x={x} y={80} width={l.w} height={200} fill={l.fill} stroke={INK} strokeWidth={1.5} strokeDasharray={l.dashed ? "4 3" : undefined} />
            <line x1={x + l.w / 2} y1={280} x2={x + l.w / 2} y2={296 + i * 14} stroke={STONE} strokeWidth={1} />
            <line x1={x + l.w / 2} y1={296 + i * 14} x2={260} y2={296 + i * 14} stroke={STONE} strokeWidth={1} />
            <Label x={266} y={300 + i * 14} color={INK} size={10}>{l.label}</Label>
          </g>
        );
        x += l.w;
        return rect;
      })}
      {/* Heat arrows */}
      <path d="M40 150 H100" stroke={TERRA} strokeWidth={2.5} />
      <path d="M92 144 L102 150 L92 156" fill="none" stroke={TERRA} strokeWidth={2.5} />
      <path d="M40 180 H100" stroke={TERRA} strokeWidth={2.5} />
      <path d="M92 174 L102 180 L92 186" fill="none" stroke={TERRA} strokeWidth={2.5} />
      <Label x={40} y={130} color={TERRA} size={10}>{l.heat}</Label>
      <path d="M330 165 H370" stroke={AGAVE} strokeWidth={1.5} strokeDasharray="3 3" />
      <Label x={330} y={150} color={AGAVE} size={10}>{l.lowTransfer}</Label>
    </Frame>
  );
}

/** Roof → gutter → downpipe → first-flush filter → cistern → pump. */
export function RainwaterDiagram({ className, labels }: DiagramProps) {
  const l = labels.rainwater;
  return (
    <Frame title={l.aria} className={className}>
      <line x1={40} y1={240} x2={560} y2={240} stroke={INK} strokeWidth={2} />
      {/* House */}
      <path d="M140 240 V120 L420 100 V240" fill="#faf7f1" stroke={INK} strokeWidth={2.5} />
      <path d="M120 122 L420 100" stroke={INK} strokeWidth={4} />
      {/* Rain */}
      {[170, 210, 250, 290, 330, 370].map((rx) => (
        <line key={rx} x1={rx} y1={40} x2={rx - 6} y2={70} stroke={AGAVE} strokeWidth={1.5} strokeLinecap="round" />
      ))}
      <Label x={270} y={30} anchor="middle" color={AGAVE}>{l.rain}</Label>
      {/* Gutter & downpipe */}
      <rect x={112} y={118} width={14} height={10} fill={INK} />
      <line x1={118} y1={128} x2={118} y2={205} stroke={INK} strokeWidth={4} />
      <Label x={50} y={160} color={INK} size={10}>{l.downpipe}</Label>
      {/* First flush filter */}
      <rect x={104} y={205} width={28} height={22} fill={SAND} stroke={INK} strokeWidth={1.5} />
      <Label x={20} y={222} color={INK} size={10}>{l.filter1}</Label>
      <Label x={20} y={234} color={INK} size={10}>{l.filter2}</Label>
      {/* Pipe to cistern */}
      <path d="M118 227 V255 H200 V270" fill="none" stroke={INK} strokeWidth={3} />
      {/* Cistern underground */}
      <rect x={160} y={270} width={160} height={60} fill="none" stroke={INK} strokeWidth={2} strokeDasharray="5 4" />
      <rect x={164} y={296} width={152} height={30} fill={AGAVE} opacity={0.35} />
      <Label x={240} y={288} anchor="middle" color={INK} size={11}>{l.cistern}</Label>
      {/* Pump and supply */}
      <circle cx={340} cy={300} r={10} fill="none" stroke={INK} strokeWidth={2} />
      <line x1={320} y1={300} x2={330} y2={300} stroke={INK} strokeWidth={2} />
      <path d="M350 300 H420 V240" fill="none" stroke={INK} strokeWidth={2.5} />
      <Label x={340} y={326} anchor="middle" color={INK} size={10}>{l.pump}</Label>
      <Label x={440} y={200} color={AGAVE} size={10}>{l.supply}</Label>
      <Label x={460} y={300} color={STONE} size={10}>{l.capacity1}</Label>
      <Label x={460} y={313} color={STONE} size={10}>{l.capacity2}</Label>
    </Frame>
  );
}
