"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/hero";
import { gsap } from "gsap";

export default function HomePage() {
  const [bgReady, setBgReady] = useState(false);
  const [lettersReady, setLettersReady] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const heroBgRef = useRef<HTMLElement>(null);

  const text = "DOTSLASH";
  const letters = text.split("");

  useEffect(() => {
    if (!lettersReady || !titleRef.current) return;

    const letters = lettersRef.current.filter(Boolean);
    if (letters.length === 0) return;
    
    gsap.set(letters, {
      opacity: 0,
      y: 150,
      scale: 0.3,
      rotationX: -90,
      filter: "blur(10px)",
    });

    const lettersDuration = 2;
    const lettersStagger = 0.15;
    const lettersDelay = 0.5;

    gsap.to(letters, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      filter: "blur(0px)",
      duration: lettersDuration,
      ease: "power2.out",
      stagger: lettersStagger,
      delay: lettersDelay,
      onComplete: () => {
        setBgReady(true);
      },
    });
  }, [lettersReady]);

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <h1
        ref={titleRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Upheav, sans-serif",
          fontSize: "clamp(48px, 15vw, 200px)",
          color: "#fff",
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
          zIndex: 10,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          display: "flex",
        }}>
        {letters.map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) {
                lettersRef.current[index] = el;
                if (index === letters.length - 1) {
                  const allSet = lettersRef.current
                    .slice(0, letters.length)
                    .every((ref) => ref !== null && ref !== undefined);
                  if (allSet) {
                    setLettersReady(true);
                  }
                }
              }
            }}
            style={{ display: "inline-block" }}>
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
      <Hero bgReady={bgReady} />
    </main>
  );
}
