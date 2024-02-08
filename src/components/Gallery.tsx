import { Bouquet } from "@/interfaces/Bouquet";
import { Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  bouquets: Bouquet[];
}

export default function Gallery({ bouquets }: Props) {
  return (
    <ul
      className={`p-10 grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(4,minmax(0,300px))] lg:p-20 gap-10`}
    >
      {bouquets.map(bouquet => (
        <li key={bouquet.id}>
          <button
            type="button"
            onClick={() => {
              console.log("TODO: show bouquet details");
            }}
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
              <Typography variant="h5" component="div">
                {bouquet.name}
              </Typography>
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
