import { Bouquet } from "@/interfaces/Bouquet";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/shared/constants";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

interface Props {
  bouquets: Bouquet[];
  onClick: (bouquet: Bouquet) => void;
}

export default function Gallery({ bouquets, onClick }: Props) {
  return (
    <ul
      className={`p-10 grid justify-center items-start grid-cols-[repeat(1,minmax(0,18.75rem))] sm:grid-cols-[repeat(2,minmax(0,18.75rem))] md:grid-cols-[repeat(3,minmax(0,18.75rem))] lg:grid-cols-[repeat(4,minmax(0,18.75rem))] lg:p-20 gap-10`}
    >
      {bouquets.map(bouquet => (
        <li key={bouquet.id}>
          <button
            type="button"
            onClick={() => onClick(bouquet)}
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

          <PrimaryButton onClick={() => console.log("TODO: buy bouquet")}>
            Купить
          </PrimaryButton>
        </li>
      ))}
    </ul>
  );
}
