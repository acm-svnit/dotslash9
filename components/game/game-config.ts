/**
 * Game Configuration
 * 
 * Adjust these values to easily test and tune game mechanics
 * without modifying the main game logic code.
 */

export const GAME_CONFIG = {
  // Ship movement
  ship: {
    bottomOffset: 80,
    acceleration: 800,
    maxSpeed: 400,
    friction: 900,
  },

  // Bullet mechanics
  bullet: {
    speed: 600,
    cooldownMs: 100,
    cooldownAfterWarningMs: 250, // Cooldown when score >= warningThreshold
  },

  // Enemy mechanics
  enemy: {
    speed: 80,
    spawnInterval: 1.5, // seconds between spawns
    hpPer100Score: 1, // HP increases by this amount every 100 score
    hpIncreasePerWave: 1, // HP increases by this amount every boss wave
  },

  // Boss mechanics
  boss: {
    hp: 50,
    maxHp: 50,
    speedMultiplier: 0.5, // Boss speed relative to enemy speed
    hpIncreasePerWave: 50, // Boss HP increases by this amount every boss wave
  },

  // Game progression
  progression: {
    // Number of enemies that must be spawned before boss spawns (boss wave interval)
    enemiesPerBossWave: 100,
    
    // Number of enemies that must be killed before boss spawns (legacy, kept for compatibility)
    enemiesRequiredForBoss: 100,
    
    // Score threshold for warning message and increased bullet cooldown
    warningThreshold: 100,
    
    // Score bonus for defeating the boss
    bossDefeatBonus: 0,
  },

  // Warning message
  warning: {
    message: "Your spaceship is breaking down! Cooldowns must be activated!",
  },
} as const;
