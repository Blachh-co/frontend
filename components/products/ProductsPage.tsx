import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import type { Product } from "@/components/products/productsData";
import type { Dictionary } from "@/lib/i18n";

interface ProductsPageProps {
  products: Product[];
  dictionary: Dictionary["products"];
  a11y: Dictionary["a11y"];
}

export function ProductsPage({ products, dictionary, a11y }: ProductsPageProps) {
  return <ProductsCatalog products={products} dictionary={dictionary} a11y={a11y} />;
}
