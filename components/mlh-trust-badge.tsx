"use client";

import React, { useEffect, useState } from "react";
import { useGame } from "@/contexts/game-context";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MlhTrustBadge() {
  const { isGameActive } = useGame();
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let ticking = false;
    const updateScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop || 0);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Distance in px over which the badge smoothly transitions from normal to stable size
  const SCROLL_THRESHOLD = 160;
  const progress = Math.min(1, Math.max(0, scrollY / SCROLL_THRESHOLD));

  // Sizing definitions:
  // Desktop: starts at normal size (100px) -> shrinks down to stable size (60px) -> stops getting smaller
  // Mobile: starts at normal size (72px) -> shrinks down to stable size (48px) -> stops getting smaller
  const maxW = isMobile ? 72 : 100;
  const minW = isMobile ? 48 : 60;
  const currentWidth = maxW - progress * (maxW - minW);

  // Spacing from right:
  // Desktop: 50px (some space from right side as per official asset)
  // Mobile: 16px (responsive spacing from right side to not crowd mobile screen/navbar)
  const rightSpacing = isMobile ? "16px" : "50px";

  return (
    <a
      id="mlh-trust-badge"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=white"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        right: mounted ? rightSpacing : "50px",
        zIndex: 10000,
        width: mounted ? `${Math.round(currentWidth)}px` : "10%",
        maxWidth: isMobile ? "75px" : "100px",
        minWidth: isMobile ? "45px" : "60px",
        opacity: isGameActive ? 0 : 1,
        visibility: isGameActive ? "hidden" : "visible",
        pointerEvents: isGameActive ? "none" : "auto",
        transform: isGameActive ? "translateY(-16px)" : "translateY(0)",
        transition: isGameActive
          ? "opacity 0.25s ease, transform 0.25s ease, visibility 0.25s"
          : "opacity 0.3s ease, transform 0.3s ease, width 0.12s ease-out, right 0.2s ease, visibility 0.3s",
      }}
    >
      <img
        src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg"
        alt="Major League Hacking 2027 Hackathon Season"
        style={{
          width: "100%",
          display: "block",
        }}
      />
    </a>
  );
}
