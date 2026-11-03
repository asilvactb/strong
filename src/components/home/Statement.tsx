"use client";

import { useEffect, useRef } from "react";

/** Paragraph whose words light up as it scrolls through the viewport. */
export default function Statement({ text, keys, label }: { text: string; keys: string[]; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current!;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span[data-w]"));
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const n = Math.floor(p * spans.length * 1.05);
      spans.forEach((s, i) => (s.style.opacity = i < n ? "1" : "0.16"));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isKey = (w: string) => keys.some((k) => w.toLowerCase().replace(/[.,]/g, "") === k);

  return (
    <section className="gut bg-paper py-[22vh]" data-theme="light">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="lbl rv md:col-span-3">({label})</p>
        <p ref={ref} className="text-[clamp(26px,3.6vw,58px)] font-medium leading-[1.08] tracking-[-0.035em] md:col-span-9">
          {words.map((w, i) => (
            <span key={i} data-w className={`transition-opacity duration-300 ${isKey(w) ? "text-accent" : ""}`} style={{ opacity: 0.16 }}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
