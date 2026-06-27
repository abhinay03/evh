"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const preferences = [
  { labelKey: "profile.billing.cycle", valueKey: "profile.billing.cycle.value" },
  { labelKey: "profile.auto.pay", valueKey: "profile.auto.pay.value", color: "text-green-600" },
  { labelKey: "profile.paperless", valueKey: "profile.paperless.value" },
  { labelKey: "profile.language", valueKey: "profile.language.value" },
];

export function ProfileContent() {
  const { customer } = useAuth();
  const { t, locale } = useLocale();
  const { theme } = useTheme();

  if (!customer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("profile.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("profile.subtitle")}</p>
      </div>

      <div className="flex items-center gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 card-shadow">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-evh-primary to-red-400 flex items-center justify-center text-2xl font-bold text-evh-dark">
          {customer.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-evh-dark dark:text-white">{customer.name}</h2>
          <p className="text-sm text-evh-gray-500 dark:text-slate-400">{customer.email}</p>
          <Badge className="mt-1">{t("profile.since")} {new Date(customer.joinedDate).getFullYear()}</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("profile.personal")}</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-evh-gray-100 dark:border-slate-700">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.name")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white">{customer.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100 dark:border-slate-700">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.email")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white">{customer.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100 dark:border-slate-700">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.address")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white">{customer.address}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.district")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white">{customer.district}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("profile.home")}</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-evh-gray-100 dark:border-slate-700">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.type")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white capitalize">{customer.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100 dark:border-slate-700">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.residents")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white">{customer.residents}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100 dark:border-slate-700">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.heating")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white capitalize">{customer.heatingType}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t("profile.solar")}</span>
                <span className="text-sm font-medium text-evh-dark dark:text-white">{customer.hasSolar ? t("profile.yes") : t("profile.no")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("profile.preferences")}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { labelKey: "profile.billing.cycle", value: "Monthly" },
              { labelKey: "profile.auto.pay", value: "Active", color: "text-green-600" },
              { labelKey: "profile.paperless", value: "Yes" },
              { labelKey: "profile.language", value: "Deutsch" },
            ].map((pref) => (
              <div key={pref.labelKey} className="p-4 rounded-2xl bg-evh-gray-50 dark:bg-slate-800 flex justify-between items-center">
                <span className="text-sm text-evh-gray-500 dark:text-slate-400">{t(pref.labelKey)}</span>
                <span className={`text-sm font-semibold ${pref.color || "text-evh-dark dark:text-white"}`}>{pref.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
