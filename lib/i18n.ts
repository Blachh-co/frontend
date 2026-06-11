import en from "@/messages/en.json";
import sv from "@/messages/sv.json";
import th from "@/messages/th.json";

export const locales = ["en", "th", "sv"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries = { en, th, sv } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}

export function replaceLocaleInPathname(pathname: string, locale: Locale) {
  if (pathname === "/") {
    return `/${locale}`;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  if (isValidLocale(segments[0] ?? "")) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function getLocalizedPathname(locale: Locale, pathname = "/") {
  return replaceLocaleInPathname(pathname, locale);
}

export function localizeHref(href: string, pathname = "/") {
  if (!href.startsWith("/")) {
    return href;
  }

  const segments = href.split("/").filter(Boolean);

  if (isValidLocale(segments[0] ?? "")) {
    return href;
  }

  const pathnameSegments = pathname.split("/").filter(Boolean);
  const activeLocale = isValidLocale(pathnameSegments[0] ?? "")
    ? pathnameSegments[0]
    : defaultLocale;

  return href === "/" ? `/${activeLocale}` : `/${activeLocale}${href}`;
}
