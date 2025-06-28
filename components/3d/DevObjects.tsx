"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Torus, Text3D, Cylinder } from "@react-three/drei";

export const DevObjects = () => {
  const laptopRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  const screenRef = useRef();
  const phoneRef = useRef();

  useFrame((state, delta) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y += delta * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 0.3;
    }
    if (screenRef.current) {
      screenRef.current.rotation.y += delta * 0.2;
    }
    if (phoneRef.current) {
      phoneRef.current.rotation.x += delta * 0.25;
    }
  });

  return (
    <group>
      {/* Laptop sur le côté gauche */}
      <group position={[-8, 2, 0]}>
        <Box
          ref={laptopRef}
          args={[3, 0.2, 2]}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        {/* Écran du laptop */}
        <Box
          args={[3, 2, 0.1]}
          position={[0, 1, -1]}
          rotation={[0.3, 0, 0]}
        >
          <meshStandardMaterial
            color="#3B82F6"
            metalness={0.5}
            roughness={0.3}
          />
        </Box>
      </group>

      {/* Sphère de code sur le côté droit en haut */}
      <Sphere
        ref={sphereRef}
        args={[1, 32, 32]}
        position={[7, 3, 0]}
      >
        <meshStandardMaterial
          color="#3B82F6"
          metalness={0.5}
          roughness={0.3}
          wireframe
        />
      </Sphere>

      {/* Écran de code sur le côté droit */}
      <Box
        ref={screenRef}
        args={[2.5, 2, 0.1]}
        position={[6, -2, 0]}
      >
        <meshStandardMaterial
          color="#EC4899"
          metalness={0.6}
          roughness={0.2}
        />
      </Box>

      {/* Smartphone sur le côté gauche en bas */}
      <group position={[-7, -3, 0]}>
        <Box
          ref={phoneRef}
          args={[1, 2, 0.1]}
        >
          <meshStandardMaterial
            color="#10B981"
            metalness={0.7}
            roughness={0.2}
          />
        </Box>
      </group>

      {/* Anneaux de loading dispersés */}
      <Torus
        ref={torusRef}
        args={[1, 0.2, 16, 100]}
        position={[8, 0, 0]}
      >
        <meshStandardMaterial
          color="#F472B6"
          metalness={0.6}
          roughness={0.2}
        />
      </Torus>
    </group>
  );
}; 