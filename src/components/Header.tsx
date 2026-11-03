"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/data/catalog";
import { getDict, LOCALES } from "@/i18n/dict";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}/produtos`, label: t.nav.products },
    { href: `/${locale}/empresa`, label: t.nav.company },
    { href: `/${locale}/editorial`, label: t.nav.editorial },
    { href: `/${locale}/portugal-2030`, label: t.nav.pt2030 },
    { href: `/${locale}/contactos`, label: t.nav.contact },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last && !open);
      setSolid(y > 40);
      last = y;
      // theme follows the section under the header
      let theme = "light";
      document.querySelectorAll<HTMLElement>("main [data-theme]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= 36 && r.bottom > 36) theme = s.dataset.theme ?? theme;
      });
      setDark(theme === "dark");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, pathname]);

  const swap = (l: Locale) => pathname.replace(/^\/(pt|en|es)/, `/${l}`);
  const isDark = dark || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ${hidden ? "-translate-y-full" : ""}`}
        style={{ transitionTimingFunction: "var(--expo)" }}
      >
        <div
          className={`gut flex h-[72px] items-center justify-between transition-colors duration-500 ${
            solid && !open ? (isDark ? "bg-dark/70 backdrop-blur-md" : "bg-paper/75 backdrop-blur-md") : ""
          } ${isDark ? "text-bone" : "text-ink"}`}
        >
          <Link href={`/${locale}`} aria-label="Strong Wood Floors" className="relative block h-[30px] w-[100px]">
            <Image src={isDark ? "/img/logo-bone.png" : "/img/logo-ink.png"} alt="Strong Wood Floors" fill sizes="100px" className="object-contain object-left" priority />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-mono text-[11px] uppercase tracking-[0.12em] ulink ${pathname.startsWith(l.href) ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] sm:flex">
              {LOCALES.map((l) => (
                <Link key={l} href={swap(l)} className={l === locale ? "opacity-100" : "opacity-40 hover:opacity-100"}>
                  {l}
                </Link>
              ))}
            </div>
            <Link href={`/${locale}/contactos`} className="pill hidden md:inline-flex">
              <span className="sw">
                <span>{t.cta}</span>
                <span>{t.cta}</span>
              </span>
              <span aria-hidden>↗</span>
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-dark text-bone transition-[clip-path] duration-700 lg:hidden`}
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", transitionTimingFunction: "var(--expo)" }}
        data-theme="dark"
      >
        <div className="gut flex h-full flex-col justify-between pb-10 pt-28">
          <nav className="flex flex-col gap-1">
            {links.map((l, i) => (
              <Link key={l.href} href={l.href} className="display text-[13vw] uppercase leading-[0.95]">
                <span className="lbl mr-3 align-top text-[10px]">0{i + 1}</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-end justify-between">
            <div className="flex gap-4 font-mono text-xs uppercase">
              {LOCALES.map((l) => (
                <Link key={l} href={swap(l)} className={l === locale ? "" : "opacity-40"}>
                  {l}
                </Link>
              ))}
            </div>
            <Link href={`/${locale}/contactos`} className="pill">
              {t.cta} ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
