"use client";

import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-evh-gray-100 text-evh-gray-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    info: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
