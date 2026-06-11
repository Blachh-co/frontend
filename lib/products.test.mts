import test from "node:test";
import assert from "node:assert/strict";

import { mapMockProduct, mapShopifyProduct } from "./product-mappers.ts";
import type { ShopifyProductNode } from "./shopify.ts";

test("mapShopifyProduct preserves product variants and defaults to the first variant", () => {
  const product: ShopifyProductNode = {
    id: "gid://shopify/Product/1",
    title: "Society Hinoki",
    description: "Ceremonial matcha",
    productType: "Matcha",
    featuredImage: { url: "https://cdn.example/hinoki.png" },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/50g",
          title: "50g",
          price: { amount: "30.00", currencyCode: "USD" },
        },
        {
          id: "gid://shopify/ProductVariant/100g",
          title: "100g",
          price: { amount: "55.00", currencyCode: "USD" },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: "30.00", currencyCode: "USD" },
    },
  };

  const mapped = mapShopifyProduct(product);

  assert.equal(mapped.merchandiseId, "gid://shopify/ProductVariant/50g");
  assert.equal(mapped.size, 50);
  assert.equal(mapped.price, 30);
  assert.equal(mapped.formattedPrice, "$30.00");
  assert.deepEqual(
    mapped.variants.map((variant) => ({
      merchandiseId: variant.merchandiseId,
      size: variant.size,
      price: variant.price,
      formattedPrice: variant.formattedPrice,
    })),
    [
      {
        merchandiseId: "gid://shopify/ProductVariant/50g",
        size: 50,
        price: 30,
        formattedPrice: "$30.00",
      },
      {
        merchandiseId: "gid://shopify/ProductVariant/100g",
        size: 100,
        price: 55,
        formattedPrice: "$55.00",
      },
    ],
  );
});

test("mapMockProduct converts every variant into the selected currency", () => {
  const mapped = mapMockProduct(
    {
      id: "mock-product-society-hinoki",
      merchandiseId: "mock-variant-society-hinoki-50g",
      imageSrc: "/mock/products/society-hinoki.png",
      productName: "Society Hinoki",
      size: 50,
      price: 300,
      currency: "SEK",
      formattedPrice: "300,00 kr",
      category: "Matcha",
      eyebrow: "Stone-milled ceremonial matcha",
      description: "Ceremonial matcha",
      tastingNotes: ["Cedar"],
      variants: [
        {
          merchandiseId: "mock-variant-society-hinoki-50g",
          size: 50,
          price: 300,
          currency: "SEK",
          formattedPrice: "300,00 kr",
        },
        {
          merchandiseId: "mock-variant-society-hinoki-100g",
          size: 100,
          price: 550,
          currency: "SEK",
          formattedPrice: "550,00 kr",
        },
      ],
    },
    "USD",
  );

  assert.equal(mapped.merchandiseId, "mock-variant-society-hinoki-50g");
  assert.equal(mapped.price, 29);
  assert.equal(mapped.formattedPrice, "$29.00");
  assert.deepEqual(
    mapped.variants.map((variant) => ({
      merchandiseId: variant.merchandiseId,
      size: variant.size,
      price: variant.price,
      formattedPrice: variant.formattedPrice,
      currency: variant.currency,
    })),
    [
      {
        merchandiseId: "mock-variant-society-hinoki-50g",
        size: 50,
        price: 29,
        formattedPrice: "$29.00",
        currency: "USD",
      },
      {
        merchandiseId: "mock-variant-society-hinoki-100g",
        size: 100,
        price: 52,
        formattedPrice: "$52.00",
        currency: "USD",
      },
    ],
  );
});
