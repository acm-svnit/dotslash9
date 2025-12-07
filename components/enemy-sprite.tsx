"use client";

import React from "react";

export const ENEMY_WIDTH = 32;
export const ENEMY_HEIGHT = 16;

type EnemySpriteProps = {
  x: number;
  top: number;
};

export const EnemySprite: React.FC<EnemySpriteProps> = ({ x, top }) => {
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
        backgroundPosition: "0px 0px",
        imageRendering: "pixelated",
      }}
    />
  );
};
