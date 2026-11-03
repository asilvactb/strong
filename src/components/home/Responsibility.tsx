import Image from "next/image";
import Lines from "../Lines";

export default function Responsibility({ label, title, body, items }: { label: string; title: string; body: string; items: string[] }) {
  return (
    <section className="dark relative overflow-hidden bg-dark text-bone" data-theme="dark">
      <div className="absolute inset-0">
        <Image src="/img/forest.jpg" alt="" fill sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,9,.92)_0%,rgba(12,11,9,.55)_60%,rgba(12,11,9,.3)_100%)]" />
      </div>
      <div className="gut relative grid gap-14 py-[22vh] md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="lbl mb-6 rv">06 — {label}</p>
          <Lines className="display text-[clamp(40px,6vw,104px)]" lines={title.split(". ").map((x, i, a) => (i < a.length - 1 ? x + "." : x))} greyLast />
          <p className="rv mt-10 max-w-[52ch] text-[17px] leading-relaxed text-bone-2">{body}</p>
        </div>
        <ul className="self-end md:col-span-4 md:col-start-9">
          {items.map((it, i) => (
            <li key={it} className="rv flex gap-5 border-t border-[var(--dline)] py-5 text-[15px]" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <span className="lbl pt-1 text-accent-hi">0{i + 1}</span>
              {it}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
