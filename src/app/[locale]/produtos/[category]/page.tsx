import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, COVERS, SPECIES, getCategory, variantLabel } from "@/data/catalog";
import { getDict, LOCALES } from "@/i18n/dict";
import Lines from "@/components/Lines";
import Configurator from "@/components/product/Configurator";
import Showcase from "@/components/showcase/Showcase";
import { categoryShowcase } from "@/lib/showcase";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => CATEGORIES.map((c) => ({ locale, category: c.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params;
  const c = getCategory(category);
  return c ? { title: c.name[locale], description: c.lead[locale] } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: Locale; category: string }> }) {
  const { locale, category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const t = getDict(locale);
  const dir = path.join(process.cwd(), "public/img/products", cat.id);
  const photos = fs.existsSync(dir) ? fs.readdirSync(dir).map((f) => f.replace(/\.jpg$/, "")) : [];
  const idx = CATEGORIES.findIndex((c) => c.id === cat.id);
  const next = CATEGORIES[(idx + 1) % CATEGORIES.length];
  const words = cat.name[locale].split(" ");

  return (
    <>
      <section className="dark relative overflow-hidden bg-dark text-bone" data-theme="dark">
        <div className="absolute inset-0">
          <Image src={COVERS[cat.id]} alt="" fill priority sizes="100vw" className="object-cover opacity-35" style={{ animation: "kenburns 12s var(--ease) forwards" }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,.6),rgba(12,11,9,.3)_40%,rgba(12,11,9,1))]" />
        </div>
        <div className="grain pointer-events-none absolute inset-0 overflow-hidden" />
        <div className="gut relative flex min-h-[86svh] flex-col justify-end pb-16 pt-40">
          <div className="mb-10 flex justify-between">
            <Link href={`/${locale}/produtos`} className="lbl ulink text-bone-2">
              ← {t.nav.products}
            </Link>
            <p className="lbl tab text-bone-2">{cat.index} / 06</p>
          </div>
          <Lines as="h1" immediate delay={150} className="display text-[clamp(52px,10vw,184px)] uppercase" lines={words.length > 1 ? [words[0], words.slice(1).join(" ")] : words} greyLast={words.length > 1} />
          <div className="mt-12 grid gap-10 border-t border-[var(--dline)] pt-8 md:grid-cols-12">
            <p className="rv text-[clamp(18px,1.6vw,24px)] leading-snug tracking-[-0.02em] md:col-span-6">{cat.lead[locale]}</p>
            <ul className="md:col-span-4 md:col-start-9">
              {cat.construction.map((c, i) => (
                <li key={c.pt} className="rv flex gap-4 border-b border-[var(--dline)] py-3 text-sm text-bone-2" style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <span className="lbl text-accent-hi">0{i + 1}</span>
                  {c[locale]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {cat.build !== "underlay" && <Showcase items={categoryShowcase(cat, locale)} label={cat.name[locale]} cta={t.product.configure} index={cat.index} />}

      <Suspense>
        <Configurator cat={cat} locale={locale} photos={photos} />
      </Suspense>

      <section className="gut bg-paper py-[16vh]" data-theme="light">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="display text-[clamp(36px,5vw,84px)]">{t.product.all}</h2>
          <p className="lbl">
            {cat.variants.length} {t.product.references}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="lbl border-b border-[var(--line)]">
                <th className="py-4 font-normal">#</th>
                <th className="py-4 font-normal">{cat.build === "underlay" ? t.product.underlay : t.product.species}</th>
                {cat.build !== "underlay" && <th className="py-4 font-normal">{t.product.width} (mm)</th>}
                <th className="py-4 font-normal">{t.product.thickness} (mm)</th>
                {cat.id === "triplex" && <th className="py-4 font-normal">{t.product.use}</th>}
                {cat.id === "rodape" && <th className="py-4 font-normal">{t.product.length} (mm)</th>}
                <th />
              </tr>
            </thead>
            <tbody>
              {cat.variants.map((v, i) => (
                <tr key={v.slug} className="group border-b border-[var(--line)] transition-colors hover:bg-paper-2">
                  <td className="lbl py-5 pr-4">{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-5 pr-4">
                    <span className="flex items-center gap-4">
                      {cat.build !== "underlay" && (
                        <span className="h-9 w-9 shrink-0 rounded-full bg-cover" style={{ backgroundImage: `url(${SPECIES[v.species].texture})` }} />
                      )}
                      <span className="text-[17px] font-medium tracking-[-0.02em]">{variantLabel(v)}</span>
                    </span>
                  </td>
                  {cat.build !== "underlay" && <td className="tab py-5 pr-4 text-ink-2">{v.widths.join(" · ")}</td>}
                  <td className="tab py-5 pr-4 text-ink-2">{v.thicknesses.join(" · ") || "—"}</td>
                  {cat.id === "triplex" && <td className="py-5 pr-4 text-ink-2">{v.use?.map((u) => t.product[u]).join(" · ")}</td>}
                  {cat.id === "rodape" && <td className="tab py-5 pr-4 text-ink-2">{v.lengths}</td>}
                  <td className="py-5 text-right">
                    {cat.build !== "underlay" && (
                      <Link href={`/${locale}/produtos/${cat.id}?especie=${v.species}#configurar`} className="lbl ulink text-ink">
                        {t.product.configure} →
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Link href={`/${locale}/produtos/${next.id}`} className="group relative block overflow-hidden bg-dark text-bone" data-theme="dark" data-cursor>
        <Image src={COVERS[next.id]} alt="" fill sizes="100vw" className="object-cover opacity-30 transition-transform duration-[1.6s] group-hover:scale-105" />
        <div className="gut relative flex min-h-[52svh] flex-col justify-between py-14">
          <p className="lbl">{t.product.next} · {next.index}</p>
          <p className="display flex items-end justify-between text-[clamp(44px,9vw,160px)] uppercase">
            {next.name[locale]}
            <span className="transition-transform duration-700 group-hover:translate-x-4">→</span>
          </p>
        </div>
      </Link>
    </>
  );
}
