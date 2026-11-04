import { Suspense } from "react";
import type { Metadata } from "next";
import type { Locale } from "@/data/catalog";
import { COMPANY } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.contact };
}

export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const items = [
    { k: t.contact.email, v: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { k: t.contact.phone, v: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
    { k: t.contact.mobile, v: COMPANY.mobile, href: `tel:${COMPANY.mobile.replace(/\s/g, "")}` },
  ];
  return (
    <>
      <PageHead label={t.contact.label} title={t.contact.title} intro={t.contactBlock.body} />
      <section className="gut grid gap-16 bg-paper pb-[16vh] md:grid-cols-12" data-theme="light">
        <div className="md:col-span-5">
          {items.map((it, i) => (
            <a key={it.k} href={it.href} className="rv group flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-6" style={{ ["--d" as string]: `${i * 70}ms` }}>
              <span className="lbl">{it.k}</span>
              <span className="text-[clamp(18px,1.8vw,26px)] tracking-[-0.03em] transition-colors group-hover:text-accent">{it.v}</span>
            </a>
          ))}
          <div className="rv border-y border-[var(--line)] py-6">
            <p className="lbl mb-3">{t.contact.address}</p>
            {COMPANY.address.map((a) => (
              <p key={a} className="text-[17px]">{a}</p>
            ))}
            <p className="lbl mb-1 mt-5">{t.contact.form.coords}</p>
            <p className="tab text-[15px] text-ink-2">
              {COMPANY.lat}, {COMPANY.lng}
            </p>
            <a href={COMPANY.maps} target="_blank" rel="noreferrer" className="pill ghost mt-6">
              <span className="sw">
                <span>{t.contact.route}</span>
                <span>{t.contact.route}</span>
              </span>
              ↗
            </a>
          </div>
          <p className="mt-6 text-xs text-grey">{t.contact.note}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Suspense>
            <ContactForm locale={locale} />
          </Suspense>
        </div>
      </section>
      <section className="relative h-[60svh] bg-dark" data-theme="dark">
        <iframe
          title="Strong Export · Póvoa de Lanhoso"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${COMPANY.lng - 0.02}%2C${COMPANY.lat - 0.01}%2C${COMPANY.lng + 0.02}%2C${COMPANY.lat + 0.01}&layer=mapnik&marker=${COMPANY.lat}%2C${COMPANY.lng}`}
          className="h-full w-full grayscale-[0.9] contrast-[1.05]"
          loading="lazy"
        />
      </section>
    </>
  );
}
