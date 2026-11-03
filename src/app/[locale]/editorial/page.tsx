import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import PageHead from "@/components/PageHead";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.editorial };
}

const RESEARCH = [
  {
    title: "Sustainable Sawdust/Eucalyptol Absorption Matrix for Odor Slow-Release in Plywood Floor",
    meta: "Logvina, Fernandes, Pinto da Silva, Esteves da Silva · Sustainable Chemistry 2023, 4, 236–245",
    href: "https://doi.org/10.3390/suschem4030018",
  },
  {
    title: "Development of novel Eucalyptol – Sawdust composite for the slow-release of odours from plywood",
    meta: "Cardoso et al. · IJUP 2023, Universidade do Porto",
    href: "https://strongexport.com/downloads/comunicacao-iju-p2023.pdf",
  },
  { title: "GC-FID Evaluation of the Release of Eucalyptol Absorbed by Sawdust", meta: "Logvina et al. · RG4 2022, Porto" },
  { title: "WoodROdour — prototype exhibition", meta: "Dias Abertos 2023 · Faculdade de Ciências da Universidade do Porto" },
];

export default async function Editorial({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHead label={t.editorial.label} title={t.editorial.title} />
      <section className="gut bg-paper pb-[14vh]" data-theme="light">
        <article className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="lbl mb-4 rv">Hannover · Domotex</p>
            <h2 className="rv text-[clamp(36px,4.4vw,72px)] font-medium leading-[0.95] tracking-[-0.05em]">Domotex</h2>
            <p className="rv mt-6 max-w-[40ch] text-ink-2">{t.editorial.domotex}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:col-span-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`rv relative overflow-hidden rounded-[10px] bg-paper-2 ${i === 1 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`} style={{ ["--d" as string]: `${i * 60}ms` }}>
                <Image src={`/img/news/domotex-${i}.jpg`} alt="Domotex" fill sizes="(min-width:768px) 60vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="dark gut bg-dark py-[18vh] text-bone" data-theme="dark">
        <div className="mb-14 grid gap-8 md:grid-cols-12">
          <p className="lbl rv md:col-span-4">{t.editorial.research}</p>
          <p className="rv text-[clamp(22px,2.4vw,36px)] leading-tight tracking-[-0.03em] md:col-span-8">{t.editorial.researchIntro}</p>
        </div>
        <ul>
          {RESEARCH.map((r, i) => {
            const inner = (
              <>
                <span className="lbl w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block text-[clamp(18px,1.8vw,26px)] tracking-[-0.02em]">{r.title}</span>
                  <span className="mt-2 block text-sm text-bone-2">{r.meta}</span>
                </span>
                {r.href && <span className="text-xl transition-transform duration-500 group-hover:-rotate-45">→</span>}
              </>
            );
            return (
              <li key={r.title} className="rv border-t border-[var(--dline)] last:border-b">
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noreferrer" className="group flex items-center gap-6 py-7 transition-[padding] duration-500 hover:pl-3">
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-6 py-7">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
