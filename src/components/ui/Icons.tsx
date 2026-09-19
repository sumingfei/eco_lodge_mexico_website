import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg"> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowLeft = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const Check = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="m5 12 5 5L20 7" /></svg>
);
export const Plus = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const Menu = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Phone = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const Mail = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const MapPin = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);

/** WhatsApp glyph (filled). */
export const WhatsApp = ({ size = 22, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.23 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

/* Architectural line icons for the value proposition. */
export const IconDesign = ({ size = 28, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={1.25}><path d="M4 20 14 4l6 10-6 6H4Z" /><path d="M9 20V12l5 2" /><path d="M4 20h16" /></svg>
);
export const IconPrice = ({ size = 28, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={1.25}><path d="M4 18V6h16v12H4Z" /><path d="M4 10h16M8 14h3" /><circle cx="16.5" cy="14" r="1.25" /></svg>
);
export const IconTime = ({ size = 28, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={1.25}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /><path d="M3 12h2M19 12h2" /></svg>
);
export const IconSun = ({ size = 28, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={1.25}><path d="M3 18h18" /><path d="M6 18a6 6 0 0 1 12 0" /><path d="M12 3v3M4.5 7.5l2 2M19.5 7.5l-2 2" /><path d="M2 21h20" /></svg>
);

/* Ecological-design icons: rainwater and solar. */
export const IconRain = ({ size = 28, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={1.25}><path d="M12 3.5c-3.2 4-5.5 6.9-5.5 9.8a5.5 5.5 0 0 0 11 0c0-2.9-2.3-5.8-5.5-9.8Z" /><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" /></svg>
);
export const IconSolar = ({ size = 28, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={1.25}><path d="m5 8-2 8h18l-2-8H5Z" /><path d="M4.2 12h15.6M8 8l-1 8M16 8l1 8M12 8v8" /><path d="M12 16v4M9 20h6" /></svg>
);
