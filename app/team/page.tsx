"use client";

import { useState, useEffect } from "react";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
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
        <video
          src="/sentry3.webm"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "110%",
            height: "110%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      </div>
    </main>
  );
}
