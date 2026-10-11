"use client";

import { useIsMobile } from "@/hooks/use-mobile";

const sponsors = [
  "Devfolio",
  "CodeCrafters",
  "Vercel",
  "Windsurf",
  "ElevenLabs",
  "Rovo",
  ".xyz",
  "GitHub",
  "DigitalOcean",
  "ETHIndia",
  "CodingBlocks",
  "Beeceptor",
  "Avadh",
  "GiveMyCertificate",
  "Krishost",
  "Mira",
  "Polygon",
  "Rosenfeld",
  "Twilio",
  "Wolfram",
];

const sponsorLogos: Record<string, string> = {
  Devfolio: "/sponsors/devfolio.png",
  CodeCrafters: "/sponsors/codecrafters.png",
  Vercel: "/sponsors/vercel.png",
  Windsurf: "/sponsors/windsurf.png",
  ElevenLabs: "/sponsors/elevenlabs.png",
  Rovo: "/sponsors/rovo.png",
  ".xyz": "/sponsors/xyz.png",
  GitHub: "/sponsors/github.png",
  DigitalOcean: "/sponsors/digitalocean.png",
  ETHIndia: "/sponsors/ethindia.png",
  CodingBlocks: "/sponsors/codingblocks.png",
  Beeceptor: "/sponsors/beeceptor.png",
  Avadh: "/sponsors/avadh.png",
  GiveMyCertificate: "/sponsors/givemy.png",
  Krishost: "/sponsors/krishost.png",
  Mira: "/sponsors/mira.png",
  Polygon: "/sponsors/polygon.png",
  Rosenfeld: "/sponsors/rosenfeld.png",
  Twilio: "/sponsors/twilio.png",
  Wolfram: "/sponsors/wolfram.png",
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
        src="/space/planet3.gif"
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
        src="/space/planet5.gif"
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
            gap: "clamp(4px, 0.8vw, 10px)",
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
                className="group"
                style={{
                  backgroundColor: "#060010",
                  border: "1px solid rgba(75,85,255,0.3)",
                  borderRadius: "0",
                  padding: "clamp(2px, 0.4vw, 6px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "clamp(20px, 3vh, 40px)",
                  height: "auto",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  gridColumnStart: isSecondLast ? 2 : isLast ? 3 : "auto",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(75,85,255,0.6), 0 0 80px rgba(75,85,255,0.3), inset 0 0 30px rgba(75,85,255,0.1)";
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(75,85,255,0.3)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                {/* Animated background gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 50%, transparent 100%)",
                  }}
                />

                {/* Animated border glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(75,85,255,0.2) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />

                {/* Corner accents */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "30px",
                    height: "30px",
                    borderTop: "2px solid rgba(75,85,255,0)",
                    borderLeft: "2px solid rgba(75,85,255,0)",
                    transition: "border-color 0.3s ease",
                  }}
                  className="group-hover:border-[rgba(75,85,255,0.8)]"
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30px",
                    height: "30px",
                    borderTop: "2px solid rgba(75,85,255,0)",
                    borderRight: "2px solid rgba(75,85,255,0)",
                    transition: "border-color 0.3s ease",
                  }}
                  className="group-hover:border-[rgba(75,85,255,0.8)]"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "30px",
                    height: "30px",
                    borderBottom: "2px solid rgba(75,85,255,0)",
                    borderLeft: "2px solid rgba(75,85,255,0)",
                    transition: "border-color 0.3s ease",
                  }}
                  className="group-hover:border-[rgba(75,85,255,0.8)]"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "30px",
                    height: "30px",
                    borderBottom: "2px solid rgba(75,85,255,0)",
                    borderRight: "2px solid rgba(75,85,255,0)",
                    transition: "border-color 0.3s ease",
                  }}
                  className="group-hover:border-[rgba(75,85,255,0.8)]"
                />

                {/* Logo container with better styling */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "clamp(2px, 0.4vw, 4px)",
                  }}
                >
                  <img
                    src={sponsorLogos[sponsor] || "/github.png"}
                    alt={sponsor}
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "clamp(80px, 10vw, 120px)",
                      maxHeight: "clamp(80px, 10vh, 120px)",
                      objectFit: "contain",
                      opacity: 0.9,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      filter: "brightness(0.95) contrast(1.1)",
                    }}
                    className="group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter =
                        "brightness(1.1) contrast(1.15) drop-shadow(0 0 20px rgba(75,85,255,0.6))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "brightness(0.95) contrast(1.1)";
                    }}
                  />
                </div>
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
