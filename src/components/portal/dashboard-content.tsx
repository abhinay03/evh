"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "@/components/shared/chart";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";
import { usageData } from "@/lib/mock-data";

interface DashboardData {
  weather: { temperature: number; condition: string; humidity: number; windSpeed: number };
  totalSavings: number;
  energyScore: number;
  lastYearComparison: number;
}

export function DashboardContent() {
  const { customer } = useAuth();
  const { t, locale } = useLocale();
  const { theme } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/dashboard?customerId=${customer?.id || "CUST-001"}`);
        const json = await res.json();
        setData({
          weather: json.weather,
          totalSavings: json.totalSavings,
          energyScore: json.energyScore,
          lastYearComparison: json.lastYearComparison,
        });
      } catch {
        setData({
          weather: { temperature: 6, condition: "Cloudy", humidity: 72, windSpeed: 14 },
          totalSavings: 210,
          energyScore: 82,
          lastYearComparison: -12,
        });
      }
      setLoading(false);
    }
    fetchData();
  }, [customer]);

  const ease = [0.25, 0.1, 0.25, 1] as const;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  };

  if (loading || !data) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-evh-gray-100 dark:bg-slate-700 rounded-xl animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-evh-gray-50 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6 space-y-6"
    >
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">
            {t("dashboard.greeting", { name: customer?.name || "Mariana" })}
          </h1>
          <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("dashboard.subtitle")}</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 card-shadow">
          <span className="text-2xl">{data.weather.temperature > 5 ? "☁️" : "❄️"}</span>
          <div>
            <p className="text-sm font-semibold text-evh-dark dark:text-white">{data.weather.temperature}°C</p>
            <p className="text-xs text-evh-gray-400 dark:text-slate-500">{data.weather.condition}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* HeatScan AI Hero Card */}
        <Link
          href="/portal/heatscan"
          className="relative col-span-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#E40000] via-[#cc0000] to-[#16233A] p-0.5 group"
        >
          <div className="rounded-2xl bg-gradient-to-br from-[#E40000] via-[#E40000]/95 to-[#16233A] p-5 md:p-6 h-full">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-semibold text-white/80 uppercase tracking-wider">New</span>
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                  HeatScan <span className="text-white/70">AI</span>
                </h2>
                <p className="text-sm text-white/70 max-w-xl leading-relaxed">
                  Know your heating system in seconds. Upload a photo and get an instant AI-powered health report, cost analysis, and personalised recommendation.
                </p>
                <div className="flex items-center gap-6 pt-1">
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <svg className="w-4 h-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI-Powered Analysis
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <svg className="w-4 h-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Free & Instant
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <svg className="w-4 h-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    No Obligation
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </motion.div>
                <span className="flex items-center gap-1.5 text-xs text-white/70 font-medium bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                  Check Your Heating
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("dashboard.heating.status")}</p>
            <p className="text-2xl font-display font-bold text-evh-dark dark:text-white mt-2">{t("dashboard.heating.active")}</p>
            <Badge variant="success">2.4 kWh {t("dashboard.heating.today")}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("dashboard.monthly.savings")}</p>
            <p className="text-2xl font-display font-bold text-green-600 mt-2">{formatCurrency(data.totalSavings)}</p>
            <p className="text-xs text-evh-gray-400 dark:text-slate-500 mt-1">{Math.abs(data.lastYearComparison)}% {t("dashboard.vs.last.year")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("dashboard.carbon.footprint")}</p>
            <p className="text-2xl font-display font-bold text-evh-dark dark:text-white mt-2">0.8 t</p>
            <p className="text-xs text-green-600 mt-1">↓ 0.3 t {t("dashboard.from.last.year")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("dashboard.energy.score")}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-display font-bold text-evh-primary">{data.energyScore}</p>
              <span className="text-xs text-evh-gray-400 dark:text-slate-500">/100</span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-evh-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-evh-primary rounded-full" style={{ width: `${data.energyScore}%` }} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="p-5 rounded-2xl bg-evh-primary/10 border border-evh-primary/20">
        <div className="flex items-start gap-3">
          <img
            src="/images/Thermo-Toni.png"
            alt="Thermo-Toni"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-evh-dark dark:text-white">{t("dashboard.ai.recommendation")}</p>
            <p className="text-sm text-evh-gray-600 dark:text-slate-300 mt-1">{t("dashboard.ai.message")}</p>
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-1.5 bg-evh-dark text-white text-xs font-semibold rounded-lg hover:bg-evh-gray-700 transition-colors">
                {t("dashboard.ai.yes")}
              </button>
              <button className="px-4 py-1.5 border border-evh-gray-200 dark:border-slate-600 text-evh-gray-600 dark:text-slate-300 text-xs font-medium rounded-lg hover:bg-evh-gray-50 dark:hover:bg-slate-800 transition-colors">
                {t("dashboard.ai.notnow")}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("dashboard.usage.title")}</p>
              <Chart
                data={usageData.map((d) => ({ label: d.month, value: d.heating, secondary: d.electricity }))}
                height={160}
              />
              <div className="flex items-center gap-4 mt-4 text-xs text-evh-gray-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-evh-primary" />
                  <span>{t("dashboard.heating.label")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-evh-accent opacity-30" />
                  <span>{t("dashboard.electricity.label")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("dashboard.district.heating")}</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-evh-dark dark:text-white">{t("dashboard.dh.connected")}</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: t("dashboard.dh.temp"), value: "62°C" },
                  { label: t("dashboard.dh.flow"), value: "1.2 m³/h" },
                  { label: t("dashboard.dh.efficiency"), value: "94%" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-1">
                    <span className="text-sm text-evh-gray-500 dark:text-slate-400">{stat.label}</span>
                    <span className="text-sm font-semibold text-evh-dark dark:text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
