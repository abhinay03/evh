"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const stories = [
  {
    name: "Anna Becker",
    age: "28",
    type: "Apartment • Innenstadt",
    quote: "EVH optimised my heating schedule automatically. I saved €210 without even thinking about it. The AI assistant is incredible.",
    saving: "€210",
    savingLabel: "Saved per year",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    color: "from-amber-400 to-yellow-300",
  },
  {
    name: "Familie Müller",
    age: "42",
    type: "House • Frohe Zukunft",
    quote: "Switching to district heating was the best decision. Our emissions dropped 60% and the house has never been more comfortable.",
    saving: "60%",
    savingLabel: "Emissions reduced",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    color: "from-green-400 to-emerald-300",
  },
  {
    name: "Horst Schneider",
    age: "71",
    type: "Apartment • Altstadt",
    quote: "After 40 years with EVH, I've never experienced better service. The billing is simple, transparent, and the support is wonderful.",
    saving: "4.8 ★",
    savingLabel: "Satisfaction rating",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    color: "from-blue-400 to-indigo-300",
  },
];

export function CustomerStories() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % stories.length);
  const prev = () => setCurrent((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section className="py-32 bg-evh-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            Customer Stories
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-2xl">
            Real stories
            <br />
            <span className="text-evh-gray-400">from Halle.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-evh-yellow/10 text-evh-yellow text-xs font-semibold mb-4">
                    {stories[current].type}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-evh-dark leading-relaxed font-medium">
                    &ldquo;{stories[current].quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-evh-dark">{stories[current].name}</p>
                      <p className="text-sm text-evh-gray-500">{stories[current].age} years old</p>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white card-shadow">
                    <span className="text-2xl font-display font-bold text-evh-yellow">{stories[current].saving}</span>
                    <span className="text-sm text-evh-gray-500">{stories[current].savingLabel}</span>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative w-64 h-80 mx-auto rounded-3xl overflow-hidden card-shadow">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stories[current].color} opacity-20`} />
                    <img
                      src={stories[current].image}
                      alt={stories[current].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8 max-w-md">
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-evh-yellow w-6" : "bg-evh-gray-300 hover:bg-evh-gray-400"
                  }`}
                  aria-label={`Go to story ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-xl bg-white card-shadow hover:bg-evh-gray-50 transition-colors"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 text-evh-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="p-2 rounded-xl bg-white card-shadow hover:bg-evh-gray-50 transition-colors"
                aria-label="Next"
              >
                <svg className="w-5 h-5 text-evh-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
