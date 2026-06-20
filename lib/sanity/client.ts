import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
// The dataset is private, so reads need a token too, not just writes.
const token = process.env.SANITY_API_READ_TOKEN;

// `sanityClient` is null when no project is configured (e.g. local dev before
// setup, or CI). Callers must treat that as "no CMS overlay" and fall back to
// the static dictionaries, never throw.
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      token,
      useCdn: true,
    })
  : null;
