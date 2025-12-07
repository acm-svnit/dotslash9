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
    </main>
  );
}
