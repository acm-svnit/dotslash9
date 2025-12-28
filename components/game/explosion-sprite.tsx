"use client";

import React, { useEffect, useState } from "react";
import { useSpriteScale } from "./use-sprite-scale";

const FRAME_SIZE = 16;
export const EXPLOSION_SIZE = 30;

const COLUMNS = 5;
const ROWS = 1;
const TOTAL_FRAMES = COLUMNS * ROWS;

type ExplosionSpriteProps = {
  x: number;
  top: number;
  fps?: number;
  onComplete?: () => void;
};

export const ExplosionSprite: React.FC<ExplosionSpriteProps> = ({
  x,
  top,
  fps = 10,
  onComplete,
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const spriteScale = useSpriteScale();

  useEffect(() => {
    const frameDuration = 1000 / fps;

    const intervalId = window.setInterval(() => {
      setFrameIndex((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_FRAMES) {
          if (onComplete) {
            onComplete();
          }
          return prev;
        }
        return next;
      });
    }, frameDuration);

    return () => window.clearInterval(intervalId);
  }, [fps, onComplete]);

  const column = frameIndex % COLUMNS;
  const row = Math.floor(frameIndex / COLUMNS);

  const spriteSheetWidth = COLUMNS * FRAME_SIZE * (EXPLOSION_SIZE / FRAME_SIZE);
  const spriteSheetHeight = ROWS * FRAME_SIZE * (EXPLOSION_SIZE / FRAME_SIZE);

  const backgroundPositionX = -column * EXPLOSION_SIZE;
  const backgroundPositionY = -row * EXPLOSION_SIZE;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top,
        width: EXPLOSION_SIZE,
        height: EXPLOSION_SIZE,
        backgroundImage: "url(/game/explosion.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${spriteSheetWidth}px ${spriteSheetHeight}px`,
        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        imageRendering: "pixelated",
        transform: `scale(${spriteScale})`,
        transformOrigin: "top left",
        zIndex: 3,
      }}
    />
  );
};
