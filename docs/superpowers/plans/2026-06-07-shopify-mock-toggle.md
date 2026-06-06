# Shopify Mock Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a centralized `MOCK_ENABLED` switch that chooses between the existing mock catalog and Shopify product data without changing the storefront UI structure.

**Architecture:** Add a server-only Shopify client plus a shared product loader that maps Shopify data into the existing UI product shape. Route files fetch through this loader and pass data into presentational components.

**Tech Stack:** Next.js 16 App Router, TypeScript, Shopify Storefront GraphQL API, ESLint

---

### Task 1: Centralize Product Types And Mock Data Access

**Files:**
- Modify: `components/products/productsData.ts`

- [ ] **Step 1: Keep the existing UI-facing `Product` type in the mock data module**

```ts
export type ProductCategory = "Matcha" | "Books" | "Toys";

export interface Product {
  imageSrc: string;
  productName: string;
  size: number;
  price: number;
  currency: string;
  category: ProductCategory;
  eyebrow: string;
  description: string;
  tastingNotes: string[];
}
```

- [ ] **Step 2: Continue exporting the mock `products` array unchanged**

Run: `sed -n '1,260p' components/products/productsData.ts`
Expected: the existing mock array remains available for mock mode

### Task 2: Add The Shopify Client

**Files:**
- Create: `lib/shopify.ts`

- [ ] **Step 1: Add a server-only Shopify helper with env validation**

```ts
import "server-only";

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

function getShopifyConfig() {
  if (!storeDomain || !storefrontToken) {
    throw new Error(
      "Missing Shopify configuration. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN when MOCK_ENABLED is not true.",
    );
  }

  return {
    storeDomain,
    storefrontToken,
    endpoint: `https://${storeDomain}/api/2025-01/graphql.json`,
  };
}
```

- [ ] **Step 2: Add a minimal Storefront GraphQL request helper and product query**

```ts
export async function shopifyFetch<T>(query: string): Promise<T> {
  const { endpoint, storefrontToken } = getShopifyConfig();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(", "));
  }

  if (!payload.data) {
    throw new Error("Shopify response did not include data.");
  }

  return payload.data;
}
```

### Task 3: Add The Shared Product Loader

**Files:**
- Create: `lib/products.ts`
- Modify: `components/products/productsData.ts`

- [ ] **Step 1: Add a shared `isMockEnabled` helper**

```ts
const isMockEnabled = process.env.MOCK_ENABLED === "true";
```

- [ ] **Step 2: Add a Shopify-to-UI mapper and product loader functions**

```ts
export async function getProducts(): Promise<Product[]> {
  if (isMockEnabled) {
    return products;
  }

  const shopifyProducts = await getShopifyProducts();
  return shopifyProducts.map(mapShopifyProduct);
}

export async function getFeaturedProduct(): Promise<Product | null> {
  const loadedProducts = await getProducts();
  return loadedProducts[0] ?? null;
}
```

- [ ] **Step 3: Keep fallbacks explicit for fields Shopify does not provide directly**

```ts
tastingNotes: [],
eyebrow: shopifyProduct.productType || "Shopify product",
size: 0,
```

### Task 4: Move Route Data Fetching To The Server Boundary

**Files:**
- Modify: `app/products/page.tsx`
- Modify: `components/products/ProductsPage.tsx`
- Modify: `app/product-detail/page.tsx`

- [ ] **Step 1: Make the products route fetch via `getProducts()`**

```ts
import { ProductsPage } from "@/components/products/ProductsPage";
import { getProducts } from "@/lib/products";

export default async function Products() {
  const products = await getProducts();
  return <ProductsPage products={products} />;
}
```

- [ ] **Step 2: Make `ProductsPage` presentational**

```ts
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import type { Product } from "@/components/products/productsData";

export function ProductsPage({ products }: { products: Product[] }) {
  return <ProductsCatalog products={products} />;
}
```

- [ ] **Step 3: Make the product detail page fetch the featured product**

```ts
const featuredProduct = await getFeaturedProduct();

if (!featuredProduct) {
  return <div className="px-5 py-20">No product available.</div>;
}
```

### Task 5: Allow Real Shopify Images

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add Shopify CDN image host support**

```ts
{
  protocol: "https",
  hostname: "cdn.shopify.com",
}
```

### Task 6: Verify

**Files:**
- None

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 2: Confirm mock mode behavior**

Run: `MOCK_ENABLED=true npm run build`
Expected: build succeeds with mock data path

- [ ] **Step 3: Confirm real-data path compiles**

Run: `MOCK_ENABLED=false SHOPIFY_STORE_DOMAIN=example.myshopify.com SHOPIFY_STOREFRONT_TOKEN=test npm run build`
Expected: build compiles code paths even if runtime fetch requires real credentials
