# Navigation I18n Design

## Goal

Add locale-prefixed routing and minimal internationalization support for English, Thai, and Swedish, limited to navigation labels and a basic language switcher.

## Requirements

- The supported locales must be `en`, `th`, and `sv`.
- Visiting `/` must redirect to `/en`.
- All primary pages must be reachable under locale-prefixed paths such as `/en`, `/th/about`, and `/sv/contact`.
- The current navigation labels must be translated for the three supported locales.
- The navigation and logo links must preserve the active locale.
- A user must be able to switch between `en`, `th`, and `sv` from the navigation.
- The initial scope must not include translation of full page copy outside the navigation.
- The implementation must follow the App Router internationalization pattern described in the bundled Next.js docs, using `app/[lang]` rather than legacy Pages Router i18n config.

## Architecture

Use native App Router locale segments with a small server-side dictionary layer.

- Add a dynamic route segment at `app/[lang]` and move the current app pages beneath it.
- Keep the root request handler minimal by redirecting `/` to `/en`.
- Define locale utilities in a shared module so route validation, dictionary loading, and locale-aware href creation all use the same source of truth.
- Load translation dictionaries on the server only. The initial dictionaries only need navigation keys and language labels.
- Pass the active locale and translated navigation strings from server routes or layouts into the client navigation component.

This keeps the locale model explicit in the URL and avoids introducing a library before the project has enough translated content to justify one.

## Route Structure

Restructure the routes so the existing pages live under `app/[lang]`:

- `app/[lang]/page.tsx`
- `app/[lang]/about/page.tsx`
- `app/[lang]/contact/page.tsx`
- `app/[lang]/products/page.tsx`
- `app/[lang]/product-detail/page.tsx`
- `app/[lang]/layout.tsx`

The `app/[lang]/layout.tsx` file will:

- validate `lang`
- set the `<html lang>` attribute
- load the locale dictionary
- render the shared shell components with locale-aware props
- export `generateStaticParams()` for `en`, `th`, and `sv`

The root `app/page.tsx` will redirect to `/en`.

## Translation Model

Store minimal dictionaries in a dedicated server-only i18n area. The initial dictionary shape should cover:

- navigation labels: `shop`, `about`, `contact`
- language switcher labels: `english`, `thai`, `swedish`
- short locale codes for display if needed
- accessibility labels that are currently hardcoded in the navigation, such as menu open and close text

Keep the dictionaries typed so every locale must provide the same keys.

## Navigation Behavior

Update `Navbar` so it no longer hardcodes English labels or non-functional locale controls.

- Desktop navigation links should point to the active locale path.
- Mobile menu links should point to the active locale path.
- The language switcher should offer `EN`, `TH`, and `SV`.
- Switching locale should keep the same logical page when possible by replacing the current locale segment and preserving the rest of the pathname.
- The logo link should point to `/${lang}`.

The initial switcher can be intentionally simple:

- no dropdown state persistence
- no browser language detection
- no local storage
- no automatic redirect from one locale to another except `/` -> `/en`

## File Boundaries

- `app/page.tsx`: redirect `/` to `/en`
- `app/[lang]/layout.tsx`: locale-aware root layout
- `app/[lang]/...`: locale-prefixed page routes
- `components/Navbar.tsx`: locale-aware client navigation and language switcher
- `components/Banner.tsx` and `components/Footer.tsx`: unchanged unless locale props become necessary later
- `lib/i18n.ts` or equivalent: locale constants, validation helpers, path helpers, dictionary types
- `dictionaries/*.json` or an equivalent typed module set: translation data

## Error Handling

- Invalid locale segments must return `notFound()`.
- Missing dictionary entries must fail during development or build through typing, not silently fall back at runtime.
- Locale switching should never generate malformed paths such as double locale prefixes or missing leading slashes.

## Testing

Add focused tests around the minimal i18n surface:

- locale validation accepts only `en`, `th`, and `sv`
- locale path replacement keeps the route suffix intact
- dictionary loading returns the expected navigation labels for each locale

Run at least:

- targeted tests for the new locale utilities
- `npm run lint`

## Out of Scope

- Translating page body copy, marketing sections, or product descriptions
- Currency localization
- Browser language negotiation using `Accept-Language`
- Domain-based locale routing
- Third-party i18n libraries
