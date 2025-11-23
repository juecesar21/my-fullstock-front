import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/auth.context";
import { CartContext } from "@/contexts/cart.context";
import { Cart } from "@/models/cart.model";
import { Product } from "@/models/product.model";
import * as cartService from "@/services/cart.service";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const cart = await cartService.getCart();
        setCart(cart);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setError("Failed to load cart");
        } else {
          throw error;
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [user]);

  const removeCartItem = async (productId: Product["id"]) => {
    if (!cart) return;

    setLoading(true);

    try {
      const updatedCart = await cartService.removeCartItem(productId);
      setCart(updatedCart);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError("Failed to remove item");
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId: Product["id"], quantity: number) => {
    if (!cart) return;

    setLoading(true);

    try {
      const updatedCart = await cartService.updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError("Failed to update quantity");
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await cartService.clearCart();
      setCart(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError("Failed to clear cart");
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        removeCartItem,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
