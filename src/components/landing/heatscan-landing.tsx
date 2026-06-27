"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

const easeOut = [0.25, 0.1, 0.25, 1] as const;

export function HeatScanLanding() {
  const { t } = useLocale();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAFA] dark:bg-[#0b1121]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#E40000]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E40000]/10 dark:bg-[#E40000]/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E40000] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#E40000] uppercase tracking-[0.15em]">{t("heatscanLanding.badge")}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#16233A] dark:text-white leading-[1.1] tracking-tight">
              {t("heatscanLanding.title.line1")}
              <br />
              {t("heatscanLanding.title.line2")}{" "}
              <span className="text-[#E40000]">{t("heatscanLanding.title.highlight")}</span>
            </h2>

            <p className="mt-5 text-base md:text-lg text-[#64748B] dark:text-slate-400 leading-relaxed max-w-lg">
              {t("heatscanLanding.description")}{" "}
              <span className="text-[#16233A] dark:text-white font-medium">{t("heatscanLanding.description.highlight")}</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/portal/heatscan"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#E40000] text-white text-sm font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:bg-[#c62828] active:scale-[0.97] shadow-[0_4px_14px_-4px_rgba(228,0,0,0.4)]"
              >
                <span className="relative z-10">{t("heatscanLanding.cta.scan")}</span>
                <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Link>
              <Link
                href="#how-it-works"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-[#E40000]/20 text-[#16233A] dark:text-white text-sm font-semibold rounded-xl transition-all duration-500 hover:border-[#E40000]/40 active:scale-[0.97]"
              >
                {t("heatscanLanding.cta.howItWorks")}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex items-center gap-8 pt-8 border-t border-[#E2E8F0] dark:border-slate-800">
              <div>
                <p className="text-2xl font-display font-bold text-[#16233A] dark:text-white">4</p>
                <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mt-1">{t("heatscanLanding.stat.demoSystems")}</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-[#16233A] dark:text-white">96%</p>
                <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mt-1">{t("heatscanLanding.stat.avgConfidence")}</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-[#16233A] dark:text-white">5</p>
                <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mt-1">{t("heatscanLanding.stat.healthFactors")}</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-2xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden border border-[#E2E8F0] dark:border-slate-700">
              {/* Card header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E2E8F0] dark:border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E40000]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                </div>
                <span className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider ml-2">{t("heatscanLanding.card.header")}</span>
              </div>

              {/* Card content — report preview */}
              <div className="p-5 space-y-4">
                {/* Status bar */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  <span className="text-xs font-semibold text-[#16233A] dark:text-white">{t("heatscanLanding.card.status.complete")}</span>
                  <span className="ml-auto text-[10px] text-[#94A3B8]">{t("heatscanLanding.card.status.confidence")}</span>
                </div>

                {/* Product info */}
                <div className="flex gap-4 p-3 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#F1F5F9] dark:bg-slate-700">
                    <div className="w-full h-full bg-gradient-to-br from-[#E40000]/10 to-transparent flex items-center justify-center">
                      <svg className="w-7 h-7 text-[#E40000]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#16233A] dark:text-white">Viessmann Vitodens 200-W</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#64748B] dark:text-slate-400">
                      <span>Gas Boiler</span>
                      <span>Installed 2012</span>
                      <span>Age: 13 yrs</span>
                    </div>
                  </div>
                </div>

                {/* Mini health gauge row */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                        <motion.circle
                          cx="20" cy="20" r="16" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"
                          strokeDasharray={`${(74 / 100) * 2 * Math.PI * 16} ${2 * Math.PI * 16}`}
                          initial={{ strokeDasharray: `0 ${2 * Math.PI * 16}` }}
                          whileInView={{ strokeDasharray: `${(74 / 100) * 2 * Math.PI * 16} ${2 * Math.PI * 16}` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: easeOut }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#16233A] dark:text-white">74</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#16233A] dark:text-white">{t("heatscanLanding.card.healthScore.label")}</p>
                      <p className="text-[10px] text-[#94A3B8]">{t("heatscanLanding.card.healthScore.value")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#16A34A]">€460/yr</p>
                    <p className="text-[10px] text-[#94A3B8]">{t("heatscanLanding.card.savings")}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#E40000] to-[#16A34A]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "74%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: easeOut }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                  <span>{t("heatscanLanding.card.scale.poor")}</span>
                  <span className="font-medium text-[#16233A] dark:text-white">74/100</span>
                  <span>{t("heatscanLanding.card.scale.excellent")}</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5, ease: easeOut }}
              className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-[#E2E8F0] dark:border-slate-700 flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-[#16233A] dark:text-white">{t("heatscanLanding.card.badge")}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
