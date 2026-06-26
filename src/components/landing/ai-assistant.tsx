"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function AiAssistantPreview() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-evh-yellow font-medium text-sm tracking-widest uppercase mb-4">
            AI Assistant
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-evh-dark leading-tight max-w-3xl">
            Your intelligent
            <br />
            <span className="text-evh-gray-400">energy companion.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg"
          >
            <div className="glass rounded-3xl p-1 animate-float">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-evh-yellow to-amber-400 flex items-center justify-center text-white font-bold text-sm">
                    EVH
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-evh-dark">EVH AI Assistant</p>
                    <p className="text-xs text-evh-gray-400">Online</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-evh-yellow to-amber-400 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      AI
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-evh-gray-50 text-sm text-evh-dark leading-relaxed">
                      Hello Anna. Outside temperature drops to 2°C tonight. Would you like EVH to optimise your heating schedule for better efficiency?
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button className="px-5 py-2.5 bg-evh-dark text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 transition-all duration-300 active:scale-[0.97]">
                      Yes, optimise
                    </button>
                    <button className="px-5 py-2.5 border border-evh-gray-200 text-evh-gray-600 text-sm font-medium rounded-xl hover:bg-evh-gray-50 transition-all duration-300 active:scale-[0.97]">
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <ScrollReveal delay={0.3} className="mt-8 text-center">
          <p className="text-sm text-evh-gray-400 max-w-md mx-auto">
            Available 24/7 in your Customer Portal. Ask about bills, heating, solar, and more.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
