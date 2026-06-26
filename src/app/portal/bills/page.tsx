"use client";

import { BillsContent } from "@/components/portal/bills-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function BillsPage() {
  return (
    <PageTransition>
      <BillsContent />
    </PageTransition>
  );
}
