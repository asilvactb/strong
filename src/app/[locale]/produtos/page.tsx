import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, COVERS } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Lines from "@/components/Lines";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.products };
}

export default async function Products({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <section className="gut bg-paper pb-[18vh] pt-[22vh]" data-theme="light">
      <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="lbl mb-6 rv">{t.nav.products}</p>
          <Lines as="h1" className="display text-[clamp(52px,9vw,160px)]" lines={t.collection.title.split(", ").map((s, i, a) => (i < a.length - 1 ? s + "," : s))} greyLast />
        </div>
        <p className="rv text-ink-2 md:col-span-4">{t.contactBlock.body}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.id}
            href={`/${locale}/produtos/${c.id}`}
            className={`group rv relative block overflow-hidden rounded-[12px] bg-dark text-bone ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
            data-cursor
          >
            <div className={`relative ${i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[640px]" : "aspect-[4/5]"}`}>
              <Image src={COVERS[c.id]} alt={c.name[locale]} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]" style={{ transitionTimingFunction: "var(--expo)" }} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,.1),rgba(12,11,9,.15)_50%,rgba(12,11,9,.85))]" />
              <span className="lbl absolute left-5 top-5 text-bone/80">{c.index}</span>
              <span className="lbl absolute right-5 top-5 text-bone/80">
                {c.variants.length} {t.collection.variants}
              </span>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className={`${i === 0 ? "text-[clamp(36px,4.6vw,72px)]" : "text-[clamp(28px,2.6vw,40px)]"} font-medium leading-none tracking-[-0.045em]`}>{c.name[locale]}</h2>
                  <p className="mt-3 max-w-[40ch] text-sm text-bone-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{c.lead[locale]}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bone text-dark transition-transform duration-500 group-hover:-rotate-45">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
