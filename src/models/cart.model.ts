export interface CartItem {
  productId: number;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totals: {
    itemCount: number;
    grandTotal: number;
  };
  createdAt: string;
  updatedAt: string;
}
