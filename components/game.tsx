"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ShipSprite,
  SHIP_FRAME_WIDTH,
  SHIP_FRAME_HEIGHT,
} from "@/components/ship-sprite";
import { BulletSprite, BULLET_SIZE } from "@/components/bullet-sprite";
import { EnemySprite, ENEMY_WIDTH, ENEMY_HEIGHT } from "@/components/enemy-sprite";
import { useSpriteScale } from "@/components/use-sprite-scale";
import { useAudio } from "@/contexts/audio-context";

const SHIP_BOTTOM_OFFSET = 80;

const SHIP_ACCEL = 800;
const SHIP_MAX_SPEED = 400;
const SHIP_FRICTION = 900;

const BULLET_SPEED = 600;
const BULLET_COOLDOWN_MS = 200;

const ENEMY_SPEED = 80;
const ENEMY_SPAWN_INTERVAL = 1.5;

type ShipState = {
  x: number;
  v: number;
};

type Bullet = {
  id: number;
  x: number;
  bottom: number;
};

type Enemy = {
  id: number;
  x: number;
  top: number;
};

type GameProps = {
  onQuit?: () => void;
  onPauseChange?: (isPaused: boolean) => void;
};

export const Game: React.FC<GameProps> = ({ onQuit, onPauseChange }) => {
  const spriteScale = useSpriteScale();
  const { isMuted, toggleMute } = useAudio();
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const [ship, setShip] = useState<ShipState>({ x: 0, v: 0 });
  const shipRef = useRef<ShipState>({ x: 0, v: 0 });

  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);

  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);

  const keysRef = useRef({ left: false, right: false });

  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const lastShotTimeRef = useRef(0);
  const enemySpawnAccumulatorRef = useRef(0);

  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const restartGame = () => {
    const { width } = viewportSize;
    const shipScaledWidth = SHIP_FRAME_WIDTH * spriteScale;
    const startX = width
      ? Math.max(0, width / 2 - shipScaledWidth / 2)
      : shipRef.current.x;

    const initialShip: ShipState = { x: startX, v: 0 };

    setGameOver(false);
    setIsPaused(false);
    setScore(0);

    setShip(initialShip);
    shipRef.current = initialShip;

    setBullets([]);
    setEnemies([]);
    bulletsRef.current = [];
    enemiesRef.current = [];

    bulletsRef.current = [];
    enemiesRef.current = [];

    bulletIdRef.current = 0;
    enemyIdRef.current = 0;
    lastShotTimeRef.current = 0;
    enemySpawnAccumulatorRef.current = 0;

    keysRef.current = { left: false, right: false };
  };

  const handleShoot = () => {
    if (gameOver || isPaused) return;
    const now = performance.now();
    if (now - lastShotTimeRef.current < BULLET_COOLDOWN_MS) return;
    lastShotTimeRef.current = now;

    const shipX = shipRef.current.x;
    const shipScaledWidth = SHIP_FRAME_WIDTH * spriteScale;
    const shipScaledHeight = SHIP_FRAME_HEIGHT * spriteScale;
    const bulletScaledSize = BULLET_SIZE * spriteScale;

    const id = bulletIdRef.current++;
    const bulletX = shipX + shipScaledWidth / 2 - bulletScaledSize / 2;
    const bulletBottom =
      SHIP_BOTTOM_OFFSET + shipScaledHeight - bulletScaledSize / 2;

    const newBullets = [
      ...bulletsRef.current,
      { id, x: bulletX, bottom: bulletBottom },
    ];
    bulletsRef.current = newBullets;
    setBullets(newBullets);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewportSize({ width, height });

      setShip((prev) => {
        if (prev.x === 0 && prev.v === 0) {
          const shipScaledWidth = SHIP_FRAME_WIDTH * spriteScale;
          const x = width / 2 - shipScaledWidth / 2;
          const next = { x, v: 0 };
          shipRef.current = next;
          return next;
        }

        const shipScaledWidth = SHIP_FRAME_WIDTH * spriteScale;
        const maxX = Math.max(0, width - shipScaledWidth);
        const clampedX = Math.min(Math.max(0, prev.x), maxX);
        const next = { ...prev, x: clampedX };
        shipRef.current = next;
        return next;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [spriteScale]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || isPaused) return;
      
      if (e.key === "p" || e.key === "P") {
        setIsPaused(true);
        return;
      }

      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        keysRef.current.left = true;
        if (e.key.startsWith("Arrow")) e.preventDefault();
      }

      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        keysRef.current.right = true;
        if (e.key.startsWith("Arrow")) e.preventDefault();
      }

      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleShoot();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        keysRef.current.left = false;
      }
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        keysRef.current.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver, isPaused, onQuit]);

  useEffect(() => {
    if (!viewportSize.width || !viewportSize.height || gameOver || isPaused)
      return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const deltaSeconds = (time - lastTime) / 1000;
      lastTime = time;

      const { width, height } = viewportSize;

      setShip((prev) => {
        if (!width) return prev;
        let { x, v } = prev;

        if (keysRef.current.left && !keysRef.current.right) {
          v -= SHIP_ACCEL * deltaSeconds;
        } else if (keysRef.current.right && !keysRef.current.left) {
          v += SHIP_ACCEL * deltaSeconds;
        } else {
          if (v > 0) {
            v -= SHIP_FRICTION * deltaSeconds;
            if (v < 0) v = 0;
          } else if (v < 0) {
            v += SHIP_FRICTION * deltaSeconds;
            if (v > 0) v = 0;
          }
        }

        if (v > SHIP_MAX_SPEED) v = SHIP_MAX_SPEED;
        if (v < -SHIP_MAX_SPEED) v = -SHIP_MAX_SPEED;

        x += v * deltaSeconds;

        const shipScaledWidth = SHIP_FRAME_WIDTH * spriteScale;
        const maxX = width - shipScaledWidth;
        if (x < 0) {
          x = 0;
          if (v < 0) v = 0;
        } else if (x > maxX) {
          x = maxX;
          if (v > 0) v = 0;
        }

        const next = { x, v };
        shipRef.current = next;
        return next;
      });

      let bullets = bulletsRef.current;
      let enemies = enemiesRef.current;
      let playerDead = false;

      if (width && height) {
        enemySpawnAccumulatorRef.current += deltaSeconds;
        if (enemySpawnAccumulatorRef.current >= ENEMY_SPAWN_INTERVAL) {
          const spawns = Math.floor(
            enemySpawnAccumulatorRef.current / ENEMY_SPAWN_INTERVAL
          );
          enemySpawnAccumulatorRef.current -= spawns * ENEMY_SPAWN_INTERVAL;

          for (let i = 0; i < spawns; i++) {
            const id = enemyIdRef.current++;
            const enemyScaledWidth = ENEMY_WIDTH * spriteScale;
            const enemyScaledHeight = ENEMY_HEIGHT * spriteScale;
            const x = Math.random() * Math.max(1, width - enemyScaledWidth);
            enemies = [...enemies, { id, x, top: -enemyScaledHeight }];
          }
        }

        const bulletScaledSize = BULLET_SIZE * spriteScale;
        bullets = bullets
          .map((b) => ({
            ...b,
            bottom: b.bottom + BULLET_SPEED * deltaSeconds,
          }))
          .filter((b) => b.bottom <= height + bulletScaledSize);

        enemies = enemies.map((e) => ({
          ...e,
          top: e.top + ENEMY_SPEED * deltaSeconds,
        }));

        const bulletAlive = new Array(bullets.length).fill(true);
        const enemyAlive = new Array(enemies.length).fill(true);

        for (let i = 0; i < bullets.length; i++) {
          if (!bulletAlive[i]) continue;

          const b = bullets[i];
          const bulletScaledSize = BULLET_SIZE * spriteScale;
          const bulletLeft = b.x;
          const bulletRight = b.x + bulletScaledSize;
          const bulletBottomY = height - b.bottom;
          const bulletTopY = bulletBottomY - bulletScaledSize;

          for (let j = 0; j < enemies.length; j++) {
            if (!enemyAlive[j]) continue;

            const e = enemies[j];
            const enemyScaledWidth = ENEMY_WIDTH * spriteScale;
            const enemyScaledHeight = ENEMY_HEIGHT * spriteScale;
            const enemyLeft = e.x;
            const enemyRight = e.x + enemyScaledWidth;
            const enemyTopY = e.top;
            const enemyBottomY = e.top + enemyScaledHeight;

            const overlap =
              bulletLeft < enemyRight &&
              bulletRight > enemyLeft &&
              bulletTopY < enemyBottomY &&
              bulletBottomY > enemyTopY;

            if (overlap) {
              bulletAlive[i] = false;
              enemyAlive[j] = false;
              setScore((prev) => prev + 1);
              break;
            }
          }
        }

        const newEnemies: Enemy[] = [];
        for (let j = 0; j < enemies.length; j++) {
          if (!enemyAlive[j]) continue;
          const e = enemies[j];

          const enemyScaledHeight = ENEMY_HEIGHT * spriteScale;
          if (e.top + enemyScaledHeight >= height) {
            playerDead = true;
            continue;
          }

          newEnemies.push(e);
        }

        const newBullets = bullets.filter((_, i) => bulletAlive[i]);

        enemiesRef.current = newEnemies;
        bulletsRef.current = newBullets;
        setEnemies(newEnemies);
        setBullets(newBullets);
      }

      if (playerDead) {
        setGameOver(true);
        return;
      }

      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [viewportSize, gameOver, spriteScale, isPaused]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}>
      <ShipSprite x={ship.x} bottom={SHIP_BOTTOM_OFFSET} fps={12} />

      {bullets.map((b) => (
        <BulletSprite key={b.id} x={b.x} bottom={b.bottom} />
      ))}

      {enemies.map((e) => (
        <EnemySprite key={e.id} x={e.x} top={e.top} />
      ))}

      {isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            display: "flex",
            gap: "15px",
            zIndex: 1000,
          }}>
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              if (!gameOver && !isPaused) {
                keysRef.current.left = true;
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              keysRef.current.left = false;
            }}
            onMouseDown={() => {
              if (!gameOver && !isPaused) {
                keysRef.current.left = true;
              }
            }}
            onMouseUp={() => {
              keysRef.current.left = false;
            }}
            onMouseLeave={() => {
              keysRef.current.left = false;
            }}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "2px solid #fff",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              imageRendering: "pixelated",
              userSelect: "none",
              touchAction: "manipulation",
            }}>
            ←
          </button>

          <button
            onTouchStart={(e) => {
              e.preventDefault();
              if (!gameOver && !isPaused) {
                keysRef.current.right = true;
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              keysRef.current.right = false;
            }}
            onMouseDown={() => {
              if (!gameOver && !isPaused) {
                keysRef.current.right = true;
              }
            }}
            onMouseUp={() => {
              keysRef.current.right = false;
            }}
            onMouseLeave={() => {
              keysRef.current.right = false;
            }}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "2px solid #fff",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              imageRendering: "pixelated",
              userSelect: "none",
              touchAction: "manipulation",
            }}>
            →
          </button>

          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleShoot();
            }}
            onClick={(e) => {
              e.preventDefault();
              handleShoot();
            }}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "2px solid #fff",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              imageRendering: "pixelated",
              userSelect: "none",
              touchAction: "manipulation",
            }}>
            FIRE
          </button>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
          zIndex: 1000,
        }}>
        <div
          style={{
            color: "#fff",
            fontSize: "12px",
            fontFamily: "Upheav, sans-serif",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}>
          Score: {score}
        </div>
        <button
          onClick={() => setIsPaused(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "2px solid #fff",
            color: "#fff",
            fontFamily: "Upheav, sans-serif",
            fontSize: "12px",
            cursor: "pointer",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}>
          Pause
        </button>
      </div>

      {isPaused && mounted && createPortal(
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "16px" : 0,
            boxSizing: "border-box",
            zIndex: 99999,
          }}>
          <div
            style={{
              backgroundColor: "#000",
              border: "2px solid #fff",
              padding: isMobile ? "24px 16px" : "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isMobile ? "20px" : "30px",
              width: "100%",
              maxWidth: "420px",
              boxSizing: "border-box",
              borderRadius: "8px",
            }}>
            <h2
              style={{
                color: "#fff",
                fontFamily: "Upheav, sans-serif",
                fontSize: isMobile ? "20px" : "24px",
                margin: 0,
                textAlign: "center",
              }}>
              Paused
            </h2>
            <div
              style={{
                color: "#fff",
                fontFamily: "Upheav, sans-serif",
                fontSize: isMobile ? "16px" : "18px",
                textAlign: "center",
              }}>
              Score: {score}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "12px" : "20px",
                  width: "100%",
                }}>
                <button
                  onClick={() => setIsPaused(false)}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "2px solid #fff",
                    color: "#fff",
                    fontFamily: "Upheav, sans-serif",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    flex: 1,
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)";
                  }}>
                  Resume
                </button>
                <button
                  onClick={restartGame}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "2px solid #fff",
                    color: "#fff",
                    fontFamily: "Upheav, sans-serif",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    flex: 1,
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)";
                  }}>
                  Restart
                </button>
                <button
                  onClick={() => {
                    if (onQuit) {
                      onQuit();
                    }
                  }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "2px solid #fff",
                    color: "#fff",
                    fontFamily: "Upheav, sans-serif",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    flex: 1,
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)";
                  }}>
                  Quit
                </button>
              </div>
              <button
                onClick={toggleMute}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "2px solid #fff",
                  color: "#fff",
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)";
                }}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
