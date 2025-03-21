import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import ParticleEffect from './ParticleEffect';
import TheaterLights from './TheaterLights';
import SpotlightEffect from './SpotlightEffect';

export default function Background3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <ParticleEffect />
          <TheaterLights />
          <SpotlightEffect />
        </Suspense>
      </Canvas>
    </div>
  );
} 