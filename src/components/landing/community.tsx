"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { communityEvents } from "@/lib/mock-data";

const highlights = [
  { icon: "🌳", count: "1,200", label: "Trees Planted" },
  { icon: "🏫", count: "5", label: "School Partnerships" },
  { icon: "⚽", count: "8", label: "Sports Teams Supported" },
  { icon: "🤝", count: "12", label: "Active Projects" },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-32 bg-evh-bg">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-evh-yellow/10 rounded-full text-evh-yellow text-xs font-semibold uppercase tracking-wider mb-4">
            Made in Halle
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-3xl">
            Halle ist Gemeinschaft.
            <br />
            <span className="text-evh-gray-400">Energy that brings us together.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.label} delay={i * 0.05}>
              <div className="p-6 rounded-2xl bg-white card-shadow text-center hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-3xl mb-2 block">{h.icon}</span>
                <p className="text-2xl font-display font-bold text-evh-dark">{h.count}</p>
                <p className="text-xs text-evh-gray-500 mt-0.5">{h.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16">
          <ScrollReveal>
            <h3 className="text-xl font-display font-semibold text-evh-dark mb-6">Upcoming Events</h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {communityEvents.slice(0, 3).map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.1}>
                <div className="group rounded-3xl bg-white card-shadow card-shadow-hover overflow-hidden transition-all duration-500">
                  <div className="h-40 bg-evh-gray-100 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        event.type === "volunteer" ? "bg-green-100 text-green-700" :
                        event.type === "workshop" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {event.type}
                      </span>
                      <span className="text-xs text-evh-gray-400">{event.date}</span>
                    </div>
                    <h4 className="text-base font-semibold text-evh-dark mb-1">{event.title}</h4>
                    <p className="text-sm text-evh-gray-500">{event.location}</p>
                    <p className="text-xs text-evh-gray-400 mt-2">{event.participants} participants</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
