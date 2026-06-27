"use client";

import { Sidebar } from "@/components/portal/sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-evh-bg dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 min-h-screen w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
