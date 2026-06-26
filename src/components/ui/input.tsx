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
          <label className="block text-sm font-medium text-evh-gray-600">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border border-evh-gray-200 bg-white text-evh-dark placeholder:text-evh-gray-400 focus:outline-none focus:ring-2 focus:ring-evh-yellow/50 focus:border-evh-yellow transition-all duration-200 ${error ? "border-red-400 focus:ring-red-400/50 focus:border-red-400" : ""} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
