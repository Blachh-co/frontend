import "server-only";

import {
  products as mockProducts,
  type Product,
} from "@/components/products/productsData";
import { type SupportedCurrencyCode } from "@/lib/currency";
import { mapMockProduct, mapShopifyProduct } from "@/lib/product-mappers";
import { getShopifyProducts } from "@/lib/shopify";

const isMockEnabled = process.env.MOCK_ENABLED === "true";

interface ProductQueryOptions {
  countryCode?: string;
  currencyCode?: SupportedCurrencyCode;
}

export async function getProducts(
  options: ProductQueryOptions = {},
): Promise<Product[]> {
  const currencyCode = options.currencyCode ?? "USD";

  if (isMockEnabled) {
    return mockProducts.map((product) => mapMockProduct(product, currencyCode));
  }

  const shopifyProducts = await getShopifyProducts({
    countryCode: options.countryCode,
  });
  return shopifyProducts.map(mapShopifyProduct);
}

export async function getFeaturedProduct(
  options: ProductQueryOptions = {},
): Promise<Product | null> {
  const products = await getProducts(options);
  return products[0] ?? null;
}
