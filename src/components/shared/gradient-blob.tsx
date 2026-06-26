"use client";

import { useMousePosition } from "@/hooks/use-mouse-position";

interface GradientBlobProps {
  className?: string;
  color?: string;
}

export function GradientBlob({ className = "", color = "rgba(255, 209, 0, 0.15)" }: GradientBlobProps) {
  const { x, y } = useMousePosition();

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ${className}`}
      style={{
        background: `radial-gradient(800px circle at ${x}px ${y}px, ${color}, transparent 40%)`,
      }}
    />
  );
}
