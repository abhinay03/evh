"use client";

import { ElectricityContent } from "@/components/portal/electricity-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function ElectricityPage() {
  return (
    <PageTransition>
      <ElectricityContent />
    </PageTransition>
  );
}
