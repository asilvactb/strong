"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/data/catalog";
import { SPECIES } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Lines from "../Lines";

const SLIDES = ["/img/hero-interior.jpg", "/img/hero-deck.jpg", "/img/gallery/curiti_nogueira_1.jpg"];

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [idx, setIdx] = useState(0);
  const [clock, setClock] = useState("");
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const f = () =>
      setClock(new Intl.DateTimeFormat("pt-PT", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Lisbon" }).format(new Date()));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = window.innerHeight;
        if (y > h * 1.2) return;
        if (media.current) media.current.style.transform = `translate3d(0,${y * 0.35}px,0)`;
        if (copy.current) {
          copy.current.style.transform = `translate3d(0,${-y * 0.15}px,0)`;
          copy.current.style.opacity = String(1 - Math.min(1, y / (h * 0.7)));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = Object.values(SPECIES)
    .filter((s) => s.id !== "carvalho-homogeneo")
    .map((s) => s.name);

  return (
    <section className="dark relative h-[100svh] min-h-[640px] overflow-hidden bg-dark text-bone" data-theme="dark">
      <div ref={media} className="absolute inset-0 will-change-transform">
        {SLIDES.map((s, i) => (
          <div key={s} className="absolute inset-0 transition-opacity duration-[1600ms]" style={{ opacity: i === idx ? 1 : 0 }}>
            <Image
              src={s}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ animation: i === idx ? "kenburns 9s var(--ease) forwards" : undefined }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,.55)_0%,rgba(12,11,9,.05)_35%,rgba(12,11,9,.15)_60%,rgba(12,11,9,.85)_100%)]" />
      </div>
      <div className="grain pointer-events-none absolute inset-0 overflow-hidden" />

      <div className="gut absolute inset-x-0 top-[96px] flex justify-between">
        <p className="lbl text-bone-2">{t.hero.meta}</p>
        <p className="lbl hidden text-bone-2 md:block">41.5619° N — 8.2209° W</p>
        <p className="lbl tab text-bone-2">LIS {clock}</p>
      </div>

      <div ref={copy} className="gut absolute inset-x-0 bottom-[120px] flex flex-col gap-10 md:bottom-[110px] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="lbl mb-6 flex items-center gap-3 text-bone-2">
            <span className="h-px w-8 bg-current" />
            {t.hero.kicker}
          </p>
          <Lines
            as="h1"
            immediate
            delay={350}
            greyLast
            className="display text-[clamp(56px,10.6vw,190px)]"
            lines={[t.hero.l1, t.hero.l2, t.hero.l3]}
          />
        </div>
        <div className="flex items-center gap-6 md:flex-col md:items-end">
          <div className="hidden gap-1.5 md:flex">
            {SLIDES.map((s, i) => (
              <button key={s} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} className="relative h-[2px] w-10 overflow-hidden bg-bone/25">
                <span
                  className="absolute inset-0 origin-left bg-bone"
                  style={{ transform: `scaleX(${i === idx ? 1 : 0})`, transition: i === idx ? "transform 7s linear" : "none" }}
                />
              </button>
            ))}
          </div>
          <Link href={`/${locale}/produtos`} className="pill">
            <span className="sw">
              <span>{t.nav.products}</span>
              <span>{t.nav.products}</span>
            </span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-[var(--dline)] bg-dark/40 py-4 backdrop-blur-md">
        <div className="flex w-max" style={{ animation: "marquee 60s linear infinite" }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {words.map((w) => (
                <span key={w + k} className="flex items-center font-mono text-[12px] uppercase tracking-[0.18em] text-bone-2">
                  <span className="px-6">{w}</span>
                  <span className="text-accent-hi">✱</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
