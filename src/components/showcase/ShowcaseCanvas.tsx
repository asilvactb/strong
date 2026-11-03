"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Plank from "../three/Plank";
import type { Build } from "@/data/catalog";

export type ShowItem = { texture: string; tone: string; width: number; thickness: number; build: Build };

/**
 * One plank per item. progressRef holds a float index (e.g. 2.35 = 35% through item 2).
 * Each item enters from below spinning, settles, then is tossed up and out — Henrietta-style.
 */
function Tosser({ items, progressRef, active }: { items: ShowItem[]; progressRef: React.MutableRefObject<number>; active: number }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame((state) => {
    const p = progressRef.current;
    const time = state.clock.elapsedTime;
    items.forEach((_, i) => {
      const g = refs.current[i];
      if (!g) return;
      const t = p - i; // <0 not yet, 0..1 active
      const vis = t > -0.5 && t < 1.5;
      g.visible = vis;
      if (!vis) return;
      // enter: t in [-0.5, 0.1]; hold: [0.1, 0.75]; exit: [0.75, 1.5]
      let y = 0, rz = 0, rx = 0, ry = -0.7 + Math.sin(time * 0.5) * 0.12, s = 1;
      if (t < 0.1) {
        const k = THREE.MathUtils.smoothstep(t, -0.5, 0.1);
        y = (1 - k) * -5.5;
        rz = (1 - k) * 1.4;
        rx = (1 - k) * -0.8;
        s = 0.7 + 0.3 * k;
      } else if (t > 0.75) {
        const k = THREE.MathUtils.smoothstep(t, 0.75, 1.5);
        y = k * 6.5;
        rz = -k * 1.8;
        rx = k * 0.9;
        ry += k * 1.2;
        s = 1 - 0.25 * k;
      } else {
        const k = (t - 0.1) / 0.65;
        ry += (k - 0.5) * 0.9;
        y = Math.sin(time * 0.8) * 0.05;
      }
      g.position.set(0, y, 0);
      g.rotation.set(0.15 + rx, ry, rz);
      g.scale.setScalar(s);
    });
  });
  return (
    <>
      {items.map((it, i) => Math.abs(i - active) > 1 ? null : (
        <group key={i} ref={(o) => void (refs.current[i] = o)} visible={false}>
          <Plank build={it.build === "underlay" ? "solid" : it.build} texture={it.texture} tone={it.tone} width={it.width} thickness={it.thickness} length={720} finish="oleo" />
        </group>
      ))}
    </>
  );
}

export default function ShowcaseCanvas({ items, progressRef, active, dist = 1 }: { items: ShowItem[]; progressRef: React.MutableRefObject<number>; active: number; dist?: number }) {
  items.forEach((i) => useTexture.preload(i.texture));
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2.2 * dist, 9.5 * dist], fov: 30 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 8, 5]} intensity={2.4} />
      <directionalLight position={[-6, 2, -3]} intensity={0.7} color="#ffe6c8" />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, 3]} scale={[10, 3, 1]} />
        <Lightformer intensity={1} position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Tosser items={items} progressRef={progressRef} active={active} />
      </Suspense>
    </Canvas>
  );
}
