import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function ArchitectureModel() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Base building */}
      <mesh position={[0, -2, 0]} ref={meshRef}>
        <boxGeometry args={[4, 8, 4]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Windows */}
      <mesh position={[2.01, -1, 0]}>
        <planeGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#4a4a4a" emissive="#2a2a2a" />
      </mesh>
      <mesh position={[-2.01, -1, 0]}>
        <planeGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#4a4a4a" emissive="#2a2a2a" />
      </mesh>
      <mesh position={[0, -1, 2.01]}>
        <planeGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#4a4a4a" emissive="#2a2a2a" />
      </mesh>
      <mesh position={[0, -1, -2.01]}>
        <planeGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#4a4a4a" emissive="#2a2a2a" />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[3, 2, 4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Decorative elements */}
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#accent-500" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
} 