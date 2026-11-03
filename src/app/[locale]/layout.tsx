import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionRoot from "@/components/MotionRoot";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { getDict, isLocale, LOCALES } from "@/i18n/dict";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    metadataBase: new URL("https://strongexport.com"),
    title: { default: `Strong Wood Floors · ${t.tagline}`, template: "%s · Strong Wood Floors" },
    description: t.statement,
    alternates: { languages: { pt: "/pt", en: "/en", es: "/es" } },
    openGraph: { images: ["/img/hero-interior.jpg"], siteName: "Strong Wood Floors" },
  };
}

export const viewport: Viewport = { themeColor: "#0c0b09" };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Preloader />
        <MotionRoot />
        <Cursor />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
