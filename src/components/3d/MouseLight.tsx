import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

export default function MouseLight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (lightRef.current) {
      // Convert mouse coordinates to 3D space
      const vector = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0.5);
      vector.unproject(state.camera);
      vector.multiplyScalar(5);
      vector.z = 0;

      // Smoothly move the light
      lightRef.current.position.lerp(vector, 0.1);
    }
  });

  return (
    <SpotLight
      ref={lightRef}
      position={[0, 0, 5]}
      angle={0.15}
      penumbra={0.5}
      intensity={1}
      color="#accent-500"
      castShadow
    />
  );
} 