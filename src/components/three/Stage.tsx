"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import Plank, { type PlankProps } from "./Plank";

function Rig({ spinRef, children }: { spinRef?: React.MutableRefObject<number>; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    if (spinRef) {
      g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, spinRef.current, 5, dt);
    } else {
      g.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.25;
    }
  });
  return <group ref={g}>{children}</group>;
}

export default function Stage({
  plank,
  spinRef,
  interactive = true,
  dark = true,
  className = "",
  dist = 1,
  offset = [0, 0, 0],
}: {
  dist?: number;
  offset?: [number, number, number];
  plank: PlankProps;
  spinRef?: React.MutableRefObject<number>;
  interactive?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const content = (
    <Rig spinRef={spinRef}>
      <group rotation={[0, -0.7, 0]} position={offset}>
        <Plank {...plank} />
      </group>
    </Rig>
  );
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [5.2 * dist, 3.4 * dist, 6.2 * dist], fov: 30, near: 0.1, far: 100 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 7, 3]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-5, 3, -4]} intensity={0.6} color="#ffe9cf" />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 4, 1]} />
          <Lightformer intensity={1.2} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} color="#fff2df" />
          <Lightformer intensity={0.8} position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
        <Suspense fallback={null}>
          {interactive ? (
            <PresentationControls global={false} cursor snap polar={[-0.3, 0.5]} azimuth={[-Math.PI, Math.PI]} speed={1.4}>
              {content}
            </PresentationControls>
          ) : (
            content
          )}
        </Suspense>
        <ContactShadows position={[0, -0.9, 0]} opacity={dark ? 0.7 : 0.35} scale={14} blur={2.6} far={3} />
      </Canvas>
    </div>
  );
}
