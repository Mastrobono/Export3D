import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

export default function SpotlightEffect() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const { mouse, camera } = useThree();

  useFrame((state) => {
    if (lightRef.current) {
      // Convert mouse coordinates to 3D space
      const vector = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0.5);
      vector.unproject(camera);
      vector.multiplyScalar(5);
      vector.z = 0;

      // Add subtle movement to make it feel more dynamic
      const time = state.clock.getElapsedTime();
      vector.x += Math.sin(time) * 0.05;
      vector.y += Math.cos(time) * 0.05;

      // Smoothly move the light
      lightRef.current.position.lerp(vector, 0.1);

      // Adjust intensity based on mouse movement
      const mouseSpeed = Math.sqrt(
        Math.pow(mouse.x - state.mouse.x, 2) + Math.pow(mouse.y - state.mouse.y, 2)
      );
      lightRef.current.intensity = 2 + mouseSpeed;
    }
  });

  return (
    <SpotLight
      ref={lightRef}
      position={[0, 0, 5]}
      angle={0.4}
      penumbra={0.7}
      intensity={2}
      color="#ffffff"
      castShadow
      distance={15}
      attenuation={0.2}
    />
  );
} 