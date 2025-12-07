"use client";

import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";

export default function HomePage() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Hero />
      <AboutSection />
      <FAQSection />
    </main>
  );
}
