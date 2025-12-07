"use client";

import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import TimelineSection from "@/components/timeline-section";
import SponsorSection from "@/components/sponsor-section";
import ThemesSection from "@/components/themes-section";

export default function HomePage() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Hero />
      <AboutSection />
      <ThemesSection />
      <TimelineSection />
      <SponsorSection />
      <FAQSection />
      <ContactSection />
      <video
        src="/dotslash.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "85%",
          height: "auto",
          margin: "0 auto",
          minHeight: "200px",
          objectFit: "cover",
          display: "block",
          opacity: 0.5,
        }}
      />
    </main>
  );
}
