import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import PageHead from "@/components/PageHead";
import Lines from "@/components/Lines";
import Process from "@/components/home/Process";
import Responsibility from "@/components/home/Responsibility";
import Numbers from "@/components/home/Numbers";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.company };
}

export default async function Company({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHead label={t.company.label} title={t.company.title} intro={t.company.intro} index="Est. 2011" />
      <section className="gut bg-paper pb-[16vh]" data-theme="light">
        <div className="rv relative aspect-[16/8] overflow-hidden rounded-[12px]">
          <Image src="/img/factory.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="mt-[14vh] grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="lbl mb-6 rv">{t.company.quality}</p>
            <Lines className="display text-[clamp(36px,4.8vw,80px)]" lines={[t.company.qualityTitle]} />
          </div>
          <ul className="self-end md:col-span-5 md:col-start-8">
            {t.company.qualityItems.map((q, i) => (
              <li key={q} className="rv flex items-baseline gap-6 border-t border-[var(--line)] py-6 text-[clamp(18px,1.6vw,24px)] tracking-[-0.02em]" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="lbl text-accent">0{i + 1}</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Numbers label={t.numbers.label} items={t.numbers.items} />
      <Process label={t.process.label} title={t.process.title} steps={t.process.steps} />
      <Responsibility {...t.responsibility} />
    </>
  );
}
