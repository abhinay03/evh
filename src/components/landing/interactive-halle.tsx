"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { neighbourhoods, type Neighbourhood } from "@/lib/mock-data";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const getStatusColor = (available: boolean, planned: boolean) => {
  if (available) return "border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20";
  if (planned) return "border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20";
  return "border-evh-gray-200 dark:border-slate-600 bg-[#F8FAFC] dark:bg-slate-800";
};

export function InteractiveHalle() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();
  const [selected, setSelected] = useState<Neighbourhood | null>(null);

  const getStatusText = useCallback((available: boolean, planned: boolean) => {
    if (available) return t("halle.status.connected");
    if (planned) return t("halle.status.soon");
    return t("halle.status.na");
  }, [t]);

  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-widest uppercase mb-4">
            {t("halle.label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#16233A] dark:text-white leading-tight max-w-3xl">
            {t("halle.title.line1")}
            <br />
            <span className="text-[#94A3B8] dark:text-slate-400">{t("halle.title.line2")}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {neighbourhoods.map((hood, index) => (
            <ScrollReveal key={hood.id} delay={index * 0.05}>
              <motion.button
                onClick={() => setSelected(selected?.id === hood.id ? null : hood)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 md:p-5 rounded-[1.5rem] border-2 transition-all duration-300 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] ${getStatusColor(hood.districtHeating, hood.expansionPlanned)} ${
                  selected?.id === hood.id ? "ring-2 ring-[#E53935] shadow-lg" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-[#16233A] dark:text-white">{hood.name}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    hood.districtHeating ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200" :
                    hood.expansionPlanned ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200" :
                    "bg-evh-gray-200 dark:bg-slate-600 text-[#64748B] dark:text-slate-300"
                  }`}>
                    {getStatusText(hood.districtHeating, hood.expansionPlanned)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8] dark:text-slate-400">{t("halle.carbon.saved")}</span>
                    <span className="font-medium text-[#16233A] dark:text-white">{hood.carbonSaved.toLocaleString("de-DE")} kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8] dark:text-slate-400">{t("halle.renewable")}</span>
                    <span className="font-medium text-[#16233A] dark:text-white">{hood.renewablePercentage}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#94A3B8] dark:text-slate-400">{t("halle.homes")}</span>
                    <span className="font-medium text-[#16233A] dark:text-white">{hood.homesConnected.toLocaleString("de-DE")}</span>
                  </div>
                </div>
                <div className="mt-3 w-full h-1.5 bg-evh-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E53935] rounded-full transition-all duration-700"
                    style={{ width: `${hood.renewablePercentage}%` }}
                  />
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 overflow-hidden"
            >
              <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 md:p-10 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-[#16233A] dark:text-white">
                      {selected.name}
                    </h3>
                    <p className="text-[#64748B] dark:text-slate-400 mt-1">
                      {selected.districtHeating
                        ? t("halle.connected")
                        : selected.expansionPlanned
                          ? `${t("halle.planned.for")} ${selected.expansionYear}`
                          : t("halle.not.in.plan")}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 hover:bg-evh-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5 text-[#94A3B8] dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-[1.25rem] bg-[#F8FAFC] dark:bg-slate-800">
                    <p className="text-2xl font-bold text-[#16233A] dark:text-white">{selected.carbonSaved.toLocaleString("de-DE")}</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">{t("halle.kg.saved")}</p>
                  </div>
                  <div className="p-4 rounded-[1.25rem] bg-[#F8FAFC] dark:bg-slate-800">
                    <p className="text-2xl font-bold text-[#16233A] dark:text-white">{selected.renewablePercentage}%</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">{t("halle.renewable.energy")}</p>
                  </div>
                  <div className="p-4 rounded-[1.25rem] bg-[#F8FAFC] dark:bg-slate-800">
                    <p className="text-2xl font-bold text-[#16233A] dark:text-white">{selected.homesConnected.toLocaleString("de-DE")}</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">{t("halle.homes.connected")}</p>
                  </div>
                  <div className="p-4 rounded-[1.25rem] bg-[#F8FAFC] dark:bg-slate-800">
                    <p className="text-2xl font-bold text-[#16233A] dark:text-white">{selected.communityProjects}</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">{t("halle.community.projects")}</p>
                  </div>
                </div>

                {selected.expansionPlanned && (
                  <div className="mt-6 p-4 rounded-[1.25rem] bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      🚧 {t("halle.expansion.notice", { year: selected.expansionYear!, homes: selected.homesConnected })}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
