"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMGS = ["/img/forest.jpg", "/textures/carvalho.jpg", "/img/factory.jpg", "/img/section.jpg", "/img/hero-deck.jpg"];

/** Sticky horizontal scroll through the process steps. */
export default function Process({ label, title, steps }: { label: string; title: string; steps: { t: string; d: string }[] }) {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sec.current!;
      const r = el.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      setP(prog);
      const tr = track.current!;
      const max = tr.scrollWidth - window.innerWidth;
      tr.style.transform = `translate3d(${-prog * max}px,0,0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sec} className="relative h-[340vh] bg-paper-2" data-theme="light">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="gut mb-10 flex items-end justify-between">
          <div>
            <p className="lbl mb-5">05 — {label}</p>
            <h2 className="display text-[clamp(40px,6vw,104px)]">{title}</h2>
          </div>
          <p className="lbl tab hidden md:block">
            {String(Math.min(steps.length, Math.floor(p * steps.length) + 1)).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
        </div>
        <div ref={track} className="flex w-max gap-5 pl-[var(--gut)] pr-[var(--gut)] will-change-transform">
          {steps.map((s, i) => (
            <article key={s.t} className="flex w-[78vw] shrink-0 flex-col gap-5 md:w-[36vw]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-dark">
                <Image src={IMGS[i]} alt="" fill sizes="(min-width:768px) 36vw, 78vw" className="object-cover" />
                <span className="lbl absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1.5 text-ink backdrop-blur">0{i + 1}</span>
              </div>
              <div className="flex gap-6">
                <h3 className="w-[38%] shrink-0 text-[clamp(22px,2vw,32px)] font-medium tracking-[-0.035em]">{s.t}</h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{s.d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="gut mt-10">
          <div className="h-px w-full bg-[var(--line)]">
            <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${p})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
