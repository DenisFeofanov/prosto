import { Bouquet } from "@/interfaces/Order";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart, selectCart, toggleCart } from "@/lib/redux/cartSlice";
import { calculateRemainingAmount } from "@/lib/utils";
import { IMAGE_WIDTH, IMAGE_HEIGHT, DEFAULT_SIZE } from "@/shared/constants";
import { Button } from "antd";
import Image from "next/image";
import { MouseEventHandler } from "react";

interface Props {
  bouquet: Bouquet;
  onCardClick: (bouquet: Bouquet) => void;
}

export default function Card({ bouquet, onCardClick }: Props) {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const handleBuyClick: MouseEventHandler<HTMLElement> = () => {
    dispatch(
      addToCart([
        {
          data: bouquet,
          size: DEFAULT_SIZE,
        },
      ])
    );
    dispatch(toggleCart());
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onCardClick(bouquet)}
        className="text-left rounded-xl group"
      >
        <Image
          className="rounded-md fine-pointer:group-hover:shadow-2xl"
          src={bouquet.photos[0]}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          alt="Фото букета"
          priority
        />
        <div className="mt-4">
          <h2 className="text-2xl mb-4">{bouquet.name}</h2>
          <p className="mt-2">{bouquet.price} руб.</p>
        </div>
      </button>

      <Button
        className="mt-4"
        onClick={handleBuyClick}
        type="primary"
        disabled={calculateRemainingAmount(bouquet, cart) === 0}
      >
        Купить
      </Button>
    </>
  );
}
