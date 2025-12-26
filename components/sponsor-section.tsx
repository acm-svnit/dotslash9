"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const sponsors = [
  "GitHub",
  "DigitalOcean",
  "Devfolio",
  "ETHIndia",
  "CodingBlocks",
  "Beeceptor",
  "Avadh",
  "GiveMyCertificate",
  "Krishost",
  "Mira",
  "Polygon",
  "Rosenfield",
  "Twilio",
  "Wolfram",
];

const sponsorLogos: Record<string, string> = {
  GitHub: "/github.png",
  DigitalOcean: "/digitalocean.jpg",
  Devfolio: "/devfolio.jpg",
  ETHIndia: "/ethindia.webp",
  CodingBlocks: "/codingblocks.jpg",
  Beeceptor: "/beeceptor.png",
  Avadh: "/avadh.jpg",
  GiveMyCertificate: "/givemycertificate.png",
  Krishost: "/krishost.png",
  Mira: "/mira.png",
  Polygon: "/polygon.png",
  Rosenfield: "/rosenfield.png",
  Twilio: "/twilio.png",
  Wolfram: "/wolfram.png",
};

export default function SponsorSection() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        padding: "clamp(20px, 4vh, 60px) clamp(10px, 2vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <img
        src="/planet3.gif"
        alt="Planet"
        style={{
          position: "absolute",
          top: "10%",
          left: "0",
          transform: "translate(-30%, -50%)",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <img
        src="/planet5.gif"
        alt="Planet"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "0",
          transform: "translate(30%, 30%)",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(40px, 10vw, 100px)",
            color: "#fff",
            textAlign: "center",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
            marginBottom: "clamp(20px, 3vh, 40px)",
          }}
        >
          PAST SPONSORS
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "rgba(255, 255, 255, 0.8)",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
            marginBottom: "clamp(40px, 6vh, 80px)",
            lineHeight: "1.6",
          }}
        >
          We extend our heartfelt gratitude to our alumni for their unwavering
          support and guidance in making this event a success.
        </p>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "clamp(20px, 3vw, 40px)",
            padding: "clamp(10px, 2vw, 20px)",
          }}
        >
          {sponsors.map((sponsor, index) => {
            const isLastTwo = !isMobile && index >= sponsors.length - 2;
            const isSecondLast = !isMobile && index === sponsors.length - 2;
            const isLast = !isMobile && index === sponsors.length - 1;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #392e4e",
                  borderRadius: "0",
                  padding: "clamp(20px, 3vw, 30px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "clamp(100px, 15vh, 150px)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  gridColumnStart: isSecondLast ? 2 : isLast ? 3 : "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(75,85,255,0.5)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#392e4e";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at center, rgba(75,85,255,0.1) 0%, transparent 70%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
                <img
                  src={sponsorLogos[sponsor] || "/github.png"}
                  alt={sponsor}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "clamp(60px, 10vh, 100px)",
                    objectFit: "contain",
                    opacity: 1,
                    transition: "all 0.3s ease",
                    position: "relative",
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.filter =
                      "drop-shadow(0 0 15px rgba(75,85,255,0.8))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "none";
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "200px",
          background: "linear-gradient(to bottom, #000, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "200px",
          background: "linear-gradient(to top, #000, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </section>
  );
}
