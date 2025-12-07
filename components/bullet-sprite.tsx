"use client";

import React from "react";
import { useSpriteScale } from "./use-sprite-scale";

export const BULLET_SIZE = 16;

type BulletSpriteProps = {
  x: number;
  bottom: number;
};

export const BulletSprite: React.FC<BulletSpriteProps> = ({ x, bottom }) => {
  const spriteScale = useSpriteScale();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom,
        width: BULLET_SIZE,
        height: BULLET_SIZE,
        backgroundImage: "url(/bullet.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0px 0px",
        imageRendering: "pixelated",
        transform: `scale(${spriteScale})`,
        transformOrigin: "bottom left",
      }}
    />
  );
};
