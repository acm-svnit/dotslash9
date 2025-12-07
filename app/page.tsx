"use client";

import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import TimelineSection from "@/components/timeline-section";
import SponsorSection from "@/components/sponsor-section";

export default function HomePage() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Hero />
      <AboutSection />
      <TimelineSection />
      <SponsorSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
