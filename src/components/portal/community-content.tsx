"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";
import { neighbourhoods, communityEvents, type CommunityEvent, type Neighbourhood } from "@/lib/mock-data";

export function CommunityContent() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  const sorted = [...neighbourhoods].sort((a, b) => b.carbonSaved - a.carbonSaved);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("community.portal.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("community.portal.subtitle")}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("community.leaderboard")}</p>
            <div className="space-y-2">
              {sorted.slice(0, 5).map((hood, i) => (
                <div
                  key={hood.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-evh-primary text-evh-dark" :
                      i === 1 ? "bg-evh-gray-200 dark:bg-slate-600 text-evh-gray-600 dark:text-slate-300" :
                      i === 2 ? "bg-amber-100 text-amber-700" :
                      "bg-evh-gray-100 dark:bg-slate-700 text-evh-gray-400 dark:text-slate-500"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-evh-dark dark:text-white">{hood.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-evh-gray-500 dark:text-slate-400">{hood.carbonSaved.toLocaleString("de-DE")} kg CO₂</span>
                    {hood.districtHeating && <Badge variant="success">DH</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("community.upcoming")}</p>
            <div className="space-y-3">
              {communityEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedEvent?.id === event.id ? "bg-evh-primary/10 ring-1 ring-evh-primary" : "bg-evh-gray-50 dark:bg-slate-800 hover:bg-evh-gray-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-evh-dark dark:text-white">{event.title}</span>
                    <span className="text-xs text-evh-gray-400 dark:text-slate-500">{event.date}</span>
                  </div>
                  <p className="text-xs text-evh-gray-500 dark:text-slate-400">{event.location}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={event.type === "volunteer" ? "success" : event.type === "workshop" ? "info" : "default"}>
                      {event.type}
                    </Badge>
                    <span className="text-xs text-evh-gray-400 dark:text-slate-500">{event.participants} {t("community.going")}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("community.challenge")}</p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🌍</span>
              <div>
                <p className="text-base font-semibold text-evh-dark dark:text-white">{t("community.challenge.1")}</p>
                <p className="text-sm text-evh-gray-500 dark:text-slate-400">{t("community.challenge.1.desc")}</p>
              </div>
            </div>
            <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-green-500 rounded-full" />
            </div>
            <p className="text-xs text-green-600 mt-2">75% {t("community.challenge.goal")}</p>
            <button className="mt-4 px-5 py-2 bg-evh-dark text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 transition-colors">
              {t("community.challenge.join")}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
