"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const features = [
  { icon: "🌱", title: "100% Green", description: "Every kWh from renewable sources. Certified green energy." },
  { icon: "📊", title: "Smart Meters", description: "Real-time consumption tracking. No more estimated bills." },
  { icon: "☀️", title: "Solar Ready", description: "Seamless solar panel integration. Sell excess back to the grid." },
  { icon: "🔌", title: "EV Charging", description: "Discounted rates for EV owners. Growing network across Halle." },
];

export function ElectricitySection() {
  return (
    <section id="electricity" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Electricity
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-evh-dark leading-tight max-w-2xl">
            Green Electricity.
            <br />
            <span className="text-evh-gray-400">Cleaner, smarter, yours.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.08}>
              <div className="p-6 rounded-2xl bg-evh-gray-50 card-shadow-hover transition-all duration-300 group hover:bg-white">
                <span className="text-2xl mb-3 block">{feature.icon}</span>
                <h3 className="text-base font-semibold text-evh-dark mb-1">{feature.title}</h3>
                <p className="text-sm text-evh-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
