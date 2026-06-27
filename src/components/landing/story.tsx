"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

export function Story() {
  const { t } = useLocale();

  const timeline = [
    {
      time: "06:30",
      icon: "🌅",
      titleKey: "story.timeline.1.title",
      descKey: "story.timeline.1.desc",
    },
    {
      time: "08:00",
      icon: "☕",
      titleKey: "story.timeline.2.title",
      descKey: "story.timeline.2.desc",
    },
    {
      time: "12:00",
      icon: "🏙️",
      titleKey: "story.timeline.3.title",
      descKey: "story.timeline.3.desc",
    },
    {
      time: "18:00",
      icon: "🏠",
      titleKey: "story.timeline.4.title",
      descKey: "story.timeline.4.desc",
    },
    {
      time: "22:00",
      icon: "🌙",
      titleKey: "story.timeline.5.title",
      descKey: "story.timeline.5.desc",
    },
  ];

  return (
    <section id="about" className="relative py-32 md:py-40 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-[#E53935]/3 to-transparent blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-blue-500/3 to-transparent blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("story.label")}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#16233A] dark:text-white leading-[1.05] max-w-3xl">
            {t("story.title.line1")}
            <br />
            <span className="text-[#94A3B8]">{t("story.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-24 md:mt-32 relative">
          {/* Timeline line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E53935]/40 via-[#E53935]/10 to-transparent hidden md:block" />

          <div className="space-y-20 md:space-y-32">
            {timeline.map((item, index) => (
              <ScrollReveal key={item.time} delay={index * 0.1}>
                <div
                  className={`flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 1 ? "md:text-right md:pr-16" : "md:pl-16"}`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E53935]/10 text-[#E53935] text-[11px] font-semibold tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                      {item.time}
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-[#16233A] dark:text-white mb-3">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-base md:text-lg text-[#64748B] dark:text-slate-400 leading-relaxed max-w-md">
                      {t(item.descKey)}
                    </p>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 hidden md:flex items-center justify-center w-[46px] shrink-0">
                    <div className="w-[46px] h-[46px] rounded-full bg-white dark:bg-slate-900 border-2 border-[#E53935]/20 flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 rounded-full bg-[#E53935]" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
