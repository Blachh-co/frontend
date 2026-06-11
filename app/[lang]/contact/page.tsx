import { notFound } from "next/navigation";

import { ContactPage } from "@/components/contact/ContactPage";
import { getDictionary, isValidLocale } from "@/lib/i18n";

interface LocalizedContactPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocalizedContactPage({
  params,
}: LocalizedContactPageProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <ContactPage dictionary={dictionary.contact} />;
}
