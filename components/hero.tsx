"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "@/components/game";
import { gsap } from "gsap";
import ShootingStars from "@/components/shooting-stars";

type HeroProps = {
  bgReady?: boolean;
};

export default function Hero({ bgReady: externalBgReady }: HeroProps) {
  const [showGame, setShowGame] = useState(false);
  const [heroBgReady, setHeroBgReady] = useState(false);
  const [lettersReady, setLettersReady] = useState(false);
  const [bgReady, setBgReady] = useState(false);
  const heroBgRef = useRef<HTMLElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  const text = "DOTSLASH 9.0";
  const letters = text.split("");

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
    if (backgroundElementsRef.current) {
      gsap.set(backgroundElementsRef.current, {
        opacity: 0,
      });
    }
  }, []);

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

  useEffect(() => {
    const shouldFadeBg = externalBgReady !== undefined ? externalBgReady : bgReady;
    if (!shouldFadeBg || !backgroundElementsRef.current) return;

    const backgroundElements = backgroundElementsRef.current;

    gsap.to(backgroundElements, {
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
  }, [bgReady, externalBgReady]);

  return (
    <section
      ref={heroBgRef}
      className="hero-background"
      style={{ position: "relative", overflow: "hidden", height: "100vh", backgroundColor: "#000" }}>
      <h1
        ref={titleRef}
        style={{
          position: "absolute",
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
      <div
        ref={backgroundElementsRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, zIndex: 0 }}>
        <img
          src="/bg-test.png"
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
        />
        <ShootingStars />
        <img
          src="/galaxy1.gif"
          alt="Galaxy"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            transform: "translate(-40%, -45%)",
            width: "clamp(500px, 60vw, 1200px)",
            height: "clamp(500px, 60vw, 1200px)",
            objectFit: "contain",
            imageRendering: "pixelated",
            pointerEvents: "none",
            zIndex: 1,
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
            zIndex: 1,
            overflow: "hidden",
          }}
        />
      </div>
      {showGame && heroBgReady && (
        <div
          ref={gameRef}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, zIndex: 2 }}>
          <Game onQuit={() => setShowGame(false)} />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "200px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 1) 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </section>
  );
}

