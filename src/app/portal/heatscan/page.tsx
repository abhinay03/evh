"use client";

import { HeatScanAIContent } from "@/components/portal/heatscan-ai-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function HeatScanAIPage() {
  return (
    <PageTransition>
      <HeatScanAIContent />
    </PageTransition>
  );
}
