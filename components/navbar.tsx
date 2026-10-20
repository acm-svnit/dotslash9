"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  opacity?: number;
  isAnimating?: boolean;
}

export default function Navbar({
  opacity = 1,
  isAnimating = false,
}: NavbarProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTimelineClick = () => {
    if (pathname === "/timeline") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/timeline");
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    }
  };

  const handleTeamClick = () => {
    if (pathname === "/team") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/team");
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    }
  };

  const handleHomeClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/");
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    }
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/DotSlash_10.0.pdf";
    link.download = "DotSlash_10.0.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9998,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Loading...
          </div>
          <div
            style={{
              width: "300px",
              height: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: "12px",
              marginTop: "10px",
              opacity: 0.7,
            }}
          >
            100%
          </div>
        </div>
      )}
      <nav
        style={{
          position: "fixed",
          top: "clamp(15px, 2vh, 20px)",
          left: "50%",
          transform: isAnimating
            ? "translateX(-50%)"
            : "translateX(-50%) translateY(-20px)",
          zIndex: 1000,
          width: "auto",
          maxWidth: isMobile ? "95%" : "90%",
          opacity: opacity,
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          pointerEvents: opacity === 0 ? "none" : "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(6, 0, 16, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid #392e4e",
            borderRadius: "0",
            padding: isMobile
              ? "clamp(4px, 0.8vw, 8px) clamp(8px, 1.5vw, 16px)"
              : "clamp(6px, 1vw, 10px) clamp(16px, 2.5vw, 30px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "clamp(4px, 1vw, 8px)" : "clamp(12px, 1.8vw, 24px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            flexWrap: "nowrap",
          }}
        >
          <button
            className="navbar-button"
            onClick={handleHomeClick}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Home
          </button>
          <button
            className="navbar-button"
            onClick={handleDownloadBrochure}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Brochure
          </button>
          <button
            className="navbar-button"
            onClick={handleTimelineClick}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Timeline
          </button>
          <button
            className="navbar-button"
            onClick={handleTeamClick}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Team
          </button>
        </div>
      </nav>
    </>
  );
}
