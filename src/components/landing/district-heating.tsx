"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Central Generation",
    description: "Heat is generated at our central plant using renewable biomass and waste heat recovery — not fossil fuels.",
  },
  {
    number: "02",
    title: "Underground Network",
    description: "Insulated pipes carry hot water through underground tunnels, reaching every connected district.",
  },
  {
    number: "03",
    title: "Your Home",
    description: "Heat transfers via a compact station in your building. No boiler. No gas. Just warmth.",
  },
];

export function DistrictHeating() {
  return (
    <section id="district-heating" className="py-32 bg-evh-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Hero Product
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-4xl">
            District Heating.
            <br />
            <span className="text-evh-gray-400">The future of warmth in Halle.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.1}>
              <div className="relative p-8 md:p-10 rounded-3xl bg-white card-shadow card-shadow-hover transition-all duration-500 h-full">
                <span className="text-6xl font-display font-bold text-evh-yellow/20 absolute top-4 right-6">
                  {step.number}
                </span>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-evh-yellow/10 flex items-center justify-center mb-5">
                    {index === 0 ? (
                      <svg className="w-6 h-6 text-evh-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : index === 1 ? (
                      <svg className="w-6 h-6 text-evh-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-evh-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-evh-dark mb-3">{step.title}</h3>
                  <p className="text-evh-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6">
          <ScrollReveal delay={0.3}>
            <div className="relative p-8 md:p-10 rounded-3xl bg-evh-dark text-white overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <pattern id="pipe-pattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                      <rect width="40" height="20" fill="none" stroke="#FFD100" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="800" height="200" fill="url(#pipe-pattern)" />
                </svg>
              </div>
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {[
                  { value: "42,000", label: "Homes Connected" },
                  { value: "64%", label: "Adoption Rate" },
                  { value: "€340", label: "Avg. Yearly Savings" },
                  { value: "12", label: "Districts Live" },
                ].map((stat, i) => (
                  <div key={stat.label} className={`text-center ${i > 0 ? "border-l border-evh-gray-700/50" : ""}`}>
                    <p className="text-2xl md:text-3xl font-display font-bold text-evh-yellow">{stat.value}</p>
                    <p className="text-xs text-evh-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.4} className="mt-10 text-center">
          <Link
            href="/portal/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-evh-dark text-white text-base font-semibold rounded-2xl hover:bg-evh-gray-700 transition-all duration-300 shadow-lg active:scale-[0.98]"
          >
            Check Availability in Your District
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>

      <div className="mt-16 w-full h-2 bg-evh-gray-200 rounded-full mx-auto max-w-5xl overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-evh-yellow via-amber-400 to-evh-yellow rounded-full relative">
          <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animation: "loading-bar 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
