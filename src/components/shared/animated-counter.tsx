"use client";

import { useCountUp } from "@/hooks/use-count-up";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  className?: string;
  valueClassName?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  className = "",
  valueClassName = "text-[#16233A]",
}: AnimatedCounterProps) {
  const { count, ref } = useCountUp(target, duration);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className={`text-4xl md:text-5xl font-display font-bold ${valueClassName}`}>
        {prefix}
        {count.toLocaleString("de-DE")}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-[#94A3B8] font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
