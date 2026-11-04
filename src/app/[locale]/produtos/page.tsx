import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, LINE_SHOTS } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Lines from "@/components/Lines";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.products };
}

const EDGE =
  "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)";

export default async function Products({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <section className="gut bg-[#f1efea] pb-[18vh] pt-[22vh]" data-theme="light">
      <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="lbl mb-6 rv">{t.nav.products}</p>
          <Lines as="h1" className="display text-[clamp(52px,9vw,160px)]" lines={t.collection.title.split(", ").map((s, i, a) => (i < a.length - 1 ? s + "," : s))} greyLast />
        </div>
        <p className="rv text-ink-2 md:col-span-4">{t.contactBlock.body}</p>
      </div>

      <div className="grid border-t border-[var(--line)] md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const species = new Set(c.variants.map((v) => v.species)).size;
          return (
            <Link
              key={c.id}
              href={`/${locale}/produtos/${c.id}`}
              className="group rv relative flex flex-col border-b border-[var(--line)] py-8 md:px-6 md:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l"
              style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
              data-cursor
            >
              <div className="flex items-start justify-between">
                <span className="lbl">{c.index}</span>
                <span className="lbl text-right">
                  {c.build === "underlay" ? t.product.underlay : `${species} ${t.collection.species}`}
                  <br />
                  {c.variants.length} {t.collection.variants}
                </span>
              </div>

              <div className="relative my-6 aspect-[16/10]" style={{ maskImage: EDGE, WebkitMaskImage: EDGE, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}>
                <Image
                  src={LINE_SHOTS[c.id]}
                  alt={c.name[locale]}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:-translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: "var(--expo)" }}
                />
              </div>

              <div className="mt-auto flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[clamp(26px,2.4vw,38px)] font-medium leading-none tracking-[-0.045em]">{c.name[locale]}</h2>
                  <p className="mt-3 max-w-[40ch] text-sm leading-snug text-ink-2">{c.lead[locale]}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
