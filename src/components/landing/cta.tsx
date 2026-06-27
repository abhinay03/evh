"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

export function CtaSection() {
  const { t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden bg-[#FAFAFA] dark:bg-slate-950">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E53935]/3 via-transparent to-[#16233A]/5" />

      <motion.div
        style={{ scale, opacity }}
        className="max-w-5xl mx-auto px-6 relative"
      >
        <div className="relative rounded-[2.5rem] bg-[#16233A] overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E53935]/10 to-transparent" />
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#E53935]/10 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#E53935]/8 blur-[100px]" />

          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <ScrollReveal>
              <p className="text-[#E53935] font-medium text-sm tracking-[0.2em] uppercase mb-6">
                EVH — {t("hero.title.line1")} {t("hero.title.line2")}
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] max-w-3xl mx-auto">
                {t("cta.title.line1")}
                <br />
                <span className="text-[#E53935]">{t("cta.title.line2")}</span>
              </h2>
              <p className="mt-6 text-lg text-white/40 max-w-xl mx-auto leading-relaxed font-light">
                {t("cta.description")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/portal/login"
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-[#E53935] text-white text-base font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:bg-[#c62828] active:scale-[0.97] shadow-[0_4px_20px_-4px_rgba(229,57,53,0.5)]"
                >
                  <span className="relative z-10">{t("cta.cta.getStarted")}</span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Link>
                <Link
                  href="#district-heating"
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 text-white text-base font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:border-white/30 hover:bg-white/5 active:scale-[0.97]"
                >
                  <span className="relative z-10">{t("cta.cta.learnMore")}</span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: "42,000+", labelKey: "cta.stat.homesConnected" },
                    { value: "64%", labelKey: "cta.stat.adoptionRate" },
                    { value: "84,700t", labelKey: "cta.stat.co2Saved" },
                    { value: "99.8%", labelKey: "cta.stat.reliability" },
                  ].map((stat) => (
                    <div key={stat.labelKey} className="text-center">
                      <p className="text-2xl md:text-3xl font-display font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-white/30 mt-1 font-medium">{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
