import { redirect } from "next/navigation";

import { defaultLocale } from "@/lib/i18n";
import { getFeaturedProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductDetailPageRedirect() {
  const featuredProduct = await getFeaturedProduct();

  if (!featuredProduct) {
    redirect(`/${defaultLocale}/products`);
  }

  redirect(`/${defaultLocale}/products/${featuredProduct.handle}`);
}
