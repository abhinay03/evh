"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const reasons = [
  {
    icon: "🏛️",
    stat: "100%",
    label: "Regional",
    title: "Owned by Halle",
    description: "EVH is 100% owned by the city. Every euro spent stays in Halle, funding schools, parks, and infrastructure.",
  },
  {
    icon: "⚡",
    stat: "99.8%",
    label: "Reliability",
    title: "Always There",
    description: "Industry-leading 99.8% network reliability. We never leave you in the cold — literally.",
  },
  {
    icon: "🌿",
    stat: "84.7K",
    label: "Tonnes CO₂ Saved",
    title: "Climate Positive",
    description: "We've saved 84,700 tonnes of CO₂ through district heating and renewable energy. Going beyond net-zero.",
  },
  {
    icon: "🤝",
    stat: "12",
    label: "Active Projects",
    title: "Community First",
    description: "From tree planting to school workshops — we invest in the community because energy connects us all.",
  },
];

export function WhyEvh() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Why EVH
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-2xl">
            Not just an energy provider.
            <br />
            <span className="text-evh-gray-400">Your neighbour.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 0.1}>
              <div className="group p-8 md:p-10 rounded-3xl bg-evh-gray-50 card-shadow card-shadow-hover transition-all duration-500 hover:bg-white">
                <div className="flex items-start gap-5">
                  <span className="text-3xl shrink-0">{reason.icon}</span>
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl md:text-4xl font-display font-bold text-evh-yellow">
                        {reason.stat}
                      </span>
                      <span className="text-sm font-medium text-evh-gray-400 uppercase tracking-wider">
                        {reason.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-evh-dark mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-evh-gray-500 leading-relaxed text-sm md:text-base">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
