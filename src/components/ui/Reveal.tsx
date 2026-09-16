"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels while fading in. */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/** Subtle fade-up on scroll. Respects reduced-motion preferences. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Component>
  );
}
