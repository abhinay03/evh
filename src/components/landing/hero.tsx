"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.scrollY;
      containerRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden dark-hero-gradient">
      <div ref={containerRef} className="absolute inset-0 transition-transform duration-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-evh-dark/60 via-evh-dark/30 to-evh-dark" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-radial from-evh-yellow/10 to-transparent blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-3/4 h-3/4 rounded-full bg-gradient-radial from-blue-500/5 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-evh-yellow font-medium text-sm md:text-base tracking-widest uppercase mb-6"
          >
            Stadtwerke Halle
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.95] tracking-tight"
          >
            Made in
            <br />
            <span className="text-gradient">Halle.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed"
          >
            Your Energy.
            <br />
            Your City.
            <br />
            Your Future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#district-heating"
              className="px-8 py-4 bg-evh-yellow text-evh-dark text-base font-semibold rounded-2xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-evh-yellow/20 hover:shadow-2xl hover:shadow-evh-yellow/30 active:scale-[0.98]"
            >
              Explore EVH
            </Link>
            <Link
              href="/portal/login"
              className="px-8 py-4 border-2 border-white/20 text-white text-base font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-[0.98]"
            >
              Customer Portal
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-evh-yellow rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
