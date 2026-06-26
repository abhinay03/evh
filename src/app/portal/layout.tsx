"use client";

import { Sidebar } from "@/components/portal/sidebar";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-evh-bg">
      <Sidebar />
      <main className="flex-1 lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
