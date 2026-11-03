"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/data/catalog";
import { COMPANY } from "@/data/catalog";
import { getDict } from "@/i18n/dict";

/** No backend yet: composes an email in the visitor's mail client. */
export default function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale).contact.form;
  const sp = useSearchParams();
  const [f, setF] = useState({ name: "", email: "", company: "", subject: sp.get("produto") ?? "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.message}\n\n— ${f.name}${f.company ? ` · ${f.company}` : ""}\n${f.email}`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(f.subject || "Strong Wood Floors")}&body=${encodeURIComponent(body)}`;
  };

  const field = "w-full border-b border-[var(--line)] bg-transparent py-4 text-[18px] tracking-[-0.01em] outline-none transition-colors placeholder:text-grey/70 focus:border-ink";
  return (
    <form onSubmit={submit} className="rv grid gap-2">
      <div className="grid gap-2 md:grid-cols-2 md:gap-8">
        <input required placeholder={t.name} value={f.name} onChange={set("name")} className={field} />
        <input required type="email" placeholder={t.email} value={f.email} onChange={set("email")} className={field} />
      </div>
      <input placeholder={t.company} value={f.company} onChange={set("company")} className={field} />
      <input placeholder={t.subject} value={f.subject} onChange={set("subject")} className={field} />
      <textarea required rows={5} placeholder={t.message} value={f.message} onChange={set("message")} className={`${field} resize-none`} />
      <button type="submit" className="pill mt-8 justify-self-start">
        <span className="sw">
          <span>{t.send}</span>
          <span>{t.send}</span>
        </span>
        ↗
      </button>
    </form>
  );
}
