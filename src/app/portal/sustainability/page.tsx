"use client";

import { SustainabilityContent } from "@/components/portal/sustainability-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function SustainabilityPage() {
  return (
    <PageTransition>
      <SustainabilityContent />
    </PageTransition>
  );
}
