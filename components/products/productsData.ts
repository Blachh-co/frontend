import { formatMoney } from "@/lib/currency";

export type ProductCategory = "Matcha" | "Books" | "Toys";

export interface ProductVariant {
  merchandiseId: string;
  size: number;
  price: number;
  currency: string;
  formattedPrice: string;
}

export interface Product {
  id: string;
  handle: string;
  merchandiseId: string;
  imageSrc: string;
  productName: string;
  size: number;
  price: number;
  currency: string;
  formattedPrice: string;
  category: ProductCategory;
  eyebrow: string;
  description: string;
  tastingNotes: string[];
  variants: ProductVariant[];
}

interface ProductSeed {
  id: string;
  imageSrc: string;
  productName: string;
  category: ProductCategory;
  eyebrow: string;
  description: string;
  tastingNotes: string[];
  variants: Array<{
    merchandiseId: string;
    size: number;
    price: number;
  }>;
}

function createProductHandle(productName: string) {
  return productName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createVariant(
  merchandiseId: string,
  size: number,
  price: number,
): ProductVariant {
  return {
    merchandiseId,
    size,
    price,
    currency: "SEK",
    formattedPrice: formatMoney(price, "SEK"),
  };
}

function buildProduct(seed: ProductSeed): Product {
  const variants = seed.variants.map((variant) =>
    createVariant(variant.merchandiseId, variant.size, variant.price),
  );
  const defaultVariant = variants[0];

  if (!defaultVariant) {
    throw new Error(`Product ${seed.id} must include at least one variant.`);
  }

  return {
    id: seed.id,
    handle: createProductHandle(seed.productName),
    merchandiseId: defaultVariant.merchandiseId,
    imageSrc: seed.imageSrc,
    productName: seed.productName,
    size: defaultVariant.size,
    price: defaultVariant.price,
    currency: defaultVariant.currency,
    formattedPrice: defaultVariant.formattedPrice,
    category: seed.category,
    eyebrow: seed.eyebrow,
    description: seed.description,
    tastingNotes: seed.tastingNotes,
    variants,
  };
}

const productSeeds: ProductSeed[] = [
  {
    id: "mock-product-society-hinoki",
    imageSrc: "/mock/products/society-hinoki.png",
    productName: "Society Hinoki",
    category: "Matcha",
    eyebrow: "Stone-milled ceremonial matcha",
    description:
      "A soft, rounded matcha with a calm woody finish and enough body for everyday whisking.",
    tastingNotes: ["Cedar", "Cream", "Fresh grass"],
    variants: [
      { merchandiseId: "mock-variant-society-hinoki-50g", size: 50, price: 300 },
      { merchandiseId: "mock-variant-society-hinoki-100g", size: 100, price: 500 },
    ],
  },
  {
    id: "mock-product-society-izumo",
    imageSrc: "/mock/products/society-izumo.png",
    productName: "Society Izumo",
    category: "Matcha",
    eyebrow: "Balanced house blend",
    description:
      "Clean umami, gentle sweetness, and a bright green cup made for daily rituals.",
    tastingNotes: ["Umami", "Sweet pea", "Silky finish"],
    variants: [
      { merchandiseId: "mock-variant-society-izumo", size: 50, price: 930 },
    ],
  },
  {
    id: "mock-product-society-hiyori",
    imageSrc: "/mock/products/society-hiyori.png",
    productName: "Society Hiyori",
    category: "Matcha",
    eyebrow: "Large-format organic tin",
    description:
      "An easy-drinking organic matcha with a smooth profile and a fuller finish.",
    tastingNotes: ["Spinach", "Vanilla", "Light toast"],
    variants: [
      { merchandiseId: "mock-variant-society-hiyori", size: 50, price: 1020 },
    ],
  },
  {
    id: "mock-product-society-shizen",
    imageSrc: "/mock/products/society-shizen.png",
    productName: "Society Shizen",
    category: "Matcha",
    eyebrow: "Small-batch ceremonial grade",
    description:
      "Bright and lively with a light floral edge designed for straight preparation.",
    tastingNotes: ["Wildflower", "Melon", "Soft bitterness"],
    variants: [
      { merchandiseId: "mock-variant-society-shizen", size: 30, price: 920 },
    ],
  },
  {
    id: "mock-product-society-natsukashi",
    imageSrc: "/mock/products/society-natsukashi.png",
    productName: "Society Natsukashi",
    category: "Matcha",
    eyebrow: "Foundational starter pick",
    description:
      "A dependable everyday option with a mellow body and a clean finish.",
    tastingNotes: ["Oat", "Hay", "Buttercream"],
    variants: [
      { merchandiseId: "mock-variant-society-natsukashi", size: 30, price: 940 },
    ],
  },
  {
    id: "mock-product-society-uji-hojicha",
    imageSrc: "/mock/products/society-uji-hojicha.png",
    productName: "Society Uji Hojicha",
    category: "Matcha",
    eyebrow: "Richer premium selection",
    description:
      "Deeper umami and a longer finish with a more concentrated texture in the bowl.",
    tastingNotes: ["Cocoa nib", "Seaweed", "Sweet cream"],
    variants: [
      { merchandiseId: "mock-variant-society-uji-hojicha", size: 50, price: 820 },
    ],
  },
  {
    id: "mock-product-nami-yame",
    imageSrc: "/mock/products/nami-yame.png",
    productName: "Nami Yame",
    category: "Books",
    eyebrow: "Smooth Yame matcha",
    description:
      "A rounded, calm profile with soft sweetness and an easy everyday finish.",
    tastingNotes: ["Cream", "Young grass", "Soft umami"],
    variants: [{ merchandiseId: "mock-variant-nami-yame", size: 30, price: 860 }],
  },
  {
    id: "mock-product-nami-dark-hojicha",
    imageSrc: "/mock/products/nami-dark-hojicha.png",
    productName: "Nami Dark Hojicha",
    category: "Toys",
    eyebrow: "Roasted dark hojicha",
    description:
      "Deeper roast character with a warm body and a longer toasted finish.",
    tastingNotes: ["Cocoa", "Roast", "Brown sugar"],
    variants: [
      { merchandiseId: "mock-variant-nami-dark-hojicha", size: 30, price: 750 },
    ],
  },
  {
    id: "mock-product-nami-hojicha",
    imageSrc: "/mock/products/nami-hojicha.png",
    productName: "Nami Hojicha",
    category: "Toys",
    eyebrow: "Balanced roasted hojicha",
    description:
      "Gentle roast notes with a lighter body and smooth, comforting finish.",
    tastingNotes: ["Toast", "Hazelnut", "Warm grain"],
    variants: [{ merchandiseId: "mock-variant-nami-hojicha", size: 30, price: 750 }],
  },
  {
    id: "mock-product-nami-kana",
    imageSrc: "/mock/products/nami-kana.png",
    productName: "Nami Kana",
    category: "Books",
    eyebrow: "Elegant Kana selection",
    description:
      "A vivid and polished cup with layered sweetness and a clean finish.",
    tastingNotes: ["Melon", "Sweet pea", "Silk"],
    variants: [{ merchandiseId: "mock-variant-nami-kana", size: 30, price: 945 }],
  },
  {
    id: "mock-product-nami-okumidori",
    imageSrc: "/mock/products/nami-okumidori.png",
    productName: "Nami Okumidori",
    category: "Books",
    eyebrow: "Okumidori single-cultivar style",
    description:
      "Fresh and green with savory depth and a soft, persistent finish.",
    tastingNotes: ["Broth", "Spinach", "Sweet cream"],
    variants: [
      { merchandiseId: "mock-variant-nami-okumidori", size: 30, price: 845 },
    ],
  },
  {
    id: "mock-product-nami-strawberry",
    imageSrc: "/mock/products/nami-strawberry.png",
    productName: "Nami Strawberry",
    category: "Books",
    eyebrow: "Fruit-led special blend",
    description:
      "A brighter, expressive profile with lifted sweetness and a plush body.",
    tastingNotes: ["Berry", "Vanilla", "Soft roast"],
    variants: [
      { merchandiseId: "mock-variant-nami-strawberry", size: 30, price: 1025 },
    ],
  },
];

export const products: Product[] = productSeeds.map(buildProduct);
