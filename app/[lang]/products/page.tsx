import { ProductsPage } from "@/components/products/ProductsPage";
import { getCurrencyPreferenceFromRequest } from "@/lib/currency-server";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { getProducts } from "@/lib/products";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface LocalizedProductsPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocalizedProductsPage({
  params,
}: LocalizedProductsPageProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const currencyPreference = await getCurrencyPreferenceFromRequest();
  const [products, dictionary] = await Promise.all([
    getProducts(currencyPreference),
    getDictionary(lang),
  ]);

  return (
    <ProductsPage
      products={products}
      dictionary={dictionary.products}
      a11y={dictionary.a11y}
    />
  );
}
