"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";
import type { Invoice } from "@/lib/mock-data";

export function BillsContent() {
  const { customer } = useAuth();
  const { t, locale } = useLocale();
  const { theme } = useTheme();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [totals, setTotals] = useState({ totalPaid: 0, totalDue: 0 });

  useEffect(() => {
    fetch(`/api/bills?customerId=${customer?.id || "CUST-001"}`)
      .then((r) => r.json())
      .then((d) => {
        setInvoices(d.invoices);
        setTotals({ totalPaid: d.totalPaid, totalDue: d.totalDue });
      });
  }, [customer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("bills.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("bills.subtitle")}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("bills.total.paid")}</p>
            <p className="text-2xl font-display font-bold text-green-600 mt-2">{formatCurrency(totals.totalPaid)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("bills.total.due")}</p>
            <p className="text-2xl font-display font-bold text-amber-600 mt-2">{formatCurrency(totals.totalDue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider">{t("bills.auto.pay")}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 h-5 bg-green-400 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white dark:bg-slate-900 rounded-full absolute top-0.5 right-0.5 shadow" />
              </div>
              <span className="text-sm text-evh-dark dark:text-white font-medium">{t("bills.auto.active")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">{t("bills.history")}</p>
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-4 rounded-xl bg-evh-gray-50 dark:bg-slate-800 hover:bg-evh-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${inv.paid ? "bg-green-400" : "bg-amber-400"}`} />
                  <div>
                    <p className="text-sm font-medium text-evh-dark dark:text-white">{inv.month}</p>
                    <p className="text-xs text-evh-gray-400 dark:text-slate-500 capitalize">{inv.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-evh-dark dark:text-white">{formatCurrency(inv.amount)}</span>
                  <Badge variant={inv.paid ? "success" : "warning"}>
                    {inv.paid ? t("bills.paid") : t("bills.due")}
                  </Badge>
                  <button className="text-xs text-evh-accent hover:text-evh-accent/80 font-medium">
                    {t("bills.download")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
