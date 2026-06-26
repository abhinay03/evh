"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-evh-dark"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative flex items-center gap-1">
              {["E", "V", "H"].map((letter, i) => (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                  className="text-3xl font-display font-bold text-evh-yellow"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="w-32 h-0.5 bg-evh-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "400%" }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                className="w-1/4 h-full bg-evh-yellow rounded-full"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-evh-gray-400 text-sm font-medium"
            >
              Made in Halle.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
