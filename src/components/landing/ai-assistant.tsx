"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useLocale } from "@/context/locale-context";

export function AiAssistantPreview() {
  const { t, locale } = useLocale();

  return (
    <section className="py-32 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-widest uppercase mb-4">
            {t("ai.label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#16233A] dark:text-white leading-tight max-w-3xl">
            {t("ai.title.line1")}
            <br />
            <span className="text-[#94A3B8] dark:text-slate-400">{t("ai.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg"
          >
            <div className="glass rounded-[1.75rem] p-1 animate-float">
              <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src="/images/Thermo-Toni.png"
                    alt="Thermo-Toni"
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#16233A] dark:text-white">{t("ai.preview.title")}</p>
                    <p className="text-xs text-[#94A3B8] dark:text-slate-400">{t("ai.preview.status")}</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img
                      src="/images/Thermo-Toni.png"
                      alt="Thermo-Toni"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 p-4 rounded-[1.25rem] bg-[#F8FAFC] dark:bg-slate-700 text-sm text-[#16233A] dark:text-white leading-relaxed">
                      {t("ai.preview.message")}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button className="px-5 py-2.5 bg-[#16233A] text-white text-sm font-semibold rounded-xl hover:bg-[#334155] transition-all duration-300 active:scale-[0.97]">
                      {t("ai.preview.yes")}
                    </button>
                    <button className="px-5 py-2.5 border border-[#E2E8F0] dark:border-slate-600 text-[#475569] dark:text-slate-300 text-sm font-medium rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-slate-700 transition-all duration-300 active:scale-[0.97]">
                      {t("ai.preview.no")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <ScrollReveal delay={0.3} className="mt-8 text-center">
          <p className="text-sm text-[#94A3B8] dark:text-slate-400 max-w-md mx-auto">
            {t("ai.preview.footer")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
