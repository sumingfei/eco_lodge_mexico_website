"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * Tiny store that lets a page tell the header to render light-on-dark
 * (when a full-bleed hero image sits underneath it).
 */
let overlay = false;
const listeners = new Set<() => void>();

function setOverlay(value: boolean) {
  overlay = value;
  listeners.forEach((l) => l());
}

export function useHeaderOverlay() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => overlay,
    () => false,
  );
}

/** Render inside any hero that the header should overlay. */
export function HeaderOverlay() {
  useEffect(() => {
    setOverlay(true);
    return () => setOverlay(false);
  }, []);
  return null;
}
