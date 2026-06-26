"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { neighbourhoods, type Neighbourhood } from "@/lib/mock-data";

const getStatusColor = (available: boolean, planned: boolean) => {
  if (available) return "border-green-400 bg-green-50";
  if (planned) return "border-amber-400 bg-amber-50";
  return "border-evh-gray-200 bg-evh-gray-50";
};

const getStatusText = (available: boolean, planned: boolean) => {
  if (available) return "Connected";
  if (planned) return "Coming soon";
  return "Not available";
};

export function InteractiveHalle() {
  const [selected, setSelected] = useState<Neighbourhood | null>(null);

  return (
    <section className="py-32 bg-evh-bg">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Interactive Halle
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-3xl">
            Your district.
            <br />
            <span className="text-evh-gray-400">Your energy future.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {neighbourhoods.map((hood, index) => (
            <ScrollReveal key={hood.id} delay={index * 0.05}>
              <motion.button
                onClick={() => setSelected(selected?.id === hood.id ? null : hood)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 card-shadow ${getStatusColor(hood.districtHeating, hood.expansionPlanned)} ${
                  selected?.id === hood.id ? "ring-2 ring-evh-yellow shadow-lg" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-evh-dark">{hood.name}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    hood.districtHeating ? "bg-green-200 text-green-800" :
                    hood.expansionPlanned ? "bg-amber-200 text-amber-800" :
                    "bg-evh-gray-200 text-evh-gray-500"
                  }`}>
                    {getStatusText(hood.districtHeating, hood.expansionPlanned)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-evh-gray-400">Carbon saved</span>
                    <span className="font-medium text-evh-dark">{hood.carbonSaved.toLocaleString("de-DE")} kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-evh-gray-400">Renewable</span>
                    <span className="font-medium text-evh-dark">{hood.renewablePercentage}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-evh-gray-400">Homes</span>
                    <span className="font-medium text-evh-dark">{hood.homesConnected.toLocaleString("de-DE")}</span>
                  </div>
                </div>
                <div className="mt-3 w-full h-1.5 bg-evh-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-evh-yellow rounded-full transition-all duration-700"
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
              <div className="bg-white rounded-3xl p-8 md:p-10 card-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">
                      {selected.name}
                    </h3>
                    <p className="text-evh-gray-500 mt-1">
                      {selected.districtHeating
                        ? "Connected to EVH district heating network"
                        : selected.expansionPlanned
                          ? `Expansion planned for ${selected.expansionYear}`
                          : "Not yet in expansion plan"}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 hover:bg-evh-gray-100 rounded-xl transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5 text-evh-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-2xl bg-evh-gray-50">
                    <p className="text-2xl font-bold text-evh-dark">{selected.carbonSaved.toLocaleString("de-DE")}</p>
                    <p className="text-xs text-evh-gray-500 mt-1">kg CO₂ saved</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-evh-gray-50">
                    <p className="text-2xl font-bold text-evh-dark">{selected.renewablePercentage}%</p>
                    <p className="text-xs text-evh-gray-500 mt-1">Renewable energy</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-evh-gray-50">
                    <p className="text-2xl font-bold text-evh-dark">{selected.homesConnected.toLocaleString("de-DE")}</p>
                    <p className="text-xs text-evh-gray-500 mt-1">Homes connected</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-evh-gray-50">
                    <p className="text-2xl font-bold text-evh-dark">{selected.communityProjects}</p>
                    <p className="text-xs text-evh-gray-500 mt-1">Community projects</p>
                  </div>
                </div>

                {selected.expansionPlanned && (
                  <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <p className="text-sm font-medium text-amber-800">
                      🚧 Expansion planned for {selected.expansionYear}. {selected.homesConnected}+ homes will be connected to clean district heating.
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
