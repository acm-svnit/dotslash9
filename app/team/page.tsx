"use client";

import { useState, useEffect } from "react";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import VideosSection from "@/components/videos-section";
import Navbar from "@/components/navbar";

export default function TeamPage() {
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
      <TeamSection />
      <ContactSection />
      <VideosSection />
    </main>
  );
}
