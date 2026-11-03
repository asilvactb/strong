import Lines from "./Lines";

export default function PageHead({ label, title, intro, index }: { label: string; title: string; intro?: string; index?: string }) {
  const parts = title.split(/(?<=[,.])\s/);
  return (
    <section className="gut bg-paper pb-14 pt-[22vh]" data-theme="light">
      <div className="mb-10 flex justify-between">
        <p className="lbl rv">{label}</p>
        {index && <p className="lbl rv">{index}</p>}
      </div>
      <div className="grid gap-10 border-b border-[var(--line)] pb-14 md:grid-cols-12 md:items-end">
        <Lines as="h1" immediate delay={100} className="display text-[clamp(48px,8.4vw,150px)] md:col-span-8" lines={parts} greyLast={parts.length > 1} />
        {intro && <p className="rv text-[17px] leading-relaxed text-ink-2 md:col-span-4">{intro}</p>}
      </div>
    </section>
  );
}
