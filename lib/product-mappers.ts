import type {
  Product,
  ProductCategory,
  ProductVariant,
} from "../components/products/productsData";
import {
  convertPriceFromSek,
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

export function mapMockProduct(
  product: Product,
  currencyCode: SupportedCurrencyCode,
): Product {
  const variants = product.variants.map((variant) =>
    normalizeVariant(
      {
        ...variant,
        price: convertPriceFromSek(variant.price, currencyCode),
      },
      currencyCode,
    ),
  );
  const defaultVariant = getDefaultVariant(variants, {
    merchandiseId: product.merchandiseId,
    size: product.size,
    price: convertPriceFromSek(product.price, currencyCode),
    currency: currencyCode,
  });

  return {
    ...product,
    merchandiseId: defaultVariant.merchandiseId,
    size: defaultVariant.size,
    price: defaultVariant.price,
    currency: currencyCode,
    formattedPrice: defaultVariant.formattedPrice,
    variants,
  };
}
