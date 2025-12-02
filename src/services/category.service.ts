import { BASE_URL } from "@/constants";
import { Category } from "@/models/category.model";

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error geting categories ${errorMessage}`);
  }
  const categiriesResponse: Category[] = await res.json();
  return categiriesResponse;
};

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getAllCategories();
    const category = categories.find((cat) => cat.slug === slug);
    return category || null;
  } catch (error) {
    throw new Error(`Error fetching${slug} category: ${error}`);
  }
};
