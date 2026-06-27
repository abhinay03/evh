"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useLocale } from "@/context/locale-context";

const stories = [
  {
    name: "Mariana",
    age: "28",
    type: "Apartment • Innenstadt",
    quoteKey: "stories.1.quote",
    saving: "€210",
    savingLabelKey: "stories.1.savinglabel",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    color: "from-red-400 to-red-600",
  },
  {
    name: "Familie Müller",
    age: "42",
    type: "House • Frohe Zukunft",
    quoteKey: "stories.2.quote",
    saving: "60%",
    savingLabelKey: "stories.2.savinglabel",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    color: "from-green-400 to-emerald-300",
  },
  {
    name: "Horst Schneider",
    age: "71",
    type: "Apartment • Altstadt",
    quoteKey: "stories.3.quote",
    saving: "4.8 ★",
    savingLabelKey: "stories.3.savinglabel",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    color: "from-blue-400 to-indigo-300",
  },
];

const easeOut = [0.25, 0.1, 0.25, 1] as const;

export function CustomerStories() {
  const { t, locale } = useLocale();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % stories.length);
  const prev = () => setCurrent((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-[#E53935] font-medium text-sm tracking-widest uppercase mb-4">
            {t("stories.label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#16233A] dark:text-white leading-tight max-w-2xl">
            {t("stories.title.line1")}
            <br />
            <span className="text-[#94A3B8] dark:text-slate-400">{t("stories.title.line2")}</span>
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
                transition={{ duration: 0.5, ease: easeOut }}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E53935]/10 text-[#E53935] text-xs font-semibold mb-4">
                    {stories[current].type}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-[#16233A] dark:text-white leading-relaxed font-medium">
                    &ldquo;{t(stories[current].quoteKey)}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-[#16233A] dark:text-white">{stories[current].name}</p>
                      <p className="text-sm text-[#64748B] dark:text-slate-400">{stories[current].age} {t("stories.yearsOld")}</p>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)]">
                    <span className="text-2xl font-display font-bold text-[#E53935]">{stories[current].saving}</span>
                    <span className="text-sm text-[#64748B] dark:text-slate-400">{t(stories[current].savingLabelKey)}</span>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative w-64 h-80 mx-auto rounded-[1.75rem] overflow-hidden shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)]">
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
                    i === current ? "bg-[#E53935] w-6" : "bg-[#CBD5E1] dark:bg-slate-600 hover:bg-[#94A3B8] dark:hover:bg-slate-500"
                  }`}
                  aria-label={`Go to story ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 text-[#16233A] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors"
                aria-label="Next"
              >
                <svg className="w-5 h-5 text-[#16233A] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
