"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/context/locale-context";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-evh-bg via-white to-evh-bg dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
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
          className="text-8xl font-display font-bold text-evh-primary mb-4"
        >
          404
        </motion.p>
        <h1 className="text-2xl font-display font-bold text-evh-dark dark:text-white mb-2">
          {t("common.page.not.found")}
        </h1>
        <p className="text-evh-gray-500 dark:text-slate-400 mb-8 text-sm">
          {t("common.page.not.found")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-evh-dark dark:bg-evh-primary-vivid text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 dark:hover:bg-red-600 transition-all duration-300"
        >
          {t("common.back.home")}
        </Link>
      </motion.div>
    </div>
  );
}
