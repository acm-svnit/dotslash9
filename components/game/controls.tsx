"use client";

import React from "react";

type ControlsProps = {
  isMobile: boolean;
  gameOver: boolean;
  isPaused: boolean;
  score: number;
  onLeftStart: () => void;
  onLeftEnd: () => void;
  onRightStart: () => void;
  onRightEnd: () => void;
  onShoot: () => void;
  onPause: () => void;
};

export const Controls: React.FC<ControlsProps> = ({
  isMobile,
  gameOver,
  isPaused,
  score,
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
  onShoot,
  onPause,
}) => {
  return (
    <>
      {isMobile && (
        <>
          {/* Shoot button - positioned on right side for easy thumb access */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!gameOver && !isPaused) {
                onShoot();
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!gameOver && !isPaused) {
                onShoot();
              }
            }}
            disabled={gameOver || isPaused}
            className="absolute bottom-5 right-5 w-16 h-16 bg-white/25 border-2 border-white/60 text-white font-[Upheav] text-xs cursor-pointer [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] transition-all hover:bg-white/35 active:bg-white/40 active:scale-95 [image-rendering:pixelated] select-none touch-manipulation rounded-full flex items-center justify-center z-1000 disabled:opacity-50 disabled:cursor-not-allowed">
            FIRE
          </button>
        </>
      )}

      <div className={`absolute bottom-5 ${isMobile ? "right-24" : "right-5"} flex flex-col items-end gap-2.5 z-1000`}>
        <div className="text-white text-xs font-[Upheav] [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
          Score: {score}
        </div>
        <button
          onClick={onPause}
          className="px-4 py-2 bg-white/20 border-2 border-white text-white font-[Upheav] text-xs cursor-pointer [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] transition-colors hover:bg-white/30">
          Pause
        </button>
      </div>
    </>
  );
};
