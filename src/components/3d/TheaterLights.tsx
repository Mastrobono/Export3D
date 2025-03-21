import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

interface TheaterLightProps {
  position: [number, number, number];
  target: [number, number, number];
  color: string;
  intensity: number;
  delay: number;
}

function TheaterLight({ position, target, color, intensity, delay }: TheaterLightProps) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const [initialIntensity, setInitialIntensity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialIntensity(intensity);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, intensity]);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        initialIntensity,
        0.1
      );
    }
  });

  return (
    <SpotLight
      ref={lightRef}
      position={position}
      target-position={target}
      angle={0.3}
      penumbra={0.5}
      intensity={0}
      color={color}
      castShadow
    />
  );
}

export default function TheaterLights() {
  return (
    <group>
      {/* Main stage lights */}
      <TheaterLight
        position={[-5, 8, 0]}
        target={[0, 0, 0]}
        color="#accent-500"
        intensity={1}
        delay={500}
      />
      <TheaterLight
        position={[5, 8, 0]}
        target={[0, 0, 0]}
        color="#accent-400"
        intensity={1}
        delay={1000}
      />
      <TheaterLight
        position={[0, 8, 5]}
        target={[0, 0, 0]}
        color="#accent-300"
        intensity={1}
        delay={1500}
      />
      <TheaterLight
        position={[0, 8, -5]}
        target={[0, 0, 0]}
        color="#accent-600"
        intensity={1}
        delay={2000}
      />
    </group>
  );
} 