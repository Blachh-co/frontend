import "server-only";

import {
  products as mockProducts,
  type Product,
  type ProductCategory,
} from "@/components/products/productsData";
import { getShopifyProducts } from "@/lib/shopify";

const isMockEnabled = process.env.MOCK_ENABLED === "true";

function toProductCategory(value: string): ProductCategory {
  if (value === "Matcha" || value === "Books" || value === "Toys") {
    return value;
  }

  return "Matcha";
}

function mapShopifyProduct(product: Awaited<ReturnType<typeof getShopifyProducts>>[number]): Product {
  return {
    imageSrc: product.featuredImage?.url ?? "/mock/products/society-hinoki.png",
    productName: product.title,
    size: 0,
    price: Number(product.priceRange.minVariantPrice.amount),
    currency: product.priceRange.minVariantPrice.currencyCode,
    category: toProductCategory(product.productType),
    eyebrow: product.productType || "Shopify product",
    description: product.description,
    tastingNotes: [],
  };
}

export async function getProducts(): Promise<Product[]> {
  if (isMockEnabled) {
    return mockProducts;
  }

  const shopifyProducts = await getShopifyProducts();
  return shopifyProducts.map(mapShopifyProduct);
}

export async function getFeaturedProduct(): Promise<Product | null> {
  const products = await getProducts();
  return products[0] ?? null;
}
