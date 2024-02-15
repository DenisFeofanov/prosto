"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCart, toggleCart } from "@/lib/redux/cartSlice";
import { FloatButton } from "antd";

export default function CartButton() {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(toggleCart());
  }

  return (
    <FloatButton
      badge={{ count: cart.bouquets.length }}
      onClick={handleClick}
      tooltip="Корзина"
    />
  );
}
