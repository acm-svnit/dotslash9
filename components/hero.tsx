"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "@/components/game";
import { gsap } from "gsap";

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

  // Set hero bg to invisible on mount
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

    // After letters animation completes, fade in hero background slowly
    gsap.to(heroBg, {
      opacity: 1,
      duration: 3,
      ease: "power2.inOut",
      onComplete: () => {
        // After background is fully animated, show game and fade it in
        setHeroBgReady(true);
        setShowGame(true);
        
        // Wait for game to render, then fade it in
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
      style={{ position: "relative", opacity: 0 }}>
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

