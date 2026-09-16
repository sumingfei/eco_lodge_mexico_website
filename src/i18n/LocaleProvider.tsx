"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary, Locale, RouteKey } from "./index";
import { href } from "./routes";

type I18nContext = { locale: Locale; dict: Dictionary };

const Context = createContext<I18nContext | null>(null);

export function LocaleProvider({ locale, dict, children }: I18nContext & { children: ReactNode }) {
  return <Context.Provider value={{ locale, dict }}>{children}</Context.Provider>;
}

/** Locale, dictionary and a localized href() helper for client components. */
export function useI18n() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useI18n must be used within LocaleProvider");
  return { ...ctx, p: (key: RouteKey, rest = "") => href(ctx.locale, key, rest) };
}
