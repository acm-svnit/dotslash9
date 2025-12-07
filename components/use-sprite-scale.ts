"use client";

import { useEffect, useState } from "react";

const TABLET_BREAKPOINT = 768;
const SCALE_DESKTOP = 2.5;
const SCALE_TABLET = 1.75;

export function useSpriteScale(): number {
  const [scale, setScale] = useState(SCALE_DESKTOP);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      setScale(width > TABLET_BREAKPOINT ? SCALE_DESKTOP : SCALE_TABLET);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
}

