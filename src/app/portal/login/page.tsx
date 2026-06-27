"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@evh.de");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLocale();
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/portal/dashboard");
    } catch {
      setError(t("login.error"));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-evh-bg via-white to-evh-bg dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-radial from-evh-primary/5 to-transparent blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
            <span className="text-2xl font-display font-bold text-evh-dark dark:text-white">EVH</span>
            <span className="w-2 h-2 rounded-full bg-evh-primary" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-evh-dark dark:text-white">{t("login.title")}</h1>
          <p className="text-evh-gray-500 dark:text-slate-400 mt-2">{t("login.subtitle")}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 card-shadow">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-evh-gray-600 dark:text-slate-300">{t("login.email.label")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-evh-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-evh-dark dark:text-white placeholder:text-evh-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-evh-primary/50 focus:border-evh-primary transition-all"
                placeholder={t("login.email.placeholder")}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-evh-gray-600 dark:text-slate-300">{t("login.password.label")}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-evh-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-evh-dark dark:text-white placeholder:text-evh-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-evh-primary/50 focus:border-evh-primary transition-all"
                placeholder={t("login.password.placeholder")}
                required
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400 p-3 rounded-xl"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 btn-primary text-base disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? t("login.loading") : t("login.button")}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-2xl bg-evh-gray-50 dark:bg-slate-800">
            <p className="text-xs font-medium text-evh-gray-500 dark:text-slate-400 mb-2">Demo Credentials</p>
            <p className="text-xs text-evh-gray-400 dark:text-slate-500">Email: demo@evh.de</p>
            <p className="text-xs text-evh-gray-400 dark:text-slate-500">Password: demo123</p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-evh-gray-400 dark:text-slate-500">
          &copy; {new Date().getFullYear()} Stadtwerke Halle GmbH
        </p>
      </motion.div>
    </div>
  );
}
