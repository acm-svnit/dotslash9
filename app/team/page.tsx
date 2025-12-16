"use client";

import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import Navbar from "@/components/navbar";

export default function TeamPage() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <TeamSection />
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
