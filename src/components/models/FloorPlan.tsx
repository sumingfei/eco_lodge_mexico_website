import type { Floor } from "@/data/models";
import { cn } from "@/lib/utils";
import { fill, t, type Dictionary, type Locale } from "@/i18n";

const SCALE = 40; // px per metre in the viewBox
const PAD = 1.4; // metres of padding for dimension lines

/**
 * Schematic floor plan rendered from room geometry in the model data.
 * TODO: replace with the architect’s actual floor plans (SVG/PNG) when available.
 */
export function FloorPlan({ floor, className, locale, labels }: { floor: Floor; className?: string; locale: Locale; labels: Dictionary["floorPlan"] }) {
  const floorName = t(floor.name, locale);
  const maxX = Math.max(floor.width, ...floor.rooms.map((r) => r.x + r.w));
  const maxY = Math.max(floor.depth, ...floor.rooms.map((r) => r.y + r.h));
  const minX = Math.min(0, ...floor.rooms.map((r) => r.x));
  const minY = Math.min(0, ...floor.rooms.map((r) => r.y));
  const vbX = (minX - PAD) * SCALE;
  const vbY = (minY - PAD) * SCALE;
  const vbW = (maxX - minX + PAD * 2) * SCALE;
  const vbH = (maxY - minY + PAD * 2) * SCALE;
  const patternId = `hatch-${floor.name.es.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <figure className={cn("rounded-[1.25rem] border border-ink/10 bg-limestone-50 p-4 sm:p-6", className)}>
      <svg
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        role="img"
        aria-label={fill(labels.aria, { name: floorName, width: floor.width, depth: floor.depth })}
        className="mx-auto h-auto w-full"
        // Cap the rendered size so small plans keep the same metre-to-pixel scale as large ones.
        style={{ maxWidth: `${Math.round((vbW / SCALE) * 52)}px` }}
      >
        <defs>
          <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#8b8378" strokeWidth="1" opacity="0.5" />
          </pattern>
        </defs>

        {/* Rooms */}
        {floor.rooms.map((r) => {
          const x = r.x * SCALE;
          const y = r.y * SCALE;
          const w = r.w * SCALE;
          const h = r.h * SCALE;
          const area = r.w * r.h;
          const narrow = r.w < 1.9 && r.h > r.w;
          const fontSize = area < 5 ? 10 : 13;
          const availableWidth = (narrow ? h : w) - 8;
          const roomName = t(r.name, locale);
          const lines = wrapLabel(roomName, fontSize, availableWidth);
          return (
            <g key={r.name.es}>
              <rect x={x} y={y} width={w} height={h} fill={r.open ? `url(#${patternId})` : "#faf7f1"} stroke="#1a1816" strokeWidth={r.open ? 1 : 1.5} strokeDasharray={r.open ? "4 3" : undefined} />
              <text
                x={x + w / 2}
                y={y + h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={fontSize}
                fontFamily="var(--font-manrope), sans-serif"
                fill="#1a1816"
                transform={narrow ? `rotate(-90 ${x + w / 2} ${y + h / 2})` : undefined}
              >
                {lines.map((line, i) => (
                  <tspan key={line} x={x + w / 2} dy={i === 0 ? `${-((lines.length - 1 + (area >= 6 ? 1 : 0)) * 0.6)}em` : "1.2em"} fontWeight={600}>
                    {line}
                  </tspan>
                ))}
                {area >= 6 && (
                  <tspan x={x + w / 2} dy="1.25em" fill="#6d655a" fontSize={fontSize - 2}>
                    {area.toFixed(1)} m²
                  </tspan>
                )}
              </text>
            </g>
          );
        })}

        {/* Outer envelope */}
        <rect x={0} y={0} width={floor.width * SCALE} height={floor.depth * SCALE} fill="none" stroke="#1a1816" strokeWidth={3} />

        {/* Dimension lines */}
        <Dimension x1={0} x2={floor.width * SCALE} y={(maxY + 0.7) * SCALE} label={`${floor.width.toFixed(1)} m`} />
        <Dimension vertical y1={0} y2={floor.depth * SCALE} x={(minX - 0.7) * SCALE} label={`${floor.depth.toFixed(1)} m`} />
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone">
        <span>{floorName} · {labels.caption}</span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-5 border border-dashed border-ink/60" style={{ backgroundImage: "repeating-linear-gradient(45deg,#8b8378 0 1px,transparent 1px 5px)" }} aria-hidden /> {labels.outdoor}
        </span>
      </figcaption>
    </figure>
  );
}

/** Splits a label into up to two lines when it would overflow the room. */
function wrapLabel(name: string, fontSize: number, maxWidth: number) {
  const estimate = (t: string) => t.length * fontSize * 0.56;
  if (estimate(name) <= maxWidth) return [name];
  const words = name.split(" ");
  if (words.length < 2) return [name];
  let best = [name];
  let bestOverflow = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const overflow = Math.max(estimate(a), estimate(b));
    if (overflow < bestOverflow) {
      bestOverflow = overflow;
      best = [a, b];
    }
  }
  return best;
}

function Dimension(props: { x1: number; x2: number; y: number; label: string; vertical?: false } | { y1: number; y2: number; x: number; label: string; vertical: true }) {
  const stroke = "#6d655a";
  if (props.vertical) {
    const { y1, y2, x, label } = props;
    return (
      <g>
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={stroke} strokeWidth={1} />
        <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} stroke={stroke} strokeWidth={1} />
        <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} stroke={stroke} strokeWidth={1} />
        <text x={x - 10} y={(y1 + y2) / 2} fontSize={12} fill={stroke} textAnchor="middle" transform={`rotate(-90 ${x - 8} ${(y1 + y2) / 2})`} fontFamily="var(--font-manrope), sans-serif">
          {label}
        </text>
      </g>
    );
  }
  const { x1, x2, y, label } = props;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={stroke} strokeWidth={1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} stroke={stroke} strokeWidth={1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} stroke={stroke} strokeWidth={1} />
      <text x={(x1 + x2) / 2} y={y + 16} fontSize={12} fill={stroke} textAnchor="middle" fontFamily="var(--font-manrope), sans-serif">
        {label}
      </text>
    </g>
  );
}
