"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-evh-gray-600 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border border-evh-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-evh-dark dark:text-white placeholder:text-evh-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-evh-primary/50 focus:border-evh-primary transition-all duration-200 ${error ? "border-red-400 focus:ring-red-400/50 focus:border-red-400" : ""} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
