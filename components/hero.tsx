"use client";

import { useEffect, useState } from "react";
import { Game } from "@/components/game";

export default function Hero() {
  const [showGame, setShowGame] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowGame(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="hero-background">
      {showGame && <Game />}
    </section>
  );
}

