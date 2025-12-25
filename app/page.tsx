"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import SponsorSection from "@/components/sponsor-section";
import ThemesSection from "@/components/themes-section";
import Navbar from "@/components/navbar";

export default function HomePage() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const isBottom = scrollTop + windowHeight >= documentHeight - 50;
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Navbar opacity={isAtBottom ? 0 : 1} />
      <Hero />
      <AboutSection />
      <ThemesSection />
      <SponsorSection />
      <FAQSection />
      <ContactSection />
      <div
        style={{
          position: "relative",
          width: "85%",
          margin: "0 auto",
          minHeight: "200px",
        }}>
        <video
          src="/dotslash.webm"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            display: "block",
            opacity: 0.5,
          }}
        />
        <img
          src="/sentry.png"
          alt="Sentry"
          style={{
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            height: "90%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      </div>
    </main>
  );
}
