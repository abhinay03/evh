"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "@/components/shared/chart";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { usageData } from "@/lib/mock-data";

interface DashboardData {
  weather: { temperature: number; condition: string; humidity: number; windSpeed: number };
  totalSavings: number;
  energyScore: number;
  lastYearComparison: number;
}

export function DashboardContent() {
  const { customer } = useAuth();
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
        <div className="h-8 w-48 bg-evh-gray-100 rounded-xl animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-evh-gray-50 rounded-2xl animate-pulse" />
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
          <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">
            Guten Morgen, {customer?.name?.split(" ")[0] || "Anna"} 👋
          </h1>
          <p className="text-evh-gray-500 text-sm mt-1">Here&apos;s your energy overview for today.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white card-shadow">
          <span className="text-2xl">{data.weather.temperature > 5 ? "☁️" : "❄️"}</span>
          <div>
            <p className="text-sm font-semibold text-evh-dark">{data.weather.temperature}°C</p>
            <p className="text-xs text-evh-gray-400">{data.weather.condition}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Heating Status</p>
            <p className="text-2xl font-display font-bold text-evh-dark mt-2">Active</p>
            <Badge variant="success" className="mt-2">2.4 kWh today</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Monthly Savings</p>
            <p className="text-2xl font-display font-bold text-green-600 mt-2">{formatCurrency(data.totalSavings)}</p>
            <p className="text-xs text-evh-gray-400 mt-1">{Math.abs(data.lastYearComparison)}% vs last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Carbon Footprint</p>
            <p className="text-2xl font-display font-bold text-evh-dark mt-2">0.8 t</p>
            <p className="text-xs text-green-600 mt-1">↓ 0.3 t from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Energy Score</p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-display font-bold text-evh-yellow">{data.energyScore}</p>
              <span className="text-xs text-evh-gray-400">/100</span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-evh-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-evh-yellow rounded-full" style={{ width: `${data.energyScore}%` }} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="p-5 rounded-2xl bg-evh-yellow/10 border border-evh-yellow/20">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-evh-dark">AI Recommendation</p>
            <p className="text-sm text-evh-gray-600 mt-1">Outside temperature drops tonight. Optimise your heating schedule?</p>
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-1.5 bg-evh-dark text-white text-xs font-semibold rounded-lg hover:bg-evh-gray-700 transition-colors">
                Yes, optimise
              </button>
              <button className="px-4 py-1.5 border border-evh-gray-200 text-evh-gray-600 text-xs font-medium rounded-lg hover:bg-evh-gray-50 transition-colors">
                Not now
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Usage Overview (kWh)</p>
              <Chart
                data={usageData.map((d) => ({ label: d.month, value: d.heating, secondary: d.electricity }))}
                height={160}
              />
              <div className="flex items-center gap-4 mt-4 text-xs text-evh-gray-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-evh-yellow" />
                  <span>Heating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-evh-accent opacity-30" />
                  <span>Electricity</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">District Heating</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-evh-dark">Connected and active</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Current temp", value: "62°C" },
                  { label: "Flow rate", value: "1.2 m³/h" },
                  { label: "Efficiency", value: "94%" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-1">
                    <span className="text-sm text-evh-gray-500">{stat.label}</span>
                    <span className="text-sm font-semibold text-evh-dark">{stat.value}</span>
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
