"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

const steps = [
  {
    number: "01",
    titleKey: "dh.step.1.title",
    descKey: "dh.step.1.desc",
    gradient: "from-[#E53935] to-[#FF6B6B]",
  },
  {
    number: "02",
    titleKey: "dh.step.2.title",
    descKey: "dh.step.2.desc",
    gradient: "from-[#D32F2F] to-[#E53935]",
  },
  {
    number: "03",
    titleKey: "dh.step.3.title",
    descKey: "dh.step.3.desc",
    gradient: "from-[#B71C1C] to-[#D32F2F]",
  },
];

export function DistrictHeating() {
  const { t } = useLocale();

  return (
    <section id="district-heating" className="relative py-32 md:py-40 bg-[#FAFAFA] dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("dh.label")}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#16233A] dark:text-white leading-[1.05] max-w-4xl">
            {t("dh.title.line1")}
            <br />
            <span className="text-[#94A3B8]">{t("dh.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.12}>
              <div className="group relative p-8 md:p-10 rounded-[1.75rem] bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 h-full border border-white/50">
                {/* Step number */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {index === 0 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      ) : index === 1 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      )}
                    </svg>
                  </div>
                  <span className="text-7xl font-display font-bold text-[#E53935]/8 select-none leading-none">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold text-[#16233A] dark:text-white mb-3 group-hover:text-[#E53935] transition-colors duration-300">
                  {t(step.titleKey)}
                </h3>
                <p className="text-[#64748B] dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  {t(step.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-8">
          <ScrollReveal delay={0.3}>
            <div className="relative p-8 md:p-10 rounded-[1.75rem] bg-[#16233A] text-white overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-[0.03]">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <pattern id="pipe-pattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                      <rect width="40" height="20" fill="none" stroke="#E53935" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="800" height="200" fill="url(#pipe-pattern)" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#E53935]/5 to-transparent" />
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {[
                  { value: "42,000", labelKey: "dh.stat.1.label" },
                  { value: "64%", labelKey: "dh.stat.2.label" },
                  { value: "€340", labelKey: "dh.stat.3.label" },
                  { value: "12", labelKey: "dh.stat.4.label" },
                ].map((stat, i) => (
                  <div
                    key={stat.labelKey}
                    className={`text-center ${i > 0 ? "md:border-l border-white/10" : ""}`}
                  >
                    <p className="text-3xl md:text-4xl font-display font-bold text-[#E53935]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/40 mt-1.5 font-medium tracking-wide uppercase">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="relative mt-8 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#E53935] to-[#FF6B6B] rounded-full relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animation: "loading-bar 2s ease-in-out infinite" }} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.4} className="mt-10 text-center">
          <Link
            href="/portal/login"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#16233A] text-white text-base font-semibold rounded-2xl hover:bg-[#1e293b] transition-all duration-300 shadow-lg active:scale-[0.98]"
          >
            {t("dh.cta")}
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
