"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { useLocale } from "@/context/locale-context";

function AnimatedStat({ target, suffix, label }: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target, 2200);
  return (
    <div ref={ref} className="mb-2">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-4xl font-display font-bold text-[#E53935]">
          {count.toLocaleString("de-DE")}{suffix}
        </span>
      </div>
      <span className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

const reasons = [
  {
    target: 100,
    suffix: "%",
    labelKey: "why.reason.1.statlabel",
    titleKey: "why.reason.1.title",
    descKey: "why.reason.1.desc",
    icon: "🏛️",
  },
  {
    target: 998,
    suffix: "%",
    labelKey: "why.reason.2.statlabel",
    titleKey: "why.reason.2.title",
    descKey: "why.reason.2.desc",
    icon: "⚡",
    format: (v: number) => (v / 10).toFixed(1),
  },
  {
    target: 84700,
    suffix: " t",
    labelKey: "why.reason.3.statlabel",
    titleKey: "why.reason.3.title",
    descKey: "why.reason.3.desc",
    icon: "🌿",
  },
  {
    target: 12,
    suffix: "",
    labelKey: "why.reason.4.statlabel",
    titleKey: "why.reason.4.title",
    descKey: "why.reason.4.desc",
    icon: "🤝",
  },
];

export function WhyEvh() {
  const { t } = useLocale();

  return (
    <section className="relative py-32 md:py-40 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-1/4 h-1/2 bg-gradient-radial from-[#E53935]/3 to-transparent blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-1/4 h-1/2 bg-gradient-radial from-blue-500/3 to-transparent blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("why.label")}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#16233A] dark:text-white leading-[1.05] max-w-2xl">
            {t("why.title.line1")}
            <br />
            <span className="text-[#94A3B8]">{t("why.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.titleKey} delay={index * 0.1}>
              <div className="group p-8 md:p-10 rounded-[1.75rem] bg-[#F8FAFC] dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 transition-all duration-500 h-full border border-white/50 dark:border-slate-700/50 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.08)]">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#16233A] dark:bg-slate-700 flex items-center justify-center text-lg shrink-0">
                    {reason.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <StatDisplay reason={reason} t={t} />
                    <h3 className="text-lg font-display font-semibold text-[#16233A] dark:text-white mb-2 group-hover:text-[#E53935] transition-colors duration-300">
                      {t(reason.titleKey)}
                    </h3>
                    <p className="text-[#64748B] dark:text-slate-400 leading-relaxed text-sm">
                      {t(reason.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatDisplay({ reason, t }: { reason: typeof reasons[0]; t: (k: string) => string }) {
  const { count, ref } = useCountUp(reason.target, 2200);
  const display = reason.format?.(count) ?? count.toLocaleString("de-DE");
  return (
    <div ref={ref} className="mb-2">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-4xl font-display font-bold text-[#E53935]">
          {display}{reason.suffix}
        </span>
      </div>
      <span className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
        {t(reason.labelKey)}
      </span>
    </div>
  );
}
