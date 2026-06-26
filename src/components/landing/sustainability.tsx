"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function SustainabilitySection() {
  return (
    <section id="sustainability" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Sustainability
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-3xl">
            Our Promise
            <br />
            <span className="text-evh-gray-400">to Halle.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { target: 84700, suffix: " t", label: "CO₂ Saved", color: "text-green-500" },
            { target: 186000, suffix: " MWh", label: "Renewable Generation", color: "text-evh-yellow" },
            { target: 64, suffix: "%", label: "District Heating Adoption", color: "text-evh-accent" },
            { target: 42000, suffix: "+", label: "Homes Connected", color: "text-evh-success" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="p-8 rounded-3xl bg-evh-gray-50 card-shadow card-shadow-hover transition-all duration-500 text-center group hover:bg-white">
                <p className={`text-4xl md:text-5xl font-display font-bold ${stat.color}`}>
                  {stat.target.toLocaleString("de-DE")}{stat.suffix}
                </p>
                <p className="mt-2 text-sm text-evh-gray-500 font-medium">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-16">
          <div className="p-8 md:p-10 rounded-3xl bg-evh-dark text-white">
            <h3 className="text-2xl font-display font-bold mb-6">2030 Target</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-display font-bold text-evh-yellow">95,000</p>
                <p className="text-sm text-evh-gray-400 mt-1">Homes on district heating</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-evh-yellow">100%</p>
                <p className="text-sm text-evh-gray-400 mt-1">Renewable electricity</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-evh-yellow">70%</p>
                <p className="text-sm text-evh-gray-400 mt-1">District heating adoption</p>
              </div>
            </div>
            <div className="mt-6 w-full h-2 bg-evh-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-evh-yellow rounded-full" />
            </div>
            <p className="text-xs text-evh-gray-400 mt-2">64% towards 2030 target</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
