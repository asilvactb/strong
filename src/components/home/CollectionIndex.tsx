"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, COVERS } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Lines from "../Lines";


export default function CollectionIndex({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [hover, setHover] = useState<number | null>(null);
  const prev = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = pos.current;
      p.cx += (p.x - p.cx) * 0.12;
      p.cy += (p.y - p.cy) * 0.12;
      if (prev.current) prev.current.style.transform = `translate3d(${p.cx}px,${p.cy}px,0) translate(-50%,-50%) rotate(${(p.x - p.cx) * 0.03}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative bg-paper pb-[22vh]" data-theme="light" onPointerMove={(e) => ((pos.current.x = e.clientX), (pos.current.y = e.clientY))}>
      <div className="gut mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="lbl mb-6 rv">01 — {t.collection.label}</p>
          <Lines className="display text-[clamp(44px,7vw,120px)]" lines={t.collection.title.split(", ").map((s, i, a) => (i < a.length - 1 ? s + "," : s))} greyLast />
        </div>
        <Link href={`/${locale}/produtos`} className="pill ghost rv self-start md:self-auto">
          <span className="sw">
            <span>{t.product.all}</span>
            <span>{t.product.all}</span>
          </span>
          →
        </Link>
      </div>

      <ul className="gut" onPointerLeave={() => setHover(null)}>
        {CATEGORIES.map((c, i) => {
          const species = new Set(c.variants.map((v) => v.species)).size;
          return (
            <li key={c.id} className="rv border-t border-[var(--line)] last:border-b" style={{ ["--d" as string]: `${i * 60}ms` }}>
              <Link
                href={`/${locale}/produtos/${c.id}`}
                onPointerEnter={() => setHover(i)}
                className="group grid grid-cols-12 items-center gap-4 py-7 transition-[opacity,padding] duration-500 md:py-9"
                style={{ opacity: hover === null || hover === i ? 1 : 0.28 }}
                data-cursor="ver"
              >
                <span className="lbl col-span-2 md:col-span-1">{c.index}</span>
                <span className="col-span-10 text-[clamp(30px,4.4vw,72px)] font-medium leading-none tracking-[-0.045em] transition-transform duration-700 group-hover:translate-x-3 md:col-span-6" style={{ transitionTimingFunction: "var(--expo)" }}>
                  {c.name[locale]}
                </span>
                <span className="lbl col-span-5 col-start-3 md:col-span-2 md:col-start-auto">
                  {c.build === "underlay" ? t.product.underlay : `${species} ${t.collection.species}`}
                </span>
                <span className="lbl col-span-3 md:col-span-2">
                  {c.variants.length} {t.collection.variants}
                </span>
                <span className="col-span-2 flex justify-end md:col-span-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                    →
                  </span>
                </span>
                <span className="relative col-span-12 mt-2 block aspect-[16/9] overflow-hidden rounded-lg md:hidden">
                  <Image src={COVERS[c.id]} alt="" fill sizes="100vw" className="object-cover" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        ref={prev}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[340px] w-[260px] overflow-hidden rounded-xl transition-[opacity,scale] duration-500 md:block"
        style={{ opacity: hover === null ? 0 : 1, scale: hover === null ? "0.6" : "1", transitionTimingFunction: "var(--expo)" }}
      >
        {CATEGORIES.map((c, i) => (
          <Image
            key={c.id}
            src={COVERS[c.id]}
            alt=""
            fill
            sizes="260px"
            className="object-cover transition-[opacity,transform] duration-700"
            style={{ opacity: hover === i ? 1 : 0, transform: hover === i ? "scale(1)" : "scale(1.2)" }}
          />
        ))}
      </div>
    </section>
  );
}
