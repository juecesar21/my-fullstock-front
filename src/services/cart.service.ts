import { BASE_URL } from "@/constants";
import { Cart } from "@/models/cart.model";
import { CartSchema } from "@/schemas/cart.schema";

export async function getCart(): Promise<Cart | null> {
  const res = await fetch(`${BASE_URL}/cart`, {credentials: "include"});
  if (!res.ok) {
   console.log("Error fetching cart:", await res.text());
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
    let message = "Unknown error";
    try {
      const err = await res.json();
      message = err.error || JSON.stringify(err);
    } catch {
      message = await res.json();
    }
    throw new Error(`Error updating cart item ${message}`);
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
  const cart =await getCart();
  if (!cart) throw new Error("Cart not found after removing item");
  return cart;
}

export async function clearCart(): Promise<void> {
  const res = await fetch(`${BASE_URL}/cart/clear`, {method: "POST", credentials: "include"});
  if (!res.ok) throw new Error("Error clearing cart");
}
