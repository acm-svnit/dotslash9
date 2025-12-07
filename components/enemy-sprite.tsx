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
};

export const EnemySprite: React.FC<EnemySpriteProps> = ({
  x,
  top,
  fps = 10,
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const spriteScale = useSpriteScale();

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

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top,
        width: ENEMY_WIDTH,
        height: ENEMY_HEIGHT,
        backgroundImage: "url(/enemy.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        imageRendering: "pixelated",
        transform: `scale(${spriteScale})`,
        transformOrigin: "top left",
      }}
    />
  );
};
