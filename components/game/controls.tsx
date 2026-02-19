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
        <div className="absolute bottom-5 left-5 flex flex-col items-start gap-2.5 z-1000"></div>
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
