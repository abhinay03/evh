"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";
import { sustainabilityData } from "@/lib/mock-data";

export function SustainabilityContent() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();
  const [data, setData] = useState(sustainabilityData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("sust.portal.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("sust.portal.subtitle")}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-display font-bold text-green-600">{data.co2Saved.toLocaleString("de-DE")}</p>
            <p className="text-xs text-evh-gray-500 dark:text-slate-400 mt-1">{t("sust.portal.co2")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-display font-bold text-evh-primary">{data.treesEquivalent.toLocaleString("de-DE")}</p>
            <p className="text-xs text-evh-gray-500 dark:text-slate-400 mt-1">{t("sust.portal.trees")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-display font-bold text-evh-accent">{data.renewableGeneration} GWh</p>
            <p className="text-xs text-evh-gray-500 dark:text-slate-400 mt-1">{t("sust.portal.renewable")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-display font-bold text-evh-success">{data.homesConnected.toLocaleString("de-DE")}</p>
            <p className="text-xs text-evh-gray-500 dark:text-slate-400 mt-1">{t("sust.portal.homes")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("sust.portal.target")}</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-evh-dark dark:text-white font-medium">{t("sust.portal.adoption")}</span>
                  <span className="text-evh-gray-500 dark:text-slate-400">{data.districtHeatingAdoption}%</span>
                </div>
                <div className="w-full h-2 bg-evh-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-evh-primary rounded-full" style={{ width: `${(data.districtHeatingAdoption / 70) * 100}%` }} />
                </div>
                <p className="text-xs text-evh-gray-400 dark:text-slate-500 mt-1">{t("sust.portal.target.adoption")}</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-evh-dark dark:text-white font-medium">{t("sust.portal.homes")}</span>
                  <span className="text-evh-gray-500 dark:text-slate-400">{data.homesConnected.toLocaleString("de-DE")}</span>
                </div>
                <div className="w-full h-2 bg-evh-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-evh-accent rounded-full" style={{ width: `${(data.homesConnected / data.futureTarget) * 100}%` }} />
                </div>
                <p className="text-xs text-evh-gray-400 dark:text-slate-500 mt-1">{t("sust.portal.target.homes", { target: data.futureTarget.toLocaleString("de-DE") })}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("sust.portal.impact")}</p>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🌱</span>
                <div>
                  <p className="text-2xl font-display font-bold text-green-700">Lower than average</p>
                  <p className="text-sm text-green-600">Your carbon footprint is 18% lower than similar homes in Halle.</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60">
                  <p className="text-lg font-bold text-evh-dark dark:text-white">0.8 t</p>
                  <p className="text-xs text-evh-gray-500 dark:text-slate-400">{t("sust.portal.co2.saved")}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60">
                  <p className="text-lg font-bold text-evh-gray-400 dark:text-slate-500">1.2 t</p>
                  <p className="text-xs text-evh-gray-500 dark:text-slate-400">Neighbour avg</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Contribution to Halle</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Community projects", value: "12", icon: "🤝" },
              { label: "Trees planted", value: "1,200", icon: "🌳" },
              { label: "Schools engaged", value: "5", icon: "🏫" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-evh-gray-50 dark:bg-slate-800 text-center">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <p className="text-xl font-display font-bold text-evh-dark dark:text-white">{item.value}</p>
                <p className="text-xs text-evh-gray-500 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
