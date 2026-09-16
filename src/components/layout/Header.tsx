"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Close, Menu, WhatsApp, ArrowUpRight } from "@/components/ui/Icons";
import { useHeaderOverlay } from "./header-theme";

/**
 * Sticky header. Transparent over full-bleed heroes (see HeaderOverlay), solid after scrolling.
 */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = useHeaderOverlay();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.documentElement.classList.toggle("menu-open", open);
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const light = overlay && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled || open
            ? "bg-limestone/90 shadow-[0_1px_0_0_rgba(26,24,22,0.08)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="container-wide flex h-[var(--header-h)] items-center justify-between">
          <Logo light={light} />

          <nav
            aria-label="Principal"
            className="hidden items-center gap-8 lg:flex"
          >
            {mainNav.map((link) => {
              const active = decodeURIComponent(pathname).startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[0.8125rem] font-semibold tracking-[0.02em] transition-colors",
                    light
                      ? "text-limestone/85 hover:text-white"
                      : "text-ink/70 hover:text-ink",
                    active && (light ? "text-white" : "text-ink"),
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                light
                  ? "text-limestone hover:bg-white/10"
                  : "text-ink hover:bg-ink/5",
              )}
            >
              <WhatsApp size={22} />
            </a>
            <Button
              href="/cotizador"
              variant={light ? "light" : "primary"}
              size="sm"
            >
              Cotizar
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              href="/cotizador"
              variant={light ? "light" : "primary"}
              size="sm"
              className="h-9 px-4"
            >
              Cotizar
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full",
                light ? "text-limestone" : "text-ink",
              )}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — rendered outside <header> because its backdrop-filter would
          otherwise become the containing block for this fixed panel. */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 flex flex-col bg-limestone transition-opacity duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav
          aria-label="Menú móvil"
          className="container-wide flex-1 overflow-y-auto pt-4"
        >
          <ul className="divide-y divide-ink/10">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between py-5 font-serif text-[1.75rem] text-ink"
                  tabIndex={open ? 0 : -1}
                >
                  {link.label}
                  <ArrowUpRight className="text-ink/40" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/proyectos"
                className="flex items-center justify-between py-5 font-serif text-[1.75rem] text-ink"
                tabIndex={open ? 0 : -1}
              >
                Proyectos
                <ArrowUpRight className="text-ink/40" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="container-wide grid grid-cols-2 gap-3 border-t border-ink/10 py-5">
          <Button
            href="/cotizador"
            size="lg"
            className="w-full"
            tabIndex={open ? 0 : -1}
          >
            Cotizar mi casa
          </Button>
          <Button
            href={whatsappLink()}
            external
            variant="outline"
            size="lg"
            className="w-full"
            icon={<WhatsApp size={18} />}
            tabIndex={open ? 0 : -1}
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </>
  );
}
