"use client";

import { AiAssistantContent } from "@/components/portal/ai-assistant-content";
import { PageTransition } from "@/components/shared/page-transition";

export default function AiAssistantPage() {
  return (
    <PageTransition>
      <AiAssistantContent />
    </PageTransition>
  );
}
