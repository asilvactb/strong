"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, COVERS } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Lines from "../Lines";

/** Index of product lines. On hover a row opens a full-width image band beneath it. */
export default function CollectionIndex({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="relative bg-paper pb-[22vh]" data-theme="light">
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

      <div className="gut grid gap-10 md:grid-cols-12">
        <ul className="md:col-span-8" onPointerLeave={() => setHover(null)}>
          {CATEGORIES.map((c, i) => {
            const species = new Set(c.variants.map((v) => v.species)).size;
            return (
              <li key={c.id} className="rv border-t border-[var(--line)] last:border-b" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <Link href={`/${locale}/produtos/${c.id}`} onPointerEnter={() => setHover(i)} onFocus={() => setHover(i)} className="group block">
                  <span className="grid grid-cols-12 items-center gap-4 py-7 md:py-8">
                    <span className="lbl col-span-2 md:col-span-1">{c.index}</span>
                    <span
                      className="col-span-8 text-[clamp(30px,4vw,64px)] font-medium leading-none tracking-[-0.045em] transition-[color,transform] duration-500 md:col-span-7"
                      style={{ color: hover === null || hover === i ? "var(--ink)" : "rgba(20,19,15,.28)", transform: hover === i ? "translateX(12px)" : "none", transitionTimingFunction: "var(--expo)" }}
                    >
                      {c.name[locale]}
                    </span>
                    <span className="lbl col-span-3 hidden leading-relaxed md:block">
                      {c.build === "underlay" ? t.product.underlay : `${species} ${t.collection.species}`}
                      <br />
                      {c.variants.length} {t.collection.variants}
                    </span>
                    <span className="col-span-2 flex justify-end md:col-span-1">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${
                          hover === i ? "-rotate-45 border-accent bg-accent text-paper" : "border-[var(--line)]"
                        }`}
                      >
                        →
                      </span>
                    </span>
                  </span>
                  <span className="relative mb-7 block aspect-[16/9] overflow-hidden rounded-lg md:hidden">
                    <Image src={COVERS[c.id]} alt="" fill sizes="100vw" className="object-cover" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* desktop: fixed preview panel — never covers the list */}
        <div className="hidden md:col-span-4 md:block">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-paper-2">
              {CATEGORIES.map((c, i) => {
                const on = (hover ?? 0) === i;
                return (
                  <div
                    key={c.id}
                    className="absolute inset-0 transition-[clip-path] duration-[900ms]"
                    style={{ clipPath: on ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", zIndex: on ? 2 : 1, transitionTimingFunction: "var(--expo)" }}
                  >
                    <Image
                      src={COVERS[c.id]}
                      alt={c.name[locale]}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-[1.4s]"
                      style={{ transform: on ? "scale(1)" : "scale(1.15)", transitionTimingFunction: "var(--expo)" }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5 min-h-[72px]">
              <p key={hover ?? 0} className="text-[15px] leading-snug text-ink-2" style={{ animation: "rise .7s var(--expo) both" }}>
                {CATEGORIES[hover ?? 0].lead[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
