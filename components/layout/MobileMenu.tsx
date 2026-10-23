"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fullAddress, siteConfig } from "@/config/site";
import { mainNav, quoteHref } from "@/content/navigation";
import { serviceHref, services } from "@/content/services";
import { tradeHref, trades } from "@/content/trades";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "./Logo";

type MobileMenuProps = { open: boolean; onClose: () => void };

const subMenus = {
  services: {
    all: { label: "All services", href: "/services/" },
    links: services.map((s) => ({ label: s.shortName, href: serviceHref(s.slug) })),
  },
  trades: {
    all: { label: "All trades", href: "/trades/" },
    links: trades.map((t) => ({ label: t.shortName, href: tradeHref(t.slug) })),
  },
};

/** Full-screen navy menu that slides in from the right on screens below 1024px. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Keep keyboard focus inside the open menu
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy text-navy-200 lg:hidden"
        >
          <div aria-hidden="true" className="bg-blueprint-grid-light pointer-events-none absolute inset-0" />

          <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
            <Logo inverted onClick={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-white/10"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative flex-1 px-4 py-4 sm:px-6">
            <ul className="divide-y divide-white/10">
              {mainNav.map((item) => {
                if (!item.menu) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex min-h-14 items-center font-display text-headline-sm font-semibold text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const sub = subMenus[item.menu];
                const isOpen = expanded === item.menu;
                const panelId = `mobile-sub-${item.menu}`;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : item.menu)}
                      className="flex min-h-14 w-full items-center justify-between font-display text-headline-sm font-semibold text-white"
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("size-5 text-accent transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          {[sub.all, ...sub.links].map((link, i) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className={cn(
                                  "flex min-h-11 items-center border-l-2 pl-4 text-body-md",
                                  i === 0 ? "border-accent font-semibold text-white" : "border-white/15 text-navy-200 hover:text-white",
                                )}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                          <li aria-hidden="true" className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative space-y-4 border-t border-white/10 px-4 pt-5 pb-8 sm:px-6">
            <a href={siteConfig.phoneHref} className="flex min-h-11 items-center gap-3 font-semibold text-white">
              <Phone aria-hidden="true" className="size-5 text-accent" />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex min-h-11 items-center gap-3 text-white">
              <Mail aria-hidden="true" className="size-5 text-accent" />
              {siteConfig.email}
            </a>
            <p className="flex items-start gap-3 text-body-sm">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
              {fullAddress}
            </p>
            <Link href={quoteHref} onClick={onClose} className={buttonClasses({ size: "lg", className: "w-full" })}>
              Get a Free Quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
