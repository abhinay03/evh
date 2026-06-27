"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";
import { useRouter } from "next/navigation";

export function SettingsContent() {
  const { logout } = useAuth();
  const { t, locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("settings.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("settings.subtitle")}</p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("settings.appearance")}</p>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-evh-gray-50 dark:bg-slate-800">
            <div>
              <p className="text-sm font-medium text-evh-dark dark:text-slate-200">{t("settings.dark.mode")}</p>
              <p className="text-xs text-evh-gray-500 dark:text-slate-400">{t("settings.dark.mode.desc")}</p>
            </div>
              <button
                onClick={toggle}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                  theme === "dark" ? "bg-evh-primary-vivid" : "bg-evh-gray-300 dark:bg-slate-600"
                }`}
                aria-label={t("settings.dark.mode")}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 flex items-center justify-center ${
                  theme === "dark" ? "right-0.5" : "left-0.5"
                }`}>
                  <svg className={`w-3 h-3 ${theme === "dark" ? "text-evh-primary-vivid" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {theme === "dark" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    )}
                  </svg>
                </div>
              </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("settings.language")}</p>
          <div className="flex gap-3">
            {(["de", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLocale(lang)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  locale === lang
                    ? "bg-evh-primary-vivid text-white"
                    : "bg-evh-gray-50 dark:bg-slate-800 text-evh-gray-500 dark:text-slate-400 hover:bg-evh-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                {lang === "de" ? "Deutsch" : "English"}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("settings.privacy")}</p>
          <div className="space-y-3">
            {[
              { key: "settings.privacy.1", enabled: true },
              { key: "settings.privacy.2", enabled: true },
              { key: "settings.privacy.3", enabled: true },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-evh-gray-50 dark:bg-slate-800">
                <span className="text-sm text-evh-dark dark:text-slate-200">{t(item.key)}</span>
                <div className={`w-10 h-5 rounded-full relative ${item.enabled ? "bg-evh-primary" : "bg-evh-gray-300 dark:bg-slate-600"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ${item.enabled ? "right-0.5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("settings.account")}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
          >
            {t("settings.signout")}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
