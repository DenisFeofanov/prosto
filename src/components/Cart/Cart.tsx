"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";
import CartButton from "./CartButton";
import CartModal from "./CartModal";

function Cart() {
  const cart = useAppSelector(selectCart);
  return (
    <>
      {cart.bouquets.length > 0 && <CartButton />}
      <CartModal />
    </>
  );
}

export default Cart;
