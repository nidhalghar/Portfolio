"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Torus } from "@react-three/drei";
import * as THREE from 'three';

export const DevObjects = () => {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const box = useRef<THREE.Mesh>(null);
  const torus = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = time * 0.1;
    }

    if (sphere.current) {
      sphere.current.position.y = Math.sin(time) * 0.5;
      sphere.current.rotation.x = time * 0.5;
    }

    if (box.current) {
      box.current.position.y = Math.cos(time) * 0.5;
      box.current.rotation.x = time * 0.5;
    }

    if (torus.current) {
      torus.current.position.y = Math.sin(time + 2) * 0.5;
      torus.current.rotation.x = time * 0.5;
    }
  });

  return (
    <group ref={group}>
      <Sphere
        ref={sphere}
        args={[0.5, 32, 32]}
        position={[-2, 0, 0]}
      >
        <meshStandardMaterial
          color="#6366f1"
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>

      <Box
        ref={box}
        args={[0.8, 0.8, 0.8]}
        position={[2, 0, 0]}
      >
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.3}
          metalness={0.8}
        />
      </Box>

      <Torus
        ref={torus}
        args={[0.6, 0.2, 16, 32]}
        position={[0, 0, 2]}
      >
        <meshStandardMaterial
          color="#ec4899"
          roughness={0.3}
          metalness={0.8}
        />
      </Torus>
    </group>
  );
}; 