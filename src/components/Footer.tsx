import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/data/catalog";
import { CATEGORIES, COMPANY } from "@/data/catalog";
import { getDict } from "@/i18n/dict";
import Lines from "./Lines";
import { splitTitle } from "@/lib/split";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <footer className="dark relative overflow-hidden bg-dark text-bone" data-theme="dark">
      <section className="gut pb-16 pt-[22vh]">
        <p className="lbl mb-8 rv">{t.contactBlock.label}</p>
        <Lines
          as="h2"
          className="display max-w-[14ch] text-[clamp(48px,9vw,168px)]"
          lines={splitTitle(t.contactBlock.title)}
          greyLast
        />
        <div className="mt-14 flex flex-col gap-10 border-t border-[var(--dline)] pt-10 md:flex-row md:items-end md:justify-between">
          <div className="rv max-w-[42ch] text-bone-2">
            <p>{t.contactBlock.body}</p>
            <a href={`mailto:${COMPANY.email}`} className="mt-6 block text-[clamp(22px,2.6vw,40px)] tracking-[-0.03em] text-bone ulink w-fit">
              {COMPANY.email}
            </a>
          </div>
          <Link href={`/${locale}/contactos`} className="pill rv self-start md:self-auto" style={{ ["--d" as string]: "120ms" }}>
            <span className="sw">
              <span>{t.cta}</span>
              <span>{t.cta}</span>
            </span>
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>

      <div className="gut grid grid-cols-2 gap-10 border-t border-[var(--dline)] py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="relative h-[42px] w-[140px]">
            <Image src="/img/logo-bone.png" alt="Strong Wood Floors" fill sizes="140px" className="object-contain object-left" />
          </div>
          <p className="mt-5 max-w-[26ch] text-sm text-bone-2">{t.tagline}</p>
        </div>
        <div>
          <p className="lbl mb-4">{t.nav.products}</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/${locale}/produtos/${c.id}`} className="ulink text-bone-2 hover:text-bone">
                  {c.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="lbl mb-4">Strong</p>
          <ul className="space-y-2 text-sm">
            {(["empresa", "editorial", "portugal-2030", "contactos"] as const).map((p) => (
              <li key={p}>
                <Link href={`/${locale}/${p}`} className="ulink text-bone-2 hover:text-bone">
                  {p === "empresa" ? t.nav.company : p === "editorial" ? t.nav.editorial : p === "portugal-2030" ? t.nav.pt2030 : t.nav.contact}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-bone-2">
          <p className="lbl mb-4">{t.contact.address}</p>
          {COMPANY.address.map((a) => (
            <p key={a}>{a}</p>
          ))}
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="mt-4 block ulink w-fit">
            {COMPANY.phone}
          </a>
        </div>
      </div>

      <div className="gut border-t border-[var(--dline)] py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href={`/${locale}/portugal-2030`} className="block w-full max-w-[520px] rounded-md bg-white p-3 opacity-90 transition-opacity hover:opacity-100">
            <Image src="/img/logos/barra_feder_black.png" alt="Compete 2030 · Portugal 2030 · União Europeia" width={2000} height={208} className="h-auto w-full" />
          </Link>
          <p className="lbl">
            © {new Date().getFullYear()} {COMPANY.name} · {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
