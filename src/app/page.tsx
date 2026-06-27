"use client";

import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { HeatScanLanding } from "@/components/landing/heatscan-landing";
import { Story } from "@/components/landing/story";
import { InteractiveHalle } from "@/components/landing/interactive-halle";
import { WhyEvh } from "@/components/landing/why-evh";
import { DistrictHeating } from "@/components/landing/district-heating";
import { ElectricitySection } from "@/components/landing/electricity";
import { CommunitySection } from "@/components/landing/community";
import { SustainabilitySection } from "@/components/landing/sustainability";
import { CustomerStories } from "@/components/landing/customer-stories";
import { AiAssistantPreview } from "@/components/landing/ai-assistant";
import { MobileApp } from "@/components/landing/mobile-app";
import { CtaSection } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <HeatScanLanding />
      <Story />
      <InteractiveHalle />
      <WhyEvh />
      <DistrictHeating />
      <ElectricitySection />
      <CommunitySection />
      <SustainabilitySection />
      <CustomerStories />
      <AiAssistantPreview />
      <MobileApp />
      <CtaSection />
      <Footer />
    </main>
  );
}
