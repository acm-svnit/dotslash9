"use client";

import React, { useEffect, useState } from "react";

export const SHIP_FRAME_WIDTH = 16;
export const SHIP_FRAME_HEIGHT = 24;

const COLUMNS = 5;
const ROWS = 2;
const TOTAL_FRAMES = COLUMNS * ROWS;

type ShipSpriteProps = {
  x: number;
  bottom: number;
  fps?: number;
};

export const ShipSprite: React.FC<ShipSpriteProps> = ({
  x,
  bottom,
  fps = 10,
}) => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const frameDuration = 1000 / fps;

    const intervalId = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % TOTAL_FRAMES);
    }, frameDuration);

    return () => window.clearInterval(intervalId);
  }, [fps]);

  const column = frameIndex % COLUMNS;
  const row = Math.floor(frameIndex / COLUMNS);

  const backgroundPositionX = -column * SHIP_FRAME_WIDTH;
  const backgroundPositionY = -row * SHIP_FRAME_HEIGHT;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom,
        width: SHIP_FRAME_WIDTH,
        height: SHIP_FRAME_HEIGHT,
        backgroundImage: "url(/ship.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        imageRendering: "pixelated",
      }}
    />
  );
};
