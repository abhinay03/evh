"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-evh-bg via-white to-evh-bg p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-display font-bold text-evh-dark mb-2">
          Something went wrong
        </h1>
        <p className="text-evh-gray-500 mb-8 text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-evh-dark text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
