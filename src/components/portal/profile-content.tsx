"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";

export function ProfileContent() {
  const { customer } = useAuth();

  if (!customer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">Profile</h1>
        <p className="text-evh-gray-500 text-sm mt-1">Manage your account information.</p>
      </div>

      <div className="flex items-center gap-4 p-6 rounded-3xl bg-white card-shadow">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-evh-yellow to-amber-400 flex items-center justify-center text-2xl font-bold text-evh-dark">
          {customer.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-evh-dark">{customer.name}</h2>
          <p className="text-sm text-evh-gray-500">{customer.email}</p>
          <Badge className="mt-1">Customer since {new Date(customer.joinedDate).getFullYear()}</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Personal Information</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-evh-gray-100">
                <span className="text-sm text-evh-gray-500">Name</span>
                <span className="text-sm font-medium text-evh-dark">{customer.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100">
                <span className="text-sm text-evh-gray-500">Email</span>
                <span className="text-sm font-medium text-evh-dark">{customer.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100">
                <span className="text-sm text-evh-gray-500">Address</span>
                <span className="text-sm font-medium text-evh-dark">{customer.address}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-evh-gray-500">District</span>
                <span className="text-sm font-medium text-evh-dark">{customer.district}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Home Information</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-evh-gray-100">
                <span className="text-sm text-evh-gray-500">Type</span>
                <span className="text-sm font-medium text-evh-dark capitalize">{customer.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100">
                <span className="text-sm text-evh-gray-500">Residents</span>
                <span className="text-sm font-medium text-evh-dark">{customer.residents}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-evh-gray-100">
                <span className="text-sm text-evh-gray-500">Heating</span>
                <span className="text-sm font-medium text-evh-dark capitalize">{customer.heatingType}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-evh-gray-500">Solar Panels</span>
                <span className="text-sm font-medium text-evh-dark">{customer.hasSolar ? "Yes" : "No"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-evh-gray-400 uppercase tracking-wider mb-4">Preferences</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Billing Cycle", value: "Monthly" },
              { label: "Auto Pay", value: "Active", color: "text-green-600" },
              { label: "Paperless Billing", value: "Yes" },
              { label: "Language", value: "Deutsch" },
            ].map((pref) => (
              <div key={pref.label} className="p-4 rounded-2xl bg-evh-gray-50 flex justify-between items-center">
                <span className="text-sm text-evh-gray-500">{pref.label}</span>
                <span className={`text-sm font-semibold ${pref.color || "text-evh-dark"}`}>{pref.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
