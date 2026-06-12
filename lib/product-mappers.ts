import type {
  Product,
  ProductCategory,
  ProductVariant,
} from "../components/products/productsData";
import {
  convertPrice,
  getFallbackConversionRates,
  type CurrencyRates,
  formatMoney,
  type SupportedCurrencyCode,
} from "./currency";
import type { ShopifyProductNode } from "./shopify";

function toProductCategory(value: string): ProductCategory {
  if (value === "Matcha" || value === "Books" || value === "Toys") {
    return value;
  }

  return "Matcha";
}

export function getProductSizeFromVariantTitle(variantTitle?: string): number {
  if (!variantTitle) {
    return 0;
  }

  const match = variantTitle.match(/(\d+)\s*g/i);
  return match ? Number(match[1]) : 0;
}

function normalizeVariant(
  variant: Pick<ProductVariant, "merchandiseId" | "size" | "price">,
  currency: SupportedCurrencyCode,
): ProductVariant {
  return {
    ...variant,
    currency,
    formattedPrice: formatMoney(variant.price, currency),
  };
}

function getDefaultVariant(
  variants: ProductVariant[],
  fallback: {
    merchandiseId: string;
    size: number;
    price: number;
    currency: SupportedCurrencyCode;
  },
): ProductVariant {
  return variants[0] ?? normalizeVariant(fallback, fallback.currency);
}

export function mapShopifyProduct(product: ShopifyProductNode): Product {
  const fallbackCurrency = product.priceRange.minVariantPrice
    .currencyCode as SupportedCurrencyCode;
  const variants = product.variants.nodes.map((variant) =>
    normalizeVariant(
      {
        merchandiseId: variant.id,
        size: getProductSizeFromVariantTitle(variant.title),
        price: Number(variant.price.amount),
      },
      variant.price.currencyCode as SupportedCurrencyCode,
    ),
  );
  const defaultVariant = getDefaultVariant(variants, {
    merchandiseId: product.id,
    size: 0,
    price: Number(product.priceRange.minVariantPrice.amount),
    currency: fallbackCurrency,
  });

  return {
    id: product.id,
    handle: product.handle,
    merchandiseId: defaultVariant.merchandiseId,
    imageSrc: product.featuredImage?.url ?? "/mock/products/society-hinoki.png",
    productName: product.title,
    size: defaultVariant.size,
    price: defaultVariant.price,
    currency: defaultVariant.currency,
    formattedPrice: defaultVariant.formattedPrice,
    category: toProductCategory(product.productType),
    eyebrow: product.productType || "Shopify product",
    description: product.description,
    tastingNotes: [],
    variants,
  };
}

export function localizeProductCurrency(
  product: Product,
  currencyCode: SupportedCurrencyCode,
  exchangeRatesByBaseCurrency: Partial<
    Record<SupportedCurrencyCode, CurrencyRates>
  > = {},
): Product {
  const variants = product.variants.map((variant) => {
    const variantCurrency = variant.currency as SupportedCurrencyCode;
    const localizedPrice = convertPrice(
      variant.price,
      variantCurrency,
      currencyCode,
      exchangeRatesByBaseCurrency[variantCurrency],
    );

    return {
      ...variant,
      price: localizedPrice,
      currency: currencyCode,
      formattedPrice: formatMoney(localizedPrice, currencyCode),
    };
  });

  const productCurrency = product.currency as SupportedCurrencyCode;
  const localizedProductPrice = convertPrice(
    product.price,
    productCurrency,
    currencyCode,
    exchangeRatesByBaseCurrency[productCurrency],
  );
  const selectedVariant =
    variants.find((variant) => variant.merchandiseId === product.merchandiseId) ??
    variants[0];

  return {
    ...product,
    merchandiseId: selectedVariant?.merchandiseId ?? product.merchandiseId,
    size: selectedVariant?.size ?? product.size,
    price: selectedVariant?.price ?? localizedProductPrice,
    currency: currencyCode,
    formattedPrice:
      selectedVariant?.formattedPrice ??
      formatMoney(localizedProductPrice, currencyCode),
    variants,
  };
}

export function mapMockProduct(
  product: Product,
  currencyCode: SupportedCurrencyCode,
): Product {
  return localizeProductCurrency(product, currencyCode, {
    SEK: getFallbackConversionRates("SEK"),
  });
}
