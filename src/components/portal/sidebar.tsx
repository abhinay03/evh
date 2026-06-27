"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const navItems = [
  { href: "/portal/dashboard", labelKey: "sidebar.dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/portal/heating", labelKey: "sidebar.heating", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
  { href: "/portal/electricity", labelKey: "sidebar.electricity", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { href: "/portal/bills", labelKey: "sidebar.bills", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/portal/rewards", labelKey: "sidebar.rewards", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" },
  { href: "/portal/community", labelKey: "sidebar.community", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { href: "/portal/sustainability", labelKey: "sidebar.sustainability", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { href: "/portal/ai-assistant", labelKey: "sidebar.ai", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { href: "/portal/heatscan", labelKey: "sidebar.heatscan", icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { href: "/portal/profile", labelKey: "sidebar.profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { href: "/portal/settings", labelKey: "sidebar.settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { customer } = useAuth();
  const { t, locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white dark:bg-slate-800 card-shadow"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5 text-evh-dark dark:text-slate-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-slate-900 border-r border-evh-gray-100 dark:border-slate-700 flex flex-col transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-6 border-b border-evh-gray-100 dark:border-slate-700 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-lg font-display font-bold text-evh-dark dark:text-white">EVH</span>
            <span className="w-2 h-2 rounded-full bg-evh-primary" />
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLocale(locale === "de" ? "en" : "de")}
              className="px-2 py-1 rounded-md text-xs font-semibold bg-evh-gray-100 dark:bg-slate-800 text-evh-dark dark:text-slate-200 hover:bg-evh-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={t("common.language.switch")}
            >
              {locale === "de" ? "EN" : "DE"}
            </button>
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-evh-gray-100 dark:bg-slate-800 text-evh-gray-500 dark:text-slate-400 hover:bg-evh-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={t("common.theme.switch")}
            >
              <svg className={`w-3.5 h-3.5 ${theme === "light" ? "text-red-500" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg className={`w-3 h-3 ${theme === "dark" ? "text-red-300" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-evh-primary/10 text-evh-primary-vivid dark:bg-evh-primary/20 dark:text-red-300"
                    : "text-evh-gray-500 dark:text-slate-400 hover:bg-evh-gray-50 dark:hover:bg-slate-800 hover:text-evh-dark dark:hover:text-slate-200"
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-evh-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-evh-primary to-evh-primary-vivid flex items-center justify-center text-xs font-bold text-white shrink-0">
              {customer?.name?.charAt(0) || "M"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-evh-dark dark:text-slate-200 truncate">{customer?.name || "Mariana"}</p>
              <p className="text-xs text-evh-gray-400 dark:text-slate-500 truncate">{customer?.email || "demo@evh.de"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
