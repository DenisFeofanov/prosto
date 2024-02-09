import { Bouquet } from "@/interfaces/Bouquet";
import { Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  bouquets: Bouquet[];
  onClick: (bouquet: Bouquet) => void;
}

export default function Gallery({ bouquets, onClick }: Props) {
  return (
    <ul
      className={`p-10 grid justify-center items-start grid-cols-[repeat(1,minmax(0,300px))] sm:grid-cols-[repeat(2,minmax(0,300px))] md:grid-cols-[repeat(3,minmax(0,300px))] lg:grid-cols-[repeat(4,minmax(0,300px))] lg:p-20 gap-10`}
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
              width={300}
              height={300}
              alt="Фото букета"
              priority
            />
            <div className="mt-4">
              <h2 className="text-2xl mb-4">{bouquet.name}</h2>
              <Typography
                className="mt-2"
                variant="body2"
                color="text.secondary"
              >
                {bouquet.price} руб.
              </Typography>
            </div>
          </button>

          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => console.log("TODO: buy bouquet")}
          >
            Купить
          </button>
        </li>
      ))}
    </ul>
  );
}
