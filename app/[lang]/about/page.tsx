import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutPageContent } from "@/app/about/AboutPageContent";
import { getDictionary, isValidLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About | Blachh",
  description:
    "Learn the story behind Blachh, our approach to matcha, and the slower rituals that shape the brand.",
};

interface LocalizedAboutPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocalizedAboutPage({
  params,
}: LocalizedAboutPageProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <AboutPageContent dictionary={dictionary.about} />;
}
