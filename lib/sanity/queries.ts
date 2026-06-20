import { sanityClient } from "./client";

export interface SiteContent {
  banner: unknown | null;
  footer: unknown | null;
  home: unknown | null;
  about: unknown | null;
  contact: unknown | null;
  productCopy: unknown | null;
}

const SITE_CONTENT_QUERY = /* groq */ `{
  "banner": *[_id == "bannerSettings"][0],
  "footer": *[_id == "footerSettings"][0],
  "home": *[_id == "homePage"][0]{
    ...,
    community {
      ...,
      "cards": coalesce(cards[]{
        title,
        "videoUrl": video.asset->url
      }, [])
    }
  },
  "about": *[_id == "aboutPage"][0],
  "contact": *[_id == "contactPage"][0],
  "productCopy": *[_id == "productCopy"][0]
}`;

// Returns null when Sanity isn't configured, so callers fall back to the
// static dictionaries untouched.
export async function getSiteContent(): Promise<SiteContent | null> {
  if (!sanityClient) return null;

  return sanityClient.fetch<SiteContent>(
    SITE_CONTENT_QUERY,
    {},
    { next: { revalidate: 60, tags: ["sanity-content"] } },
  );
}
