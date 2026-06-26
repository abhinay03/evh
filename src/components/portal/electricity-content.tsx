"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "@/components/shared/chart";
import { usageData } from "@/lib/mock-data";

export function ElectricityContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">Electricity</h1>
        <p className="text-evh-gray-500 text-sm mt-1">Track your electricity usage and go green.</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Monthly Consumption (kWh)</p>
            <Badge variant="info">100% Green Energy</Badge>
          </div>
          <Chart
            data={usageData.map((d) => ({ label: d.month, value: d.electricity }))}
            height={200}
            color="#2563EB"
            showGrid
          />
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Energy Mix</p>
            <p className="text-xl font-display font-bold text-green-600 mt-2">100%</p>
            <p className="text-xs text-evh-gray-500 mt-1">Renewable</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Peak Hours</p>
            <p className="text-xl font-display font-bold text-evh-dark mt-2">17:00 - 21:00</p>
            <p className="text-xs text-evh-gray-500 mt-1">Higher rates apply</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Solar Ready</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl">☀️</span>
              <p className="text-sm font-medium text-evh-dark">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">EV Charging</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl">🔌</span>
              <p className="text-sm font-medium text-evh-dark">Not connected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Recommendations</p>
          <div className="space-y-3">
            {[
              "Shift laundry and dishwasher to after 21:00 to save on peak rates",
              "Your base load seems higher than average — check for standby devices",
              "Consider installing solar panels to reduce your bill by up to €340/year",
            ].map((rec, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-evh-gray-50">
                <span className="text-lg shrink-0">💡</span>
                <p className="text-sm text-evh-dark">{rec}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
