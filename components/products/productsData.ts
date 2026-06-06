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

export const products: Product[] = [
  {
    imageSrc: "/mock/products/society-hinoki.png",
    productName: "Society Hinoki",
    size: 30,
    price: 745,
    currency: "SEK",
    category: "Matcha",
    eyebrow: "Stone-milled ceremonial matcha",
    description:
      "A soft, rounded matcha with a calm woody finish and enough body for everyday whisking.",
    tastingNotes: ["Cedar", "Cream", "Fresh grass"],
  },
  {
    imageSrc: "/mock/products/society-izumo.png",
    productName: "Society Izumo",
    size: 50,
    price: 930,
    currency: "SEK",
    category: "Matcha",
    eyebrow: "Balanced house blend",
    description:
      "Clean umami, gentle sweetness, and a bright green cup made for daily rituals.",
    tastingNotes: ["Umami", "Sweet pea", "Silky finish"],
  },
  {
    imageSrc: "/mock/products/society-hiyori.png",
    productName: "Society Hiyori",
    size: 50,
    price: 1020,
    currency: "SEK",
    category: "Matcha",
    eyebrow: "Large-format organic tin",
    description:
      "An easy-drinking organic matcha with a smooth profile and a fuller finish.",
    tastingNotes: ["Spinach", "Vanilla", "Light toast"],
  },
  {
    imageSrc: "/mock/products/society-shizen.png",
    productName: "Society Shizen",
    size: 30,
    price: 920,
    currency: "SEK",
    category: "Matcha",
    eyebrow: "Small-batch ceremonial grade",
    description:
      "Bright and lively with a light floral edge designed for straight preparation.",
    tastingNotes: ["Wildflower", "Melon", "Soft bitterness"],
  },
  {
    imageSrc: "/mock/products/society-natsukashi.png",
    productName: "Society Natsukashi",
    size: 30,
    price: 940,
    currency: "SEK",
    category: "Matcha",
    eyebrow: "Foundational starter pick",
    description:
      "A dependable everyday option with a mellow body and a clean finish.",
    tastingNotes: ["Oat", "Hay", "Buttercream"],
  },
  {
    imageSrc: "/mock/products/society-uji-hojicha.png",
    productName: "Society Uji Hojicha",
    size: 50,
    price: 820,
    currency: "SEK",
    category: "Matcha",
    eyebrow: "Richer premium selection",
    description:
      "Deeper umami and a longer finish with a more concentrated texture in the bowl.",
    tastingNotes: ["Cocoa nib", "Seaweed", "Sweet cream"],
  },
  {
    imageSrc: "/mock/products/nami-yame.png",
    productName: "Nami Yame",
    size: 30,
    price: 860,
    currency: "SEK",
    category: "Books",
    eyebrow: "Smooth Yame matcha",
    description:
      "A rounded, calm profile with soft sweetness and an easy everyday finish.",
    tastingNotes: ["Cream", "Young grass", "Soft umami"],
  },
  {
    imageSrc: "/mock/products/nami-dark-hojicha.png",
    productName: "Nami Dark Hojicha",
    size: 30,
    price: 750,
    currency: "SEK",
    category: "Toys",
    eyebrow: "Roasted dark hojicha",
    description:
      "Deeper roast character with a warm body and a longer toasted finish.",
    tastingNotes: ["Cocoa", "Roast", "Brown sugar"],
  },
  {
    imageSrc: "/mock/products/nami-hojicha.png",
    productName: "Nami Hojicha",
    size: 30,
    price: 750,
    currency: "SEK",
    category: "Toys",
    eyebrow: "Balanced roasted hojicha",
    description:
      "Gentle roast notes with a lighter body and smooth, comforting finish.",
    tastingNotes: ["Toast", "Hazelnut", "Warm grain"],
  },
  {
    imageSrc: "/mock/products/nami-kana.png",
    productName: "Nami Kana",
    size: 30,
    price: 945,
    currency: "SEK",
    category: "Books",
    eyebrow: "Elegant Kana selection",
    description:
      "A vivid and polished cup with layered sweetness and a clean finish.",
    tastingNotes: ["Melon", "Sweet pea", "Silk"],
  },
  {
    imageSrc: "/mock/products/nami-okumidori.png",
    productName: "Nami Okumidori",
    size: 30,
    price: 845,
    currency: "SEK",
    category: "Books",
    eyebrow: "Okumidori single-cultivar style",
    description:
      "Fresh and green with savory depth and a soft, persistent finish.",
    tastingNotes: ["Broth", "Spinach", "Sweet cream"],
  },
  {
    imageSrc: "/mock/products/nami-strawberry.png",
    productName: "Nami Strawberry",
    size: 30,
    price: 1025,
    currency: "SEK",
    category: "Books",
    eyebrow: "Fruit-led special blend",
    description:
      "A brighter, expressive profile with lifted sweetness and a plush body.",
    tastingNotes: ["Berry", "Vanilla", "Soft roast"],
  },
];
