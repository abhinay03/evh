"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-evh-bg via-white to-evh-bg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-8xl font-display font-bold text-evh-yellow mb-4"
        >
          404
        </motion.p>
        <h1 className="text-2xl font-display font-bold text-evh-dark mb-2">
          Seite nicht gefunden
        </h1>
        <p className="text-evh-gray-500 mb-8 text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-evh-dark text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 transition-all duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
