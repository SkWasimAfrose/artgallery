"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import type { NavItem } from "@/config/site";
import { siteConfig } from "@/config/site";

const whatsappHref = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`
  : undefined;

const navItems: NavItem[] = siteConfig.nav;

const navVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
};

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLabel = useMemo(() => {
    return navItems.find((item) => pathname?.startsWith(item.href))?.label;
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-xl">
      <div className="container-padding mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-ivory transition hover:text-gold"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/90 text-lg font-semibold uppercase tracking-[0.2em] text-charcoal shadow-lg shadow-gold/20">
            LA
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold">
              {siteConfig.name}
            </span>
            <span className="text-sm text-ivory/70">
              Cinematic Wedding Imagery
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-ivory/80 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative transition hover:text-ivory",
                  isActive && "text-ivory"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {whatsappHref && (
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold transition hover:bg-gold/10"
            >
              WhatsApp
            </Link>
          )}
          <Link
            href="/booking"
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-charcoal shadow-lg shadow-gold/30 transition hover:bg-gold-light hover:text-charcoal"
          >
            Book A Session
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-gold hover:text-gold lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="relative h-5 w-6">
            <span
              className={clsx(
                "absolute inset-x-0 top-1 h-0.5 bg-current transition",
                menuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={clsx(
                "absolute inset-x-0 top-2.5 h-0.5 bg-current transition",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "absolute inset-x-0 top-4 h-0.5 bg-current transition",
                menuOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-t border-white/10 bg-charcoal/95 px-6 pb-6 pt-3 lg:hidden"
          >
            <div className="flex flex-col space-y-4 text-base font-medium text-ivory">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "rounded-full px-4 py-2 transition",
                      isActive
                        ? "bg-gold/20 text-ivory"
                        : "hover:bg-ivory/10 hover:text-ivory"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {whatsappHref && (
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-gold/40 px-4 py-2 text-center text-sm text-gold transition hover:bg-gold/10"
                >
                  WhatsApp Concierge
                </Link>
              )}
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-charcoal shadow-lg shadow-gold/30 transition hover:bg-gold-light"
              >
                Book A Session
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeLabel && (
          <motion.div
            key={activeLabel}
            className="pointer-events-none fixed left-1/2 top-20 -translate-x-1/2 rounded-full bg-charcoal-light/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-ivory/80 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
