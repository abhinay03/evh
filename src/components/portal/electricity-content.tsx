"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "@/components/shared/chart";
import { usageData } from "@/lib/mock-data";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

export function ElectricityContent() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("electricity.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("electricity.subtitle")}</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("electricity.consumption")}</p>
            <Badge variant="info">{t("electricity.green.badge")}</Badge>
          </div>
          <Chart
            data={usageData.map((d) => ({ label: d.month, value: d.electricity }))}
            height={200}
            color="#2563EB"
            showGrid
          />
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("electricity.mix")}</p>
            <p className="text-xl font-display font-bold text-green-600 mt-2">100%</p>
            <p className="text-xs text-evh-gray-500 dark:text-slate-400 mt-1">{t("electricity.renewable")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("electricity.peak")}</p>
            <p className="text-xl font-display font-bold text-evh-dark dark:text-white mt-2">17:00 - 21:00</p>
            <p className="text-xs text-evh-gray-500 dark:text-slate-400 mt-1">{t("electricity.peak.desc")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("electricity.solar")}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl">☀️</span>
              <p className="text-sm font-medium text-evh-dark dark:text-white">{t("electricity.solar.available")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("electricity.ev")}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl">🔌</span>
              <p className="text-sm font-medium text-evh-dark dark:text-white">{t("electricity.ev.na")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("electricity.rec.title")}</p>
          <div className="space-y-3">
            {["electricity.rec.1", "electricity.rec.2", "electricity.rec.3"].map((key, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800">
                <span className="text-lg shrink-0">💡</span>
                <p className="text-sm text-evh-dark dark:text-white">{t(key)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
