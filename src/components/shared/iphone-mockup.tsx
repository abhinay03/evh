"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const screens = [
  {
    id: "dashboard",
    title: "Dashboard",
    elements: [
      { type: "header", text: "Guten Morgen, Anna!" },
      { type: "card", text: "Heizung aktiv", color: "bg-amber-400" },
      { type: "card", text: "Verbrauch: 2.4 kWh", color: "bg-blue-400" },
      { type: "card", text: "Ersparnis: €14.50", color: "bg-green-400" },
    ],
  },
  {
    id: "rewards",
    title: "Rewards",
    elements: [
      { type: "header", text: "Deine Punkte: 320" },
      { type: "card", text: "☕ Kaffee gratis", color: "bg-amber-100" },
      { type: "card", text: "🎫 Museum 2x1", color: "bg-purple-100" },
      { type: "card", text: "🌳 Baum pflanzen", color: "bg-green-100" },
    ],
  },
  {
    id: "heating",
    title: "Heizung",
    elements: [
      { type: "header", text: "Fernwärme Übersicht" },
      { type: "chart", text: "Verbrauch diese Woche" },
      { type: "card", text: "Effizienz: 92%", color: "bg-green-100" },
      { type: "card", text: "Außen: 6°C", color: "bg-blue-100" },
    ],
  },
  {
    id: "community",
    title: "Community",
    elements: [
      { type: "header", text: "Halle gemeinsam" },
      { type: "card", text: "🏆 Platz 3 im Viertel", color: "bg-amber-100" },
      { type: "card", text: "Nächster Clean-Up: Sa., 15", color: "bg-blue-100" },
    ],
  },
];

export function IphoneMockup() {
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] h-[580px]">
      <div className="absolute inset-0 rounded-[3rem] bg-evh-dark p-2 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-evh-dark rounded-b-xl z-10" />
        <div className="w-full h-full rounded-[2.5rem] bg-white overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screens[currentScreen].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 p-4 pt-10"
            >
              <p className="text-xs font-semibold text-evh-gray-400 mb-1 tracking-wider uppercase">
                {screens[currentScreen].title}
              </p>
              {screens[currentScreen].elements.map((el, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`mb-2 rounded-xl p-3 ${el.color || "bg-evh-gray-50"} ${el.type === "header" ? "text-sm font-semibold text-evh-dark bg-transparent px-0" : "text-xs font-medium text-evh-dark"}`}
                >
                  {el.text}
                  {el.type === "chart" && (
                    <div className="flex items-end gap-1 mt-2 h-12">
                      {[40, 65, 45, 80, 55, 70].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-evh-yellow/60 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === currentScreen ? "bg-evh-dark" : "bg-evh-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
