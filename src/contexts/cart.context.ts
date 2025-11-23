import { createContext, useContext } from "react";

import type { Cart } from "@/models/cart.model";
import { Product } from "@/models/product.model";

export const CartContext = createContext<{
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  removeCartItem: (productId: Product["id"]) => Promise<void>;
  updateCartItem: (productId: Product["id"], quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
} | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error("useCart must be used within a CartProvider");

  return context;
};
