"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { communityEvents } from "@/lib/mock-data";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const highlights = [
  { icon: "🌳", count: "1,200", labelKey: "community.trees" },
  { icon: "🏫", count: "5", labelKey: "community.schools" },
  { icon: "⚽", count: "8", labelKey: "community.sports" },
  { icon: "🤝", count: "12", labelKey: "community.projects" },
];

export function CommunitySection() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();

  return (
    <section id="community" className="py-32 bg-[#FAFAFA] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E53935]/10 rounded-full text-[#E53935] text-xs font-semibold uppercase tracking-wider mb-4">
            {t("community.label")}
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#16233A] dark:text-white leading-tight max-w-3xl">
            {t("community.title.line1")}
            <br />
            <span className="text-[#94A3B8] dark:text-slate-400">{t("community.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.labelKey} delay={i * 0.05}>
              <div className="p-6 rounded-[1.25rem] bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)] text-center hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-3xl mb-2 block">{h.icon}</span>
                <p className="text-2xl font-display font-bold text-[#16233A] dark:text-white">{h.count}</p>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">{t(h.labelKey)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16">
          <ScrollReveal>
            <h3 className="text-xl font-display font-semibold text-[#16233A] dark:text-white mb-6">{t("community.events.title")}</h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {communityEvents.slice(0, 3).map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.1}>
                <div className="group rounded-[1.75rem] bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500">
                  <div className="h-40 bg-[#F1F5F9] dark:bg-slate-800 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E53935]/10 text-[#E53935]">
                        {event.type}
                      </span>
                      <span className="text-xs text-[#94A3B8] dark:text-slate-400">{event.date}</span>
                    </div>
                    <h4 className="text-base font-semibold text-[#16233A] dark:text-white mb-1">{event.title}</h4>
                    <p className="text-sm text-[#64748B] dark:text-slate-400">{event.location}</p>
                    <p className="text-xs text-[#94A3B8] dark:text-slate-400 mt-2">{event.participants} {t("community.participants")}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
