import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/data/catalog";
import { PT2030 } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import PageHead from "@/components/PageHead";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.pt2030 };
}

export default async function Pt2030({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const rows = [
    [t.pt2030.code, PT2030.code],
    [t.pt2030.beneficiary, PT2030.beneficiary],
    [t.pt2030.total, PT2030.total],
    [t.pt2030.eligible, PT2030.eligible],
    [t.pt2030.rate, PT2030.rate],
  ];
  return (
    <>
      <PageHead label={t.pt2030.label} title={t.pt2030.title} intro={t.pt2030.objective} />
      <section className="gut bg-paper pb-[16vh]" data-theme="light">
        <p className="lbl mb-4 rv">{PT2030.programme}</p>
        <h2 className="rv max-w-[22ch] text-[clamp(28px,3.4vw,52px)] font-medium leading-[1] tracking-[-0.045em]">{PT2030.title}</h2>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="rv md:col-span-5">
            <p className="lbl mb-4">{t.pt2030.support}</p>
            <p className="tab text-[clamp(48px,6.6vw,112px)] font-medium leading-none tracking-[-0.06em] text-accent">{PT2030.support}</p>
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            {rows.map(([k, v], i) => (
              <div key={k} className="rv flex justify-between gap-6 border-t border-[var(--line)] py-5 last:border-b" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <dt className="lbl">{k}</dt>
                <dd className="tab text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rv mt-20 flex flex-wrap items-center gap-6 rounded-[12px] bg-white p-6">
          <Image src="/img/logos/barra_feder_black.png" alt="Compete 2030 · Portugal 2030 · União Europeia" width={2000} height={208} className="h-auto w-full max-w-[760px]" />
          <div className="flex gap-4">
            {["pme_inovacao", "pme_excelencia"].map((l) => (
              <Image key={l} src={`/img/logos/${l}.jpg`} alt={l.replace("_", " ").toUpperCase()} width={120} height={120} className="h-16 w-auto" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
