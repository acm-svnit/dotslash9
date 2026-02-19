"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PauseMenu } from "./pause-menu";
import { Controls } from "./controls";
import { ShipSprite, SHIP_FRAME_WIDTH, SHIP_FRAME_HEIGHT } from "./ship-sprite";
import { BulletSprite, BULLET_SIZE } from "./bullet-sprite";
import { EnemySprite, ENEMY_WIDTH, ENEMY_HEIGHT } from "./enemy-sprite";
import { ExplosionSprite, EXPLOSION_SIZE } from "./explosion-sprite";
import { BossSprite, BOSS_WIDTH, BOSS_HEIGHT } from "./boss-sprite";
import { useSpriteScale } from "./use-sprite-scale";
import { useAudio } from "@/contexts/audio-context";
import { GAME_CONFIG } from "./game-config";

const {
  ship: SHIP_CONFIG,
  bullet: BULLET_CONFIG,
  enemy: ENEMY_CONFIG,
  boss: BOSS_CONFIG,
  progression: PROGRESSION_CONFIG,
  warning: WARNING_CONFIG,
} = GAME_CONFIG;

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
  hp: number;
  maxHp: number;
  lastHitTime?: number;
};

type Explosion = {
  id: number;
  x: number;
  top: number;
  startTime: number;
  size?: number; // Size multiplier for boss explosions
};

type Boss = {
  x: number;
  top: number;
  hp: number;
  maxHp: number;
  isHit?: boolean;
  lastHitTime?: number;
};

type GameProps = {
  onQuit?: () => void;
  onPauseChange?: (isPaused: boolean) => void;
};

const WARNING_MESSAGE = WARNING_CONFIG.message;

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
  const [boss, setBoss] = useState<Boss | null>(null);

  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const explosionsRef = useRef<Explosion[]>([]);
  const bossRef = useRef<Boss | null>(null);

  const keysRef = useRef({ left: false, right: false });
  const touchActiveRef = useRef(false);
  const touchStartXRef = useRef(0);
  const lastTouchXRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const lastShotTimeRef = useRef(0);
  const enemySpawnAccumulatorRef = useRef(0);
  const enemiesSpawnedRef = useRef(0); // Track total enemies spawned
  const bossSpawnedRef = useRef(false);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(score);
  const [gameOver, setGameOver] = useState(false);
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
      gameOverAudioRef.current.play().catch(() => { });
    }
  }, [gameOver, effectsMuted]);

  useEffect(() => {
    if (
      score >= PROGRESSION_CONFIG.warningThreshold &&
      !warningPlayedRef.current &&
      warningAudioRef.current &&
      !effectsMuted
    ) {
      warningPlayedRef.current = true;
      warningAudioRef.current.currentTime = 0;
      warningAudioRef.current.play().catch(() => { });
    }
  }, [score, effectsMuted]);

  useEffect(() => {
    if (score < PROGRESSION_CONFIG.warningThreshold) {
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
    scoreRef.current = 0;
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
    setBoss(null);
    bulletsRef.current = [];
    enemiesRef.current = [];
    bossRef.current = null;

    bulletsRef.current = [];
    enemiesRef.current = [];
    explosionsRef.current = [];

    bulletIdRef.current = 0;
    enemyIdRef.current = 0;
    explosionIdRef.current = 0;
    lastShotTimeRef.current = 0;
    enemySpawnAccumulatorRef.current = 0;
    enemiesSpawnedRef.current = 0;
    bossSpawnedRef.current = false;

    keysRef.current = { left: false, right: false };
  };

  const handleShoot = useCallback(() => {
    if (gameOver || isPaused) return;
    const now = performance.now();

    const currentScore = scoreRef.current;
    const currentCooldown =
      currentScore >= PROGRESSION_CONFIG.warningThreshold
        ? BULLET_CONFIG.cooldownAfterWarningMs
        : BULLET_CONFIG.cooldownMs;

    if (now - lastShotTimeRef.current < currentCooldown) return;
    lastShotTimeRef.current = now;

    const shipX = shipRef.current.x;
    const shipScaledWidth = SHIP_FRAME_WIDTH * spriteScale;
    const shipScaledHeight = SHIP_FRAME_HEIGHT * spriteScale;
    const bulletScaledSize = BULLET_SIZE * spriteScale;

    const id = bulletIdRef.current++;
    const bulletX = shipX + shipScaledWidth / 2 - bulletScaledSize / 2;
    const bulletBottom =
      SHIP_CONFIG.bottomOffset + shipScaledHeight - bulletScaledSize / 2;

    const newBullets = [
      ...bulletsRef.current,
      { id, x: bulletX, bottom: bulletBottom },
    ];
    bulletsRef.current = newBullets;
    setBullets(newBullets);

    if (shootAudioRef.current && !effectsMuted) {
      shootAudioRef.current.currentTime = 0;
      shootAudioRef.current.play().catch(() => { });
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

        // When actively dragging on mobile, ship position is controlled by touch handlers.
        if (isMobile && touchActiveRef.current) {
          const next = { ...prev, v: 0 };
          shipRef.current = next;
          return next;
        }

        let { x, v } = prev;

        if (keysRef.current.left && !keysRef.current.right) {
          v -= SHIP_CONFIG.acceleration * deltaSeconds;
        } else if (keysRef.current.right && !keysRef.current.left) {
          v += SHIP_CONFIG.acceleration * deltaSeconds;
        } else {
          if (v > 0) {
            v -= SHIP_CONFIG.friction * deltaSeconds;
            if (v < 0) v = 0;
          } else if (v < 0) {
            v += SHIP_CONFIG.friction * deltaSeconds;
            if (v > 0) v = 0;
          }
        }

        if (v > SHIP_CONFIG.maxSpeed) v = SHIP_CONFIG.maxSpeed;
        if (v < -SHIP_CONFIG.maxSpeed) v = -SHIP_CONFIG.maxSpeed;

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
      let currentBoss = bossRef.current;
      let playerDead = false;

      if (width && height) {
        const currentScore = scoreRef.current;
        const scoreMultiplier = Math.min(currentScore, 200);
        const currentSpawnInterval = Math.max(
          ENEMY_CONFIG.spawnInterval - scoreMultiplier * 0.01,
          0.5
        );

        // Spawn enemies continuously, but pause spawning when boss is active
        if (!bossSpawnedRef.current) {
          enemySpawnAccumulatorRef.current += deltaSeconds;
          if (enemySpawnAccumulatorRef.current >= currentSpawnInterval) {
            const spawns = Math.floor(
              enemySpawnAccumulatorRef.current / currentSpawnInterval
            );
            enemySpawnAccumulatorRef.current -= spawns * currentSpawnInterval;

            for (let i = 0; i < spawns; i++) {
              enemiesSpawnedRef.current++;
              const id = enemyIdRef.current++;
              const enemyScaledWidth = ENEMY_WIDTH * spriteScale;
              const enemyScaledHeight = ENEMY_HEIGHT * spriteScale;
              const x = Math.random() * Math.max(1, width - enemyScaledWidth);
              
              // HP increases based on boss wave
              const enemyMaxHp =
                Math.floor(enemiesSpawnedRef.current / PROGRESSION_CONFIG.enemiesPerBossWave) *
                  ENEMY_CONFIG.hpIncreasePerWave +
                1;
              
              enemies = [
                ...enemies,
                {
                  id,
                  x,
                  top: -enemyScaledHeight,
                  hp: enemyMaxHp,
                  maxHp: enemyMaxHp,
                },
              ];

            }
          }
        }

        const bulletScaledSize = BULLET_SIZE * spriteScale;
        bullets = bullets
          .map((b) => ({
            ...b,
            bottom: b.bottom + BULLET_CONFIG.speed * deltaSeconds,
          }))
          .filter((b) => b.bottom <= height + bulletScaledSize);

        const now = performance.now();

        const currentEnemySpeed = ENEMY_CONFIG.speed + scoreMultiplier * 0.01;

        enemies = enemies
          .map((e) => {
            if (e.isHit && e.hitTime) {
              const timeSinceHit = (now - e.hitTime) / 1000;
              if (timeSinceHit < 0.5) {
                return e;
              }

              return null;
            }

            // Sync HP based on current spawn count
            const currentWave = Math.floor(
              enemiesSpawnedRef.current /
                PROGRESSION_CONFIG.enemiesPerBossWave
            );
            const requiredMaxHp =
              currentWave * ENEMY_CONFIG.hpIncreasePerWave + 1;
            if (e.maxHp < requiredMaxHp) {
              const hpDiff = requiredMaxHp - e.maxHp;
              return {
                ...e,
                maxHp: requiredMaxHp,
                hp: e.hp + hpDiff,
                top: e.top + currentEnemySpeed * deltaSeconds,
              };
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
              const newHp = hitEnemy.hp - 1;

              if (newHp <= 0) {
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
                  hp: 0,
                  isHit: true,
                  hitTime: now,
                };

                setScore((prev) => {
                  const next = prev + 1;
                  scoreRef.current = next;

                  // Spawn boss every N enemies killed (based on config)
                  // Check if we've reached a boss spawn threshold
                  if (
                    next > 0 &&
                    next % PROGRESSION_CONFIG.enemiesRequiredForBoss === 0 &&
                    !bossSpawnedRef.current &&
                    width > 0 &&
                    height > 0
                  ) {
                    bossSpawnedRef.current = true;

                    const bossScaledWidth = BOSS_WIDTH * spriteScale;
                    const bossScaledHeight = BOSS_HEIGHT * spriteScale;
                    const bossX = Math.max(0, width / 2 - bossScaledWidth / 2);
                    const bossTop = -bossScaledHeight;

                    // Boss HP increases based on wave number (how many bosses have been spawned)
                    // bossWave = 1 at first threshold, 2 at second, etc.
                    const bossWave = Math.floor(
                      next / PROGRESSION_CONFIG.enemiesRequiredForBoss
                    );
                    // First wave gets base HP, each subsequent wave adds hpIncreasePerWave
                    const bossHp =
                      BOSS_CONFIG.hp +
                      (bossWave - 1) * BOSS_CONFIG.hpIncreasePerWave;

                    const initialBoss: Boss = {
                      x: bossX,
                      top: bossTop,
                      hp: bossHp,
                      maxHp: bossHp,
                    };

                    bossRef.current = initialBoss;
                    setBoss(initialBoss);
                  }

                  return next;
                });

                if (explosionAudioRef.current && !effectsMuted) {
                  explosionAudioRef.current.currentTime = 0;
                  explosionAudioRef.current.play().catch(() => { });
                }
              } else {
                enemies[j] = {
                  ...hitEnemy,
                  hp: newHp,
                  lastHitTime: now,
                };
              }

              break;
            }
          }
          // Boss collision
          if (bulletAlive[i] && currentBoss && !currentBoss.isHit) {
            const bossScaledWidth = BOSS_WIDTH * spriteScale;
            const bossScaledHeight = BOSS_HEIGHT * spriteScale;
            const bossLeft = currentBoss.x;
            const bossRight = currentBoss.x + bossScaledWidth;
            const bossTopY = currentBoss.top;
            const bossBottomY = currentBoss.top + bossScaledHeight;

            const bossOverlap =
              bulletLeft < bossRight &&
              bulletRight > bossLeft &&
              bulletTopY < bossBottomY &&
              bulletBottomY > bossTopY;

            if (bossOverlap) {
              bulletAlive[i] = false;

              const newHp = currentBoss.hp - 1;
              if (newHp <= 0) {
                // Boss defeated - use larger explosion
                const bossExplosionSize = 3; // Boss explosion is 3x larger
                const bossExplosionScaledSize = EXPLOSION_SIZE * bossExplosionSize * spriteScale;
                const explosionX =
                  currentBoss.x +
                  bossScaledWidth / 2 -
                  bossExplosionScaledSize / 2;
                const explosionTop =
                  currentBoss.top +
                  bossScaledHeight / 2 -
                  bossExplosionScaledSize / 2;

                const explosionId = explosionIdRef.current++;
                const newExplosion: Explosion = {
                  id: explosionId,
                  x: explosionX,
                  top: explosionTop,
                  startTime: now,
                  size: bossExplosionSize,
                };

                explosionsRef.current = [...explosionsRef.current, newExplosion];
                setExplosions([...explosionsRef.current]);

                currentBoss = {
                  ...currentBoss,
                  hp: 0,
                  isHit: true,
                  lastHitTime: now,
                };

                // Simple reward: big score bonus for boss defeat.
                setScore((prev) => {
                  const next = prev + PROGRESSION_CONFIG.bossDefeatBonus;
                  scoreRef.current = next;
                  return next;
                });

                if (explosionAudioRef.current && !effectsMuted) {
                  explosionAudioRef.current.currentTime = 0;
                  explosionAudioRef.current.play().catch(() => { });
                }
              } else {
                currentBoss = {
                  ...currentBoss,
                  hp: newHp,
                  lastHitTime: now,
                };
              }
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

        // Boss movement & lose condition
        if (currentBoss && !currentBoss.isHit) {
          const bossScaledHeight = BOSS_HEIGHT * spriteScale;
          const bossSpeed =
            ENEMY_CONFIG.speed * BOSS_CONFIG.speedMultiplier;
          const nextTop = currentBoss.top + bossSpeed * deltaSeconds;

          if (nextTop + bossScaledHeight >= height) {
            playerDead = true;
          } else {
            currentBoss = {
              ...currentBoss,
              top: nextTop,
            };
          }
        }

        // Remove boss once its death animation time has passed
        if (currentBoss && currentBoss.isHit) {
          const timeSinceHit = (now - (currentBoss.lastHitTime ?? now)) / 1000;
          if (timeSinceHit >= 0.5) {
            currentBoss = null;
            // Reset boss spawn flag so next boss can spawn after more enemies
            bossSpawnedRef.current = false;
          }
        }

        enemiesRef.current = newEnemies;
        bulletsRef.current = newBullets;
        explosionsRef.current = newExplosions;
        bossRef.current = currentBoss;
        setEnemies(newEnemies);
        setBullets(newBullets);
        setExplosions(newExplosions);
        setBoss(currentBoss);
      }

      if (playerDead) {
        setGameOver(true);
        return;
      }

      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [viewportSize, gameOver, spriteScale, isPaused, isMobile]);

  const updateShipFromTouch = useCallback(
    (clientX: number) => {
      const { width } = viewportSize;
      if (!width) return;

      const shipScaledWidth = SHIP_FRAME_WIDTH * spriteScale;
      let x = clientX - shipScaledWidth / 2;
      const maxX = Math.max(0, width - shipScaledWidth);
      if (x < 0) x = 0;
      if (x > maxX) x = maxX;

      setShip((prev) => {
        const next = { x, v: 0 };
        shipRef.current = next;
        return next;
      });
    },
    [viewportSize, spriteScale]
  );

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isMobile || gameOver || isPaused) return;
    
    // Don't handle ship movement if touch started on a button or control element
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }
    
    const touch = e.touches[0];
    if (!touch) return;

    touchActiveRef.current = true;
    touchStartTimeRef.current = performance.now();
    touchStartXRef.current = touch.clientX;
    lastTouchXRef.current = touch.clientX;

    updateShipFromTouch(touch.clientX);
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isMobile || gameOver || isPaused || !touchActiveRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;

    lastTouchXRef.current = touch.clientX;
    updateShipFromTouch(touch.clientX);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isMobile) return;

    // Don't handle tap-to-shoot if touch ended on a button (button handles its own shooting)
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      touchActiveRef.current = false;
      return;
    }

    const now = performance.now();
    const duration = now - touchStartTimeRef.current;
    const dx = lastTouchXRef.current - touchStartXRef.current;

    // Short tap without much movement counts as a shoot action (fallback method).
    if (!gameOver && !isPaused && touchActiveRef.current && duration < 200 && Math.abs(dx) < 10) {
      handleShoot();
    }

    touchActiveRef.current = false;
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <ShipSprite
        x={ship.x}
        bottom={SHIP_CONFIG.bottomOffset}
        fps={12}
      />

      {score >= PROGRESSION_CONFIG.warningThreshold && warningText && (
        <div
          className="absolute left-1/2 -translate-x-1/2 font-[Upheav] text-sm md:text-base text-center whitespace-nowrap z-10"
          style={{
            bottom: `${SHIP_CONFIG.bottomOffset + SHIP_FRAME_HEIGHT * spriteScale + 20
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
        <EnemySprite
          key={e.id}
          x={e.x}
          top={e.top}
          hp={e.hp}
          maxHp={e.maxHp}
          isHit={e.isHit}
          lastHitTime={e.lastHitTime}
        />
      ))}

      {explosions.map((exp) => (
        <ExplosionSprite
          key={exp.id}
          x={exp.x}
          top={exp.top}
          size={exp.size}
        />
      ))}

      {boss && (
        <BossSprite
          x={boss.x}
          top={boss.top}
          hp={boss.hp}
          maxHp={boss.maxHp}
          isHit={boss.isHit}
          lastHitTime={boss.lastHitTime}
        />
      )}

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
            className={`fixed top-0 left-0 w-screen h-screen bg-black/80 flex flex-col items-center justify-center ${isMobile ? "p-4" : "p-0"
              } box-border z-99999`}>
            <div
              className={`bg-black border-2 border-white ${isMobile ? "p-6 px-4" : "p-10"
                } flex flex-col items-center ${isMobile ? "gap-5" : "gap-[30px]"
                } w-full max-w-[420px] box-border`}>
              <h2
                className={`text-white font-[Upheav] ${isMobile ? "text-3xl" : "text-5xl"
                  } m-0 text-center`}>
                Game Over
              </h2>
              <div
                className={`text-white font-[Upheav] ${isMobile ? "text-2xl" : "text-4xl"
                  } text-center`}>
                Score: {score}
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div
                  className={`flex ${isMobile ? "flex-col gap-3" : "flex-row gap-5"
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
