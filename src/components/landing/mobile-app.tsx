"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { IphoneMockup } from "@/components/shared/iphone-mockup";

const features = [
  { icon: "📊", title: "Real-time Dashboard", description: "See your energy usage, costs, and savings at a glance." },
  { icon: "🔥", title: "Heating Control", description: "Adjust your heating schedule from anywhere." },
  { icon: "🎁", title: "Local Rewards", description: "Unlock discounts at Halle cafés, museums, and shops." },
  { icon: "🌱", title: "Track Impact", description: "Watch your carbon savings grow in real time." },
  { icon: "💬", title: "AI Assistant", description: "Get answers instantly. No waiting, no calls." },
];

export function MobileApp() {
  return (
    <section className="py-32 bg-evh-bg">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Mobile App
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-3xl">
            EVH in your
            <br />
            <span className="text-evh-gray-400">pocket.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08} direction="left">
                <div className="flex gap-4 items-start group p-4 rounded-2xl hover:bg-white transition-all duration-300">
                  <span className="text-2xl shrink-0">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-evh-dark">{feature.title}</h3>
                    <p className="text-sm text-evh-gray-500">{feature.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="order-1 md:order-2">
            <ScrollReveal direction="right">
              <IphoneMockup />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
