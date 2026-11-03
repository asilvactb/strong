import type { Locale } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import CollectionIndex from "@/components/home/CollectionIndex";
import Anatomy from "@/components/home/Anatomy";
import SpeciesWall from "@/components/home/SpeciesWall";
import Numbers from "@/components/home/Numbers";
import Process from "@/components/home/Process";
import Responsibility from "@/components/home/Responsibility";
import Work from "@/components/home/Work";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const t = getDict(locale);
  return (
    <>
      <Hero locale={locale} />
      <Statement text={t.statement} keys={t.statementKeys} label="Strong Wood Floors" />
      <CollectionIndex locale={locale} />
      <Anatomy locale={locale} />
      <SpeciesWall locale={locale} />
      <Numbers label={t.numbers.label} items={t.numbers.items} />
      <Process label={t.process.label} title={t.process.title} steps={t.process.steps} />
      <Responsibility {...t.responsibility} />
      <Work {...t.work} />
    </>
  );
}
