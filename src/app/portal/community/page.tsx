"use client";

import { CommunityContent } from "@/components/portal/community-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function CommunityPage() {
  return (
    <PageTransition>
      <CommunityContent />
    </PageTransition>
  );
}
