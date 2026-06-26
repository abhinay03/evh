"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export function SettingsContent() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/portal/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">Settings</h1>
        <p className="text-evh-gray-500 text-sm mt-1">Customise your experience.</p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Appearance</p>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-evh-gray-50">
            <div>
              <p className="text-sm font-medium text-evh-dark">Dark Mode</p>
              <p className="text-xs text-evh-gray-500">Coming soon</p>
            </div>
            <div className="w-10 h-5 bg-evh-gray-300 rounded-full relative opacity-50">
              <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-evh-gray-50">
            <div>
              <p className="text-sm font-medium text-evh-dark">Reduced Motion</p>
              <p className="text-xs text-evh-gray-500">Prefer reduced animations</p>
            </div>
            <div className="w-10 h-5 bg-evh-gray-300 rounded-full relative opacity-50">
              <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Language</p>
          <div className="flex gap-3">
            {["Deutsch", "English"].map((lang) => (
              <button
                key={lang}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  lang === "Deutsch" ? "bg-evh-dark text-white" : "bg-evh-gray-50 text-evh-gray-500 hover:bg-evh-gray-100"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider">Privacy</p>
          <div className="space-y-3">
            {[
              { label: "Share usage data for community insights", enabled: true },
              { label: "Receive personalised recommendations", enabled: true },
              { label: "AI assistant remembers preferences", enabled: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-evh-gray-50">
                <span className="text-sm text-evh-dark">{item.label}</span>
                <div className={`w-10 h-5 rounded-full relative ${item.enabled ? "bg-green-400" : "bg-evh-gray-300"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow ${item.enabled ? "right-0.5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Account</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors"
          >
            Sign Out
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
