"use client";

import { RewardsContent } from "@/components/portal/rewards-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function RewardsPage() {
  return (
    <PageTransition>
      <RewardsContent />
    </PageTransition>
  );
}
