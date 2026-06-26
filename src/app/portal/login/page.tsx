"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@evh.de");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/portal/dashboard");
    } catch {
      setError("Invalid email or password. Try demo@evh.de / demo123");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-evh-bg via-white to-evh-bg p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-radial from-evh-yellow/5 to-transparent blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
            <span className="text-2xl font-display font-bold text-evh-dark">EVH</span>
            <span className="w-2 h-2 rounded-full bg-evh-yellow" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-evh-dark">Welcome back</h1>
          <p className="text-evh-gray-500 mt-2">Sign in to your customer portal</p>
        </div>

        <div className="bg-white rounded-3xl p-8 card-shadow">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-evh-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-evh-gray-200 bg-white text-evh-dark placeholder:text-evh-gray-400 focus:outline-none focus:ring-2 focus:ring-evh-yellow/50 focus:border-evh-yellow transition-all"
                placeholder="demo@evh.de"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-evh-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-evh-gray-200 bg-white text-evh-dark placeholder:text-evh-gray-400 focus:outline-none focus:ring-2 focus:ring-evh-yellow/50 focus:border-evh-yellow transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 bg-red-50 p-3 rounded-xl"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-evh-dark text-white text-base font-semibold rounded-xl hover:bg-evh-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-2xl bg-evh-gray-50">
            <p className="text-xs font-medium text-evh-gray-500 mb-2">Demo Credentials</p>
            <p className="text-xs text-evh-gray-400">Email: demo@evh.de</p>
            <p className="text-xs text-evh-gray-400">Password: demo123</p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-evh-gray-400">
          &copy; {new Date().getFullYear()} Stadtwerke Halle GmbH
        </p>
      </motion.div>
    </div>
  );
}
