import { ProductsPage } from "@/components/products/ProductsPage";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Products() {
  const products = await getProducts();

  return <ProductsPage products={products} />;
}
