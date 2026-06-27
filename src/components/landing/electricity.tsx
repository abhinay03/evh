"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const features = [
  { icon: "🌱", titleKey: "el.feature.1.title", descKey: "el.feature.1.desc" },
  { icon: "📊", titleKey: "el.feature.2.title", descKey: "el.feature.2.desc" },
  { icon: "☀️", titleKey: "el.feature.3.title", descKey: "el.feature.3.desc" },
  { icon: "🔌", titleKey: "el.feature.4.title", descKey: "el.feature.4.desc" },
];

export function ElectricitySection() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();

  return (
    <section id="electricity" className="py-24 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-widest uppercase mb-4">
            {t("el.label")}
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[#16233A] dark:text-white leading-tight max-w-2xl">
            {t("el.title.line1")}
            <br />
            <span className="text-[#94A3B8] dark:text-slate-400">{t("el.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.titleKey} delay={index * 0.08}>
              <div className="p-6 rounded-[1.25rem] bg-[#F8FAFC] dark:bg-slate-800 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 group hover:bg-white dark:hover:bg-slate-700">
                <span className="text-2xl mb-3 block">{feature.icon}</span>
                <h3 className="text-base font-semibold text-[#16233A] dark:text-white mb-1">{t(feature.titleKey)}</h3>
                <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">{t(feature.descKey)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
