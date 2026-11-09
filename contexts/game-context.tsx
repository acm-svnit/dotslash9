"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type GameContextType = {
  isGameActive: boolean;
  setIsGameActive: (active: boolean) => void;
};

const defaultContext: GameContextType = {
  isGameActive: false,
  setIsGameActive: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);

export function GameProvider({ children }: { children: ReactNode }) {
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    const handleGameStateEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ isPlaying?: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isPlaying === "boolean") {
        setIsGameActive(customEvent.detail.isPlaying);
      }
    };

    window.addEventListener("dotslash:game-state", handleGameStateEvent);
    return () => {
      window.removeEventListener("dotslash:game-state", handleGameStateEvent);
    };
  }, []);

  return (
    <GameContext.Provider value={{ isGameActive, setIsGameActive }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
