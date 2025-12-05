import { BASE_URL } from "@/constants";
import { Cart, type CartItem } from "@/models/cart.model";
import { CartSchema } from "@/schemas/cart.schema";

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export async function getCart(): Promise<Cart | null> {
  const res = await fetch(`${BASE_URL}/cart`, {credentials: "include"});
  if (!res.ok) {
    const errorMessage = await res.text();
    console.log(`Error fetching cart ${errorMessage}`);
    return null;
  }
  const cartResponse = await res.json();
  return CartSchema.parse(cartResponse);
}

export async function updateCartItem(
  productId: number,
  quantity: number
): Promise<Cart> {

  const options: RequestInit = {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({quantity})
  }
  const res = await fetch(`${BASE_URL}/cart/items/${productId}`, options);
  if (!res.ok) {
    const errorMessage = await res.json();
    throw new Error(` updating cart item ${errorMessage.error}`);
  }
  const cartResponse = await res.json();
  return CartSchema.parse(cartResponse);
}

export async function removeCartItem(productId: number): Promise<Cart> {
  const options: RequestInit = {
    method: "DELETE",
    credentials: "include",
  } 
  const res = await fetch(`${BASE_URL}/cart/items/${productId}`, options);
  if (!res.ok) {
    throw new Error(`Error removing cart item`);
  }
  const cartResponse =await getCart();
  return CartSchema.parse(cartResponse);
}

export async function clearCart(): Promise<void> {
  await fetch(`${BASE_URL}/cart/clear`, {method: "POST", credentials: "include"})
}
