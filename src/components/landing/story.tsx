"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const timeline = [
  { time: "06:30", icon: "🌅", title: "Morning Warmth", description: "Heating begins. The city wakes to a warm start across every district." },
  { time: "08:00", icon: "☕", title: "City in Motion", description: "Coffee brews. Schools open. Trams run. All powered by EVH." },
  { time: "12:00", icon: "🏙️", title: "Heart of the Day", description: "Businesses hum. Parks fill with life. Energy flows through Halle." },
  { time: "18:00", icon: "🏠", title: "Home Together", description: "Families gather. Warmth fills every home. Lights come on across the city." },
  { time: "22:00", icon: "🌙", title: "Quiet Power", description: "The city rests. EVH keeps watch, always ready for tomorrow." },
];

export function Story() {
  return (
    <section className="py-32 md:py-48 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Our Story
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-3xl">
            Energy is more than kilowatts.
            <br />
            <span className="text-evh-gray-400">It&apos;s the heartbeat of Halle.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-24 relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-evh-gray-200 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, index) => (
              <ScrollReveal key={item.time} delay={index * 0.1}>
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                  <div className="flex md:flex-col items-center gap-4 md:w-32 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-evh-yellow/10 flex items-center justify-center text-lg relative z-10">
                      {item.icon}
                    </div>
                    <span className="text-sm font-mono font-medium text-evh-gray-400 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-evh-dark mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-evh-gray-500 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
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
