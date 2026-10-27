"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, quoteHref } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ServicesMenu, TradesMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

type MenuKey = "services" | "trades";

const isActive = (pathname: string, href: string) =>
  !href.includes("#") && href !== "/" && pathname.startsWith(href.replace(/\/$/, ""));

/** Sticky main navigation: mega menus on desktop, hamburger + full-screen menu below 1024px. */
export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const closeAll = useCallback(() => {
    cancelClose();
    setOpenMenu(null);
  }, []);

  // Close menus whenever the route changes
  useEffect(() => {
    closeAll();
    setMobileOpen(false);
  }, [pathname, closeAll]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the open mega menu and returns focus to its trigger
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerRefs.current[openMenu]?.focus();
        closeAll();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, closeAll]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-white transition-shadow duration-200",
        scrolled || openMenu ? "shadow-[0_2px_12px_rgba(11,37,69,0.08)]" : "shadow-[0_1px_8px_rgba(11,37,69,0.04)]",
      )}
      onMouseLeave={scheduleClose}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20 xl:gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const linkClass = cn(
                "relative inline-flex h-10 items-center rounded-md px-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors hover:text-navy xl:px-2.5 xl:text-[0.9375rem]",
                active ? "text-navy" : "text-body",
              );
              if (!item.menu) {
                return (
                  <li key={item.label}>
                    <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const key = item.menu;
              const expanded = openMenu === key;
              return (
                <li
                  key={item.label}
                  className="flex items-center"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(key);
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(linkClass, "pr-1", expanded && "text-navy")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  <button
                    ref={(el) => {
                      triggerRefs.current[key] = el;
                    }}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`mega-${key}`}
                    aria-label={`${expanded ? "Hide" : "Show"} ${item.label} menu`}
                    onClick={() => setOpenMenu(expanded ? null : key)}
                    className="inline-flex size-8 items-center justify-center rounded-md text-body hover:text-navy"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("size-4 transition-transform duration-200", expanded && "rotate-180 text-accent-ink")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Phones get the quote button from the sticky bottom bar instead */}
          <div className="hidden sm:block">
            <ButtonLink href={quoteHref}>Get a Free Quote</ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-navy hover:bg-mist lg:hidden"
          >
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
      </Container>

      {/* Desktop mega menus */}
      <AnimatePresence>
        {openMenu && (
          <m.div
            key={openMenu}
            id={`mega-${openMenu}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-float lg:block"
          >
            <Container>
              {openMenu === "services" ? <ServicesMenu onNavigate={closeAll} /> : <TradesMenu onNavigate={closeAll} />}
            </Container>
          </m.div>
        )}
      </AnimatePresence>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
