"use client";

import React, { useEffect, useState } from "react";
import { useSpriteScale } from "./use-sprite-scale";

export const ENEMY_WIDTH = 32;
export const ENEMY_HEIGHT = 32;

const COLUMNS = 2;
const ROWS = 1;
const TOTAL_FRAMES = COLUMNS * ROWS;

type EnemySpriteProps = {
  x: number;
  top: number;
  fps?: number;
  hp?: number;
  maxHp?: number;
  isHit?: boolean;
  lastHitTime?: number;
};

export const EnemySprite: React.FC<EnemySpriteProps> = ({
  x,
  top,
  fps = 10,
  hp = 1,
  maxHp = 1,
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

  const backgroundPositionX = -column * ENEMY_WIDTH;
  const backgroundPositionY = -row * ENEMY_HEIGHT;

  const showHealthBar = true;
  const healthPercentage = (hp / maxHp) * 100;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: top,
        width: ENEMY_WIDTH * spriteScale,
        height: ENEMY_HEIGHT * spriteScale,
        zIndex: 2,
      }}
    >
      {/* Health Bar */}
      {showHealthBar && (
        <div
          style={{
            position: "absolute",
            top: -6 * spriteScale,
            left: 0,
            width: "100%",
            height: 4 * spriteScale,
            backgroundColor: "#ff0000",
            border: `${1 * spriteScale}px solid #000`,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: `${Math.max(0, healthPercentage)}%`,
              height: "100%",
              backgroundColor: "#39FF14", // Neon Green
              boxShadow: "0 0 5px #39FF14",
              transition: "width 0.2s ease-out",
            }}
          />
        </div>
      )}

      {/* Enemy Sprite */}
      {!isHit && (
        <div
          style={{
            width: ENEMY_WIDTH,
            height: ENEMY_HEIGHT,
            backgroundImage: "url(/game/enemy.png)",
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
