"use client"

import React, { useEffect, useState } from "react";
import { useSpriteScale } from "./use-sprite-scale";

export const BOSS_WIDTH = 72;
export const BOSS_HEIGHT = 91;

const COLUMNS = 12;
const ROWS = 1;
const TOTAL_FRAMES = COLUMNS * ROWS;

type BossSpriteProps = {
  x: number;
  top: number;
  fps?: number;
  hp: number;
  maxHp: number;
  isHit?: boolean;
  lastHitTime?: number;
};

export const BossSprite: React.FC<BossSpriteProps> = ({
  x,
  top,
  fps = 10,
  hp,
  maxHp,
  isHit = false,
  lastHitTime = 0,
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const spriteScale = useSpriteScale();

  useEffect(() => {
    if (lastHitTime > 0) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 100);
      return () => clearTimeout(timer);
    }
  }, [lastHitTime]);

  useEffect(() => {
    const frameDuration = 1000 / fps;

    const intervalId = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % TOTAL_FRAMES);
    }, frameDuration);

    return () => window.clearInterval(intervalId);
  }, [fps]);

  const column = frameIndex % COLUMNS;
  const row = Math.floor(frameIndex / COLUMNS);

  const backgroundPositionX = -column * BOSS_WIDTH;
  const backgroundPositionY = -row * BOSS_HEIGHT;

  const healthPercentage = (hp / maxHp) * 100;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top,
        width: BOSS_WIDTH * spriteScale,
        height: BOSS_HEIGHT * spriteScale,
        zIndex: 3,
      }}
    >
      {/* Health Bar */}
      <div
        style={{
          position: "absolute",
          top: -10 * spriteScale,
          left: 0,
          width: "100%",
          height: 6 * spriteScale,
          backgroundColor: "#440000",
          border: `${1 * spriteScale}px solid #000`,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: `${Math.max(0, healthPercentage)}%`,
            height: "100%",
            backgroundColor: "#FFCC00",
            boxShadow: "0 0 6px #FFCC00",
            transition: "width 0.2s ease-out",
          }}
        />
      </div>

      {/* Boss Sprite */}
      {!isHit && (
        <div
          style={{
            width: BOSS_WIDTH,
            height: BOSS_HEIGHT,
            backgroundImage: "url(/game/boss.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
            imageRendering: "pixelated",
            transform: `scale(${spriteScale})`,
            transformOrigin: "top left",
            filter: isFlashing ? "brightness(0) invert(1)" : "none",
          }}
        />
      )}
    </div>
  );
};

