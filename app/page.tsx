"use client";

import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";

export default function HomePage() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Hero />
      <AboutSection />
    </main>
  );
}
