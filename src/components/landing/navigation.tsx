"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Products", href: "#products", hasDropdown: true, dropdownItems: [
    { label: "District Heating", href: "#district-heating" },
    { label: "Electricity", href: "#electricity" },
  ]},
  { label: "Sustainability", href: "#sustainability" },
  { label: "Community", href: "#community" },
  { label: "About Halle", href: "#about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5">
          <span className={`text-xl font-display font-bold transition-colors duration-300 ${
            scrolled ? "text-evh-dark" : "text-white"
          }`}>
            EVH
          </span>
          <span className="w-2 h-2 rounded-full bg-evh-yellow" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-evh-gray-600 hover:text-evh-dark" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/portal/login"
            className="px-5 py-2.5 bg-evh-yellow text-evh-dark text-sm font-semibold rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-evh-yellow/25"
          >
            Customer Portal
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2"
          aria-label="Menu"
        >
          <div className={`w-5 h-0.5 mb-1 transition-all ${scrolled ? "bg-evh-dark" : "bg-white"}`} />
          <div className={`w-5 h-0.5 mb-1 transition-all ${scrolled ? "bg-evh-dark" : "bg-white"}`} />
          <div className={`w-5 h-0.5 transition-all ${scrolled ? "bg-evh-dark" : "bg-white"}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-evh-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-evh-gray-600 hover:text-evh-dark py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/portal/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-2.5 bg-evh-yellow text-evh-dark text-sm font-semibold rounded-xl"
              >
                Customer Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
