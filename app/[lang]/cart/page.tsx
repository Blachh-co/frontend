import { notFound } from "next/navigation";

import { CartPageContent } from "@/components/cart/CartPageContent";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { getRequestCartState } from "@/lib/shopify-cart-server";

export const dynamic = "force-dynamic";

interface LocalizedCartPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocalizedCartPage({
  params,
}: LocalizedCartPageProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const { cart } = await getRequestCartState();

  return <CartPageContent lang={lang} initialCart={cart} dictionary={dictionary.cart} />;
}
