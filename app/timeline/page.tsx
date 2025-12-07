"use client";

import TimelineSection from "@/components/timeline-section";
import ContactSection from "@/components/contact-section";
import Navbar from "@/components/navbar";

export default function TimelinePage() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <TimelineSection />
      <ContactSection />
    </main>
  );
}

