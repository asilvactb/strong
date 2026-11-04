import type { Category, Locale, SpeciesId } from "@/data/catalog";
import { CATEGORIES, SPECIES, variantLabel } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import type { ShowcaseEntry } from "@/components/showcase/Showcase";

const range = (xs: number[]) => {
  const u = Array.from(new Set(xs)).sort((a, b) => a - b);
  return u.length === 0 ? "—" : u.length === 1 ? `${u[0]} mm` : `${u[0]}–${u[u.length - 1]} mm`;
};

/** One entry per species, aggregated across every product line that offers it. */
export function speciesShowcase(locale: Locale): ShowcaseEntry[] {
  const t = getDict(locale);
  return (Object.keys(SPECIES) as SpeciesId[])
    .filter((id) => id !== "carvalho-homogeneo")
    .map((id) => {
      const s = SPECIES[id];
      const cats = CATEGORIES.filter((c) => c.build !== "underlay" && c.variants.some((v) => v.species === id));
      const vs = cats.flatMap((c) => c.variants.filter((v) => v.species === id && c.build !== "skirting"));
      const first = cats.find((c) => c.build !== "skirting") ?? cats[0];
      return {
        key: id,
        name: s.name,
        tag: cats.map((c) => c.short[locale]).join(" · "),
        title: `${s.name} · ${s.latin}`,
        meta: [
          { k: t.nav.products, v: cats.map((c) => c.short[locale]).join(" · ") },
          { k: t.product.width, v: range(vs.flatMap((v) => v.widths)) },
          { k: t.product.thickness, v: range(vs.flatMap((v) => v.thicknesses)) },
        ],
        href: `/${locale}/produtos/${first.id}?especie=${id}#configurar`,
        texture: s.texture,
        tone: s.tone,
        width: 185,
        thickness: 20,
        build: first.build === "deck" ? "deck" : "multilayer",
      };
    });
}

/** One entry per reference in a category. */
export function categoryShowcase(cat: Category, locale: Locale): ShowcaseEntry[] {
  const t = getDict(locale);
  return cat.variants.map((v) => {
    const s = SPECIES[v.species];
    const meta = [
      { k: t.product.width, v: v.widths.join(" · ") + " mm" },
      { k: t.product.thickness, v: v.thicknesses.join(" · ") + " mm" },
    ];
    if (v.use) meta.push({ k: t.product.use, v: v.use.map((u) => t.product[u]).join(" · ") });
    if (v.lengths) meta.push({ k: t.product.length, v: `${v.lengths} mm` });
    if (!v.use && !v.lengths && cat.finishes.length) meta.push({ k: cat.build === "deck" ? t.product.profile : t.product.finish, v: cat.finishes.map((f) => f[locale]).join(" · ") });
    return {
      key: v.slug,
      name: s.name,
      tag: v.line ?? (v.note ? v.note[locale] : cat.short[locale]),
      title: variantLabel(v),
      meta,
      href: `/${locale}/produtos/${cat.id}?especie=${v.species}#configurar`,
      texture: s.texture,
      tone: s.tone,
      width: Math.max(...v.widths),
      thickness: Math.max(...v.thicknesses),
      build: cat.build,
    };
  });
}
