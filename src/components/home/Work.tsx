"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { GALLERY } from "@/data/catalog";
import Lines from "../Lines";

/** Draggable strip of real project photos with inertia + scroll-linked drift. */
export default function Work({ label, title, note }: { label: string; title: string; note: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current!;
    const s = strip.current!;
    let x = 0, target = 0, drag = false, sx = 0, sTarget = 0, raf = 0, lastY = window.scrollY;
    const max = () => -(s.scrollWidth - w.clientWidth);
    const clamp = (v: number) => Math.min(0, Math.max(max(), v));
    const down = (e: PointerEvent) => {
      drag = true;
      sx = e.clientX;
      sTarget = target;
      w.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (drag) target = clamp(sTarget + (e.clientX - sx) * 1.4);
    };
    const up = () => (drag = false);
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      target = clamp(target - dy * 0.6);
    };
    const tick = () => {
      x += (target - x) * 0.08;
      s.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    w.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      w.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-paper py-[20vh]" data-theme="light">
      <div className="gut mb-12 flex items-end justify-between">
        <div>
          <p className="lbl mb-6 rv">07 — {label}</p>
          <Lines className="display text-[clamp(56px,10vw,180px)]" lines={[title]} />
        </div>
        <p className="lbl rv hidden md:block">{note} ← →</p>
      </div>
      <div ref={wrap} className="cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing" data-cursor="drag">
        <div ref={strip} className="flex w-max gap-4 px-[var(--gut)] will-change-transform">
          {GALLERY.map((g, i) => (
            <figure key={g} className={`relative shrink-0 overflow-hidden rounded-[10px] bg-paper-2 ${i % 3 === 1 ? "mt-16 h-[46vh] w-[34vh]" : "h-[56vh] w-[42vh]"}`}>
              <Image src={`/img/gallery/${g}.jpg`} alt="" fill sizes="42vh" className="pointer-events-none object-cover" draggable={false} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
