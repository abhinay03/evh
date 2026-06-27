"use client";

import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  value: number;
  secondary?: number;
}

interface ChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  secondaryColor?: string;
  showGrid?: boolean;
  className?: string;
}

export function Chart({
  data,
  height = 200,
  color = "#E40000",
  secondaryColor = "#FF2A2A",
  showGrid = false,
  className = "",
}: ChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.value, d.secondary || 0)));

  return (
    <div className={`flex items-end gap-2 ${className}`} style={{ height }}>
      {data.map((point, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          {point.secondary !== undefined && (
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(point.secondary / maxValue) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full rounded-t-lg opacity-30"
              style={{ backgroundColor: secondaryColor, minHeight: 2 }}
            />
          )}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${(point.value / maxValue) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full rounded-t-lg"
            style={{ backgroundColor: color, minHeight: 2 }}
          />
          {showGrid && (
            <span className="text-[10px] text-evh-gray-400 mt-1 -rotate-45 origin-left">
              {point.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function LineChart({
  data,
  height = 200,
  color = "#C57214",
  className = "",
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  className?: string;
}) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: ((d.value - minValue) / range) * (height - 40) + 20,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${height - p.y}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      style={{ height }}
    >
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={height - p.y}
          r="1.5"
          fill={color}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}
