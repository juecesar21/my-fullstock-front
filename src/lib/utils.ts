export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
