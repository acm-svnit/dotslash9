"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "@/components/game";
import { gsap } from "gsap";
import ShootingStars from "@/components/shooting-stars";

type HeroProps = {
  bgReady: boolean;
};

export default function Hero({ bgReady }: HeroProps) {
  const [showGame, setShowGame] = useState(false);
  const [heroBgReady, setHeroBgReady] = useState(false);
  const heroBgRef = useRef<HTMLElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowGame(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (heroBgRef.current) {
      gsap.set(heroBgRef.current, {
        opacity: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (!bgReady || !heroBgRef.current) return;

    const heroBg = heroBgRef.current;

    gsap.to(heroBg, {
      opacity: 1,
      duration: 3,
      ease: "power2.inOut",
      onComplete: () => {
        setHeroBgReady(true);
        setShowGame(true);
        
        setTimeout(() => {
          if (gameRef.current) {
            gsap.set(gameRef.current, { opacity: 0 });
            gsap.to(gameRef.current, {
              opacity: 1,
              duration: 2,
              ease: "power2.inOut",
            });
          }
        }, 50);
      },
    });
  }, [bgReady]);

  return (
    <section
      ref={heroBgRef}
      className="hero-background"
      style={{ position: "relative", opacity: 0, overflow: "hidden" }}>
      <ShootingStars />
      <img
        src="/galaxy1.gif"
        alt="Galaxy"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          transform: "translate(-40%, -40%)",
          width: "clamp(500px, 60vw, 1200px)",
          height: "clamp(500px, 60vw, 1200px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <img
        src="/hole.gif"
        alt="Hole"
        className="hero-hole"
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          transform: "translate(30%, 40%)",
          width: "clamp(700px, 75vw, 1500px)",
          height: "clamp(700px, 75vw, 1500px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      />
      {showGame && heroBgReady && (
        <div
          ref={gameRef}
          style={{ width: "100%", height: "100%", opacity: 0 }}>
          <Game onQuit={() => setShowGame(false)} />
        </div>
      )}
    </section>
  );
}

