"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "@/components/shared/chart";
import { usageData } from "@/lib/mock-data";

const schedule = [
  { time: "05:30", temp: 20, label: "Wake up" },
  { time: "08:00", temp: 18, label: "Away" },
  { time: "16:00", temp: 21, label: "Evening" },
  { time: "22:00", temp: 17, label: "Night" },
];

const recommendations = [
  "Schedule a smart thermostat installation to save up to 12%",
  "Your heating efficiency peaks between 16:00-20:00",
  "Consider lowering night temperature by 1°C to save €35/year",
];

export function HeatingContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">Heating</h1>
        <p className="text-evh-gray-500 text-sm mt-1">Monitor and optimise your heating consumption.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Monthly Consumption (kWh)</p>
              <Badge variant="success">↓ 8% vs last month</Badge>
            </div>
            <Chart
              data={usageData.map((d) => ({ label: d.month, value: d.heating }))}
              height={200}
              showGrid
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col items-center justify-center h-full">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Efficiency Score</p>
            <div className="w-32 h-32 rounded-full bg-evh-yellow/10 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="54" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle
                  cx="64" cy="64" r="54" fill="none" stroke="#FFD100" strokeWidth="8"
                  strokeDasharray={`${(82 / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                  initial={{ strokeDasharray: `0 ${2 * Math.PI * 54}` }}
                  animate={{ strokeDasharray: `${(82 / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}` }}
                  transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-evh-dark">82</p>
                <p className="text-xs text-evh-gray-400">/100</p>
              </div>
            </div>
            <p className="text-xs text-evh-gray-500 mt-4">Neighbourhood avg: 74</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Temperature Schedule</p>
            <div className="space-y-3">
              {schedule.map((s) => (
                <div key={s.time} className="flex items-center justify-between p-3 rounded-xl bg-evh-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-medium text-evh-gray-400">{s.time}</span>
                    <span className="text-sm text-evh-gray-600">{s.label}</span>
                  </div>
                  <span className="text-lg font-display font-semibold text-evh-dark">{s.temp}°</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">AI Recommendations</p>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-evh-gray-50">
                  <span className="text-lg shrink-0">💡</span>
                  <p className="text-sm text-evh-dark">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Maintenance Timeline</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-evh-dark">Annual inspection</p>
                <p className="text-xs text-evh-gray-400">15 March 2024</p>
              </div>
              <Badge variant="success">Completed</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-evh-dark">Filter replacement</p>
                <p className="text-xs text-evh-gray-400">20 September 2024</p>
              </div>
              <Badge variant="warning">Scheduled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
