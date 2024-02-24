"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCart, toggleCart } from "@/lib/redux/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

export default function CartButton() {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(toggleCart());
  }

  return (
    <FloatButton
      icon={<ShoppingCartOutlined />}
      badge={{ count: cart.bouquets.length }}
      onClick={handleClick}
    />
  );
}
