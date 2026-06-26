"use client";

import { HeatingContent } from "@/components/portal/heating-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function HeatingPage() {
  return (
    <PageTransition>
      <HeatingContent />
    </PageTransition>
  );
}
