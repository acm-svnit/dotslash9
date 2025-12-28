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
        <div className="absolute bottom-5 left-5 flex gap-[15px] z-1000">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              if (!gameOver && !isPaused) {
                onLeftStart();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              onLeftEnd();
            }}
            onMouseDown={() => {
              if (!gameOver && !isPaused) {
                onLeftStart();
              }
            }}
            onMouseUp={onLeftEnd}
            onMouseLeave={onLeftEnd}
            className="w-10 h-10 bg-white/20 border-2 border-white text-white font-[Upheav] text-lg cursor-pointer flex items-center justify-center [image-rendering:pixelated] select-none touch-manipulation">
            ←
          </button>

          <button
            onTouchStart={(e) => {
              e.preventDefault();
              if (!gameOver && !isPaused) {
                onRightStart();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              onRightEnd();
            }}
            onMouseDown={() => {
              if (!gameOver && !isPaused) {
                onRightStart();
              }
            }}
            onMouseUp={onRightEnd}
            onMouseLeave={onRightEnd}
            className="w-10 h-10 bg-white/20 border-2 border-white text-white font-[Upheav] text-lg cursor-pointer flex items-center justify-center [image-rendering:pixelated] select-none touch-manipulation">
            →
          </button>

          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onShoot();
            }}
            onClick={(e) => {
              e.preventDefault();
              onShoot();
            }}
            className="w-10 h-10 bg-white/20 border-2 border-white text-white font-[Upheav] text-xs cursor-pointer flex items-center justify-center [image-rendering:pixelated] select-none touch-manipulation">
            FIRE
          </button>
        </div>
      )}

      <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2.5 z-1000">
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
