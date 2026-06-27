"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useLocale } from "@/context/locale-context";

const stats = [
  { target: 84700, suffix: " t", labelKey: "sust.stat.1.label", color: "text-green-500 dark:text-green-400" },
  { target: 186000, suffix: " MWh", labelKey: "sust.stat.2.label", color: "text-[#E53935]" },
  { target: 64, suffix: "%", labelKey: "sust.stat.3.label", color: "text-[#16233A] dark:text-white" },
  { target: 42000, suffix: "+", labelKey: "sust.stat.4.label", color: "text-[#16A34A] dark:text-green-400" },
];

export function SustainabilitySection() {
  const { t } = useLocale();

  return (
    <section id="sustainability" className="relative py-32 md:py-40 bg-[#FAFAFA] dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("sust.label")}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#16233A] dark:text-white leading-[1.05] max-w-3xl mb-4">
            {t("sust.title.line1")}
            <br />
            <span className="text-[#94A3B8]">{t("sust.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.labelKey} delay={i * 0.1}>
              <div className="p-8 rounded-[1.75rem] bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-500 text-center group border border-white/50">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2500}
                  label={t(stat.labelKey)}
                  valueClassName={stat.color}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-10">
          <div className="p-8 md:p-12 rounded-[1.75rem] bg-[#16233A] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E53935]/5 to-transparent" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">
                {t("sust.target.title")}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl md:text-4xl font-display font-bold text-[#E53935]">95,000</p>
                  <p className="text-sm text-white/40 mt-1">{t("sust.target.1.label")}</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-display font-bold text-[#E53935]">100%</p>
                  <p className="text-sm text-white/40 mt-1">{t("sust.target.2.label")}</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-display font-bold text-[#E53935]">70%</p>
                  <p className="text-sm text-white/40 mt-1">{t("sust.target.3.label")}</p>
                </div>
              </div>
              <div className="mt-8 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[64%] bg-gradient-to-r from-[#E53935] to-[#FF6B6B] rounded-full relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animation: "loading-bar 2s ease-in-out infinite" }} />
                </div>
              </div>
              <p className="text-xs text-white/30 mt-2">
                {t("sust.towards", { pct: "64" })}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
