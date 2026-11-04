"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, SPECIES } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Lines from "../Lines";

function Tile({ id, locale, i }: { id: keyof typeof SPECIES; locale: Locale; i: number }) {
  const s = SPECIES[id];
  const loupe = useRef<HTMLSpanElement>(null);
  const cat = CATEGORIES.find((c) => c.build !== "skirting" && c.variants.some((v) => v.species === id))!;
  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const l = loupe.current!;
    l.style.transform = `translate3d(${x - 90}px,${y - 90}px,0)`;
    l.style.backgroundPosition = `${(x / r.width) * 100}% ${(y / r.height) * 100}%`;
  };
  return (
    <Link
      href={`/${locale}/produtos/${cat.id}?especie=${id}`}
      onPointerMove={move}
      className="group rv relative block aspect-[3/4] overflow-hidden rounded-[10px] bg-dark-2"
      style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}
      data-cursor
    >
      <span
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] group-hover:scale-[1.06]"
        style={{ backgroundImage: `url(${s.texture})`, transitionTimingFunction: "var(--expo)" }}
      />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,0)_45%,rgba(12,11,9,.78)_100%)]" />
      <span
        ref={loupe}
        className="pointer-events-none absolute left-0 top-0 hidden h-[180px] w-[180px] rounded-full opacity-0 shadow-[0_0_0_1px_rgba(233,229,219,.5)] transition-opacity duration-300 group-hover:opacity-100 md:block"
        style={{ backgroundImage: `url(${s.texture})`, backgroundSize: "420%" }}
      />
      <span className="lbl absolute left-4 top-4 text-bone/80">{String(i + 1).padStart(2, "0")}</span>
      <span className="absolute inset-x-4 bottom-4 text-bone">
        <span className="block text-[clamp(18px,1.7vw,26px)] font-medium tracking-[-0.03em]">{s.name}</span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-bone-2">
          <i className="not-italic">{s.latin}</i>
        </span>
      </span>
    </Link>
  );
}

export default function SpeciesWall({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const ids = (Object.keys(SPECIES) as (keyof typeof SPECIES)[]).filter((k) => k !== "carvalho-homogeneo");
  return (
    <section className="dark gut bg-dark py-[20vh] text-bone" data-theme="dark">
      <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="lbl mb-6 rv">03 — {t.species.label}</p>
          <Lines className="display text-[clamp(40px,6vw,104px)]" lines={t.species.title.split(". ").map((x, i, a) => (i < a.length - 1 ? x + "." : x))} greyLast />
        </div>
        <p className="lbl rv md:col-span-4 md:text-right">{t.species.hint} ↘</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {ids.map((id, i) => (
          <Tile key={id} id={id} locale={locale} i={i} />
        ))}
      </div>
    </section>
  );
}
