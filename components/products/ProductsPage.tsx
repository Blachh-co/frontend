import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import type { Product } from "@/components/products/productsData";

interface ProductsPageProps {
  products: Product[];
}

export function ProductsPage({ products }: ProductsPageProps) {
  return <ProductsCatalog products={products} />;
}
