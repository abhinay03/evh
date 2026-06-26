"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-evh-yellow text-evh-dark hover:bg-amber-400 shadow-lg shadow-evh-yellow/25",
      secondary: "bg-evh-dark text-white hover:bg-evh-gray-700 shadow-lg shadow-evh-dark/20",
      ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/10",
      outline: "border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-2",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-3",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
