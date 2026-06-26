"use client";

import { ProfileContent } from "@/components/portal/profile-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function ProfilePage() {
  return (
    <PageTransition>
      <ProfileContent />
    </PageTransition>
  );
}
