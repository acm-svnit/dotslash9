"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PauseMenu } from "./pause-menu";
import { Controls } from "./controls";
import { ShipSprite, SHIP_FRAME_WIDTH, SHIP_FRAME_HEIGHT } from "./ship-sprite";
import { BulletSprite, BULLET_SIZE } from "./bullet-sprite";
import { EnemySprite, ENEMY_WIDTH, ENEMY_HEIGHT } from "./enemy-sprite";
import { ExplosionSprite, EXPLOSION_SIZE } from "./explosion-sprite";
import { useSpriteScale } from "./use-sprite-scale";
import { useAudio } from "@/contexts/audio-context";

const SHIP_BOTTOM_OFFSET = 80;

const SHIP_ACCEL = 800;
const SHIP_MAX_SPEED = 400;
const SHIP_FRICTION = 900;

const BULLET_SPEED = 600;
const BULLET_COOLDOWN_MS = 100;

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
  isHit?: boolean;
  hitTime?: number;
};

type Explosion = {
  id: number;
  x: number;
  top: number;
  startTime: number;
};

type GameProps = {
  onQuit?: () => void;
  onPauseChange?: (isPaused: boolean) => void;
};

const WARNING_MESSAGE =
  "Your spaceship is breaking down! Cooldowns must be activated!";

export const Game: React.FC<GameProps> = ({ onQuit }) => {
  const spriteScale = useSpriteScale();
  const { isMuted, toggleMute } = useAudio();
  const [effectsMuted, setEffectsMuted] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const shootAudioRef = useRef<HTMLAudioElement | null>(null);
  const explosionAudioRef = useRef<HTMLAudioElement | null>(null);
  const gameOverAudioRef = useRef<HTMLAudioElement | null>(null);
  const warningAudioRef = useRef<HTMLAudioElement | null>(null);
  const warningPlayedRef = useRef<boolean>(false);

  const [ship, setShip] = useState<ShipState>({ x: 0, v: 0 });
  const shipRef = useRef<ShipState>({ x: 0, v: 0 });

  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [warningText, setWarningText] = useState("");

  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const explosionsRef = useRef<Explosion[]>([]);

  const keysRef = useRef({ left: false, right: false });

  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const explosionIdRef = useRef(0);
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
    shootAudioRef.current = new Audio("/game/shoot.wav");
    explosionAudioRef.current = new Audio("/game/explosion.wav");
    gameOverAudioRef.current = new Audio("/game/gameover.wav");
    warningAudioRef.current = new Audio("/game/warning.mp3");

    return () => {
      if (shootAudioRef.current) {
        shootAudioRef.current.pause();
        shootAudioRef.current = null;
      }
      if (explosionAudioRef.current) {
        explosionAudioRef.current.pause();
        explosionAudioRef.current = null;
      }
      if (gameOverAudioRef.current) {
        gameOverAudioRef.current.pause();
        gameOverAudioRef.current = null;
      }
      if (warningAudioRef.current) {
        warningAudioRef.current.pause();
        warningAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (gameOver && gameOverAudioRef.current && !effectsMuted) {
      gameOverAudioRef.current.currentTime = 0;
      gameOverAudioRef.current.play().catch(() => {});
    }
  }, [gameOver, effectsMuted]);

  useEffect(() => {
    if (
      score >= 100 &&
      !warningPlayedRef.current &&
      warningAudioRef.current &&
      !effectsMuted
    ) {
      warningPlayedRef.current = true;
      warningAudioRef.current.currentTime = 0;
      warningAudioRef.current.play().catch(() => {});
    }
  }, [score, effectsMuted]);

  useEffect(() => {
    if (score < 100) {
      setWarningText("");
      return;
    }

    if (warningText.length >= WARNING_MESSAGE.length) {
      return;
    }

    const typewriterInterval = setInterval(() => {
      setWarningText((prev) => {
        if (prev.length < WARNING_MESSAGE.length) {
          return WARNING_MESSAGE.slice(0, prev.length + 1);
        }
        return prev;
      });
    }, 25);

    return () => clearInterval(typewriterInterval);
  }, [score, warningText.length]);

  const restartGame = () => {
    warningPlayedRef.current = false;
    setWarningText("");
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
    explosionsRef.current = [];

    bulletIdRef.current = 0;
    enemyIdRef.current = 0;
    explosionIdRef.current = 0;
    lastShotTimeRef.current = 0;
    enemySpawnAccumulatorRef.current = 0;

    keysRef.current = { left: false, right: false };
  };

  const handleShoot = useCallback(() => {
    if (gameOver || isPaused) return;
    const now = performance.now();

    const currentCooldown = score >= 100 ? 250 : BULLET_COOLDOWN_MS;

    if (now - lastShotTimeRef.current < currentCooldown) return;
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

    if (shootAudioRef.current && !effectsMuted) {
      shootAudioRef.current.currentTime = 0;
      shootAudioRef.current.play().catch(() => {});
    }
  }, [gameOver, isPaused, score, spriteScale, effectsMuted]);

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
  }, [gameOver, isPaused, onQuit, handleShoot]);

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
        const scoreMultiplier = Math.min(score, 200);
        const currentSpawnInterval = Math.max(
          ENEMY_SPAWN_INTERVAL - scoreMultiplier * 0.01,
          0.5
        );

        enemySpawnAccumulatorRef.current += deltaSeconds;
        if (enemySpawnAccumulatorRef.current >= currentSpawnInterval) {
          const spawns = Math.floor(
            enemySpawnAccumulatorRef.current / currentSpawnInterval
          );
          enemySpawnAccumulatorRef.current -= spawns * currentSpawnInterval;

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

        const now = performance.now();

        const currentEnemySpeed = ENEMY_SPEED + scoreMultiplier * 0.01;

        enemies = enemies
          .map((e) => {
            if (e.isHit && e.hitTime) {
              const timeSinceHit = (now - e.hitTime) / 1000;
              if (timeSinceHit < 0.5) {
                return e;
              }

              return null;
            }

            return {
              ...e,
              top: e.top + currentEnemySpeed * deltaSeconds,
            };
          })
          .filter((e): e is Enemy => e !== null);

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

            if (e.isHit) continue;

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

              const hitEnemy = enemies[j];

              const explosionX =
                hitEnemy.x +
                enemyScaledWidth / 2 -
                (EXPLOSION_SIZE * spriteScale) / 2;
              const explosionTop =
                hitEnemy.top +
                enemyScaledHeight / 2 -
                (EXPLOSION_SIZE * spriteScale) / 2;

              const explosionId = explosionIdRef.current++;
              const newExplosion: Explosion = {
                id: explosionId,
                x: explosionX,
                top: explosionTop,
                startTime: now,
              };

              explosionsRef.current = [...explosionsRef.current, newExplosion];
              setExplosions([...explosionsRef.current]);

              enemies[j] = {
                ...hitEnemy,
                isHit: true,
                hitTime: now,
              };
              enemyAlive[j] = true;

              setScore((prev) => prev + 1);

              if (explosionAudioRef.current && !effectsMuted) {
                explosionAudioRef.current.currentTime = 0;
                explosionAudioRef.current.play().catch(() => {});
              }

              break;
            }
          }
        }

        const newEnemies: Enemy[] = [];
        for (let j = 0; j < enemies.length; j++) {
          const e = enemies[j];

          if (e.isHit && e.hitTime) {
            const timeSinceHit = (now - e.hitTime) / 1000;
            if (timeSinceHit >= 0.5) {
              continue;
            }

            newEnemies.push(e);
            continue;
          }

          const enemyScaledHeight = ENEMY_HEIGHT * spriteScale;
          if (e.top + enemyScaledHeight >= height) {
            playerDead = true;
            continue;
          }

          newEnemies.push(e);
        }

        const newExplosions = explosionsRef.current.filter((exp) => {
          const elapsed = (now - exp.startTime) / 1000;
          return elapsed < 0.5;
        });

        const newBullets = bullets.filter((_, i) => bulletAlive[i]);

        enemiesRef.current = newEnemies;
        bulletsRef.current = newBullets;
        explosionsRef.current = newExplosions;
        setEnemies(newEnemies);
        setBullets(newBullets);
        setExplosions(newExplosions);
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
    <div className="relative w-full h-screen overflow-hidden">
      <ShipSprite x={ship.x} bottom={SHIP_BOTTOM_OFFSET} fps={12} />

      {score >= 100 && warningText && (
        <div
          className="absolute left-1/2 -translate-x-1/2 font-[Upheav] text-sm md:text-base text-center whitespace-nowrap z-10"
          style={{
            bottom: `${
              SHIP_BOTTOM_OFFSET + SHIP_FRAME_HEIGHT * spriteScale + 20
            }px`,
            animation: "flashRedOrange 0.5s ease-in-out infinite",
          }}>
          {warningText}
          {warningText.length < WARNING_MESSAGE.length && (
            <span className="animate-pulse">|</span>
          )}
        </div>
      )}

      {bullets.map((b) => (
        <BulletSprite key={b.id} x={b.x} bottom={b.bottom} />
      ))}

      {enemies.map((e) => (
        <EnemySprite key={e.id} x={e.x} top={e.top} />
      ))}

      {explosions.map((exp) => (
        <ExplosionSprite key={exp.id} x={exp.x} top={exp.top} />
      ))}

      <Controls
        isMobile={isMobile}
        gameOver={gameOver}
        isPaused={isPaused}
        score={score}
        onLeftStart={() => {
          keysRef.current.left = true;
        }}
        onLeftEnd={() => {
          keysRef.current.left = false;
        }}
        onRightStart={() => {
          keysRef.current.right = true;
        }}
        onRightEnd={() => {
          keysRef.current.right = false;
        }}
        onShoot={handleShoot}
        onPause={() => setIsPaused(true)}
      />

      {isPaused && (
        <PauseMenu
          score={score}
          isMobile={isMobile}
          mounted={mounted}
          onResume={() => setIsPaused(false)}
          onRestart={restartGame}
          onQuit={onQuit}
          onToggleEffectsMute={() => setEffectsMuted(!effectsMuted)}
          effectsMuted={effectsMuted}
          onToggleMusicMute={toggleMute}
          musicMuted={isMuted}
        />
      )}

      {gameOver &&
        mounted &&
        createPortal(
          <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/80 flex flex-col items-center justify-center ${
              isMobile ? "p-4" : "p-0"
            } box-border z-99999`}>
            <div
              className={`bg-black border-2 border-white ${
                isMobile ? "p-6 px-4" : "p-10"
              } flex flex-col items-center ${
                isMobile ? "gap-5" : "gap-[30px]"
              } w-full max-w-[420px] box-border`}>
              <h2
                className={`text-white font-[Upheav] ${
                  isMobile ? "text-3xl" : "text-5xl"
                } m-0 text-center`}>
                Game Over
              </h2>
              <div
                className={`text-white font-[Upheav] ${
                  isMobile ? "text-2xl" : "text-4xl"
                } text-center`}>
                Score: {score}
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div
                  className={`flex ${
                    isMobile ? "flex-col gap-3" : "flex-row gap-5"
                  } w-full`}>
                  <button
                    onClick={restartGame}
                    className="px-6 py-3 bg-white/20 border-2 border-white text-white font-[Upheav] text-sm cursor-pointer transition-colors hover:bg-white/30 flex-1 w-full">
                    Restart
                  </button>
                  <button
                    onClick={() => {
                      if (onQuit) {
                        onQuit();
                      }
                    }}
                    className="px-6 py-3 bg-white/20 border-2 border-white text-white font-[Upheav] text-sm cursor-pointer transition-colors hover:bg-white/30 flex-1 w-full">
                    Quit
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
