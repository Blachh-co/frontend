import en from "@/messages/en.json";
import sv from "@/messages/sv.json";
import th from "@/messages/th.json";
import { getSiteContent } from "@/lib/sanity/queries";
import { resolveLocale } from "@/lib/sanity/localize";

export const locales = ["en", "th", "sv"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries = { en, th, sv } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

// Sections editable in Sanity are overlaid on top of the static dictionary;
// anything not yet created in the CMS (or if Sanity isn't configured at all)
// falls back to the JSON value untouched, so this never throws.
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const base = dictionaries[locale];
  const cms = await getSiteContent();

  if (!cms) return base;

  return {
    ...base,
    banner: cms.banner ? (resolveLocale(cms.banner, locale) as Dictionary["banner"]) : base.banner,
    footer: cms.footer ? (resolveLocale(cms.footer, locale) as Dictionary["footer"]) : base.footer,
    home: cms.home ? (resolveLocale(cms.home, locale) as Dictionary["home"]) : base.home,
    about: cms.about ? (resolveLocale(cms.about, locale) as Dictionary["about"]) : base.about,
    contact: cms.contact
      ? (resolveLocale(cms.contact, locale) as Dictionary["contact"])
      : base.contact,
    product: {
      ...base.product,
      ...(cms.productCopy
        ? (resolveLocale(cms.productCopy, locale) as Pick<
            Dictionary["product"],
            "tabs" | "reviewCarousel" | "reviewSummary"
          >)
        : {}),
    },
  };
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
