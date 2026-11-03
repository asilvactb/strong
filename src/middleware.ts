import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["pt", "en", "es"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const pref = accept.startsWith("es") ? "es" : accept.startsWith("en") ? "en" : "pt";
  const url = req.nextUrl.clone();
  url.pathname = `/${pref}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|img|textures|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
