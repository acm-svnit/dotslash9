"use client";

import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";

export default function HomePage() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Hero />
      <AboutSection />
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
