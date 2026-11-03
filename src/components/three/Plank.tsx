"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Build } from "@/data/catalog";

export type Finish = "cru" | "verniz" | "oleo" | "velatura";

export type PlankProps = {
  build: Build;
  texture: string;
  tone: string;
  width: number; // mm
  thickness: number; // mm
  length?: number; // mm (display segment)
  explode?: number; // 0..1 target
  explodeRef?: React.MutableRefObject<number>; // live value (scroll driven)
  finish?: Finish;
  antiSlip?: boolean;
  underlay?: "foam" | "hd" | "alu" | "cork";
};

const U = 0.01; // 1 mm = 0.01 units

function useWood(url: string, w: number, l: number) {
  const base = useTexture(url);
  return useMemo(() => {
    const mk = (rx: number, ry: number) => {
      const t = base.clone();
      t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping;
      t.repeat.set(rx, ry);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
      return t;
    };
    // texture ≈ 260 mm × 260 mm of real surface
    return { top: mk(w / 260, l / 260), side: mk(0.12, l / 260) };
  }, [base, w, l]);
}

function finishParams(f: Finish | undefined) {
  switch (f) {
    case "verniz":
      return { roughness: 0.32, clearcoat: 0.9, clearcoatRoughness: 0.12, tint: "#ffffff" };
    case "oleo":
      return { roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.4, tint: "#f1e6d6" };
    case "velatura":
      return { roughness: 0.6, clearcoat: 0.1, clearcoatRoughness: 0.5, tint: "#e3dccf" };
    default:
      return { roughness: 0.85, clearcoat: 0, clearcoatRoughness: 1, tint: "#ffffff" };
  }
}

const PLY = ["#d9c39a", "#c7a978", "#dcc8a2", "#c4a473", "#d6be93", "#c9ab7b", "#d9c39a"];

export default function Plank(p: PlankProps) {
  const L = p.length ?? 620;
  const W = p.width;
  const Tk = p.thickness;
  const tex = useWood(p.texture, W, L);
  const fin = finishParams(p.finish);
  const group = useRef<THREE.Group>(null);
  const cur = useRef(0);

  const topMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: tex.top,
        color: new THREE.Color(fin.tint),
        roughness: fin.roughness,
        clearcoat: fin.clearcoat,
        clearcoatRoughness: fin.clearcoatRoughness,
      }),
    [tex.top, fin.tint, fin.roughness, fin.clearcoat, fin.clearcoatRoughness]
  );
  const sideMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: tex.side, color: new THREE.Color("#cfc2b0"), roughness: 0.9 }),
    [tex.side]
  );
  const endMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(p.tone).multiplyScalar(0.72), roughness: 0.95 }),
    [p.tone]
  );
  const woodMats = useMemo(() => [sideMat, sideMat, topMat, sideMat, endMat, endMat], [sideMat, topMat, endMat]);
  const plyMats = useMemo(() => PLY.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 })), []);

  // refs to parts that move when exploding
  const parts = useRef<Record<string, THREE.Object3D | null>>({});
  const reg = (k: string) => (o: THREE.Object3D | null) => {
    parts.current[k] = o;
  };

  useFrame((_, dt) => {
    const target = p.explodeRef ? p.explodeRef.current : p.explode ?? 0;
    cur.current = THREE.MathUtils.damp(cur.current, target, 6, dt);
    const e = cur.current;
    const P = parts.current;
    const sp = Math.max(Tk * U, 0.12);
    if (P.top) P.top.position.y = e * sp * 3.2;
    for (let i = 0; i < 7; i++) {
      const o = P[`ply${i}`];
      if (o) o.position.y = o.userData.y0 - e * sp * 0.6;
    }
    if (P.tongue) P.tongue.position.y = (P.tongue.userData.y0 ?? P.tongue.position.y) - (p.build === "multilayer" ? e * sp * 0.6 : 0);
    if (P.clips) P.clips.position.y = P.clips.userData.y0 - e * 0.6;
    if (P.clips) P.clips.visible = e > 0.02;
  });

  const w = W * U;
  const t = Tk * U;
  const l = L * U;

  if (p.build === "underlay") {
    const col = p.underlay === "cork" ? "#a77a4f" : p.underlay === "hd" || p.underlay === "alu" ? "#2b2b2c" : "#e8e6df";
    return (
      <group ref={group}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, i * 0.06 - 0.06, -i * 0.25]} rotation={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.2, 0.03, 4.2]} />
            <meshStandardMaterial
              color={col}
              roughness={p.underlay === "alu" && i === 2 ? 0.25 : 0.95}
              metalness={p.underlay === "alu" && i === 2 ? 0.8 : 0}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (p.build === "skirting") {
    return (
      <group ref={group} rotation={[0, 0, 0]}>
        <mesh material={woodMats} position={[0, w / 2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <boxGeometry args={[w, t, l]} />
        </mesh>
        <mesh position={[t / 2 + 0.002, w - 0.06, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.05, 0.05, l]} />
          <meshStandardMaterial color={p.tone} roughness={0.8} />
        </mesh>
      </group>
    );
  }

  // multilayer: noble top layer + cross plies + tongue
  if (p.build === "multilayer") {
    const top = Math.max(t * 0.28, 0.035);
    const core = t - top;
    const n = 5;
    const ph = core / n;
    return (
      <group ref={group}>
        <group ref={reg("top")}>
          <mesh material={woodMats} position={[0, t / 2 - top / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, top, l]} />
          </mesh>
        </group>
        {Array.from({ length: n }).map((_, i) => {
          const y0 = -t / 2 + ph * (i + 0.5);
          return (
            <mesh
              key={i}
              ref={(o) => {
                if (o) o.userData.y0 = y0;
                reg(`ply${i}`)(o);
              }}
              position={[0, y0, 0]}
              material={plyMats[i]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[w, ph * 0.98, l]} />
            </mesh>
          );
        })}
        <mesh
          ref={(o) => {
            if (o) o.userData.y0 = -t / 2 + core / 2;
            reg("tongue")(o);
          }}
          position={[w / 2 + 0.04, -t / 2 + core / 2, 0]}
          material={plyMats[2]}
          castShadow
        >
          <boxGeometry args={[0.08, core * 0.34, l]} />
        </mesh>
      </group>
    );
  }

  // triplex: three slats with grooves
  if (p.build === "triplex") {
    const slat = w / 3;
    return (
      <group ref={group}>
        <group ref={reg("top")}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} material={woodMats} position={[-w / 2 + slat * (i + 0.5), 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[slat - 0.06, t, l]} />
            </mesh>
          ))}
        </group>
        <mesh position={[0, -t / 2 + 0.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.06, l]} />
          <meshStandardMaterial color={new THREE.Color(p.tone).multiplyScalar(0.6)} roughness={0.9} />
        </mesh>
        <mesh
          ref={(o) => {
            if (o) o.userData.x0 = w / 2 + 0.03;
            reg("tongue")(o);
          }}
          position={[w / 2 + 0.03, -t / 2 + 0.03, 0]}
          material={endMat}
        >
          <boxGeometry args={[0.06, 0.05, l]} />
        </mesh>
      </group>
    );
  }

  // deck & solid
  const ridges = p.build === "deck" && p.antiSlip;
  return (
    <group ref={group}>
      <group ref={reg("top")}>
        <mesh material={woodMats} castShadow receiveShadow>
          <boxGeometry args={[w, t, l]} />
        </mesh>
        {ridges &&
          Array.from({ length: Math.floor(W / 7) }).map((_, i, a) => (
            <mesh key={i} position={[-w / 2 + (w / a.length) * (i + 0.5), t / 2 + 0.006, 0]} material={endMat}>
              <boxGeometry args={[(w / a.length) * 0.35, 0.012, l]} />
            </mesh>
          ))}
      </group>
      {p.build === "solid" && (
        <mesh
          ref={(o) => {
            if (o) o.userData.x0 = w / 2 + 0.04;
            reg("tongue")(o);
          }}
          position={[w / 2 + 0.04, 0, 0]}
          material={endMat}
        >
          <boxGeometry args={[0.08, t * 0.3, l]} />
        </mesh>
      )}
      {p.build === "deck" && (
        <group
          ref={(o) => {
            if (o) o.userData.y0 = -t / 2 - 0.05;
            reg("clips")(o);
          }}
          position={[0, -t / 2 - 0.05, 0]}
          visible={false}
        >
          {[-l / 3, 0, l / 3].map((z) => (
            <mesh key={z} position={[w / 2, 0, z]}>
              <boxGeometry args={[0.16, 0.08, 0.32]} />
              <meshStandardMaterial color="#9ea3a6" metalness={0.85} roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
