"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import SponsorSection from "@/components/sponsor-section";
import CurrentSponsors from "@/components/current-sponsors";
import ThemesSection from "@/components/themes-section";
import VideosSection from "@/components/videos-section";
import Navbar from "@/components/navbar";

export default function HomePage() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);

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
      {showNavbar && (
        <Navbar
          opacity={isAtBottom ? 0 : navbarVisible ? 1 : 0}
          isAnimating={navbarVisible}
        />
      )}
      <Hero
        onTextAnimationStart={() => {
          setShowNavbar(true);

          setTimeout(() => setNavbarVisible(true), 100);
        }}
      />
      <AboutSection />
      <ThemesSection />
      <CurrentSponsors />
      <SponsorSection />
      <FAQSection />
      <ContactSection />
      <VideosSection />
    </main>
  );
}
