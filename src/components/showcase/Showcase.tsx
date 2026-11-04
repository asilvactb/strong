"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ShowItem } from "./ShowcaseCanvas";

const ShowcaseCanvas = dynamic(() => import("./ShowcaseCanvas"), { ssr: false });

export type ShowcaseEntry = ShowItem & {
  key: string;
  name: string;
  tag: string; // left tag (e.g. line or category)
  title: string; // full product name
  meta: { k: string; v: string }[];
  href: string;
  shot?: string; // photographic studio shot; falls back to the 3D plank when missing
};

const BG = "#f1efea";
const INK = "#14130f";
// feather only the outer few percent so the shot melts into the studio paper
const EDGE =
  "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)";

/** Enter from below spinning, settle, get tossed up and out — driven by a float index. */
function pose(t: number) {
  if (t < -0.5 || t > 1.5) return null;
  let y = 0, r = 0, s = 1, o = 1;
  if (t < 0.1) {
    const k = smooth((t + 0.5) / 0.6);
    y = (1 - k) * 85;
    r = (1 - k) * 28;
    s = 0.82 + 0.18 * k;
    o = Math.min(1, k * 2);
  } else if (t > 0.75) {
    const k = smooth((t - 0.75) / 0.75);
    y = -k * 95;
    r = -k * 34;
    s = 1 - 0.18 * k;
    o = 1 - Math.max(0, k - 0.6) * 2.5;
  } else {
    const k = (t - 0.1) / 0.65;
    y = (0.5 - k) * 3;
    r = (k - 0.5) * -3;
  }
  return { y, r, s, o };
}
const smooth = (x: number) => {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
};

/** Pinned, scroll-driven product carousel on a white studio backdrop. */
export default function Showcase({ items, label, cta, index = "03" }: { items: ShowcaseEntry[]; label: string; cta: string; index?: string }) {
  const sec = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const apply = useRef<() => void>(() => {});
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mob, setMob] = useState(1);
  const photographic = items.every((i) => i.shot);

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
      const f = Math.min(items.length - 0.26, 0.2 + p * (items.length - 0.46));
      progress.current = f;
      setActive(Math.min(items.length - 1, Math.max(0, Math.floor(f + 0.12))));
      layers.current.forEach((l, i) => {
        if (!l) return;
        const ps = pose(f - i);
        if (!ps) {
          l.style.visibility = "hidden";
          return;
        }
        l.style.visibility = "visible";
        l.style.opacity = String(ps.o);
        l.style.transform = `translate3d(0,${ps.y}vh,0) rotate(${ps.r}deg) scale(${ps.s})`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    apply.current = update;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  // layers mounted after an index change need their pose applied straight away
  useEffect(() => {
    apply.current();
  }, [active]);

  const it = items[active];

  return (
    <section ref={sec} className="relative" style={{ height: `${items.length * 85 + 40}vh` }} data-theme="light">
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ background: BG, color: INK }}>

        {/* product */}
        {photographic ? (
          <div className="absolute inset-x-0 top-[10%] bottom-[22%] md:top-[8%] md:bottom-[18%]">
            {items.map((x, i) =>
              Math.abs(i - active) > 2 ? null : (
                <div
                  key={x.key}
                  ref={(o) => void (layers.current[i] = o)}
                  className="absolute inset-0 will-change-transform"
                  style={{ visibility: "hidden" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="relative aspect-[16/9] w-[min(100%,calc(70svh*16/9))]"
                      style={{
                        maskImage: EDGE,
                        WebkitMaskImage: EDGE,
                        maskComposite: "intersect",
                        WebkitMaskComposite: "source-in",
                      }}
                    >
                      <Image src={x.shot!} alt={x.title} fill sizes="(min-width:768px) 125svh, 100vw" className="object-cover" priority={i < 2} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="absolute inset-0">{visible && <ShowcaseCanvas items={items} progressRef={progress} active={active} dist={mob} />}</div>
        )}

        {/* top row */}
        <div className="gut absolute inset-x-0 top-[96px] flex justify-between">
          <p className="lbl" style={{ color: INK, opacity: 0.7 }}>
            {index} — {label}
          </p>
          <p className="lbl tab" style={{ color: INK, opacity: 0.7 }}>
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>

        {/* left tag */}
        <div key={"t" + it.key} className="absolute left-[var(--gut)] top-[30%] hidden md:block" style={{ animation: "rise .8s var(--expo) both" }}>
          <span className="inline-block -rotate-6 rounded-[4px] px-4 py-2 font-mono text-[12px] uppercase tracking-[0.16em]" style={{ background: INK, color: BG }}>
            {it.tag}
          </span>
        </div>

        {/* right badge */}
        <Link
          href={it.href}
          className="group absolute right-[var(--gut)] top-[28%] hidden h-[112px] w-[112px] items-center justify-center rounded-full border md:flex"
          style={{ borderColor: INK, color: INK }}
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
          <div key={"b" + it.key} className="flex flex-col gap-5 border-t pt-5 md:flex-row md:items-end md:justify-between" style={{ borderColor: "rgba(20,19,15,.15)", animation: "rise .8s var(--expo) both" }}>
            <div>
              <p className="text-[clamp(24px,2.6vw,42px)] font-medium leading-none tracking-[-0.04em]">{it.title}</p>
              <Link href={it.href} className="lbl mt-3 inline-block md:hidden" style={{ color: INK }}>
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
              <span key={x.key} className="h-[2px] flex-1 transition-opacity duration-500" style={{ background: INK, opacity: i === active ? 0.9 : 0.18 }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
