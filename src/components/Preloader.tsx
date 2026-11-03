"use client";

import { useEffect, useState } from "react";

/** Once per session: counter 000→100 over a wood-grain wipe, then the curtain lifts. */
export default function Preloader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("strong-pre") === "1";
      sessionStorage.setItem("strong-pre", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const t0 = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 150);
        setTimeout(() => setGone(true), 1400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-dark p-[var(--gut)] text-bone transition-[clip-path] duration-[1.1s]"
      style={{ clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0 0)", transitionTimingFunction: "var(--expo)" }}
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url(/textures/nogueira.jpg)", clipPath: `inset(${100 - n}% 0 0 0)`, transition: "clip-path .2s linear" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,.2),rgba(12,11,9,.75))]" />
      <p className="lbl relative text-bone-2">Strong Wood Floors · Póvoa de Lanhoso</p>
      <div className="relative flex items-end justify-between">
        <p className="lbl text-bone-2">Est. 2011</p>
        <p className="tab text-[clamp(72px,14vw,220px)] font-medium leading-[0.8] tracking-[-0.06em]">{String(n).padStart(3, "0")}</p>
      </div>
    </div>
  );
}
