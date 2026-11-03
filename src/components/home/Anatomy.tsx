"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, SPECIES } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import type { Finish } from "../three/Plank";

const Stage = dynamic(() => import("../three/Stage"), { ssr: false });

const FIN: Finish[] = ["cru", "verniz", "oleo", "velatura"];

export default function Anatomy({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const sec = useRef<HTMLElement>(null);
  const explode = useRef(0);
  const spin = useRef(0);
  const [step, setStep] = useState(0);
  const [fin, setFin] = useState<Finish>("cru");
  const [prog, setProg] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mob, setMob] = useState(1.25);
  useEffect(() => setMob(window.innerWidth < 768 ? 2.2 : 1.25), []);

  useEffect(() => {
    const el = sec.current!;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      setProg(p);
      const s = Math.min(3, Math.floor(p * 4));
      setStep(s);
      // explode opens over the first half, closes slightly at the end
      const e = p < 0.12 ? 0 : p < 0.5 ? (p - 0.12) / 0.38 : p < 0.8 ? 1 : 1 - (p - 0.8) * 1.5;
      explode.current = Math.max(0, e);
      spin.current = -0.4 + p * Math.PI * 0.9;
      if (s === 3) setFin(FIN[Math.min(3, Math.floor(((p - 0.75) / 0.25) * 4))]);
      else setFin("cru");
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const s = t.anatomy.steps[step];

  return (
    <section ref={sec} className="dark relative h-[420vh] bg-dark text-bone" data-theme="dark">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="gut absolute inset-x-0 top-[96px] z-10 flex items-start justify-between">
          <div>
            <p className="lbl mb-5">02 — {t.anatomy.label}</p>
            <h2 className="display max-w-[12ch] text-[clamp(36px,5vw,84px)]">{t.anatomy.title}</h2>
          </div>
          <p className="lbl tab hidden md:block">
            {String(step + 1).padStart(2, "0")} / 04
          </p>
        </div>

        <div className="absolute inset-0">
          {visible && (
            <Stage
              className="h-full w-full"
              interactive={false}
              spinRef={spin}
              dist={mob}
              offset={[0, -0.2, 0]}
              plank={{
                build: "multilayer",
                texture: SPECIES.carvalho.texture,
                tone: SPECIES.carvalho.tone,
                width: 220,
                thickness: 20,
                length: 640,
                explodeRef: explode,
                finish: fin,
              }}
            />
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,.85)_0%,rgba(12,11,9,0)_30%,rgba(12,11,9,0)_60%,rgba(12,11,9,.9)_100%)]" />
        <div className="gut absolute inset-x-0 bottom-10 z-10 flex flex-col gap-6 md:bottom-14 md:flex-row md:items-end md:justify-between">
          <div key={step} className="max-w-[440px]" style={{ animation: "rise .9s var(--expo) both" }}>
            <p className="lbl mb-3 text-accent-hi">
              {String(step + 1).padStart(2, "0")} — {s.t}
            </p>
            <p className="text-[clamp(20px,2vw,28px)] leading-[1.2] tracking-[-0.02em] text-bone">{s.d}</p>
            {step === 3 && <p className="lbl mt-4 text-bone-2">{t.product.finish} · {CATEGORIES[0].finishes[FIN.indexOf(fin)][locale]}</p>}
          </div>
          <span
            className="hidden text-[clamp(120px,16vw,260px)] font-medium leading-[0.8] tracking-[-0.06em] text-transparent md:block"
            style={{ WebkitTextStroke: "1px rgba(233,229,219,.35)" }}
          >
            0{step + 1}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--dline)]">
          <div className="h-full origin-left bg-accent-hi" style={{ transform: `scaleX(${prog})` }} />
        </div>
      </div>
    </section>
  );
}
