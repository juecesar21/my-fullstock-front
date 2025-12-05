import { z } from "zod";

export const BackendCartItemSchema = z.object({
    productId: z.number(),
    name: z.string(),
    imageUrl: z.string(),
    quantity: z.number(),
    unicePrice: z.number(),
    lineTotal: z.number(),
});

export const BackendCartSchema = z.object({
    id: z.number(),
    items: z.array(BackendCartItemSchema),
    totals: z.object({
        itemCount: z.number(),
        grandTotal: z.number(),
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const CartItemSchema = BackendCartItemSchema.transform((dto) => ({
    productId: dto.productId,
    title: dto.name,
    imgSrc: dto.imageUrl,
    quantity: dto.quantity,
    price: dto.unicePrice,
    lineTotal: dto.lineTotal
}));

export const CartSchema = BackendCartSchema.transform((dto) => ({
    ...dto,
    items: dto.items.map((i) => CartItemSchema.parse(i)),
}));