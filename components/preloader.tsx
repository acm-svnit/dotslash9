"use client";

import React, { useEffect, useState } from "react";

const ASSETS = [
  "/bg1.png",
  "/bg2.png",
  "/bullet.png",
  "/enemy.png",
  "/ship.png",
  "/planet1.gif",
  "/planet2.gif",
  "/planet3.gif",
  "/planet4.gif",
];

type PreloaderProps = {
  children: React.ReactNode;
};

export default function Preloader({ children }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const totalAssets = ASSETS.length + 1; // +1 for font

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          resolve(); // Continue even if image fails
        };
        img.src = src;
      });
    };

    const loadFont = (): Promise<void> => {
      return new Promise((resolve) => {
        if (document.fonts) {
          // Check if font is already loaded
          if (document.fonts.check('12px "Upheav"')) {
            loaded++;
            setLoadedCount(loaded);
            resolve();
            return;
          }

          // Try to load the font
          const font = new FontFace("Upheav", "url(/upheav.ttf)");
          font
            .load()
            .then(() => {
              document.fonts.add(font);
              loaded++;
              setLoadedCount(loaded);
              resolve();
            })
            .catch(() => {
              // Font might already be loaded via CSS or failed
              // Wait a bit for CSS-loaded font to be ready
              setTimeout(() => {
                loaded++;
                setLoadedCount(loaded);
                resolve();
              }, 200);
            });
        } else {
          // Fallback if font loading API not available
          setTimeout(() => {
            loaded++;
            setLoadedCount(loaded);
            resolve();
          }, 200);
        }
      });
    };

    const loadAllAssets = async () => {
      // Load all images
      await Promise.all(ASSETS.map(loadImage));
      
      // Load font
      await loadFont();

      // Small delay to ensure everything is ready
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    loadAllAssets();
  }, []);

  if (isLoading) {
    const progress = Math.round((loadedCount / (ASSETS.length + 1)) * 100);

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
        <div
          style={{
            color: "#fff",
            fontFamily: "Upheav, sans-serif",
            fontSize: "24px",
            marginBottom: "20px",
          }}>
          Loading...
        </div>
        <div
          style={{
            width: "300px",
            height: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "2px",
            overflow: "hidden",
          }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#fff",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            color: "#fff",
            fontFamily: "Upheav, sans-serif",
            fontSize: "12px",
            marginTop: "10px",
            opacity: 0.7,
          }}>
          {progress}%
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

