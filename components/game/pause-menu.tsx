"use client";

import React from "react";
import { createPortal } from "react-dom";

type PauseMenuProps = {
  score: number;
  isMobile: boolean;
  mounted: boolean;
  onResume: () => void;
  onRestart: () => void;
  onQuit?: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
};

export const PauseMenu: React.FC<PauseMenuProps> = ({
  score,
  isMobile,
  mounted,
  onResume,
  onRestart,
  onQuit,
  onToggleMute,
  isMuted,
}) => {
  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black/80 flex flex-col items-center justify-center ${
        isMobile ? "p-4" : "p-0"
      } box-border z-99999`}>
      <div
        className={`bg-black border-2 border-white ${
          isMobile ? "p-6 px-4" : "p-10"
        } flex flex-col items-center ${
          isMobile ? "gap-5" : "gap-[30px]"
        } w-full max-w-[420px] box-border rounded-lg`}>
        <h2
          className={`text-white font-[Upheav] ${
            isMobile ? "text-xl" : "text-2xl"
          } m-0 text-center`}>
          Paused
        </h2>
        <div
          className={`text-white font-[Upheav] ${
            isMobile ? "text-base" : "text-lg"
          } text-center`}>
          Score: {score}
        </div>
        <div
          className={`w-full border-t border-white/30 pt-5 ${
            isMobile ? "text-sm" : "text-base"
          }`}>
          <h3
            className={`text-white font-[Upheav] ${
              isMobile ? "text-base" : "text-lg"
            } mb-3 text-center`}>
            How to Play
          </h3>
          {isMobile ? (
            <div className="flex flex-col gap-2 text-white/80 font-[Upheav] items-center text-center">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-white font-[Upheav]">← →</span>
                <span>Move left/right</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-white font-[Upheav]">FIRE</span>
                <span>Shoot bullets</span>
              </div>
              <div className="mt-2 text-xs text-white/60">
                Avoid enemies reaching the bottom!
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-white/80 font-[Upheav] items-center text-center">
              <div className="flex items-center gap-2 justify-center">
                <kbd className="px-2 py-1 bg-white/20 border border-white/50 rounded text-xs font-[Upheav]">
                  A
                </kbd>
                <kbd className="px-2 py-1 bg-white/20 border border-white/50 rounded text-xs font-[Upheav]">
                  D
                </kbd>
                <span>or</span>
                <kbd className="px-2 py-1 bg-white/20 border border-white/50 rounded text-xs font-[Upheav]">
                  ←
                </kbd>
                <kbd className="px-2 py-1 bg-white/20 border border-white/50 rounded text-xs font-[Upheav]">
                  →
                </kbd>
                <span>Move left/right</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <kbd className="px-2 py-1 bg-white/20 border border-white/50 rounded text-xs font-[Upheav]">
                  Space
                </kbd>
                <span>Shoot bullets</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <kbd className="px-2 py-1 bg-white/20 border border-white/50 rounded text-xs font-[Upheav]">
                  P
                </kbd>
                <span>Pause/Resume</span>
              </div>
              <div className="mt-2 text-xs text-white/60">
                Avoid enemies reaching the bottom!
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div
            className={`flex ${
              isMobile ? "flex-col gap-3" : "flex-row gap-5"
            } w-full`}>
            <button
              onClick={onResume}
              className="px-6 py-3 bg-white/20 border-2 border-white text-white font-[Upheav] text-sm cursor-pointer transition-colors hover:bg-white/30 flex-1 w-full">
              Resume
            </button>
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-white/20 border-2 border-white text-white font-[Upheav] text-sm cursor-pointer transition-colors hover:bg-white/30 flex-1 w-full">
              Restart
            </button>
            <button
              onClick={onQuit}
              className="px-6 py-3 bg-white/20 border-2 border-white text-white font-[Upheav] text-sm cursor-pointer transition-colors hover:bg-white/30 flex-1 w-full">
              Quit
            </button>
          </div>
          <button
            onClick={onToggleMute}
            className="px-6 py-3 bg-white/20 border-2 border-white text-white font-[Upheav] text-sm cursor-pointer transition-colors hover:bg-white/30">
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
