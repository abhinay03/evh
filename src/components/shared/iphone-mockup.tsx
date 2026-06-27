"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface DashboardData {
  customer: { name: string; district: string };
  weather: { temperature: number; condition: string };
  totalSavings: number;
  currentMonthUsage: { month: string; heating: number; electricity: number };
  energyScore: number;
  neighbourhoodRank: number;
  usage: { month: string; heating: number; electricity: number }[];
  rewards: { id: string; title: string; points: number }[];
}

const staticScreens = [
  {
    id: "rewards",
    title: "Rewards",
    gradient: "from-[#6366F1] via-[#8B8FF7] to-[#16233A]" as const,
    build: (data: DashboardData) => [
      { type: "header" as const, text: `Deine Punkte: ${data.rewards.reduce((s, r) => s + r.points, 0)}`, color: "text-white" },
      ...data.rewards.slice(0, 3).map((r) => ({
        type: "card" as const,
        text: `🎁 ${r.title}`,
        color: "bg-white/15 text-white" as const,
      })),
    ],
  },
  {
    id: "heating",
    title: "Heizung",
    gradient: "from-[#16A34A] via-[#22D66A] to-[#16233A]" as const,
    build: (data: DashboardData) => [
      { type: "header" as const, text: "Fernwärme Übersicht", color: "text-white" },
      { type: "chart" as const, text: `Verbrauch: ${data.currentMonthUsage.heating} kWh`, color: "text-white" },
      { type: "card" as const, text: `🔥 Effizienz: ${data.energyScore}%`, color: "bg-white/15 text-white" },
      { type: "card" as const, text: `🌡️ Außen: ${data.weather.temperature}°C · ${data.weather.condition}`, color: "bg-white/15 text-white" },
    ],
  },
  {
    id: "community",
    title: "Community",
    gradient: "from-[#D32F2F] via-[#E53935] to-[#16233A]" as const,
    build: () => [
      { type: "header" as const, text: "Halle gemeinsam", color: "text-white" },
      { type: "card" as const, text: `🏆 Platz ${3} im Viertel`, color: "bg-white/15 text-white" },
      { type: "card" as const, text: "🌳 Nächster Clean-Up: Sa., 15. Juni", color: "bg-white/15 text-white" },
      { type: "card" as const, text: "🤝 234 Nachbarn dabei", color: "bg-white/15 text-white" },
    ],
  },
];

export function IphoneMockup() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard?customerId=CUST-001")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % staticScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const screen = staticScreens[currentScreen];

  const dashboardScreen = {
    id: "dashboard",
    title: "Dashboard",
    gradient: "from-[#E53935] via-[#FF6B6B] to-[#16233A]" as const,
    build: (d: DashboardData | null) => d
      ? [
          { type: "header" as const, text: `Guten Morgen, ${d.customer.name}!`, color: "text-white" },
          { type: "toni" as const, text: `Heute ${d.weather.temperature}°C · ${d.weather.condition}`, color: "bg-white/15 text-white" },
          { type: "card" as const, text: `⚡ Verbrauch: ${d.currentMonthUsage.heating + d.currentMonthUsage.electricity} kWh`, color: "bg-white/15 text-white" },
          { type: "card" as const, text: `💰 Ersparnis: €${d.totalSavings}`, color: "bg-white/15 text-white" },
          { type: "card" as const, text: `🏅 Energie-Score: ${d.energyScore}/100`, color: "bg-white/15 text-white" },
        ]
      : [
          { type: "header" as const, text: "Guten Morgen!", color: "text-white" },
          { type: "card" as const, text: "Lade Daten...", color: "bg-white/15 text-white animate-pulse" },
        ],
  };

  const defaultData = {
    customer: { name: "", district: "" },
    weather: { temperature: 0, condition: "" },
    totalSavings: 0,
    currentMonthUsage: { month: "", heating: 0, electricity: 0 },
    energyScore: 0,
    neighbourhoodRank: 0,
    usage: [] as { month: string; heating: number; electricity: number }[],
    rewards: [] as { id: string; title: string; points: number }[],
  };

  const screens = [dashboardScreen, ...staticScreens];
  const activeScreen = screens[currentScreen];
  const elements = activeScreen.build(data ?? defaultData);

  return (
    <div className="relative mx-auto w-[280px] h-[580px]">
      <div className="absolute inset-0 rounded-[3rem] bg-[#1a1a2e] p-2 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1a1a2e] rounded-b-xl z-20" />

        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
          <div className={`absolute inset-0 bg-gradient-to-b ${activeScreen.gradient}`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 p-4 pt-12 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 ring-2 ring-white/30 overflow-hidden shrink-0">
                  <img
                    src="/images/Thermo-Toni.png"
                    alt="Thermo-Toni"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/90">
                    {activeScreen.title}
                  </p>
                  <p className="text-[10px] text-white/50">EVH App</p>
                </div>
              </div>

              {elements.map((el, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`mb-2 rounded-xl p-3 ${el.color || "bg-[#F8FAFC]"} ${
                    el.type === "header"
                      ? "font-semibold bg-transparent/0 px-0"
                      : "text-xs font-medium backdrop-blur-sm"
                  }`}
                >
                  <span className={el.type === "header" ? "text-sm" : ""}>
                    {el.text}
                  </span>
                  {el.type === "chart" && (
                    <div className="flex items-end gap-1 mt-2 h-12">
                      {(data?.usage ?? [
                        { heating: 40 }, { heating: 65 }, { heating: 45 },
                        { heating: 80 }, { heating: 55 }, { heating: 70 },
                      ]).slice(0, 6).map((u: { heating: number }, i: number) => (
                        <div
                          key={i}
                          className="flex-1 bg-white/40 rounded-t"
                          style={{ height: `${Math.min(u.heating / 5, 100)}%` }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentScreen ? "bg-white w-4" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
