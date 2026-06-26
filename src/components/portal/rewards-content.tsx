"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import type { Reward } from "@/lib/mock-data";

const categoryEmojis: Record<string, string> = {
  coffee: "☕",
  museum: "🎨",
  transport: "🚃",
  restaurant: "🍽️",
  green: "🌱",
};

export function RewardsContent() {
  const { customer } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [filter, setFilter] = useState<"all" | "available" | "claimed">("available");

  useEffect(() => {
    fetch(`/api/rewards?customerId=${customer?.id || "CUST-001"}`)
      .then((r) => r.json())
      .then((d) => {
        setRewards(d.rewards);
        setTotalPoints(d.totalPoints);
      });
  }, [customer]);

  const filtered = rewards.filter((r) => {
    if (filter === "available") return !r.claimed;
    if (filter === "claimed") return r.claimed;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">Rewards</h1>
          <p className="text-evh-gray-500 text-sm mt-1">Unlock discounts and perks across Halle.</p>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-evh-yellow/10 card-shadow text-center">
          <p className="text-2xl font-display font-bold text-evh-yellow">{totalPoints}</p>
          <p className="text-xs text-evh-gray-500">Points available</p>
        </div>
      </div>

      <div className="flex gap-2">
        {(["available", "all", "claimed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f ? "bg-evh-dark text-white" : "bg-evh-gray-50 text-evh-gray-500 hover:bg-evh-gray-100"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((reward, i) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card>
              <CardContent className="p-5">
                <span className="text-3xl mb-3 block">{categoryEmojis[reward.category] || "🎁"}</span>
                <h3 className="text-base font-semibold text-evh-dark">{reward.title}</h3>
                <p className="text-sm text-evh-gray-500 mt-1">{reward.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <Badge variant="default">{reward.points} points</Badge>
                  {!reward.claimed ? (
                    <button className="px-4 py-1.5 bg-evh-yellow text-evh-dark text-xs font-semibold rounded-lg hover:bg-amber-400 transition-colors">
                      Claim
                    </button>
                  ) : (
                    <Badge variant="success">Claimed</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
