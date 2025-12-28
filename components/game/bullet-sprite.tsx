"use client";

import React, { useEffect, useState } from "react";
import { useSpriteScale } from "./use-sprite-scale";

export const BULLET_SIZE = 16;

const COLUMNS = 2;
const ROWS = 1;
const TOTAL_FRAMES = COLUMNS * ROWS;

type BulletSpriteProps = {
  x: number;
  bottom: number;
  fps?: number;
};

export const BulletSprite: React.FC<BulletSpriteProps> = ({
  x,
  bottom,
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

  const backgroundPositionX = -column * BULLET_SIZE;
  const backgroundPositionY = -row * BULLET_SIZE;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom,
        width: BULLET_SIZE,
        height: BULLET_SIZE,
        backgroundImage: "url(/bullets.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        imageRendering: "pixelated",
        transform: `scale(${spriteScale})`,
        transformOrigin: "bottom left",
      }}
    />
  );
};
