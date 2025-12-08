import { BASE_URL } from "@/constants";
import { Product } from "@/models/product.model";

export async function getProductsByCategoryId(
  categoryId: number
): Promise<Product[] | null> {
  const res = await fetch(`${BASE_URL}/${categoryId}/products`);
  if (!res.ok) {
    const errorMessage = await res.text();
    console.log(`Error getting products by category Id ${errorMessage}`);
    return null;
  }
  const productsResponse: Product[] = await res.json();
  return productsResponse;
}

export async function getProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    const errorMessage = await res.text();
    console.log(`Error getting product by Id ${errorMessage}`);
    return null
  }
  const productResponse = await res.json();
  return productResponse;
}
