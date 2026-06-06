import "server-only";

interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

interface ShopifyImage {
  url: string;
}

interface ShopifyProductNode {
  title: string;
  description: string;
  productType: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
}

interface ShopifyProductsResponse {
  products: {
    nodes: ShopifyProductNode[];
  };
}

function getShopifyConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!storeDomain || !storefrontToken) {
    throw new Error(
      "Missing Shopify configuration. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN when MOCK_ENABLED is not true.",
    );
  }

  return {
    endpoint: `https://${storeDomain}/api/2025-01/graphql.json`,
    storefrontToken,
  };
}

async function shopifyFetch<T>(query: string): Promise<T> {
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

export async function getShopifyProducts(): Promise<ShopifyProductNode[]> {
  const data = await shopifyFetch<ShopifyProductsResponse>(`
    query GetProducts {
      products(first: 12) {
        nodes {
          title
          description
          productType
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `);

  return data.products.nodes;
}
