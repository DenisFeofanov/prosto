"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";
import { FloatButton } from "antd";

interface Props {
  onClick: () => void;
}

export default function CartButton({ onClick }: Props) {
  const cart = useAppSelector(selectCart);

  return (
    <FloatButton
      badge={{ count: cart.bouquets.length }}
      onClick={onClick}
      tooltip="Корзина"
    />
  );
}
