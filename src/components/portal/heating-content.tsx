"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "@/components/shared/chart";
import { usageData } from "@/lib/mock-data";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const schedule = [
  { time: "05:30", temp: 20, labelKey: "heating.wake.up" },
  { time: "08:00", temp: 18, labelKey: "heating.away" },
  { time: "16:00", temp: 21, labelKey: "heating.evening" },
  { time: "22:00", temp: 17, labelKey: "heating.night" },
];

const recommendationsKeys = [
  "heating.rec.1",
  "heating.rec.2",
  "heating.rec.3",
];

export function HeatingContent() {
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
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("heating.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("heating.subtitle")}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("heating.consumption")}</p>
              <Badge variant="success">↓ 8% {t("heating.vs.last.month")}</Badge>
            </div>
            <Chart
              data={usageData.map((d) => ({ label: d.month, value: d.heating }))}
              height={200}
              showGrid
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col items-center justify-center h-full">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("heating.efficiency")}</p>
            <div className="w-32 h-32 rounded-full bg-evh-primary/10 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="54" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle
                  cx="64" cy="64" r="54" fill="none" stroke="#E40000" strokeWidth="8"
                  strokeDasharray={`${(82 / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                  initial={{ strokeDasharray: `0 ${2 * Math.PI * 54}` }}
                  animate={{ strokeDasharray: `${(82 / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}` }}
                  transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-evh-dark dark:text-white">82</p>
                <p className="text-xs text-evh-gray-400 dark:text-slate-500">/100</p>
              </div>
            </div>
            <p className="text-xs text-evh-gray-500 dark:text-slate-400 mt-4">{t("heating.neighbourhood.avg")}: 74</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("heating.schedule")}</p>
            <div className="space-y-3">
              {schedule.map((s) => (
                <div key={s.time} className="flex items-center justify-between p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-medium text-evh-gray-400 dark:text-slate-500">{s.time}</span>
                    <span className="text-sm text-evh-gray-600 dark:text-slate-300">{t(s.labelKey)}</span>
                  </div>
                  <span className="text-lg font-display font-semibold text-evh-dark dark:text-white">{s.temp}°</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("heating.ai.recs")}</p>
            <div className="space-y-3">
              {recommendationsKeys.map((key, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800">
                  <span className="text-lg shrink-0">💡</span>
                  <p className="text-sm text-evh-dark dark:text-white">{t(key)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("heating.maintenance")}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-evh-dark dark:text-white">{t("heating.inspection")}</p>
                <p className="text-xs text-evh-gray-400 dark:text-slate-500">15 March 2024</p>
              </div>
              <Badge variant="success">{t("heating.completed")}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-evh-dark dark:text-white">{t("heating.filter")}</p>
                <p className="text-xs text-evh-gray-400 dark:text-slate-500">20 September 2024</p>
              </div>
              <Badge variant="warning">{t("heating.scheduled")}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
