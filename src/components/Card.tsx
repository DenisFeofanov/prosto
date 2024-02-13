import { Bouquet } from "@/interfaces/Bouquet";
import { useAppSelector } from "@/lib/hooks";
import { selectCart } from "@/lib/redux/cartSlice";
import { calculateRemainingAmount } from "@/lib/utils";
import { IMAGE_WIDTH, IMAGE_HEIGHT } from "@/shared/constants";
import { Button } from "antd";
import Image from "next/image";

interface Props {
  bouquet: Bouquet;
  onCardClick: (bouquet: Bouquet) => void;
  onAddToCartClick: (bouquet: Bouquet) => void;
}

export default function Card({
  bouquet,
  onCardClick,
  onAddToCartClick,
}: Props) {
  const cart = useAppSelector(selectCart);

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
        onClick={() => onAddToCartClick(bouquet)}
        type="primary"
        disabled={calculateRemainingAmount(bouquet, cart) === 0}
      >
        Купить
      </Button>
    </>
  );
}
