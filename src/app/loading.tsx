"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-evh-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-1">
          {["E", "V", "H"].map((letter, i) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="text-2xl font-display font-bold text-evh-dark"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <div className="w-24 h-1 bg-evh-gray-200 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="w-1/4 h-full bg-evh-yellow rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
