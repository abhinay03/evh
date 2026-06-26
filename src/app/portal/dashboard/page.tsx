"use client";

import { DashboardContent } from "@/components/portal/dashboard-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function DashboardPage() {
  return (
    <PageTransition>
      <DashboardContent />
    </PageTransition>
  );
}
