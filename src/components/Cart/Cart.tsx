"use client";

import { useState } from "react";
import CartButton from "./CartButton";
import CartModal from "./CartModal";
import { useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";

function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useAppSelector(selectCart);

  function toggleCart() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {cart.bouquets.length > 0 && <CartButton onClick={toggleCart} />}
      <CartModal isOpen={isOpen} closeModal={toggleCart} />
    </>
  );
}

export default Cart;
