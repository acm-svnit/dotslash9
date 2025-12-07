"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAudio } from "@/contexts/audio-context";

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
  const { audioRef } = useAudio();
  const hasStartedAudio = useRef(false);

  useEffect(() => {
    const startTime = performance.now();
    const MIN_LOADING_TIME = 1500;
    let loaded = 0;
    const totalAssets = ASSETS.length + 1;

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
          resolve();
        };
        img.src = src;
      });
    };

    const loadFont = (): Promise<void> => {
      return new Promise((resolve) => {
        if (document.fonts) {
          if (document.fonts.check('12px "Upheav"')) {
            loaded++;
            setLoadedCount(loaded);
            resolve();
            return;
          }

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
              setTimeout(() => {
                loaded++;
                setLoadedCount(loaded);
                resolve();
              }, 200);
            });
        } else {
          setTimeout(() => {
            loaded++;
            setLoadedCount(loaded);
            resolve();
          }, 200);
        }
      });
    };

    const loadAllAssets = async () => {
      await Promise.all(ASSETS.map(loadImage));
      
      await loadFont();

      const elapsedTime = performance.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    loadAllAssets();
  }, []);

  useEffect(() => {
    if (!isLoading && audioRef.current) {
      const audio = audioRef.current;
      const playAudio = async () => {
        try {
          audio.volume = 0.5;
          await audio.play();
          hasStartedAudio.current = true;
        } catch (error) {
          // Autoplay blocked, will start on user interaction
        }
      };
      playAudio();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || hasStartedAudio.current) return;

    const startAudioOnInteraction = async () => {
      if (audioRef.current && !hasStartedAudio.current) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          hasStartedAudio.current = true;
        } catch (error) {
          // Still blocked
        }
      }
    };

    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, startAudioOnInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, startAudioOnInteraction);
      });
    };
  }, [isLoading]);

  const progress = Math.round((loadedCount / (ASSETS.length + 1)) * 100);

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
        preload="auto"
        style={{ display: "none" }}
      />
      {isLoading ? (
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
      ) : (
        children
      )}
    </>
  );
}

