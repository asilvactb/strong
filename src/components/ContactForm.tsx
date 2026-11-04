"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/data/catalog";
import { COMPANY } from "@/data/catalog";
import { getDict } from "@/i18n/dict";

/** Same fields as the current strongexport.com form. No backend yet: composes an email. */
export default function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale).contact.form;
  const sp = useSearchParams();
  const [f, setF] = useState({ name: "", email: "", phone: "", address: "", product: sp.get("produto") ?? "", rooms: "", area: "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      f.message,
      "",
      `${t.name}: ${f.name}`,
      `${t.email}: ${f.email}`,
      `${t.phone}: ${f.phone}`,
      f.address ? `${t.address}: ${f.address}` : null,
      f.product ? `${t.product} ${f.product}` : null,
      f.rooms ? `${t.rooms} ${f.rooms}` : null,
      f.area ? `${t.area} ${f.area}` : null,
    ].filter((x): x is string => x !== null);
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(f.product || t.title)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const field = "w-full border-b border-[var(--line)] bg-transparent py-4 text-[18px] tracking-[-0.01em] outline-none transition-colors placeholder:text-grey/70 focus:border-ink";
  return (
    <form onSubmit={submit} className="rv">
      <p className="mb-10 text-[clamp(22px,2vw,30px)] font-medium tracking-[-0.03em]">{t.title}</p>
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
        <fieldset className="grid content-start gap-2">
          <legend className="lbl mb-2">{t.personal}</legend>
          <input required placeholder={`${t.name} *`} value={f.name} onChange={set("name")} className={field} autoComplete="name" />
          <input required type="email" placeholder={`${t.email} *`} value={f.email} onChange={set("email")} className={field} autoComplete="email" />
          <input required type="tel" placeholder={`${t.phone} *`} value={f.phone} onChange={set("phone")} className={field} autoComplete="tel" />
          <input placeholder={t.address} value={f.address} onChange={set("address")} className={field} autoComplete="street-address" />
        </fieldset>
        <fieldset className="grid content-start gap-2">
          <legend className="lbl mb-2">{t.project}</legend>
          <input placeholder={t.product} value={f.product} onChange={set("product")} className={field} />
          <input placeholder={t.rooms} value={f.rooms} onChange={set("rooms")} className={field} />
          <input placeholder={t.area} value={f.area} onChange={set("area")} className={field} />
        </fieldset>
      </div>
      <textarea required rows={5} placeholder={`${t.message} *`} value={f.message} onChange={set("message")} className={`${field} mt-8 resize-none`} />
      <div className="mt-8 flex items-center justify-between gap-6">
        <p className="lbl">* {t.required}</p>
        <button type="submit" className="pill">
          <span className="sw">
            <span>{t.send}</span>
            <span>{t.send}</span>
          </span>
          ↗
        </button>
      </div>
    </form>
  );
}
