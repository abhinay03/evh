"use client";

import { useEffect } from "react";
import { useLocale } from "@/context/locale-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-evh-bg via-white to-evh-bg dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-display font-bold text-evh-dark dark:text-white mb-2">{t("common.error")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 mb-8 text-sm">
          {error.message || t("common.error")}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-evh-dark dark:bg-evh-primary-vivid text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 dark:hover:bg-red-600 transition-all duration-300"
        >
          {t("common.try.again")}
        </button>
      </div>
    </div>
  );
}
