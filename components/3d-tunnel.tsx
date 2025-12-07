"use client";

import { Canvas, useFrame } from "@react-three/fiber";
// ADD 'Scroll' to imports
import { ScrollControls, useScroll, Text, PerspectiveCamera, Scroll } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function TunnelScene() {
  const scroll = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useFrame(() => {
    if (!cameraRef.current) return;
    // Move camera based on scroll
    const targetZ = -scroll.offset * 120; 
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetZ,
      0.1
    );
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cameraRef} fov={75} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <mesh position={[0, 0, -50]}>
        <boxGeometry args={[15, 15, 150, 10, 10, 20]} /> 
        <meshBasicMaterial color="#ff0055" wireframe side={THREE.BackSide} />
      </mesh>

      <Text position={[0, 0, -20]} fontSize={4} color="white">DotSlash</Text>
      <Text position={[-3, 2, -50]} fontSize={4} color="white">9.0</Text>
      <Text position={[3, -2, -80]} fontSize={4} color="white">Is Hereeeeee</Text>
    </>
  );
}

export default function TunnelExperience() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas>
        <ScrollControls pages={5} damping={0.2}>
          
          {/* Layer 1: The 3D Scene */}
          <TunnelScene />

          {/* Layer 2: The HTML Content */}
          {/* CRITICAL FIX: Wrap HTML in <Scroll html> */}
          <Scroll html style={{ width: '100%', height: '100%' }}>
            
            <div 
               style={{ 
                 position: 'absolute', 
                 top: '400vh', // This matches the end of the scroll
                 width: '100vw',
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 flexDirection: 'column'
               }}
            >
              <h1 className="text-6xl font-bold mb-8 text-white">Beloved sponciiiii</h1>
              <p className="text-xl max-w-md text-center text-white">
                Lesgoooooooo
              </p>
            </div>

          </Scroll>

        </ScrollControls>
      </Canvas>
    </div>
  );
}