import { Bouquet } from "@/interfaces/Bouquet";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/shared/constants";
import { Button } from "antd";
import Image from "next/image";

interface Props {
  bouquets: Bouquet[];
  onCardClick: (bouquet: Bouquet) => void;
  onAddToCartClick: (bouquet: Bouquet) => void;
}

export default function Gallery({
  bouquets,
  onCardClick,
  onAddToCartClick,
}: Props) {
  return (
    <ul
      className={`p-10 grid justify-center items-start grid-cols-[repeat(1,minmax(0,18.75rem))] sm:grid-cols-[repeat(2,minmax(0,18.75rem))] md:grid-cols-[repeat(3,minmax(0,18.75rem))] lg:grid-cols-[repeat(4,minmax(0,18.75rem))] lg:p-20 gap-10`}
    >
      {bouquets.map(bouquet => (
        <li key={bouquet.id}>
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
          >
            Купить
          </Button>
        </li>
      ))}
    </ul>
  );
}
