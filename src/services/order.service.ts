import { BASE_URL } from "@/constants";
import { CheckoutFormData, Order, OrderResponse } from "@/models/order.model";

import { getCurrentUser } from "./auth.service";
import { getCart } from "./cart.service";

export async function createOrder(formData: FormData): Promise<Order> {
  const { email, ...details } = Object.fromEntries(
    formData
  ) as unknown as CheckoutFormData;
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authorization error")
  }
  const cart = await getCart();
  if (!cart) {
    throw new Error("Cart not found");
  }
  const order = {
    id: 0,
    userId: user.id,
    email,
    status: "pending",
    total: cart.totals.grandTotal, // This should be calculated based on cart items
    shippingInfo: details,
  };
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  }
  const res = await fetch(`${BASE_URL}/orders`, options);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error creating order : ${errorData.error}`);
  }
  const apiResponse = await res.json();
  return apiResponse.data;
}

export async function getOrdersByUser(): Promise<OrderResponse[]> {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error fetching orders: ${errorData.error}`);
  }
  const apiOrder = await res.json();
  return apiOrder.data;
}
