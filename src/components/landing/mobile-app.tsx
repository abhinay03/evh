"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { IphoneMockup } from "@/components/shared/iphone-mockup";
import { useLocale } from "@/context/locale-context";

const features = [
  { icon: "📊", titleKey: "app.feature.1.title", descKey: "app.feature.1.desc" },
  { icon: "🔥", titleKey: "app.feature.2.title", descKey: "app.feature.2.desc" },
  { icon: "🎁", titleKey: "app.feature.3.title", descKey: "app.feature.3.desc" },
  { icon: "🌱", titleKey: "app.feature.4.title", descKey: "app.feature.4.desc" },
  { icon: "💬", titleKey: "app.feature.5.title", descKey: "app.feature.5.desc" },
];

export function MobileApp() {
  const { t, locale } = useLocale();

  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-widest uppercase mb-4">
            {t("app.label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#16233A] dark:text-white leading-tight max-w-3xl">
            {t("app.title.line1")}
            <br />
            <span className="text-[#94A3B8] dark:text-slate-400">{t("app.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.titleKey} delay={i * 0.08} direction="left">
                <div className="flex gap-4 items-start group p-4 rounded-[1.25rem] hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
                  <span className="text-2xl shrink-0">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[#16233A] dark:text-white">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-[#64748B] dark:text-slate-400">{t(feature.descKey)}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="order-1 md:order-2">
            <ScrollReveal direction="right">
              <IphoneMockup />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
