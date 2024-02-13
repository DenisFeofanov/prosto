"use client";

import { useState } from "react";
import CartButton from "./CartButton";
import CartModal from "./CartModal";

function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCart() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <CartButton onClick={toggleCart} />
      <CartModal isOpen={isOpen} closeModal={toggleCart} />
    </>
  );
}

export default Cart;
