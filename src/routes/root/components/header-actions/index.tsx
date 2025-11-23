import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui";
import { useCart } from "@/contexts/cart.context";

import styles from "./styles.module.css";

export default function HeaderActions() {
  const { cart } = useCart();

  const totalItems = cart ? cart.totals.itemCount : 0;

  return (
    <div className={styles["header-actions"]}>
      <Button
        size="xl-icon"
        variant="ghost"
        aria-label="Carrito de compras"
        asChild
        className={styles["header-actions__cart"]}
      >
        <Link to="/cart">
          <ShoppingCart />
          {totalItems > 0 && (
            <span className={styles["header-actions__cart-badge"]}>
              {totalItems}
            </span>
          )}
        </Link>
      </Button>
    </div>
  );
}
