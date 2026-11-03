"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ShowItem } from "./ShowcaseCanvas";

const ShowcaseCanvas = dynamic(() => import("./ShowcaseCanvas"), { ssr: false });

export type ShowcaseEntry = ShowItem & {
  key: string;
  name: string; // giant word
  tag: string; // left tag (e.g. line or category)
  title: string; // full product name
  meta: { k: string; v: string }[];
  href: string;
};

function lum(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
function mix(hex: string, to: number, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((x) => Math.round(x + (to - x) * k));
  return `rgb(${c.join(",")})`;
}

/** Pinned, scroll-driven product carousel: one product at a time, tossed in and out. */
export default function Showcase({ items, label, cta, index = "03" }: { items: ShowcaseEntry[]; label: string; cta: string; index?: string }) {
  const sec = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const word = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mob, setMob] = useState(1);

  useEffect(() => {
    setMob(window.innerWidth < 768 ? 2.3 : 1.3);
    const el = sec.current!;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "300px" });
    io.observe(el);
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / span));
      // float index, with a small lead-in so item 0 is already in place when pinned
      const f = Math.min(items.length - 0.26, 0.2 + p * (items.length - 0.46));
      progress.current = f;
      const a = Math.min(items.length - 1, Math.max(0, Math.floor(f + 0.12)));
      setActive(a);
      if (word.current) {
        const local = f - Math.floor(f);
        word.current.style.transform = `translate3d(${(0.5 - local) * 18}vw,0,0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  const it = items[active];
  const dark = lum(it.tone) < 0.58;
  const ink = dark ? "#f3efe6" : "#14130f";
  const bg = mix(it.tone, dark ? 0 : 255, dark ? 0.08 : 0.25);
  const giant = mix(it.tone, 255, dark ? 0.32 : 0.45);

  return (
    <section
      ref={sec}
      className="relative"
      style={{ height: `${items.length * 85 + 40}vh` }}
      data-theme={dark ? "dark" : "light"}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden transition-colors duration-700" style={{ background: bg, color: ink, transitionTimingFunction: "var(--ease)" }}>
        {/* giant word */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none">
          <div ref={word} className="will-change-transform">
            <p
              key={it.key}
              className="whitespace-nowrap text-center font-medium uppercase leading-[0.8] tracking-[-0.06em] transition-colors duration-700"
              style={{ fontSize: `clamp(120px, ${Math.min(30, 210 / Math.max(4, it.name.length))}vw, 520px)`, color: giant, animation: "giant .9s var(--expo) both" }}
            >
              {it.name}
            </p>
          </div>
        </div>

        {/* 3D */}
        <div className="absolute inset-0">{visible && <ShowcaseCanvas items={items} progressRef={progress} active={active} dist={mob} />}</div>

        {/* top row */}
        <div className="gut absolute inset-x-0 top-[96px] flex justify-between">
          <p className="lbl" style={{ color: ink, opacity: 0.7 }}>
            {index} — {label}
          </p>
          <p className="lbl tab" style={{ color: ink, opacity: 0.7 }}>
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>

        {/* left tag */}
        <div key={"t" + it.key} className="absolute left-[var(--gut)] top-[38%] hidden md:block" style={{ animation: "rise .8s var(--expo) both" }}>
          <span className="inline-block -rotate-6 rounded-[4px] px-4 py-2 font-mono text-[12px] uppercase tracking-[0.16em]" style={{ background: ink, color: bg }}>
            {it.tag}
          </span>
        </div>

        {/* right badge */}
        <Link
          href={it.href}
          className="group absolute right-[var(--gut)] top-[34%] hidden h-[112px] w-[112px] items-center justify-center rounded-full border md:flex"
          style={{ borderColor: ink, color: ink }}
          data-cursor
        >
          <svg viewBox="0 0 112 112" className="absolute inset-0 h-full w-full" style={{ animation: "spin 14s linear infinite" }} aria-hidden>
            <defs>
              <path id="circ" d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
            </defs>
            <text fill="currentColor" style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              <textPath href="#circ">{`${cta} · ${cta} · `}</textPath>
            </text>
          </svg>
          <span className="text-xl transition-transform duration-500 group-hover:-rotate-45">→</span>
        </Link>

        {/* bottom spec */}
        <div className="gut absolute inset-x-0 bottom-0 pb-7 md:pb-9">
          <div key={"b" + it.key} className="flex flex-col gap-5 border-t pt-5 md:flex-row md:items-end md:justify-between" style={{ borderColor: dark ? "rgba(243,239,230,.2)" : "rgba(20,19,15,.15)", animation: "rise .8s var(--expo) both" }}>
            <div>
              <p className="text-[clamp(24px,2.6vw,42px)] font-medium leading-none tracking-[-0.04em]">{it.title}</p>
              <Link href={it.href} className="lbl mt-3 inline-block md:hidden" style={{ color: ink }}>
                {cta} →
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-2 md:flex md:gap-10">
              {it.meta.map((m) => (
                <div key={m.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ opacity: 0.6 }}>
                    {m.k}
                  </dt>
                  <dd className="tab mt-1 text-[14px]">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-5 flex gap-1">
            {items.map((x, i) => (
              <span key={x.key} className="h-[2px] flex-1 transition-opacity duration-500" style={{ background: ink, opacity: i === active ? 0.9 : 0.18 }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
