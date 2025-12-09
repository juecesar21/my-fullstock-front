import { BASE_URL } from "@/constants";
import { CheckoutFormData, Order } from "@/models/order.model";
import { OrderFromApiSchema, OrderToApiSchema } from "@/schemas/order.schema";

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
  const order = {
    id: 0,
    userId: user.id,
    email,
    status: "pending",
    total: cart.totals.grandTotal, // This should be calculated based on cart items
    details,
  };
  const finalOrder = OrderToApiSchema.parse(order);
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(finalOrder)
  }
  const res = await fetch(`${BASE_URL}/orders`, options);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error creating order : ${errorData.error}`);
  }
  const apiResponse = OrderFromApiSchema.parse(await res.json());
  return apiResponse;
}

export async function getOrdersByUser(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error fetching orders: ${errorData.error}`);
  }
  const apiOrder = OrderFromApiSchema.array().parse(await res.json());
  return apiOrder;
}
