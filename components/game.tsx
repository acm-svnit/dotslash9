"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ShipSprite,
  SHIP_FRAME_WIDTH,
  SHIP_FRAME_HEIGHT,
} from "@/components/ship-sprite";
import { BulletSprite, BULLET_SIZE } from "@/components/bullet-sprite";
import {
  EnemySprite,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
} from "@/components/enemy-sprite";

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

export const Game: React.FC = () => {
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewportSize({ width, height });

      setShip((prev) => {
        if (prev.x === 0 && prev.v === 0) {
          const x = width / 2 - SHIP_FRAME_WIDTH / 2;
          const next = { x, v: 0 };
          shipRef.current = next;
          return next;
        }

        const maxX = Math.max(0, width - SHIP_FRAME_WIDTH);
        const clampedX = Math.min(Math.max(0, prev.x), maxX);
        const next = { ...prev, x: clampedX };
        shipRef.current = next;
        return next;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

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
        const now = performance.now();
        if (now - lastShotTimeRef.current < BULLET_COOLDOWN_MS) return;
        lastShotTimeRef.current = now;

        const shipX = shipRef.current.x;

        const id = bulletIdRef.current++;
        const bulletX = shipX + SHIP_FRAME_WIDTH / 2 - BULLET_SIZE / 2;
        const bulletBottom =
          SHIP_BOTTOM_OFFSET + SHIP_FRAME_HEIGHT - BULLET_SIZE / 2;

        const newBullets = [
          ...bulletsRef.current,
          { id, x: bulletX, bottom: bulletBottom },
        ];
        bulletsRef.current = newBullets;
        setBullets(newBullets);
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
  }, [gameOver]);

  useEffect(() => {
    if (!viewportSize.width || !viewportSize.height || gameOver) return;

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

        const maxX = width - SHIP_FRAME_WIDTH;
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
            const x = Math.random() * Math.max(1, width - ENEMY_WIDTH);
            enemies = [...enemies, { id, x, top: -ENEMY_HEIGHT }];
          }
        }

        bullets = bullets
          .map((b) => ({
            ...b,
            bottom: b.bottom + BULLET_SPEED * deltaSeconds,
          }))
          .filter((b) => b.bottom <= height + BULLET_SIZE);

        enemies = enemies.map((e) => ({
          ...e,
          top: e.top + ENEMY_SPEED * deltaSeconds,
        }));

        const bulletAlive = new Array(bullets.length).fill(true);
        const enemyAlive = new Array(enemies.length).fill(true);

        for (let i = 0; i < bullets.length; i++) {
          if (!bulletAlive[i]) continue;

          const b = bullets[i];
          const bulletLeft = b.x;
          const bulletRight = b.x + BULLET_SIZE;
          const bulletBottomY = height - b.bottom;
          const bulletTopY = bulletBottomY - BULLET_SIZE;

          for (let j = 0; j < enemies.length; j++) {
            if (!enemyAlive[j]) continue;

            const e = enemies[j];
            const enemyLeft = e.x;
            const enemyRight = e.x + ENEMY_WIDTH;
            const enemyTopY = e.top;
            const enemyBottomY = e.top + ENEMY_HEIGHT;

            const overlap =
              bulletLeft < enemyRight &&
              bulletRight > enemyLeft &&
              bulletTopY < enemyBottomY &&
              bulletBottomY > enemyTopY;

            if (overlap) {
              bulletAlive[i] = false;
              enemyAlive[j] = false;
              break;
            }
          }
        }

        const newEnemies: Enemy[] = [];
        for (let j = 0; j < enemies.length; j++) {
          if (!enemyAlive[j]) continue;
          const e = enemies[j];

          if (e.top + ENEMY_HEIGHT >= height) {
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
  }, [viewportSize, gameOver]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}>
      {/* Ship */}
      <ShipSprite x={ship.x} bottom={SHIP_BOTTOM_OFFSET} fps={12} />

      {/* Bullets */}
      {bullets.map((b) => (
        <BulletSprite key={b.id} x={b.x} bottom={b.bottom} />
      ))}

      {/* Enemies */}
      {enemies.map((e) => (
        <EnemySprite key={e.id} x={e.x} top={e.top} />
      ))}
    </div>
  );
};
