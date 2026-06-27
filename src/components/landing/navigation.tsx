"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const navLinks = [
  { label: "Produkte", labelEn: "Products", href: "#district-heating" },
  { label: "Fernwärme", labelEn: "District Heating", href: "#district-heating" },
  { label: "Strom", labelEn: "Electricity", href: "#electricity" },
  { label: "Community", labelEn: "Community", href: "#community" },
  { label: "Nachhaltigkeit", labelEn: "Sustainability", href: "#sustainability" },
  { label: "Über Halle", labelEn: "About Halle", href: "#about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_20px_-6px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
          <span
            className={`text-lg md:text-xl font-display font-bold tracking-tight transition-colors duration-500 ${
              scrolled ? "text-[#16233A]" : "text-white"
            }`}
          >
            EVH
          </span>
          <span className="w-2 h-2 rounded-full bg-[#E53935]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                scrolled
                  ? "text-[#64748B] hover:text-[#16233A]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {locale === "de" ? link.label : link.labelEn}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E53935] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "de" ? "en" : "de")}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 ${
              scrolled
                ? "text-[#64748B] hover:text-[#16233A] hover:bg-slate-100"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {locale === "de" ? "EN" : "DE"}
          </button>

          <button
            onClick={toggle}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? "text-[#64748B] hover:text-[#16233A] hover:bg-slate-100"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <Link
            href="/portal/login"
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-500 active:scale-[0.97] ${
              scrolled
                ? "bg-[#E53935] text-white hover:bg-[#c62828] shadow-[0_4px_14px_-4px_rgba(229,57,53,0.4)]"
                : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10"
            }`}
          >
            {t("nav.customer.portal")}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className={`w-5 h-px block transition-colors duration-500 ${scrolled ? "bg-[#16233A]" : "bg-white"}`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-5 h-px block transition-colors duration-500 ${scrolled ? "bg-[#16233A]" : "bg-white"}`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className={`w-5 h-px block transition-colors duration-500 ${scrolled ? "bg-[#16233A]" : "bg-white"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden"
          >
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-sm font-medium text-[#64748B] hover:text-[#16233A] transition-colors"
                >
                  {locale === "de" ? link.label : link.labelEn}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => setLocale(locale === "de" ? "en" : "de")}
                  className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#64748B] hover:text-[#16233A] bg-slate-50 rounded-lg"
                >
                  {locale === "de" ? "EN" : "DE"}
                </button>
                <button
                  onClick={toggle}
                  className="w-9 h-9 text-xs font-semibold text-[#64748B] hover:text-[#16233A] bg-slate-50 rounded-lg flex items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <Link
                  href="/portal/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-5 py-2.5 bg-[#E53935] text-white text-xs font-semibold rounded-xl"
                >
                  {t("nav.customer.portal")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
