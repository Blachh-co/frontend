import "server-only";

import {
  products as mockProducts,
  type Product,
} from "@/components/products/productsData";
import { type SupportedCurrencyCode } from "@/lib/currency";
import { getExchangeRates } from "@/lib/exchange-rates";
import {
  localizeProductCurrency,
  mapMockProduct,
  mapShopifyProduct,
} from "@/lib/product-mappers";
import { getShopifyProductByHandle, getShopifyProducts } from "@/lib/shopify";

const isMockEnabled = process.env.MOCK_ENABLED === "true";

interface ProductQueryOptions {
  countryCode?: string;
  currencyCode?: SupportedCurrencyCode;
}

async function localizeProducts(
  products: Product[],
  currencyCode: SupportedCurrencyCode,
): Promise<Product[]> {
  const baseCurrencyCodes = [
    ...new Set(
      products.flatMap((product) => [
        product.currency as SupportedCurrencyCode,
        ...product.variants.map(
          (variant) => variant.currency as SupportedCurrencyCode,
        ),
      ]),
    ),
  ].filter((baseCurrencyCode) => baseCurrencyCode !== currencyCode);

  const exchangeRatesEntries = await Promise.all(
    baseCurrencyCodes.map(async (baseCurrencyCode) => [
      baseCurrencyCode,
      await getExchangeRates(baseCurrencyCode),
    ] as const),
  );
  const exchangeRatesByBaseCurrency = Object.fromEntries(exchangeRatesEntries);

  return products.map((product) =>
    localizeProductCurrency(
      product,
      currencyCode,
      exchangeRatesByBaseCurrency,
    ),
  );
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
  const mappedProducts = shopifyProducts.map(mapShopifyProduct);
  return localizeProducts(mappedProducts, currencyCode);
}

export async function getProductByHandle(
  handle: string,
  options: ProductQueryOptions = {},
): Promise<Product | null> {
  const currencyCode = options.currencyCode ?? "USD";

  if (isMockEnabled) {
    const product = mockProducts.find((item) => item.handle === handle);
    return product ? mapMockProduct(product, currencyCode) : null;
  }

  const shopifyProduct = await getShopifyProductByHandle(handle, {
    countryCode: options.countryCode,
  });

  if (!shopifyProduct) {
    return null;
  }

  const [localizedProduct] = await localizeProducts(
    [mapShopifyProduct(shopifyProduct)],
    currencyCode,
  );

  return localizedProduct ?? null;
}

export async function getFeaturedProduct(
  options: ProductQueryOptions = {},
): Promise<Product | null> {
  const products = await getProducts(options);
  return products[0] ?? null;
}
