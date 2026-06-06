# Shopify Mock Toggle Design

## Goal

Add a single environment-controlled switch so the storefront can use the existing mock product catalog during development and demos, while allowing the same pages to switch to Shopify Storefront API data without UI rewrites.

## Requirements

- `MOCK_ENABLED=true` must use the existing mock product catalog.
- Any other `MOCK_ENABLED` value must use Shopify Storefront API data.
- Product list and product detail routes must stop importing mock data directly.
- Existing product UI components should require minimal changes.
- Shopify credentials must remain server-only.
- The initial Shopify integration only needs read-only product data.

## Architecture

Introduce a server-side product data module that becomes the only source of product data for routes. That module will:

- read `process.env.MOCK_ENABLED`
- return mock products when the flag is `"true"`
- otherwise call Shopify via a small Storefront GraphQL client
- map Shopify responses into the current UI-facing product shape

This keeps the mock toggle at the data boundary instead of scattering environment checks through pages and components.

## Data Model

Keep a shared UI-facing `Product` shape compatible with existing components:

- `imageSrc`
- `productName`
- `size`
- `price`
- `currency`
- `category`
- `eyebrow`
- `description`
- `tastingNotes`

Shopify responses will be adapted into this shape with safe fallbacks:

- `title` -> `productName`
- featured image URL -> `imageSrc`
- variant or price range amount -> `price`
- currency code -> `currency`
- `productType` -> `category` when compatible, otherwise default to `"Matcha"`
- `description` -> `description`
- missing mock-only fields such as `tastingNotes` get empty or derived fallback values

## File Boundaries

- `components/products/productsData.ts`: remains the mock dataset source
- `lib/shopify.ts`: server-only Storefront API client and query helpers
- `lib/products.ts`: shared product loader choosing mock vs Shopify
- `app/products/page.tsx`: route-level data fetch for product listing
- `app/product-detail/page.tsx`: route-level data fetch for featured product detail
- `components/products/ProductsPage.tsx`: accepts products via props instead of importing mock data
- `components/products/ProductImageGallery.tsx`: continues rendering the shared `Product` shape
- `next.config.ts`: allow Shopify CDN images if real product images are used

## Error Handling

- If mock mode is off and required Shopify env vars are missing, fail with a clear server error.
- If Shopify returns no products, render an empty catalog on the products page and a fallback message on the product detail page.
- No silent fallback to mock data when `MOCK_ENABLED` is not `"true"`.

## Verification

- `MOCK_ENABLED=true` keeps current mock catalog behavior.
- `MOCK_ENABLED=false` reads products from Shopify.
- `npm run lint` must pass after refactor.

