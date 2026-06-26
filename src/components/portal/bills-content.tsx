"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import type { Invoice } from "@/lib/mock-data";

export function BillsContent() {
  const { customer } = useAuth();
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
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">Bills</h1>
        <p className="text-evh-gray-500 text-sm mt-1">View and manage your invoices.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Total Paid</p>
            <p className="text-2xl font-display font-bold text-green-600 mt-2">{formatCurrency(totals.totalPaid)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Total Due</p>
            <p className="text-2xl font-display font-bold text-amber-600 mt-2">{formatCurrency(totals.totalDue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Auto Pay</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 h-5 bg-green-400 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
              </div>
              <span className="text-sm text-evh-dark font-medium">Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Invoice History</p>
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-4 rounded-xl bg-evh-gray-50 hover:bg-evh-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${inv.paid ? "bg-green-400" : "bg-amber-400"}`} />
                  <div>
                    <p className="text-sm font-medium text-evh-dark">{inv.month}</p>
                    <p className="text-xs text-evh-gray-400 capitalize">{inv.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-evh-dark">{formatCurrency(inv.amount)}</span>
                  <Badge variant={inv.paid ? "success" : "warning"}>
                    {inv.paid ? "Paid" : "Due"}
                  </Badge>
                  <button className="text-xs text-evh-accent hover:text-evh-accent/80 font-medium">
                    Download
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
