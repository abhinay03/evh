"use client";

import { SettingsContent } from "@/components/portal/settings-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function SettingsPage() {
  return (
    <PageTransition>
      <SettingsContent />
    </PageTransition>
  );
}
