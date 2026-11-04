"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Locale, SpeciesId } from "@/data/catalog";
import { SPECIES, variantLabel } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import type { Finish } from "../three/Plank";

const Stage = dynamic(() => import("../three/Stage"), { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-dark-2" /> });

const FIN_KEYS: Finish[] = ["cru", "verniz", "oleo", "velatura"];

export default function Configurator({ cat, locale, photos }: { cat: Category; locale: Locale; photos: string[] }) {
  const t = getDict(locale);
  const sp = useSearchParams();
  const speciesList = useMemo(() => Array.from(new Set(cat.variants.map((v) => v.species))), [cat]);
  const initial = (sp.get("especie") as SpeciesId) ?? speciesList[0];
  const [species, setSpecies] = useState<SpeciesId>(speciesList.includes(initial) ? initial : speciesList[0]);
  const forSpecies = cat.variants.filter((v) => v.species === species);
  const [slug, setSlug] = useState(forSpecies[0].slug);
  const variant = cat.variants.find((v) => v.slug === slug) ?? forSpecies[0];
  const [width, setWidth] = useState(variant.widths[variant.widths.length - 1] ?? 0);
  const [thick, setThick] = useState(variant.thicknesses[variant.thicknesses.length - 1] ?? 0);
  const [finIdx, setFinIdx] = useState(0);
  const [explode, setExplode] = useState(false);
  const [view, setView] = useState<"3d" | "photo">("3d");

  const [mob, setMob] = useState(1);
  useEffect(() => setMob(window.innerWidth < 768 ? 1.7 : 1), []);
  const isUnderlay = cat.build === "underlay";
  const isDeck = cat.build === "deck";
  const canExplode = cat.build === "multilayer" || cat.build === "deck";

  // keep selections valid when species / variant changes
  useEffect(() => {
    const v = cat.variants.find((x) => x.slug === slug && x.species === species) ?? cat.variants.find((x) => x.species === species)!;
    if (v.slug !== slug) setSlug(v.slug);
    if (!v.widths.includes(width)) setWidth(v.widths[v.widths.length - 1] ?? 0);
    if (!v.thicknesses.includes(thick)) setThick(v.thicknesses[v.thicknesses.length - 1] ?? 0);
  }, [species, slug, cat, width, thick]);

  const hasPhoto = photos.includes(variant.slug);
  useEffect(() => {
    if (!hasPhoto && view === "photo") setView("3d");
  }, [hasPhoto, view]);

  const s = SPECIES[species];
  const finishName = cat.finishes[finIdx]?.[locale];
  const label = isUnderlay ? variantLabel(variant) : variantLabel(variant);
  const summary = [label, variant.widths.length ? `${width} × ${thick} mm` : variant.thicknesses.length ? `${thick} mm` : "", finishName]
    .filter(Boolean)
    .join(" · ");

  const underlayKind = variant.slug.includes("cortica") ? "cork" : variant.slug.includes("aluminio") ? "alu" : variant.slug.includes("hd") ? "hd" : "foam";
  const plankFinish: Finish = cat.build === "multilayer" ? FIN_KEYS[finIdx] : cat.build === "solid" ? (finIdx === 1 ? "verniz" : "cru") : cat.build === "triplex" ? (finIdx === 1 ? "oleo" : "cru") : cat.build === "skirting" ? (finIdx === 0 ? "verniz" : "cru") : "oleo";

  return (
    <section className="dark bg-dark text-bone" data-theme="dark" id="configurar">
      <div className="grid min-h-[100svh] lg:grid-cols-[1fr_440px]">
        {/* Stage */}
        <div className="relative h-[62svh] overflow-hidden lg:sticky lg:top-0 lg:h-[100svh]">
          <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: view === "3d" ? 1 : 0 }}>
            <Stage
              className="h-full w-full"
              dist={(cat.build === "underlay" ? 1.6 : cat.build === "skirting" ? 1.1 : 1.5) * mob}
              plank={{
                build: cat.build,
                texture: s.texture,
                tone: s.tone,
                width: width || 120,
                thickness: thick || 20,
                explode: explode ? 1 : 0,
                finish: plankFinish,
                antiSlip: isDeck && finIdx === 1,
                underlay: underlayKind,
              }}
            />
          </div>
          {hasPhoto && (
            <div className="absolute inset-0 flex items-center justify-center p-10 pt-24 transition-opacity duration-700" style={{ opacity: view === "photo" ? 1 : 0, pointerEvents: view === "photo" ? "auto" : "none" }}>
              <div className="relative h-full w-full">
                <Image key={variant.slug} src={`/img/products/${cat.id}/${variant.slug}.jpg`} alt={label} fill sizes="60vw" className="object-contain" />
              </div>
            </div>
          )}

          <div className="gut pointer-events-none absolute inset-x-0 top-[96px] flex justify-between">
            <p className="lbl">{t.product.selected}</p>
            {view === "3d" && !isUnderlay && <p className="lbl">{t.product.drag} ↻</p>}
          </div>
          <div className="gut absolute inset-x-0 bottom-6 flex flex-wrap items-end justify-between gap-4">
            <div key={summary} style={{ animation: "rise .7s var(--expo) both" }}>
              <p className="text-[clamp(24px,2.8vw,44px)] font-medium leading-none tracking-[-0.04em]">{label}</p>
              <p className="lbl mt-3 text-bone-2">{summary.replace(label + " · ", "")}</p>
            </div>
            <div className="flex gap-2">
              <button className="chip" aria-pressed={view === "3d"} onClick={() => setView("3d")}>
                {t.product.model}
              </button>
              {hasPhoto && (
                <button className="chip" aria-pressed={view === "photo"} onClick={() => setView("photo")}>
                  {t.product.photo}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <aside className="gut border-t border-[var(--dline)] py-10 lg:border-l lg:border-t-0 lg:px-10 lg:pt-[120px]">
          <p className="lbl mb-8">{t.product.configure} · {cat.name[locale]}</p>

          {!isUnderlay && (
            <Group title={t.product.species} value={s.name}>
              <div className="grid grid-cols-6 gap-2">
                {speciesList.map((id) => (
                  <button
                    key={id}
                    onClick={() => setSpecies(id)}
                    title={SPECIES[id].name}
                    aria-label={SPECIES[id].name}
                    aria-pressed={species === id}
                    className="relative aspect-square overflow-hidden rounded-full outline-offset-2 transition-transform duration-300 hover:scale-105 aria-pressed:outline aria-pressed:outline-1 aria-pressed:outline-bone"
                    style={{ backgroundImage: `url(${SPECIES[id].texture})`, backgroundSize: "cover", backgroundColor: SPECIES[id].tone }}
                  />
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-2">
                {s.latin}
              </p>
            </Group>
          )}

          {(forSpecies.length > 1 || isUnderlay) && (
            <Group title={isUnderlay ? t.product.underlay : t.product.line} value={isUnderlay ? "" : variant.line ?? ""}>
              <div className="flex flex-wrap gap-2">
                {(isUnderlay ? cat.variants : forSpecies).map((v) => (
                  <button key={v.slug} className="chip" aria-pressed={v.slug === variant.slug} onClick={() => setSlug(v.slug)}>
                    {isUnderlay ? variantLabel(v) : v.line ?? variantLabel(v).replace(/ · .*/, "")}
                  </button>
                ))}
              </div>
            </Group>
          )}

          {variant.widths.length > 0 && (
            <Group title={cat.build === "skirting" ? `${t.product.width} (h)` : t.product.width} value={`${width} mm`}>
              <div className="flex flex-wrap gap-2">
                {variant.widths.map((w) => (
                  <button key={w} className="chip tab" aria-pressed={w === width} onClick={() => setWidth(w)}>
                    {w}
                  </button>
                ))}
              </div>
              <Bar v={width} max={cat.build === "skirting" ? 100 : 240} />
            </Group>
          )}

          {variant.thicknesses.length > 0 && (
            <Group title={t.product.thickness} value={`${thick} mm`}>
              <div className="flex flex-wrap gap-2">
                {variant.thicknesses.map((x) => (
                  <button key={x} className="chip tab" aria-pressed={x === thick} onClick={() => setThick(x)}>
                    {x}
                  </button>
                ))}
              </div>
            </Group>
          )}

          {cat.finishes.length > 0 && (
            <Group title={isDeck ? t.product.profile : t.product.finish} value={finishName ?? ""}>
              <div className="flex flex-wrap gap-2">
                {cat.finishes.map((f, i) => (
                  <button key={f.pt} className="chip" aria-pressed={i === finIdx} onClick={() => setFinIdx(i)}>
                    {f[locale]}
                  </button>
                ))}
              </div>
            </Group>
          )}

          {(variant.use || variant.lengths || variant.note) && (
            <Group title={t.product.specs} value="">
              <dl className="grid grid-cols-2 gap-y-2 text-sm text-bone-2">
                {variant.use && (
                  <>
                    <dt>{t.product.use}</dt>
                    <dd className="text-bone">{variant.use.map((u) => t.product[u]).join(" · ")}</dd>
                  </>
                )}
                {variant.lengths && (
                  <>
                    <dt>{t.product.length}</dt>
                    <dd className="text-bone">{variant.lengths} mm</dd>
                  </>
                )}
                {variant.note && (
                  <>
                    <dt>—</dt>
                    <dd className="text-bone">{variant.note[locale]}</dd>
                  </>
                )}
              </dl>
            </Group>
          )}

          {canExplode && (
            <label className="mt-2 flex cursor-pointer items-center justify-between border-t border-[var(--dline)] py-5">
              <span className="lbl text-bone">{t.product.explode}</span>
              <button
                role="switch"
                aria-checked={explode}
                onClick={() => setExplode((e) => !e)}
                className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${explode ? "bg-accent-hi" : "bg-dark-3"}`}
              >
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-bone transition-transform duration-500 ${explode ? "translate-x-6" : "translate-x-1"}`} style={{ transitionTimingFunction: "var(--expo)" }} />
              </button>
            </label>
          )}

          <Link href={`/${locale}/contactos?produto=${encodeURIComponent(`${cat.name[locale]} — ${summary}`)}`} className="pill mt-6 w-full justify-between">
            <span className="sw">
              <span>{t.product.request}</span>
              <span>{t.product.request}</span>
            </span>
            <span aria-hidden>↗</span>
          </Link>
          {!isUnderlay && <p className="mt-5 text-xs leading-relaxed text-bone-2/70">{t.product.texNote}</p>}
        </aside>
      </div>
    </section>
  );
}

function Group({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--dline)] py-6">
      <div className="mb-4 flex justify-between">
        <span className="lbl">{title}</span>
        <span className="lbl tab text-bone">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Bar({ v, max }: { v: number; max: number }) {
  return (
    <div className="mt-4 h-px w-full bg-[var(--dline)]">
      <div className="h-px bg-bone transition-[width] duration-700" style={{ width: `${(v / max) * 100}%`, transitionTimingFunction: "var(--expo)" }} />
    </div>
  );
}
