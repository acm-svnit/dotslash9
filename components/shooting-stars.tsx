"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

type ShootingStar = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  length: number;
};

export default function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const lineRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const createStar = (): ShootingStar => {
      const startX = window.innerWidth * (0.7 + Math.random() * 0.3);
      const startY = Math.random() * window.innerHeight * 0.3;
      const length = 50 + Math.random() * 100;
      const angle = -45 + (Math.random() * 10 - 5);
      const radian = (angle * Math.PI) / 180;
      const endX = startX + Math.cos(radian) * length;
      const endY = startY + Math.sin(radian) * length;
      const duration = 0.5 + Math.random() * 1;

      return {
        id: Date.now() + Math.random(),
        startX,
        startY,
        endX,
        endY,
        duration,
        length,
      };
    };

    const addStar = () => {
      setStars((prev) => [...prev, createStar()]);
    };

    const interval = setInterval(() => {
      addStar();
    }, 2000 + Math.random() * 3000);

    addStar();

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    stars.forEach((star) => {
      const line = lineRefs.current.get(star.id);
      if (line) {
        gsap.fromTo(
          line,
          { opacity: 1 },
          {
            opacity: 0,
            duration: star.duration,
            ease: "power2.out",
          }
        );
      }
    });
  }, [stars]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}>
      <AnimatePresence>
        {stars.map((star) => {
          const angle = Math.atan2(star.endY - star.startY, star.endX - star.startX);
          const angleDeg = (angle * 180) / Math.PI;

          return (
            <motion.div
              key={star.id}
              ref={(el) => {
                if (el) {
                  lineRefs.current.set(star.id, el);
                } else {
                  lineRefs.current.delete(star.id);
                }
              }}
              initial={{
                x: star.startX,
                y: star.startY,
              }}
              animate={{
                x: star.endX,
                y: star.endY,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: star.duration,
                ease: "linear",
              }}
              onAnimationComplete={() => {
                setStars((prev) => prev.filter((s) => s.id !== star.id));
              }}
              style={{
                position: "absolute",
                width: "1px",
                height: `${star.length}px`,
                backgroundColor: "#fff",
                transformOrigin: "top center",
                rotate: `${angleDeg}deg`,
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

