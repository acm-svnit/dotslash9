"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Text, PerspectiveCamera, Scroll, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// THEME COLORS
const THEME = {
  gridColor: "#00d4ff",
  bgColor: "#050505",
  cardColor: "#ffffff",
};

function RetroTunnel() {
  const scroll = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const gridRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // 1. CAMERA MOVEMENT
    const targetZ = -scroll.offset * 120;
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetZ,
      0.1
    );

    // 2. GRID ANIMATION
    if (gridRef.current) {
      gridRef.current.position.z = scroll.offset * 20; 
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cameraRef} fov={75} />
      
      {/* ATMOSPHERE */}
      <fog attach="fog" args={[THEME.bgColor, 5, 60]} /> 
      <color attach="background" args={[THEME.bgColor]} />

      {/* SPACE BACKGROUND */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* LIGHTING */}
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={5} color="#bf40bf" />

      {/* THE RETRO GRID TUNNEL */}
      <mesh ref={gridRef} position={[0, 0, -50]}>
        <boxGeometry args={[20, 20, 150, 20, 20, 40]} /> 
        <meshBasicMaterial 
          color={THEME.gridColor} 
          wireframe 
          side={THREE.BackSide}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* --- CONTENT CARDS --- */}
      {/* Card 1: Left */}
      <group position={[-3, 0, -20]}>
        <Text 
          // font="/fonts/PressStart2P-Regular.ttf"  <-- COMMENTED OUT FOR NOW
          fontSize={1.5} 
          color="white" 
          anchorX="right"
        >
          TRACK 01
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.5} color="#aaaaaa" anchorX="right">
          WEB DEVELOPMENT
        </Text>
      </group>

      {/* Card 2: Right */}
      <group position={[3, 0, -50]}>
        <Text 
           // font="/fonts/PressStart2P-Regular.ttf" <-- COMMENTED OUT FOR NOW
           fontSize={1.5} 
           color="white" 
           anchorX="left"
        >
          SPONSOR
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.5} color="#aaaaaa" anchorX="left">
           POWERED BY...
        </Text>
      </group>

      {/* Card 3: Center/Top */}
      <group position={[0, 3, -80]}>
        <Text fontSize={3} color={THEME.gridColor} anchorX="center">
          FINAL REVEAL
        </Text>
      </group>
    </>
  );
}

export default function SpaceTunnel() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <ScrollControls pages={5} damping={0.2}>
          <RetroTunnel />
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: '400vh', width: '100vw' }}>
              <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black/80">
                <h1 className="text-4xl font-mono">ENTER THE ARENA</h1>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}