import { notFound, redirect } from "next/navigation";

import { getCurrencyPreferenceFromRequest } from "@/lib/currency-server";
import { isValidLocale } from "@/lib/i18n";
import { getFeaturedProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

interface LegacyLocalizedProductDetailPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LegacyLocalizedProductDetailPage({
  params,
}: LegacyLocalizedProductDetailPageProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const currencyPreference = await getCurrencyPreferenceFromRequest();
  const featuredProduct = await getFeaturedProduct(currencyPreference);

  if (!featuredProduct) {
    redirect(`/${lang}/products`);
  }

  redirect(`/${lang}/products/${featuredProduct.handle}`);
}
